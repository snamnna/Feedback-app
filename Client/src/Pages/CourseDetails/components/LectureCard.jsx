import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

//TODO: hae tiedot oikein (lecture ja owner/teacher)
const LectureCard = ({ lecture }) => {
  const navigate = useNavigate();

  const handleViewFeedback = () => {
    // Navigate to the feedback page with the lectureId
    navigate(`/lectures/${lecture.id}`);
  };

  const handleGiveFeedback = () => {
    //TODO: feedback modul tms?
  };

  //TODO: lisää logiikka userin tyypin hakemiseen ja aseta isTeacher sen mukaan
  const isTeacher = false;

  return (
    <div
      className="card card-compact max-h-sm border rounded-md overflow-hidden  my-2"
      data-testid="lecture-card"
    >
      <div
        className="card-body rounded bg-base-100 shadow-md  flex flex-row"
        data-testid="lecture-card-body"
      >
        <h2 className="card-title">{lecture.name}</h2>
        <div className="flex-grow"></div>
        {isTeacher ? (
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
