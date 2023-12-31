import PropTypes from "prop-types";

const CourseCard = ({ course }) => {
  return (
    <div
      className=" card card-compact h-auto rounded-md border cursor-pointer max-w-3l mx-auto aspect-h-4 aspect-w-10 "
      data-testid="course-card"
    >
      <div
        className="card-body rounded bg-base-100 shadow-md "
        data-testid="course-card-body"
      >
        <h1 className="font-bold text-md text-center">{course.name}</h1>
        <p className="text-center">{course.description}</p>
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
