import PropTypes from "prop-types";

const CourseCard = ({ course }) => {
  return (
    <div
      className="card card-compact h-full shadow-lg rounded-md overflow-hidden cursor-pointer max-w-lg mx-auto aspect-h-3 aspect-w-10"
      data-testid="course-card"
    >
      <div className="card-image">
        <img className="object-cover" src={course.image} alt={course.name} />
      </div>
      <div
        className="card-body rounded bg-secondary-content shadow-inner"
        data-testid="course-card-body"
      >
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
