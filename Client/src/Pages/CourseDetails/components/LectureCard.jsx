import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectLecture } from "../../../features/lectures/lectureSlice";
import { FiEdit, FiX } from "react-icons/fi";
import React from "react";

const LectureCard = ({ lecture, isOwner }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.user.id);

  const handleViewFeedback = () => {
    // Navigate to the feedback page with the lectureId
    navigate(`/lectures/${lecture.id}`);
  };

  const handleGiveFeedback = () => {
    document.getElementById("feedback_modal").showModal();
    dispatch(selectLecture(lecture));
  };

  const handleDeleteLecture = () => {
    const lectureId = lecture.id;
  };

  const handleEditLecture = () => {
    document.getElementById("edit_lecture_modal").showModal();
  };

  return (
    <>
      <div
        className=" lg:w-96 card card-compact max-h-sm border rounded-md overflow-hidden my-2"
        data-testid="lecture-card"
      >
        <div
          className="card-body rounded bg-base-100 flex flex-row"
          data-testid="lecture-card-body"
        >
          <h2 className="card-title">{lecture.name}</h2>
          <div className="flex-grow"></div>
          {isOwner ? (
            <>
              <button
                className="btn btn-primary btn-sm mb-2 self-end"
                onClick={handleViewFeedback}
              >
                View feedback
              </button>
              <div className="flex flex-row">
                <a
                  className="btn btn-ghost btn-sm mt-2"
                  onClick={handleEditLecture}
                >
                  <FiEdit size={15} />
                </a>
                <a
                  className="btn btn-ghost max-w-sm flex flex-col text-xs"
                  onClick={handleDeleteLecture}
                >
                  delete
                </a>
              </div>
            </>
          ) : (
            <div className="">
              <button
                className="btn btn-primary btn-sm"
                onClick={handleGiveFeedback}
              >
                Give feedback
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

LectureCard.defaultProps = {
  lecture: {
    name: "Lecture 1",
    id: 1,
  },
};

LectureCard.propTypes = {
  lecture: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  }),
};

export default LectureCard;
