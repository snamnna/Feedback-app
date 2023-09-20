import { FiPlus } from "react-icons/fi";
import CourseCard from "./CourseCard";
import PropTypes from "prop-types";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const CoursesSection = () => {
  const courses = useSelector((state) => state.courses);
  const [search, setSearch] = useState("");

  const filterCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-secondary h-screen flex flex-col overflow-hidden">
      <div className=" px-10 py-3 flex justify-between items-center bg-base-100 shadow-md">
        <div className="text-2xl font-semibold">
          Courses
          <button
            className="btn btn-xs m-0 px-1.5 py-1 box-content text-sm ml-4"
            onClick={() =>
              document.getElementById("new_course_modal").showModal()
            }
          >
            <FiPlus size={20} />
            <span>New Course</span>
          </button>
        </div>
        <input
          className="border border-gray-300 rounded-md"
          type="text"
          placeholder="Search courses"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <CourseList courses={filterCourses} />
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
    <ul className="grid grid-cols-3 mx-7">
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
