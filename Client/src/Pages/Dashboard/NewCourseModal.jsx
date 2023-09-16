import { FiX } from "react-icons/fi";
import { useState } from "react";
import courseService from "../../services/courseService";
import * as PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { CourseForm } from "./components/CourseForm";

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
  const token = useSelector((state) => state.auth.token);

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

    const newCourse = await courseService.createCourse(data, token);
    console.log(newCourse);

    // TODO: implement courseSlice to update state
    // TODO: add new course to the state
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
