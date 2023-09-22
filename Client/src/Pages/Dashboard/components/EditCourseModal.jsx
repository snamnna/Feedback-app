import { FiX } from "react-icons/fi";
import CourseForm from "./CourseForm";
import { useState } from "react";
import courseService from "../../../services/courseService";

const EditCourseModal = (course) => {
  //TODO: hae aiempi nimi ja kuvaus ja aseta ne initial stateksi (varmaan parametreina, pitää varmaan sit antaa ne renderöinnin
  // yhteydessä? eli show modal eri taval course details? nyt vaan tyhjä jotta formista ei tulis error
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  //todo: hae kurssin id

  const handleClose = () => {
    setCourseName("");
    setCourseDescription("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handlesubmit");
    const data = {
      courseName,
      courseDescription,
    };
    const editedCourse = await courseService.updateCourse(course.id, data);
    console.log(editedCourse);
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
