import { Outlet } from "react-router-dom";
import React from "react";
import Header from "./Components/Header";

const Layout = () => {
  return (
    <>
      <Header></Header>
      <Outlet />
    </>
  );
};

export default Layout;
