import PropTypes from "prop-types";

//TODO: feedbackit prosenteiksi tähän

const LectureCard = ({ lecture }) => {
  return (
    <div
      className="card card-compact max-h-sm shadow-lg rounded-md overflow-hidden cursor-pointer my-2"
      data-testid="lecture-card"
    >
      <div
        className="card-body rounded bg-secondary-content shadow-inner"
        data-testid="lecture-card-body"
      >
        <h2 className="card-title">{lecture.name}</h2>
        <p>{lecture.feedback}</p>
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
  }),
};

export default LectureCard;
