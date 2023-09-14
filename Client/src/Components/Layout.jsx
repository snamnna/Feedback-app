import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Header></Header>
      <Outlet />
    </>
  );
};

export default Layout;
