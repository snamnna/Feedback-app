import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import feedbackService from "../../services/feedbackService";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedLecture } from "../../features/lectures/lectureSlice";
import lectureService from "../../services/lectureService";

const LectureDetails = () => {
  const { lectureId } = useParams();
  const [feedback, setFeedback] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const [lecture, setLecture] = useState({});

  useEffect(() => {
    console.log(lectureId);
    const fetchFeedback = async () => {
      try {
        const data = {
          lectureId,
        };
        const feedbacks = await feedbackService.lectureFeedback(data, token);
        console.log(feedbacks);

        setFeedback([...feedbacks]);

        const lecture = await lectureService.getLectureById(lectureId, token);
        console.log("lecture", lecture);
        setLecture(lecture);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };
    fetchFeedback();
  }, [token]);

  if (user.userType === "TEACHER" && feedback.length > 0) {
    // Calculate the number of good feedback
    const goodfb = feedback.filter(
      (feedback) => feedback.feedbackType === "GREAT"
    ).length;

    const badfb = feedback.filter(
      (feedback) => feedback.feedbackType === "BAD"
    ).length;

    const neutralfb = feedback.filter(
      (feedback) => feedback.feedbackType === "NEUTRAL"
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
    dispatch(setSelectedLecture(lectureId));
    document.getElementById("feedback_modal").showModal();
  };

  //TODO: halutaanko lisää prosentit ja eriteltynbnä mitä feedbackei saanu miten paljon samal taval ku kurssi feedbackis
  if (user.userType === "TEACHER") {
    return feedback.length > 0 ? (
      <div>
        <h1 className="mt-10 mb-10 text-xl font-bold text-center">
          List of feedbacks for lecture: {lecture.name}
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
                User: {feedback.userId}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <div className="flex justify-center">
        <h1 className="border p-7 rounded-md mt-10 mb-20">No feedbacks yet</h1>
      </div>
    );
  }

  return user.userType === "STUDENT" && !feedback[0] ? (
    <div className="flex justify-center">
      <button
        className="border p-7 rounded-md mt-10 mb-20"
        onClick={openNewFeedbackModal}
      >
        Give feedback
      </button>
    </div>
  ) : (
    <div className="flex justify-center">
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
              User: {feedback.userId}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default LectureDetails;
