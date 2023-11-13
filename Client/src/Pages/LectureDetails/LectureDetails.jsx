import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import feedbackService from "../../services/feedbackService";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedLecture } from "../../features/lectures/lectureSlice";
import lectureService from "../../services/lectureService";
import { PieChart, Pie, Legend } from "recharts";

const LectureDetails = () => {
  const { lectureId } = useParams();
  const [feedback, setFeedback] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const [lecture, setLecture] = useState({});
  const [canGiveFeedback, setCanGiveFeedback] = useState(true);
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

        const userHasGivenFeedback = feedbacks.some(
          (feedback) => feedback.userId === user.id
        );

        setCanGiveFeedback(!userHasGivenFeedback);
        calculateFeedbackStatistics(feedbacks);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };
    fetchFeedback();
  }, [token]);
  const calculateFeedbackStatistics = (feedbacks) => {
    console.log("calculating feedback statistics...");
    console.log("feedbacks: ", feedbacks);
    let goodfb = 0;
    let badfb = 0;
    let neutralfb = 0;
    let totalFeedback = 0;

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

    setGoodfb(goodfb);
    setBadfb(badfb);
    setNeutralfb(neutralfb);
    setTotalFeedback(totalFeedback);
  };

  const openNewFeedbackModal = () => {
    dispatch(setSelectedLecture(lectureId));
    document.getElementById("feedback_modal").showModal();
  };

  return (
    <div className="flex items-center justify-center p-10">
      <div className="border rounded-sm max-w-2xl text-center p-10 mx-2">
        <h1 className="mt-10 mb-10 text-xl font-bold text-center">
          Feedback Statistics for Lecture: {lecture.name}
        </h1>
        {user.userType === "TEACHER" || user.userType === "ADMIN" ? (
          feedback.length > 0 ? (
            <div>
              <div className="flex justify-center">
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
              </div>
              <h1 className="text-xl font-bold text-center">
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
                      User: {feedback.userId}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="flex justify-center">
              <h1 className="border p-7 rounded-md mt-10 mb-20">
                No feedbacks yet
              </h1>
            </div>
          )
        ) : user.userType === "STUDENT" && canGiveFeedback ? (
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
            <h1 className="text-xl font-bold text-center">List of feedbacks</h1>
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
        )}
      </div>
    </div>
  );
};

export default LectureDetails;
