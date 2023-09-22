import { Outlet } from "react-router-dom";
import Header from "./Header";
import NewCourseModal from "../Pages/Dashboard/NewCourseModal";
import Footer from "./Footer";
import NewLectureModal from "../Pages/CourseDetails/NewLectureModal";
import EditCourseModal from "../Pages/Dashboard/components/EditCourseModal";

const Layout = () => {
  return (
    <>
      <NewCourseModal />
      <NewLectureModal />
      <EditCourseModal />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
