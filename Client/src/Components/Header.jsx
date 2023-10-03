import React, { useState, useEffect } from "react";
import { resetAuth } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "../Pages/Dashboard/components/Avatar";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

const Header = () => {
  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = !!token;
  const dispatch = useDispatch();
  const handleLogout = () => dispatch(resetAuth());

  // track whether the screen size is small
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  //  check screen size and update state
  const checkScreenSize = () => {
    setIsSmallScreen(window.innerWidth <= 768); // Adjust the screen size breakpoint as needed
  };

  // Add an event listener to check screen size on mount and resize
  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  // Render the dropdown menu items
  const dropdownItems = (
    <>
      <li className="border-b border-accent">
        <a href="/">Home</a>
      </li>
    </>
  );

  //render the avatar if authenticated
  const avatar = isAuthenticated ? (
    <Link to={`/user`}>
      <Avatar />
    </Link>
  ) : null;

  // Render the logout button based on screen size
  const logout = isSmallScreen ? (
    <>
      <li className="border-b border-accent">
        <a onClick={handleLogout}>Log out </a>
      </li>
    </>
  ) : null;

  return (
    <div className="navbar bg-secondary">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost">
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-secondary rounded-box w-52"
          >
            {isAuthenticated ? dropdownItems : null}
            {isAuthenticated && isSmallScreen ? logout : null}
            {!isAuthenticated ? (
              <>
                <li className="border-b border-accent">
                  <a href="/login">Login</a>
                </li>
                <li className="border-b border-accent">
                  <a href="/register">Register</a>
                </li>
                {/* rest of the not authenticated menu-items */}
              </>
            ) : null}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-xl" href="/">
          FeedbackApp
        </a>
      </div>
      <div className="navbar-end">
        {isAuthenticated && !isSmallScreen ? (
          <>
            <button className="btn mx-2 btn-ghost" onClick={handleLogout}>
              Log out
            </button>
            {/* rest of the authenticated items in the end navbar */}
          </>
        ) : null}
        {avatar}
      </div>
    </div>
  );
};

export default Header;
