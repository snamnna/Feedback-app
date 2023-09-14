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
import Layout from "./Components/Layout";
import Dashboard from "./Pages/Dashboard/Dashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        {/*public*/}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/*private*/}
        <Route path="home" element={<PrivateRoute />}>
          <Route index element={<Home />} />
          <Route path="newcourse" element={<NewCourse />} />
        </Route>
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
