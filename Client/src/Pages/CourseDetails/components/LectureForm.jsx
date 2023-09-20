import PropTypes from "prop-types";

const LectureForm = ({ onSubmit, lectureName, setLectureName }) => {
  if (lectureName.length > 64) setLectureName(lectureName.slice(0, 64));

  return (
    <form className="form-control w-full max-w-lg" onSubmit={onSubmit}>
      {/*Lecture Name*/}
      <label className="label">
        <span className="label-text">Lecture Name</span>
      </label>
      <input
        id={"lecture_name"}
        type="text"
        placeholder="name"
        className="input w-full max-w-lg input-bordered"
        value={lectureName}
        autoFocus={true}
        onChange={(e) => setLectureName(e.target.value)}
      />
      <label className="label m-0">
        <div></div>
        <span className="label-text-alt">{`${
          lectureName.length || 0
        } / 64`}</span>
      </label>
    </form>
  );
};

LectureForm.prototypes = {
  onSubmit: PropTypes.func,
  lectureName: PropTypes.string,
  setLectureName: PropTypes.func,
};
export default LectureForm;
