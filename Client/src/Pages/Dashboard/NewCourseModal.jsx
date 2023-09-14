import { FiX } from "react-icons/fi";
import { useState } from "react";
import courseService from "../../services/courseService";
import * as PropTypes from "prop-types";

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
    <form className="form-control w-full max-w-lg" onSubmit={onSubmit}>
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

const NewCourseModal = () => {
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");

  const handleClose = () => {
    setCourseName("");
    setCourseDescription("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      courseName,
      courseDescription,
    };

    try {
      const newCourse = await courseService.createCourse(data);
      console.log(newCourse);

      // TODO: implement courseSlice to update state
      // TODO: add new course to the state
    } catch (error) {
      console.error("course creation failed:", error);
      throw error;
    }
  };

  return (
    <dialog id="new_course_modal" className="modal">
      <div className="modal-box">
        <div className="relative flex justify-end">
          <h3 className="absolute font-bold text-lg left-0 top-3.5">
            Create Course
          </h3>
          <div onClick={handleClose}>
            <form method={"dialog"}>
              <button className="btn btn-square btn-ghost btn-xs">
                <FiX size={20} />
              </button>
            </form>
          </div>
        </div>

        <CourseForm
          onSubmit={handleSubmit}
          courseDescription={courseDescription}
          setCourseDescription={setCourseDescription}
          courseName={courseName}
          setCourseName={setCourseName}
        />
      </div>

      <form method="dialog" className="modal-backdrop" onClick={handleClose}>
        <button>close</button>
      </form>
    </dialog>
  );
};

export default NewCourseModal;
