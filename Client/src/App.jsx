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
