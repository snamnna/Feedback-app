import { FiX } from "react-icons/fi";
import { useState } from "react";
import courseService from "../../services/courseService";
import { useDispatch, useSelector } from "react-redux";
import CourseForm from "./components/CourseForm";
import { addCourse } from "../../features/courses/courseSlice";

const NewCourseModal = () => {
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

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
    dispatch(addCourse(newCourse));
  };

  //TODO: modal ei sulkeudu jos buttoniin lisää onClickiin ton handlesubmitin mut ei kutsu handlesubmittii onsubmitil

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
          courseDescription={courseDescription}
          setCourseDescription={setCourseDescription}
          courseName={courseName}
          setCourseName={setCourseName}
          onSubmit={handleSubmit}
        />
        <div className="flex justify-end pt-4">
          <form method="dialog">
            <button
              id={"create_course"}
              className="btn btn-primary"
              type="submit"
              onClick={handleSubmit}
              onSubmit={handleSubmit}
            >
              Create
            </button>
          </form>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop" onClick={handleClose}>
        <button>close</button>
      </form>
    </dialog>
  );
};

export default NewCourseModal;
