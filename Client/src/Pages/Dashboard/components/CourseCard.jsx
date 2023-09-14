import PropTypes from "prop-types";

const CourseCard = ({ course }) => {
  return (
    <div className="card w-80 bg-base-100 shadow-xl image-full">
      <figure>
        <img src={course.image} alt="Placeholder" />
      </figure>
      <div className="card-body">
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
