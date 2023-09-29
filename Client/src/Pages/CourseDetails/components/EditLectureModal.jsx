import { FiX } from "react-icons/fi";
import { useState } from "react";
import courseService from "../../../services/courseService";
import { useSelector } from "react-redux";
import lectureService from "../../../services/lectureService";
import LectureForm from "./LectureForm";

const EditLectureModal = () => {
  //TODO: selected lecture ei toimi ku slice ei toimi

  //hetkellinen placeholder lecture:

  const lecture = {
    id: 1,
    name: "nimi",
  };

  // const lecture = useSelector((state) => state.lectures.selectedLecture);
  const [lectureName, setLectureName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const token = useSelector((state) => state.auth.token);
  const lectureId = lecture.id;

  const handleClose = () => {};

  //TODO: courseId sisään dataan?
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      lectureName,
    };
    console.log(data);
    const editedLecture = await lectureService.updateLecture(
      lectureId,
      data,
      token
    );
    console.log(editedLecture);
    document.getElementById("edit_lecture_modal").close();
  };

  return (
    <dialog id="edit_lecture_modal" className="modal">
      <div className="modal-box">
        <div className="relative flex justify-end">
          <h3 className="absolute font-bold text-lg left-0 top-3.5">
            Edit Lecture
          </h3>
          <div onClick={handleClose}>
            <form method={"dialog"}>
              <button className="btn btn-square btn-ghost btn-xs">
                <FiX size={20} />
              </button>
            </form>
          </div>
        </div>

        <LectureForm
          lectureName={lectureName}
          setLectureName={setLectureName}
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
export default EditLectureModal;
