import React from "react";
import { resetAuth } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "../Pages/Dashboard/components/Avatar";

const Header = () => {
  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = !!token;
  const dispatch = useDispatch();

  const handleLogout = () => dispatch(resetAuth());

  const dropdown = (
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
      </label>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 rounded-box w-52"
      >
        {isAuthenticated ? (
          <>
            <li>
              <a href="/">Home</a>
            </li>
            {/* Rest of the authenticated menu items */}
          </>
        ) : (
          <>
            <li>
              <a href="/login">Login</a>
            </li>
            <li>
              <a href="/register">Register</a>
            </li>
            {/* not authenticated menu-items */}
          </>
        )}
        <li>
          <a href="#">About</a>
        </li>
      </ul>
    </div>
  );

  return (
    <div className="navbar bg-base-300">
      <div className="navbar-start">{dropdown}</div>
      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-xl" href="/">
          FeedbackApp
        </a>
      </div>
      <div className="navbar-end">
        {isAuthenticated ? (
          <>
            <button className="btn mx-2 btn-ghost" onClick={handleLogout}>
              Log out
            </button>
            <Avatar />
            {/* rest of the authenticated items in the end navbar */}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
