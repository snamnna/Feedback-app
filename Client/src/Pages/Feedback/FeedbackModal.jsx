import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { BsEmojiSmile, BsEmojiNeutral } from "react-icons/bs";
import { RiEmotionUnhappyLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import feedbackService from "../../services/feedbackService";

const FeedbackModal = () => {
  const [feedback, setFeedback] = useState("");
  const [comment, setComment] = useState("");
  const userId = useSelector((state) => state.auth.user.id);
  //const lecture = useSelector((state) => state.lectures.selectedLecture);
  //const lectureId = lecture.selectedLecture.id;
  //TODO: korjaa slice toimimaan
  const lectureId = 2;

  if (comment.length > 64) setComment(comment.slice(0, 64));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (feedback) {
      const data = {
        feedback,
        comment,
        userId,
        lectureId,
      };

      console.log("sending", data);

      const newFeedback = await feedbackService.newFeedback(data);
      console.log(newFeedback);
    }
  };

  const handleClose = () => {
    setFeedback("");
  };

  const FeedbackButton = ({ icon, feedbackType }) => {
    const buttonStyle = {
      borderRadius: "50%",
      fontSize: "1rem",
      padding: "3px",
      cursor: "pointer",
      width: "50px",
      height: "50px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:
        feedbackType === "good"
          ? "green"
          : feedbackType === "neutral"
          ? "yellow"
          : "red",
      color: "black",
      boxShadow:
        feedback === feedbackType ? "0 0 10px rgba(0,0,0,0.4)" : "none",
    };

    return (
      <button style={buttonStyle} onClick={() => setFeedback(feedbackType)}>
        {icon}
      </button>
    );
  };

  return (
    <dialog id="feedback_modal" className="modal">
      <div className="modal-box">
        <div className="relative flex justify-end">
          <h3 className="absolute font-bold text-lg left-0 top-3 mb-2">
            Give Feedback to the lecture
          </h3>
          <div onClick={handleClose}>
            <form method="dialog">
              <button className="btn btn-square btn-ghost btn-xs">
                <FiX size={20} />
              </button>
            </form>
          </div>
        </div>
        <div className="form-control w-full max-w-lg">
          <div className="flex flex-row justify-evenly my-7">
            <FeedbackButton
              icon={<BsEmojiSmile className="flex" />}
              feedbackType="good"
            />
            <FeedbackButton icon={<BsEmojiNeutral />} feedbackType="neutral" />
            <FeedbackButton
              icon={<RiEmotionUnhappyLine />}
              feedbackType="bad"
            />
          </div>
          <p className="m-2 text-center">Give a comment (optional)</p>
          <input
            type="text"
            placeholder="comment"
            className="input w-full max-w-lg input-bordered"
            autoFocus={true}
            onChange={(e) => setComment(e.target.value)}
          />
          <span className="label-text-alt mt-2">
            {`${comment.length || 0} / 64`}
          </span>
          {feedback && (
            <div className="flex justify-center mt-5">
              <button className="btn btn-primary " onClick={handleSubmit}>
                Send
              </button>
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default FeedbackModal;
