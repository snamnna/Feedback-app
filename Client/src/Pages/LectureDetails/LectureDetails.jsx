import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import feedbackService from "../../services/feedbackService";

const LectureDetails = () => {
  const { lectureId } = useParams();
  const [feedback, setFeedback] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(lectureId);

    const fetchFeedback = async () => {
      try {
        const feedbacks = await feedbackService.lectureFeedback(lectureId);
        setFeedback(feedbacks);
        console.log(feedback);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };
    fetchFeedback();
  }, [lectureId]);

  const phfeedbacks = [
    {
      type: "good",
      comment: "Great lecture! I learned a lot.",
      user: "John Doe",
      id: 1,
    },
    {
      type: "bad",
      comment: "The lecture was too long and hard to follow.",
      user: "Jane Smith",
      id: 1,
    },
    {
      type: "good",
      comment: "It would be helpful to have more examples in the lecture.",
      user: "Alice Johnson",
      id: 2,
    },
    {
      type: "neutral",
      comment: "The content was well-organized and easy to understand.",
      user: "Bob Wilson",
      id: 3,
    },
    {
      type: "bad",
      comment: "The audio quality was poor, and it was difficult to hear.",
      user: "Emily Davis",
      id: 4,
    },
    {
      type: "bad",
      comment: "It would be beneficial to include quizzes for self-assessment.",
      user: "Michael Brown",
      id: 4,
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

  const handleUserFeedback = (userId) => {
    navigate(`/feedback/${userId}`);
  };

  return (
    <div>
      <h1 className="mt-10 mb-10 text-xl font-bold text-center">
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
            {/*TODO: navigoi sivulle jossa userin antamat feedbackit*/}
            <Link to={`/feedback/${feedback.id}`} className="link text-primary">
              User: {feedback.user}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default LectureDetails;
