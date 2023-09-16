import PropTypes from "prop-types";

const CourseCard = ({ course }) => {
  return (
    <div
      className="card w-80 bg-base-100 shadow-xl image-full"
      data-testid="course-card"
    >
      <figure>
        <img src={course.image} alt="Placeholder" data-testid="course-image" />
      </figure>
      <div className="card-body" data-testid="course-card-body">
        <h2 className="card-title">{course.name}</h2>
        <p>{course.description}</p>
      </div>
    </div>
  );
};

CourseCard.defaultProps = {
  course: {
    name: "Course 1",
    description: "Course description",
    image: "https://picsum.photos/400/250",
  },
};

CourseCard.propTypes = {
  course: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
  }),
};

export default CourseCard;
