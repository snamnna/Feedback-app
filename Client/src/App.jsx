import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import PrivateRoute from "./PrivateRoute";
import Layout from "./Components/Layout";
import CourseDetails from "./Pages/CourseDetails/CourseDetails";
import LectureDetails from "./Pages/LectureDetails/LectureDetails";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        {/*public*/}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/*private*/}
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<Home />} />

          {/*courses*/}
          <Route path="/courses/:courseId">
            <Route index element={<CourseDetails />} />
          </Route>
        </Route>

        {/*Lectures*/}
        <Route path={"/lectures/:lectureId"}>
          <Route index element={<LectureDetails />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<h1>404</h1>} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
