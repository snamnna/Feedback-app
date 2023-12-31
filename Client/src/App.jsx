import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import PrivateRoute from "./PrivateRoute";
import Layout from "./Components/Layout";
import CourseDetails from "./Pages/CourseDetails/CourseDetails";
import LectureDetails from "./Pages/LectureDetails/LectureDetails";
import UserDetails from "./Pages/UserDetails/UserDetails";
import UserFeedbacks from "./Pages/Feedback/UserFeedbacks";
import AdminPanel from "./Pages/AdminPanel/AdminPanel";

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

          {/*Lectures*/}
          <Route path={"/lectures/:lectureId"}>
            <Route index element={<LectureDetails />} />
          </Route>

          {/*User*/}
          <Route path={"/user"}>
            <Route index element={<UserDetails />} />
          </Route>

          {/*Feedback*/}
          <Route path={"/feedback/:userId"}>
            <Route index element={<UserFeedbacks />} />
          </Route>

          {/*Admin*/}
          <Route path={"/admin"}>
            <Route index element={<AdminPanel />} />
          </Route>
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
