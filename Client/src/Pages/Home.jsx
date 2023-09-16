import { Button } from "antd";
import { useDispatch } from "react-redux";
import Dashboard from "./Dashboard/Dashboard";
import { resetAuth } from "../features/auth/authSlice";

const Home = () => {
  const dispatch = useDispatch();
  const handleLogout = () => dispatch(resetAuth());

  return (
    <>
      <Dashboard />
      <Button onClick={handleLogout}>Log out</Button>
    </>
  );
};

export default Home;
