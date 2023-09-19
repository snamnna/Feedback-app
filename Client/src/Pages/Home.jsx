import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "./Dashboard/Dashboard";
import { resetAuth } from "../features/auth/authSlice";
import { useGetUserCoursesQuery } from "../features/userApi";
import { setCourses } from "../features/courses/courseSlice";
import { useEffect } from "react";

const Home = () => {
  const userId = useSelector((state) => state.auth.user.id);
  const { data: courses, isLoading, isError } = useGetUserCoursesQuery(userId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (courses && !isLoading && !isError) {
      const coursesArray = Object.keys(courses).map((key) => courses[key]);
      dispatch(setCourses(coursesArray));
    }
  }, [courses, isLoading, isError, dispatch]);

  return (
    <>
      <Dashboard />
    </>
  );
};

export default Home;
