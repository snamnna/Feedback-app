import { useDispatch, useSelector } from "react-redux";
import feedbackService from "../../../services/feedbackService";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { setSelectedLecture } from "../../../features/lectures/lectureSlice";
import lectureService from "../../../services/lectureService";

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

          //add feedback, lecture and course to array
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
        <div className="grid grid-cols-1 sm:grid-cols-2 m-5">
          <div className="border rounded-sm max-w-2xl text-center p-10 mx-2">
            <div className="flex flex-col justify-between h-full">
              <h1 className="text-xl font-bold">Statistics:</h1>
              <div className="border rounded-md my-2 p-5">
                <h1 className="text-xl ">% of positive feedback:</h1>
                <p>{positivePercentage}</p>
              </div>
              <div className="border rounded-md my-2 p-5">
                <h1 className="text-xl ">% of negative feedback:</h1>
                <p>{negativePercentage}</p>
              </div>
              <div className="border rounded-md mb-[0.125rem]  p-5">
                <h1 className="text-lg ">Good feedbacks:</h1>
                <p>{goodfb}</p>
              </div>
              <div className="border rounded-md mb-2 p-5">
                <h1 className="text-lg ">Neutral feedbacks:</h1>
                <p>{neutralfb}</p>
              </div>
              <div className="border rounded-md mb-2 p-5">
                <h1 className="text-lg ">Bad feedbacks:</h1>
                <p>{badfb}</p>
              </div>
              <div className="border rounded-md mb-2 p-5">
                <h1 className="text-lg ">Total amount of feedbacks:</h1>
                <h1 className="text-lg">{totalFeedback}</h1>
              </div>
            </div>
          </div>
          <div className="overflow-y-auto flex-col border rounded-sm p-10 mx-2">
            <h1 className="mb-10 text-lg font-bold text-center">
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
          You are not teacher!!
        </p>
      </div>
    );
  }
};
export default OverViewTab;
