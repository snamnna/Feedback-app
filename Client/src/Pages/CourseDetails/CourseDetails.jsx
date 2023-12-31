import React, { useEffect, useState } from "react";
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
import EnrollmentTab from "./components/EnrollmentTab";
import { useNavigate } from "react-router-dom";
import feedbackService from "../../services/feedbackService";

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
  const [enrollmentStatus, setEnrollmentStatus] = useState("");
  const [enrollBtn, setEnrollBtn] = useState(true);
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState([]);

  //get data needed
  useEffect(() => {
    if (data) {
      console.log(data);
      const { course, enrollment } = data;
      setCourse(course);
      setLectures(course.lectures);
      setEnrollments(course.enrollments);
      dispatch(selectCourse(course));

      if (enrollment) {
        console.log(enrollment.status);
        setEnrollmentStatus(enrollment.status);
      } else {
        console.log("enrollmentStatus is null ");
        setEnrollmentStatus("");
      }

      //set isOwner to true if user is the owner of the course
      if (course.lecturerId === userId) {
        setIsOwner(true);
      }
    }
  }, [data]);

  //enrolling to a course
  const handleEnroll = async () => {
    const data = {
      courseId,
    };
    const enroll = await courseService.courseEnrollment(data, token);
    if (enroll) {
      console.log("enrollment success");
      setEnrollBtn(false);
    }
  };

  //Filter lectures
  const filterLectures = lectures.filter((lecture) =>
    lecture.name.toLowerCase().includes(search.toLowerCase())
  );

  //muista implementoida samalla tavalla kun on tehty enrollment tabissa (status rejected)
  //TODO: toteuta
  const handleLeave = async () => {
    try {
      const data = {
        courseId,
        userId,
        status: "REJECTED",
      };
      const response = await courseService.acceptEnrollment(data, token);

      setEnrollBtn(true);
      console.log("Left the course:", response);
    } catch (error) {
      console.error("Leaving the course failed:", error);
    }
  };

  //delete course
  const handleDelete = async () => {
    //check if there is feedback
    const courseFeedbackExists = await feedbackService.courseFeedback(
      courseId,
      token
    );

    console.log("haetaan feedbackit jos on" + courseFeedbackExists);

    //if feedback, alert and return
    if (courseFeedbackExists.length > 0) {
      alert("Cannot delete course with existing feedback");
      return;
    }

    const deleteCourse = await courseService.deleteCourse(courseId, token);
    console.log(deleteCourse);
    navigate("/");
  };

  //Show lectures if enrollmentStatus is approved
  if (enrollmentStatus === "APPROVED") {
    return (
      <div className="">
        <div className="flex justify-between px-10 py-3 bg-base-100 ">
          <div className="flex flex-row ">
            <h1 className="my-2 text-xl font-bold">
              Details for {course.name}
            </h1>
            {!isOwner && enrollmentStatus === "APPROVED" && (
              <button
                id="leaveCourse"
                className="ml-2 mt-1 btn btn-primary btn-sm"
                onClick={() => handleLeave()}
              >
                Leave the course
              </button>
            )}
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
                    Feedback
                  </a>
                  <a
                    onClick={() => setActive("pa")}
                    className={`tab ${active === "pa" ? "tab-active" : ""}`}
                  >
                    Participants
                  </a>
                  <a
                    onClick={() => setActive("en")}
                    className={`tab ${active === "en" ? "tab-active" : ""}`}
                  >
                    Enrollments
                  </a>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          {!isOwner && (
            <div>
              <input
                className="border border-gray-300 shadow-md rounded-md ml-2"
                type="text"
                placeholder="Search Lectures"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          )}
          {isOwner && active === "le" && (
            <div>
              <input
                className=" border border-gray-300 shadow-md rounded-md"
                type="text"
                placeholder="Search Lectures"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          )}
        </div>
        {isOwner && active === "le" && (
          <div className="flex justify-center max-w-full">
            <LectureList lectures={filterLectures} isOwner={isOwner} />
          </div>
        )}
        {!isOwner && (
          <div className="flex w-2xl ">
            <LectureList lectures={filterLectures} isOwner={isOwner} />
          </div>
        )}
        {/* Overview active */}
        {isOwner && active === "ow" && <OverViewTab />}
        {/* Participants tab active */}
        {isOwner && active === "pa" && <ParticipantsTab />}
        {/* Enroll tab active */}
        {isOwner && active === "en" && <EnrollmentTab />}
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
          id="req-btn"
          className="btn btn-primary my-2"
        >
          Request to join the course
        </button>
      </div>
    </div>
  );
};

const LectureList = ({ lectures }) => {
  const course = useSelector((state) => state.courses.selectedCourse);
  const userId = useSelector((state) => state.auth.user.id);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (course.lecturerId === userId) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, [course.lecturerId, userId]);
  if (lectures.length > 0) {
    return (
      <div className="">
        <h1 className="text-center font-bold">Lectures:</h1>
        <div className="flex justify-center items-center w-screen ">
          <ul className="mt-3 mb-5">
            {lectures.map((lecture) => (
              <li className="mx-10 w-full" key={lecture.id}>
                <LectureCard lecture={lecture} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center w-screen my-20">
      <div className="mx-auto border py-7 px-10 rounded-md text-center">
        <p>No lectures yet</p>
        {isOwner && (
          <button
            className="btn btn-sm btn-primary mt-3"
            onClick={() =>
              document.getElementById("new_lecture_modal").showModal()
            }
          >
            New lecture
          </button>
        )}
      </div>
    </div>
  );
};

LectureList.propTypes = {
  lectures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};

export default CourseDetails;
