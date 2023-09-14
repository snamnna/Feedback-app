import React, { useState } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NewCourse from "./Pages/NewCourse";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />} />
      {/*public*/}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      {/*private*/}
      <Route path="/" element={<PrivateRoute />}>
        <Route path="home" element={<Home />} />
        <Route path="newcourse" element={<NewCourse />} />
      </Route>
    </Route>
  )
);

function App({ routes }) {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
