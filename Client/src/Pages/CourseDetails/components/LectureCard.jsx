import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectLecture } from "../../../features/lectures/lectureSlice";

const LectureCard = ({ lecture }, isOwner) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleViewFeedback = () => {
    // Navigate to the feedback page with the lectureId
    navigate(`/lectures/${lecture.id}`);
  };

  const handleGiveFeedback = () => {
    document.getElementById("feedback_modal").showModal();
    dispatch(selectLecture(lecture));
  };

  isOwner = false;

  return (
    <>
      <div
        className="w-full sm:w-70 lg:w-96 card card-compact max-h-sm border rounded-md overflow-hidden shadow-md my-2"
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
              <p className="">{lecture.feedback}</p>
              <button
                className="btn btn-primary btn-sm self-end"
                onClick={handleViewFeedback}
              >
                View feedback
              </button>
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
    feedback: "lecture feedback",
    id: 1,
  },
};

LectureCard.propTypes = {
  lecture: PropTypes.shape({
    name: PropTypes.string,
    feedback: PropTypes.string,
    id: PropTypes.number,
  }),
};

export default LectureCard;
