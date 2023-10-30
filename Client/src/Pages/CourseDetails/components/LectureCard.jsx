import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedLecture } from "../../../features/lectures/lectureSlice";
import { FiEdit, FiX } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import lectureService from "../../../services/lectureService";
import feedbackService from "../../../services/feedbackService";

const LectureCard = ({ lecture }) => {
  const lectureId = lecture.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.user.id);
  const course = useSelector((state) => state.courses.selectedCourse);
  const [isOwner, setIsOwner] = useState(false);
  const [hasGivenFeedback, setHasGivenFeedback] = useState(false);

  useEffect(() => {
    if (course.lecturerId === userId) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, [course.lecturerId, userId]);

  useEffect(() => {
    const data = {
      lectureId,
      userId,
    };

    feedbackService
      .checkUserFeedbackExists(data, token)
      .then((result) => {
        setHasGivenFeedback(result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [lectureId, userId, token]);

  const handleViewFeedback = () => {
    // Navigate to the feedback page with the lectureId
    navigate(`/lectures/${lecture.id}`);
  };

  const handleGiveFeedback = () => {
    document.getElementById("feedback_modal").showModal();
    dispatch(setSelectedLecture(lecture.id));
  };

  const handleDeleteLecture = async () => {
    const deleteLecture = await lectureService.deleteLecture(lectureId, token);
    console.log(deleteLecture);
    if (deleteLecture) {
      window.location.reload(false);
    }
  };

  const handleEditLecture = () => {
    document.getElementById("edit_lecture_modal").showModal();
  };

  return (
    <>
      <div
        className="card card-compact max-h-sm border rounded-md  my-2"
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
            <div className="flex justify-center items-center">
              {hasGivenFeedback ? (
                <button
                  className="btn btn-primary btn-sm"
                  disabled={true} // Disable the button
                >
                  Give feedback
                </button>
              ) : (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={handleGiveFeedback}
                >
                  Give feedback
                </button>
              )}
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
