import { useEffect, useState } from "react";
import { useGetCourseByIdQuery } from "../../features/courseApi";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import LectureCard from "./components/LectureCard";
import { useSelector } from "react-redux";
import courseService from "../../services/courseService";
import { FiEdit, FiPlus, FiX } from "react-icons/fi";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [search, setSearch] = useState("");
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.user.id);
  const [lectures, setLectures] = useState([]);
  const { data, error, isLoading } = useGetCourseByIdQuery(courseId);
  const [isOwner, setIsOwner] = useState(false);

  const [courseEnrollment, setCourseEnrollment] = useState([]);
  const [enrollmentStatus, setEnrollmentStatus] = useState("APPROVED"); //VÄLIAIKASESTI APPROVED TÄÄLLÄ KUN EI VIELÄ TOIMI

  //get data needed
  useEffect(() => {
    if (data) {
      console.log(data);
      const { course } = data;
      setCourse(course);
      setLectures(course.lectures);
      setCourseEnrollment(course.enrollments);

      //set isOwner to true if user is the owner of the course
      if (course.lecturerId === userId) {
        // setIsOwner(true);
      }
    }
  }, [data]);

  //TODO: tarkista onko käyttäjä jo enrolled enrollmentsista.

  //enrolling to a course
  //TODO:viimeistele ja korjaa
  const handleEnroll = async () => {
    const enroll = await courseService.courseEnrollment(courseId, token);
    if (enroll) {
      //TODO: joku viesti et on tehty pyyntö ja sit joku systeemi et ei voi pyytää montaa kertaa et pääsis kurssille
      // ja pitäs varmaa navigoida johonki sit kans
    }
  };

  //Filter lectures
  const filterLectures = lectures.filter((lecture) =>
    lecture.name.toLowerCase().includes(search.toLowerCase())
  );
  //leave course

  const handleLeave = async () => {
    //TODO: poistu kurssilta, miten hoituu?
  };

  //delete course
  const handleDelete = async () => {
    const deleteCourse = await courseService.deleteCourse(courseId);
    console.log(deleteCourse);
  };

  //edit course
  const handleOpenEditModal = async () => {
    //TODO: korjaa toimivaksi, pitäs pystyy antaa kurssi parametrina/propsina
    const editModal = document.getElementById("edit_course_modal");
    if (editModal) {
      editModal.showModal();
    } else {
      console.log("edit modal not found");
    }
  };

  //new lecture
  const openNewLectureModal = () => {
    //TODO:tällekkin pitäis antaa curssin id
    const lectureModal = document.getElementById("new_lecture_modal");
    if (lectureModal) {
      lectureModal.showModal();
    } else {
      console.error("Modal element not found");
    }
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
            {/*If the user is the owner of the course add lectures option*/}
            {isOwner ? (
              <>
                <div className="dropdown">
                  <label tabIndex={0} className="btn btn-ghost ml-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block w-5 h-5 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                      ></path>
                    </svg>
                  </label>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <a onClick={() => openNewLectureModal()}>
                        <FiPlus size={20} />
                        Add lecture
                      </a>
                    </li>
                    <li>
                      <a onClick={() => handleDelete()}>
                        <FiX size={20} />
                        Delete course
                      </a>
                    </li>
                    <li>
                      <a onClick={() => handleOpenEditModal()}>
                        <FiEdit size={20} />
                        Edit Course
                      </a>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <button
                className="ml-2 mt-1 btn btn-primary btn-sm"
                onClick={() => handleLeave()}
              >
                Leave the course
              </button>
            )}
          </div>
          <input
            className="border border-gray-300 shadow-md rounded-md"
            type="text"
            placeholder="Search Lectures"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <LectureList lectures={filterLectures} isOwner={isOwner} />
      </div>
    );
  }
  return (
    <div className="mx-10 flex flex-col items-center justify-center h-full ">
      <p className="text-lg">You are not yet enrolled in course</p>
      <h1 className=" text-2xl font-bold">{course.name}</h1>
      <h2 className="text-md font-bold">Description:</h2>
      <p className="italic">{course.description}</p>
      <button onClick={() => handleEnroll()} className="btn btn-primary my-2">
        Request to join the course
      </button>
    </div>
  );
};

const LectureList = ({ lectures }, isOwner) => {
  return (
    <div>
      <ul className="flex flex-col mt-3 mb-5">
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
