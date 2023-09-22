import { FiX } from "react-icons/fi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LectureForm from "./components/LectureForm";

const NewLectureModal = () => {
  const [lectureName, setLectureName] = useState("");
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const handleClose = () => {
    setLectureName("");
  };

  //TODO: korjaa ja hae tiedot
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      lectureName,
      //courseId
    };
    //tarvitaan varmaa toi kurssin id myös
    //const newLecture = await lectureService.createLecture(data, token);
    //console.log(newLecture);
    //dispatch(addCourse(newLecture));
  };

  return (
    <dialog id="new_lecture_modal" className="modal">
      <div className="modal-box">
        <div className="relative flex justify-end">
          <h3 className="absolute font-bold text-lg left-0 top-3. mb-2">
            Create Lecture
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
          onSubmit={handleSubmit}
          lectureName={lectureName}
          setLectureName={setLectureName}
        />
        <div className="flex justify-end pt-4">
          <form method="dialog">
            <button
              id={"create_course"}
              className="btn btn-primary"
              onClick={handleSubmit}
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
export default NewLectureModal;
