import { FiPlus } from "react-icons/fi";
import CourseCard from "./CourseCard";
import PropTypes from "prop-types";
import { useState } from "react";

const placeholderCourses = [
  {
    name: "Course 1",
    description: "Course description",
    image: "https://picsum.photos/400/250",
  },
  {
    name: "Course 2",
    description: "Course description",
    image: "https://picsum.photos/400/250",
  },
  {
    name: "Course 3",
    description: "Course description",
    image: "https://picsum.photos/400/250",
  },
  {
    name: "Course 4",
    description: "Course description",
    image: "https://picsum.photos/400/250",
  },
  {
    name: "Course 5",
    description: "Course description",
    image: "https://picsum.photos/400/250",
  },
];

export const CoursesSection = () => {
  const [search, setSearch] = useState("");

  const filterCourses = placeholderCourses.filter((course) =>
    course.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full overflow-hidden p-4">
      <div className="flex justify-between items-center pb-2">
        <div className="text-2xl font-semibold mb-4">
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
          className="p-2 border border-gray-300 rounded-md"
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

const CourseList = ({ courses }) => (
  <div className="flex h-full relative overflow-hidden">
    <div className="grid w-full col-auto row-auto gap-4 grid-flow-col">
      {courses.map((course, index) => (
        <CourseCard key={index} course={course} />
      ))}
    </div>
  </div>
);

CourseList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
    })
  ),
};
