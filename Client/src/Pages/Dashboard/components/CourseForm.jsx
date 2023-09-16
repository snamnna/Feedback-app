import PropTypes from "prop-types";

const CourseForm = ({
  onSubmit,
  courseName,
  setCourseName,
  courseDescription,
  setCourseDescription,
}) => {
  if (courseDescription.length > 160)
    setCourseDescription(courseDescription.slice(0, 160));

  if (courseName.length > 64) setCourseName(courseName.slice(0, 64));

  return (
    <form
      className="form-control w-full max-w-lg"
      onSubmit={onSubmit}
      data-testid="course-form"
    >
      {/*  course name */}
      <label className="label">
        <span className="label-text">Course name</span>
      </label>
      <input
        id={"course_name"}
        type="text"
        placeholder="name"
        className="input w-full max-w-lg input-bordered"
        value={courseName}
        autoFocus={true}
        onChange={(e) => setCourseName(e.target.value)}
      />
      <label className="label m-0">
        <div></div>
        <span className="label-text-alt">{`${
          courseName.length || 0
        } / 64`}</span>
      </label>

      {/*  course description */}
      <label className="label">
        <span className="label-text">Description</span>
      </label>
      <textarea
        id={"course_description"}
        className="textarea textarea-bordered max-h-24 resize-none"
        placeholder="Description"
        value={courseDescription}
        onChange={(e) => setCourseDescription(e.target.value)}
      ></textarea>
      <label className="label mt-0">
        <div></div>
        <span className="label-text-alt">{`${
          courseDescription.length || 0
        } / 160`}</span>
      </label>

      {/*  Create button */}
      <div className="flex justify-end pt-4">
        <button
          id={"create_course"}
          className="btn btn-primary"
          onClick={onSubmit}
        >
          Create
        </button>
      </div>
    </form>
  );
};

CourseForm.propTypes = {
  onSubmit: PropTypes.func,
  courseName: PropTypes.string,
  setCourseName: PropTypes.func,
  courseDescription: PropTypes.string,
  setCourseDescription: PropTypes.func,
};

export default CourseForm;
