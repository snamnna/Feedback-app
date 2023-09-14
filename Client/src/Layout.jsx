import { Outlet } from "react-router-dom";
import React from "react";
import Header from "./Components/Header";

const Layout = () => {
  return (
    <>
      <Header></Header>
      {/*TODO: joku perus navbar header tms*/}
      <Outlet />
    </>
  );
};

export default Layout;
