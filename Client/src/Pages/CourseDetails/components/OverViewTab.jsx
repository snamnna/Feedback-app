import { useDispatch, useSelector } from "react-redux";
import feedbackService from "../../../services/feedbackService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { setSelectedLecture } from "../../../features/lectures/lectureSlice";

const OverViewTab = () => {
  const course = useSelector((state) => state.courses.selectedCourse);
  const token = useSelector((state) => state.auth.token);
  const [feedback, setFeedback] = useState({});
  const courseId = course.id;
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  let goodfb;
  let badfb;
  let neutralfb;
  let percentage;
  let totalFeedback;

  useEffect(() => {
    console.log(courseId);

    const fetchFeedback = async () => {
      try {
        const feedbacks = await feedbackService.courseFeedback(courseId, token);
        console.log("fedbackit:", feedbacks.feedback.lectures[0].feedback);
        setFeedback(feedbacks.feedback.lectures[0].feedback);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };
    fetchFeedback();
  }, [token]);

  if (user.userType === "TEACHER" && feedback.length > 0) {
    console.log(feedback);
    // Calculate the number of good feedback
    goodfb = feedback.filter(
      (feedback) => feedback.feedbackType === "GREAT"
    ).length;

    badfb = feedback.filter(
      (feedback) => feedback.feedbackType === "BAD"
    ).length;

    neutralfb = feedback.filter(
      (feedback) => feedback.feedbackType === "NEUTRAL"
    ).length;

    // Calculate the total number of feedback
    totalFeedback = feedback.length;

    // Calculate the percentage of positive feedback
    percentage = (goodfb / totalFeedback) * 100;
  }

  if (user.userType === "TEACHER") {
    return feedback.length > 0 ? (
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
            {feedback.map((feedback, index) => (
              <li
                className="border rounded-md max-w-2xl p-3 my-5 mx-auto text-center"
                key={index}
              >
                <h3>Type: {feedback.feedbackType}</h3>
                <p>Comment: {feedback.comment}</p>
                <p>Lecture ID: {feedback.lectureId}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ) : (
      <div className="flex justify-center">
        <h1 className="mt-10 mb-10 text-xl font-bold text-center">
          No feedbacks yet
        </h1>
      </div>
    );
  }
};
export default OverViewTab;
