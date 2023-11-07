import { useDispatch, useSelector } from "react-redux";
import feedbackService from "../../../services/feedbackService";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { setSelectedLecture } from "../../../features/lectures/lectureSlice";
import lectureService from "../../../services/lectureService";
import { PieChart, Pie, Legend } from "recharts";

const OverViewTab = () => {
  const course = useSelector((state) => state.courses.selectedCourse);
  const token = useSelector((state) => state.auth.token);
  const [feedback, setFeedback] = useState([]);
  const [feedbackWithLecture, setFeedbackWithLecture] = useState([]);
  const courseId = course.id;
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [goodfb, setGoodfb] = useState(0);
  const [badfb, setBadfb] = useState(0);
  const [neutralfb, setNeutralfb] = useState(0);
  const [totalFeedback, setTotalFeedback] = useState(0);
  const [positivePercentage, setPositivePercentage] = useState(0);
  const [negativePercentage, setNegativePercentage] = useState(0);

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
    let totalFeedback = 0;
    let positivePercentage = 0;
    let negativePercentage = 0;

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

    totalFeedback = goodfb + badfb + neutralfb;
    positivePercentage = (goodfb / totalFeedback) * 100;
    negativePercentage = (badfb / totalFeedback) * 100;

    setGoodfb(goodfb);
    setBadfb(badfb);
    setNeutralfb(neutralfb);
    setTotalFeedback(totalFeedback);
    setPositivePercentage(positivePercentage);
    setNegativePercentage(negativePercentage);
  };

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const feedbacks = await feedbackService.courseFeedback(courseId, token);
        console.log("fetchaus", feedbacks);
        setFeedback(feedbacks);

        //get lecture details
        const feedbacksWithLecture = [];
        for (const feedback of feedbacks) {
          // Fetch lecture details for each feedback
          const lecture = await lectureService.getLectureById(
            feedback.lectureId,
            token
          );

          //add feedback, lecture, and course to the array
          feedbacksWithLecture.push({ feedback, lecture });
        }

        setFeedbackWithLecture(feedbacksWithLecture);
        // Calculate statistics after updating feedback
        calculateFeedbackStatistics(feedbacks);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };
    fetchFeedback();
  }, [token]);

  if (user.userType === "TEACHER" || user.userType === "ADMIN") {
    if (feedback.length > 0) {
      return (
        <div className="flex items-center justify-center p-10">
          <div className="border rounded-sm max-w-2xl text-center p-10 mx-2">
            <div className="flex flex-col justify-between h-full">
              <h1 className="text-xl font-bold">Statistics:</h1>
              <PieChart width={400} height={200}>
                <Pie
                  dataKey="students"
                  outerRadius={80}
                  data={[
                    { name: "GREAT", students: goodfb, fill: "green" },
                    { name: "BAD", students: badfb, fill: "red" },
                    {
                      name: "NEUTRAL",
                      students: neutralfb,
                      fill: "yellow",
                    },
                  ]}
                />
                <Legend
                  content={<CustomLegend />}
                  align="right"
                  verticalAlign="middle"
                  layout="vertical"
                />
              </PieChart>
              <h1 className="mt-10 text-lg font-bold text-center">
                List of feedbacks
              </h1>
              <ul>
                {feedbackWithLecture.map(({ feedback, lecture }, index) => (
                  <li
                    className="border rounded-md max-w-2xl p-3 my-5 mx-auto text-center"
                    key={index}
                  >
                    <h3>Type: {feedback.feedbackType}</h3>
                    <p>Comment: {feedback.comment}</p>
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
        </div>
      );
    } else {
      return (
        <div className="flex justify-center">
          <p className="border p-7 rounded-md mt-10 mb-20">No feedbacks yet</p>
        </div>
      );
    }
  } else {
    return (
      <div className="flex justify-center">
        <p className="border p-7 rounded-md mt-10 mb-20">
          You are not a teacher or admin!!
        </p>
      </div>
    );
  }
};

export default OverViewTab;
