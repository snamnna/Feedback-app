import { Outlet } from "react-router-dom";
import Header from "./Header";
import NewCourseModal from "../Pages/Dashboard/NewCourseModal";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <NewCourseModal />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
