import { FiX } from "react-icons/fi";
import CourseForm from "./CourseForm";
import { useState } from "react";
import courseService from "../../../services/courseService";
import { useSelector } from "react-redux";

const EditCourseModal = () => {
  const course = useSelector((state) => state.courses.selectedCourse);
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const token = useSelector((state) => state.auth.token);
  const courseId = course.id;

  const handleClose = () => {
    document.getElementById("edit_lecture_modal").close();
  };

  //TODO: courseId sisään dataan?
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      courseName,
      courseDescription,
    };

    console.log(data);

    const editedCourse = await courseService.updateCourse(
      courseId,
      data,
      token
    );
    window.location.reload(false);
    handleClose();
  };

  return (
    <dialog id="edit_course_modal" className="modal">
      <div className="modal-box">
        <div className="relative flex justify-end">
          <h3 className="absolute font-bold text-lg left-0 top-3.5">
            Edit course
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
              save
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
export default EditCourseModal;
