import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import feedbackService from "../../services/feedbackService";
import { useSelector } from "react-redux";

const LectureDetails = () => {
  const { lectureId } = useParams();
  const [feedback, setFeedback] = useState([]);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    console.log(lectureId);

    const fetchFeedback = async () => {
      try {
        const data = {
          lectureId,
        };
        const feedbacks = await feedbackService.lectureFeedback(data, token);
        setFeedback(feedbacks);
        console.log(feedback);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };
    fetchFeedback();
  }, [lectureId]);

  if (feedback.length > 0) {
    // Calculate the number of good feedback
    const goodfb = feedback.filter(
      (feedback) => feedback.feedbackType === "good"
    ).length;

    const badfb = feedback.filter(
      (feedback) => feedback.feedbackType === "bad"
    ).length;

    const neutralfb = feedback.filter(
      (feedback) => feedback.feedbackType === "neutral"
    ).length;

    // Calculate the total number of feedback
    const totalFeedback = feedback.length;

    // Calculate the percentage of positive feedback
    const percentage = (goodfb / totalFeedback) * 100;
  }

  const handleUserFeedback = (userId) => {
    navigate(`/feedback/${userId}`);
  };

  const openNewFeedbackModal = () => {
    document.getElementById("feedback_modal").showModal();
  };

  //TODO: halutaanko lisää prosentit ja eriteltynbnä mitä feedbackei saanu miten paljon samal taval ku kurssi feedbackis
  if (feedback.length > 0) {
    return (
      <div>
        <h1 className="mt-10 mb-10 text-xl font-bold text-center">
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
              <Link
                to={`/feedback/${feedback.userId}`}
                className="link text-primary"
              >
                User: {feedback.user}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return user.userType === "STUDENT" && feedback ? (
    <div>
      <button onClick={openNewFeedbackModal}>Give feedback</button>
    </div>
  ) : (
    <div className="flex justify-center">
      <div className="text-center border p-7 rounded-md mt-10 mb-20">
        <p className="">No feedbacks available</p>
        <a className="link link-primary" href={"/"}>
          Back to courses
        </a>
      </div>
    </div>
  );
};
export default LectureDetails;
