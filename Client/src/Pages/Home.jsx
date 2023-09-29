import { useDispatch, useSelector } from "react-redux";
import Dashboard from "./Dashboard/Dashboard";
import { resetAuth } from "../features/auth/authSlice";
import { useGetUserCoursesQuery } from "../features/userApi";
import { useGetAllCoursesQuery } from "../features/courseApi";
import { setAllCourses, setCourses } from "../features/courses/courseSlice";
import { useEffect } from "react";

const Home = () => {
  const userId = useSelector((state) => state.auth.user.id);
  const {
    data: userCourses,
    isLoading: userCoursesLoading,
    isError: userCoursesError,
  } = useGetUserCoursesQuery(userId);
  const {
    data: allCourses,
    isLoading: allCoursesLoading,
    isError: allCoursesError,
  } = useGetAllCoursesQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (allCourses && !allCoursesLoading && !allCoursesError) {
      const allCoursesArray = Object.keys(allCourses).map(
        (key) => allCourses[key]
      );
      dispatch(setAllCourses(allCoursesArray));
    }

    if (userCourses && !userCoursesLoading && !userCoursesError) {
      const userCoursesArray = Object.keys(userCourses).map(
        (key) => userCourses[key]
      );
      dispatch(setCourses(userCoursesArray));
    }
  }, [
    allCourses,
    allCoursesLoading,
    allCoursesError,
    userCourses,
    userCoursesLoading,
    userCoursesError,
    dispatch,
  ]);

  return (
    <>
      <Dashboard />
    </>
  );
};

export default Home;
