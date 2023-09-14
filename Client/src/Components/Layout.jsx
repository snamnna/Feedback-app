import { Outlet } from "react-router-dom";
import Header from "./Header";
import NewCourseModal from "../Pages/Dashboard/NewCourseModal";

const Layout = () => {
  return (
    <>
      <NewCourseModal />
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
