import { useEffect, useState } from "react";
import { useGetCourseByIdQuery } from "../../features/courseApi";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import LectureCard from "./components/LectureCard";
import { useSelector } from "react-redux";
import courseService from "../../services/courseService";
import { FiPlus } from "react-icons/fi";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [search, setSearch] = useState("");
  const [enrollmentStatus, setEnrollmentStatus] = useState("APPROVED"); //VÄLIAIKASESTI APPROVED TÄÄLLÄ KUN EI VIELÄ TOIMI
  const token = useSelector((state) => state.auth.token);
  const { data, error, isLoading } = useGetCourseByIdQuery(courseId);
  const [lectures, setLectures] = useState([]);
  const [courseEnrollment, setCourseEnrollment] = useState([]);

  const placeholderLectures = [
    {
      id: 1,
      name: "lecture 1",
      feedback: "bad",
    },
    {
      id: 2,
      name: "lecture 2",
      feedback: "bad",
    },
    {
      id: 3,
      name: "lecture 3",
      feedback: "bad",
    },
    {
      id: 4,
      name: "lecture 4",
      feedback: "bad",
    },
    {
      id: 5,
      name: "lecture 5",
      feedback: "bad",
    },
  ];

  //get data needed
  useEffect(() => {
    if (data) {
      console.log(data);
      const { course, enrollment, lectures } = data;
      setCourse(course);
      setLectures(lectures);
      setCourseEnrollment(enrollment);

      console.log("debug:", courseEnrollment);
    }
  }, [data]);

  //yritetään tehä jotai ownerin selvitystä en tiiä miten sen sais kunnol :D
  let isOwner = true;
  //lmao mist saan ton useridn oon taas hukas xD
  /*if(course.lecturerId === userId){
    isOwner = true;
  }
*/
  //Filter lectures
  const filterLectures = placeholderLectures.filter((lecture) =>
    lecture.name.toLowerCase().includes(search.toLowerCase())
  );

  //enrolling to a course
  const handleEnroll = async () => {
    const enrolldata = {
      EnrollmentStatus: "APPROVED",
    };
    const enroll = await courseService.courseEnrollment(
      courseId,
      enrolldata,
      token
    );
    console.log(enroll);
    //TODO: joku viesti et on tehty pyyntö ja sit joku systeemi et ei voi pyytää montaa kertaa et pääsis kurssille
    // ja pitäs varmaa navigoida johonki sit kans
  };

  const openModal = () => {
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
      <div className="bg-secondary ">
        <div className="flex justify-between px-10 py-3 bg-base-100 shadow-md opacity-80">
          <div className="flex flex-row ">
            <h1 className="my-2 text-xl font-bold">
              Lectures for course {course.name}
            </h1>
            {/*If the user is the owner of the course add lectures option*/}
            {isOwner ? (
              <button
                className="btn btn-xs mt-1 px-1.5 py-1 box-content text-sm ml-4"
                onClick={() => openModal()}
              >
                <FiPlus size={20} />
                <span>Add lecture</span>
              </button>
            ) : null}
          </div>
          <input
            className="border border-gray-300 rounded-md"
            type="text"
            placeholder="Search Lectures"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <LectureList lectures={filterLectures} />
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

const LectureList = ({ lectures }) => {
  return (
    <div>
      <ul className="flex flex-col mt-3">
        {lectures.map((lecture) => (
          <li className="mx-10" key={lecture.id}>
            <LectureCard lecture={lecture} />
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
