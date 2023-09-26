import React from "react";
import { FiPlus, FiEdit, FiX } from "react-icons/fi";

const DropdownMenu = ({ onAddLecture, onEditCourse, onDeleteCourse }) => {
  return (
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
          <a onClick={onAddLecture}>
            <FiPlus size={20} />
            Add lecture
          </a>
        </li>
        <li>
          <a onClick={onEditCourse}>
            <FiEdit size={20} />
            Edit Course
          </a>
        </li>
        <li>
          <a onClick={onDeleteCourse}>
            <FiX size={20} />
            Delete course
          </a>
        </li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
