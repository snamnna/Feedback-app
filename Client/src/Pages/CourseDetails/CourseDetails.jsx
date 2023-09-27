import { useEffect, useState } from "react";
import { useGetCourseByIdQuery } from "../../features/courseApi";
import { useParams } from "react-router";
import PropTypes from "prop-types";
import LectureCard from "./components/LectureCard";
import { useDispatch, useSelector } from "react-redux";
import courseService from "../../services/courseService";
import { selectCourse } from "../../features/courses/courseSlice";
import DropdownMenu from "./components/DropdownMenu";
import OverViewTab from "./components/OverViewTab";
import ParticipantsTab from "./components/ParticipantsTab";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [search, setSearch] = useState("");
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.user.id);
  const [lectures, setLectures] = useState([]);
  const { data, error, isLoading } = useGetCourseByIdQuery(courseId);
  const [isOwner, setIsOwner] = useState(false);
  const dispatch = useDispatch();
  const [active, setActive] = useState("le");
  const [enrollmentStatus, setEnrollmentStatus] = useState("APPROVED"); //VÄLIAIKASESTI APPROVED TÄÄLLÄ KUN EI VIELÄ TOIMI
  const [enrollBtn, setEnrollBtn] = useState(true);

  //get data needed
  useEffect(() => {
    if (data) {
      console.log(data);
      const { course, enrollment } = data;
      setCourse(course);
      setLectures(course.lectures);
      //setEnrollmentStatus(enrollment);
      console.log("enrollment: ", enrollment);
      dispatch(selectCourse(course));

      //set isOwner to true if user is the owner of the course
      if (course.lecturerId === userId) {
        setIsOwner(true);
      }
    }
  }, [data]);

  //enrolling to a course
  const handleEnroll = async () => {
    const enroll = await courseService.courseEnrollment(courseId, token);
    if (enroll) {
      console.log("enrollment success");
      setEnrollBtn(false);
    }
  };

  //Filter lectures
  const filterLectures = lectures.filter((lecture) =>
    lecture.name.toLowerCase().includes(search.toLowerCase())
  );

  //leave course
  //TODO: toteuta
  const handleLeave = async () => {};

  //delete course
  const handleDelete = async () => {
    const deleteCourse = await courseService.deleteCourse(courseId);
    console.log(deleteCourse);
  };

  //Show lectures if enrollmentStatus is approved
  if (enrollmentStatus === "APPROVED") {
    return (
      <div className="">
        <div className="flex justify-between px-10 py-3 bg-base-100 ">
          <div className="flex flex-row ">
            <h1 className="my-2 text-xl font-bold">
              Details for course {course.name}
            </h1>
            {isOwner ? (
              <>
                <DropdownMenu
                  onAddLecture={() =>
                    document.getElementById("new_lecture_modal").showModal()
                  }
                  onEditCourse={() =>
                    document.getElementById("edit_course_modal").showModal()
                  }
                  onDeleteCourse={() => handleDelete()}
                />
                <div className=" mb-3 tabs">
                  <a
                    onClick={() => setActive("le")}
                    className={`tab ${active === "le" ? "tab-active " : ""}`}
                  >
                    Lectures
                  </a>
                  <a
                    onClick={() => setActive("ow")}
                    className={`tab ${active === "ow" ? "tab-active" : ""}`}
                  >
                    Feedback Overview
                  </a>
                  <a
                    onClick={() => setActive("pa")}
                    className={`tab ${active === "pa" ? "tab-active" : ""}`}
                  >
                    Participants
                  </a>
                </div>
              </>
            ) : (
              <>
                <button
                  className="ml-2 mt-1 btn btn-primary btn-sm"
                  onClick={() => handleLeave()}
                >
                  Leave the course
                </button>
                <input
                  className="border border-gray-300 shadow-md rounded-md"
                  type="text"
                  placeholder="Search Lectures"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <LectureList lectures={filterLectures} isOwner={isOwner} />
              </>
            )}
          </div>
          {/*LectureTab is active*/}
          {active === "le" && (
            <input
              className="border border-gray-300 shadow-md rounded-md"
              type="text"
              placeholder="Search Lectures"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          )}
        </div>
        {active === "le" && (
          <div className="flex justify-center">
            <LectureList lectures={filterLectures} isOwner={isOwner} />
          </div>
        )}
        {/*Overview active*/}
        {active === "ow" && <OverViewTab />}
        {/*participants tab active*/}
        {active === "pa" && (
          <div>
            <p>Tänne participants</p>
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="flex justify-center max-w-screen">
      <div className="my-10 max-w-xl border rounded-md py-10 px-16 text-center">
        <p className="text-lg">You are not yet enrolled in course</p>
        <h1 className=" text-2xl font-bold">{course.name}</h1>
        <h2 className="text-md font-bold">Description:</h2>
        <p className="italic">{course.description}</p>
        <button
          onClick={() => handleEnroll()}
          className="btn btn-primary my-2"
          disabled={enrollBtn}
        >
          Request to join the course
        </button>
      </div>
    </div>
  );
};

const LectureList = ({ lectures }, isOwner) => {
  return (
    <div>
      <ul className="mt-3 mb-5">
        {lectures.map((lecture) => (
          <li className="mx-10" key={lecture.id}>
            <LectureCard lecture={lecture} isOwner={isOwner} />
          </li>
        ))}
      </ul>
    </div>
  );
};

LectureList.propTypes = {
  lectures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      feedback: PropTypes.string.isRequired,
    })
  ),
};

export default CourseDetails;
