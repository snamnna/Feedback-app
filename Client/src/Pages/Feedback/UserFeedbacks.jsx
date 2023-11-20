import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import feedbackService from "../../services/feedbackService";
import lectureService from "../../services/lectureService";
import courseService from "../../services/courseService";
import { PieChart, Pie, Legend } from "recharts";

const UserFeedbacks = () => {
  const [feedback, setFeedback] = useState([]);
  const [feedbackWithLecture, setFeedbackWithLecture] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const user = useParams();
  const userId = user.userId;
  const [goodfb, setGoodfb] = useState(0);
  const [badfb, setBadfb] = useState(0);
  const [neutralfb, setNeutralfb] = useState(0);

  const CustomLegend = ({ payload }) => (
    <ul>
      {payload.map((entry, index) => (
        <li
          key={`legend-${index}`}
          style={{ display: "flex", alignItems: "center" }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              backgroundColor: entry.color,
              marginRight: "5px",
            }}
          ></div>
          <span>
            {entry.value} ({entry.payload.students})
          </span>
        </li>
      ))}
    </ul>
  );
  const calculateFeedbackStatistics = (feedbacks) => {
    console.log("calculating feedback statistics...");
    console.log("feedbacks: ", feedbacks);
    let goodfb = 0;
    let badfb = 0;
    let neutralfb = 0;

    feedbacks.forEach((fb) => {
      console.log("feedback: ", fb);
      if (fb.feedbackType === "GREAT") {
        goodfb++;
      } else if (fb.feedbackType === "BAD") {
        badfb++;
      } else if (fb.feedbackType === "NEUTRAL") {
        neutralfb++;
      }
    });

    setGoodfb(goodfb);
    setBadfb(badfb);
    setNeutralfb(neutralfb);
  };

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const feedbacks = await feedbackService.userFeedback(userId, token);
        setFeedback(feedbacks.feedback);
        console.log("feedbackit haettu", feedbacks.feedback);

        //get lecture details
        const feedbacksWithLecture = [];
        for (const feedback of feedbacks.feedback) {
          // Fetch lecture details for each feedback
          const lecture = await lectureService.getLectureById(
            feedback.lectureId,
            token
          );
          //fetch course details for each feedback
          const course = await courseService.getCourseById(
            lecture.courseId,
            token
          );
          //add feedback, lecture and course to array
          feedbacksWithLecture.push({ feedback, lecture, course });
        }
        setFeedbackWithLecture(feedbacksWithLecture);

        calculateFeedbackStatistics(feedbacks.feedback);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };
    fetchFeedback();
  }, [userId]);

  if (feedbackWithLecture.length > 0) {
    return (
      <div className="flex items-center justify-center p-10">
        <div className="border rounded-sm max-w-2xl text-center p-10 mx-2">
          <h1 id="statistics" className="text-xl font-bold">
            Statistics:
          </h1>
          <PieChart width={400} height={200}>
            <Pie
              dataKey="students"
              outerRadius={80}
              data={[
                { name: "GREAT", students: goodfb, fill: "green" },
                { name: "BAD", students: badfb, fill: "red" },
                { name: "NEUTRAL", students: neutralfb, fill: "yellow" },
              ]}
            />
            <Legend
              content={<CustomLegend />}
              align="right"
              verticalAlign="middle"
              layout="vertical"
            />
          </PieChart>
          <h1 className="mt-10 mb-10 text-xl font-bold text-center">
            List of feedbacks from user {userId}
          </h1>
          <ul id="feedbackList">
            {feedbackWithLecture.map(({ feedback, lecture, course }, index) => (
              <li
                className="border rounded-md max-w-2xl p-3 my-5 mx-auto text-center"
                key={index}
              >
                <h3>Type: {feedback.feedbackType}</h3>
                <p>Comment: {feedback.comment}</p>
                <p>
                  Course:
                  <Link
                    to={`/courses/${lecture.courseId}`}
                    className="link text-primary ml-1"
                  >
                    {course.name}
                  </Link>
                </p>
                <p>
                  Lecture:
                  <Link
                    to={`/lectures/${lecture.id}`}
                    className="link text-primary ml-1"
                  >
                    {lecture.name}
                  </Link>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  return (
    <div>
      <h1 className="mt-10 text-xl font-bold text-center">
        Feedbacks of user {userId}
      </h1>
      <div className="flex justify-center">
        <div className="text-center border p-7 rounded-md mt-10 mb-20">
          <p className="">No feedbacks available for this user</p>
          <a className="link link-primary" href={"/"}>
            Back to courses
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserFeedbacks;
