import { FiPlus } from "react-icons/fi";
import CourseCard from "./CourseCard";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const CoursesSection = () => {
  const courses = useSelector((state) => state.courses.courses);
  const userType = useSelector((state) => state.auth.user.userType);
  const [search, setSearch] = useState("");
  const [isTeacher, setIsTeacher] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const allCourses = useSelector((state) => state.courses.allCourses);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const navigate = useNavigate();
  const handleAdminClick = () => {
    navigate("/admin");
  };

  const filterCourses = allCourses.filter((course) =>
    course.name.toLowerCase().includes(search.toLowerCase())
  );

  // set teacher to true if usertype is teacher
  useEffect(() => {
    if (userType === "TEACHER") {
      setIsTeacher(true);
    } else if (userType === "ADMIN") {
      setIsAdmin(true);
    } else {
      setIsTeacher(false);
      setIsAdmin(false);
    }
  }, [userType]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setShowAllCourses(true); // Show all courses when searching
  };

  return (
    <div>
      <div className="px-10 py-3 flex justify-between items-center bg-base-100 opacity-90">
        <div className="text-2xl font-semibold">
          My Courses
          {isTeacher && (
            <button
              className="btn btn-xs btn-primary shadow-md m-0 px-1.5 py-1 box-content text-sm ml-4"
              onClick={() =>
                document.getElementById("new_course_modal").showModal()
              }
            >
              <FiPlus size={20} />
              <span>New Course</span>
            </button>
          )}
          {isAdmin && (
            <button
              className="btn btn-xs btn-primary shadow-md m-0 px-1.5 py-1 box-content text-sm ml-4"
              onClick={handleAdminClick}
            >
              <span>Admin panel</span>
            </button>
          )}
        </div>
        <input
          className="border border-gray-300 rounded-md shadow-md"
          type="text"
          placeholder="Search from all courses"
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <p className="ml-10 mb-5">
        Find new courses and enroll to them by searching the course by name and
        clicking the course.
      </p>

      <CourseList courses={showAllCourses ? filterCourses : courses} />
    </div>
  );
};

const CourseList = ({ courses }) => {
  const navigate = useNavigate();
  const handleClick = (courseId) => {
    // redirect to course details page
    navigate(`/courses/${courseId}`);
  };

  return (
    <ul className="grid grid-cols-1 md:grid-cols-3 mx-7">
      {courses.map((course, index) => (
        <li className="p-3" key={index} onClick={() => handleClick(course.id)}>
          <CourseCard key={index} course={course} />
        </li>
      ))}
    </ul>
  );
};

CourseList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
    })
  ),
};
