import { Avatar } from "./Avatar";
import { FiPlus } from "react-icons/fi";

export const Header = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-200 border-b border-gray-300">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="flex items-center">
        {/* menu buttons */}
        <Avatar />
        {/* Placeholder for user avatar */}
      </div>
    </div>
  );
};

const CourseCard = () => (
  <div className="card w-96 bg-base-100 shadow-xl image-full">
    <figure>
      <img src="https://picsum.photos/400/250" alt="Placeholder" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">Course name</h2>
      <p>Course description</p>
    </div>
  </div>
);

const CourseList = () => (
  <div className="flex gap-4">
    <CourseCard />
    <CourseCard />
    <CourseCard />
    <CourseCard />
    <CourseCard />
  </div>
);

export const CoursesSection = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-semibold">Courses</h2>
          <button className="btn btn-sm p-1">
            <FiPlus className="text-xl justify-self-center" />

            <span className="justify-self-center">New Course</span>
          </button>
        </div>
        <div className="inp">
          <input
            className="p-2 border border-gray-300 rounded-md"
            type="text"
            placeholder="Search courses"
          />
        </div>
      </div>
      <CourseList />
    </div>
  );
};
