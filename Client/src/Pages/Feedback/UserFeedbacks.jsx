import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import feedbackService from "../../services/feedbackService";

const UserFeedbacks = () => {
  const [feedback, setFeedback] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const user = useParams();
  const userId = user.userId;

  useEffect(() => {
    console.log(userId);

    const fetchFeedback = async () => {
      try {
        const feedbacks = await feedbackService.userFeedback(userId, token);
        setFeedback(feedbacks);
        console.log(feedback);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };
    fetchFeedback();
  }, [userId]);

  //TODO: hae feedbackien kurssit ja luennot jne nyt heitin veikkauksen, en tiiä toimiiko oikeesti tai sit näkyy vaa mitö antanu

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
              <h3>Type: {feedback.type}</h3>
              <p>Comment: {feedback.comment}</p>
              {/*TOimiiks näin? ei varmaa*/}
              <p>Lecture: {feedback.lecture.name}</p>
              <p>Course: {feedback.lecture.course.name}</p>
            </li>
          ))}
        </ul>
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
