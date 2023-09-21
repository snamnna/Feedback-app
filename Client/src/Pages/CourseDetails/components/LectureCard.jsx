import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

//TODO: feedbackit prosenteiksi tähän
//TODO: feedback module

const LectureCard = ({ lecture }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    // Navigate to the feedback page with the lectureId
    navigate(`/lectures/${lecture.id}`);
  };

  //TODO: lisää logiikka userin tyypin hakemiseen ja aseta isTeacher sen mukaan
  const isTeacher = false;

  return (
    <div
      className="card card-compact max-h-sm shadow-lg rounded-md overflow-hidden cursor-pointer my-2"
      data-testid="lecture-card"
    >
      <div
        className="card-body rounded bg-base-100 shadow-md opacity-80 flex flex-row"
        data-testid="lecture-card-body"
      >
        <h2 className="card-title">{lecture.name}</h2>
        <div className="flex-grow"></div>
        {isTeacher ? (
          <>
            <p className="">{lecture.feedback}</p>
            <button className="btn btn-sm self-end" onClick={handleClick}>
              View feedback
            </button>
          </>
        ) : (
          <div className="">
            <button className="btn btn-sm">Give feedback</button>
          </div>
        )}
      </div>
    </div>
  );
};

LectureCard.defaultProps = {
  course: {
    name: "Lecture 1",
    feedback: "lecture feedback",
  },
};

LectureCard.propTypes = {
  course: PropTypes.shape({
    name: PropTypes.string,
    feedback: PropTypes.string,
    id: PropTypes.string,
  }),
};

export default LectureCard;
