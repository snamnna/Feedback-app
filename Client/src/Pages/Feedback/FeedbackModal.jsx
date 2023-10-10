import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { BsEmojiSmile, BsEmojiNeutral } from "react-icons/bs";
import { RiEmotionUnhappyLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import feedbackService from "../../services/feedbackService";

const FeedbackModal = () => {
  const [feedbackType, setFeedbackType] = useState("");
  const [comment, setComment] = useState("");
  const token = useSelector((state) => state.auth.token);
  const lectureId = useSelector((state) => state.lectures.selectedLecture);

  if (comment.length > 160) setComment(comment.slice(0, 160));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (feedbackType) {
      const data = {
        feedbackType,
        comment,
        lectureId,
      };

      console.log("sending", data, token);

      const newFeedback = await feedbackService.newFeedback(data, token);
      console.log(newFeedback);
      document.getElementById("feedback_modal").close();
    }
  };

  const handleClose = () => {
    setFeedbackType("");
    document.getElementById("feedback_modal").close();
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
        feedbackType === "GREAT"
          ? "green"
          : feedbackType === "NEUTRAL"
          ? "yellow"
          : "red",
      color: "black",
    };

    return (
      <button style={buttonStyle} onClick={() => setFeedbackType(feedbackType)}>
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
              feedbackType="GREAT"
              selectedFeedbackType={feedbackType}
            />
            <FeedbackButton
              icon={<BsEmojiNeutral />}
              feedbackType="NEUTRAL"
              selectedFeedbackType={feedbackType}
            />
            <FeedbackButton
              icon={<RiEmotionUnhappyLine />}
              feedbackType="BAD"
              selectedFeedbackType={feedbackType}
            />
          </div>
          <p className="m-2 text-center">You have selected {feedbackType}</p>
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
          {feedbackType && (
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
