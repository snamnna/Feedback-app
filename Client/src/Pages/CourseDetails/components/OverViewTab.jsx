//import React, { useEffect, useState } from "react";
//import feedbackService from "../../../services/feedbackService";
import { useSelector } from "react-redux";

const OverViewTab = () => {
  const course = useSelector((state) => state.courses.selectedCourse);
  //const [feedback, setFeedback] = useState({});
  const courseId = course.id;

  const phfeedbacks = [
    {
      type: "good",
      comment: "Great lecture! I learned a lot.",
      user: "John Doe",
      lectureId: 1,
    },
    {
      type: "bad",
      comment: "The lecture was too long and hard to follow.",
      user: "Jane Smith",
      lectureId: 2,
    },
    {
      type: "good",
      comment: "It would be helpful to have more examples in the lecture.",
      user: "Alice Johnson",
      lectureId: 3,
    },
    {
      type: "neutral",
      comment: "The content was well-organized and easy to understand.",
      user: "Bob Wilson",
      lectureId: 4,
    },
    {
      type: "bad",
      comment: "The audio quality was poor, and it was difficult to hear.",
      user: "Emily Davis",
      lectureId: 5,
    },
    {
      type: "bad",
      comment: "It would be beneficial to include quizzes for self-assessment.",
      user: "Michael Brown",
      lectureId: 6,
    },
  ];

  // Calculate the number of good feedback
  const goodfb = phfeedbacks.filter(
    (feedback) => feedback.type === "good"
  ).length;

  const badfb = phfeedbacks.filter(
    (feedback) => feedback.type === "bad"
  ).length;

  const neutralfb = phfeedbacks.filter(
    (feedback) => feedback.type === "neutral"
  ).length;

  // Calculate the total number of feedback
  const totalFeedback = phfeedbacks.length;

  // Calculate the percentage of positive feedback
  const percentage = (goodfb / totalFeedback) * 100;

  /*
  useEffect(() => {
    console.log(courseId);

    const fetchFeedback = async () => {
      try {
        const feedbacks = await feedbackService.courseFeedback(courseId);
        setFeedback(feedbacks);
        console.log(feedback);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };
    fetchFeedback();
  }, [courseId]);*/

  return (
    <div className="grid grid-cols-2 m-5">
      <div className="border rounded-sm max-w-2xl text-center p-10 mx-2">
        <div className="flex flex-col justify-between h-full">
          <h1 className="text-xl font-bold">Statistics:</h1>
          <div className="border rounded-md p-5">
            <h1 className="text-xl font-bold">
              Overall % of positive feedback for the whole course:
            </h1>
            <p>{percentage}</p>
          </div>
          <div className="border rounded-md  p-5">
            <h1 className="text-xl font-bold">Good feedbacks:</h1>
            <p>{goodfb}</p>
          </div>
          <div className="border rounded-md  p-5">
            <h1 className="text-xl font-bold">Neutral feedbacks:</h1>
            <p>{neutralfb}</p>
          </div>
          <div className="border rounded-md  p-5">
            <h1 className="text-xl font-bold">Bad feedbacks:</h1>
            <p>{badfb}</p>
          </div>
          <div className="border rounded-md  p-5">
            <h1 className="text-xl font-bold">Total amount of feedbacks:</h1>
            <h1 className="font-bold text-lg">{totalFeedback}</h1>
          </div>
        </div>
      </div>
      <div className="overflow-y-auto flex-col border rounded-sm p-10 mx-2">
        <h1 className="mb-10 text-xl font-bold text-center">
          List of feedbacks
        </h1>
        <ul>
          {phfeedbacks.map((feedback, index) => (
            <li
              className="border rounded-md max-w-2xl p-3 my-5 mx-auto text-center"
              key={index}
            >
              <h3>Type: {feedback.type}</h3>
              <p>Comment: {feedback.comment}</p>
              <p>Lecture ID: {feedback.lectureId}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default OverViewTab;
