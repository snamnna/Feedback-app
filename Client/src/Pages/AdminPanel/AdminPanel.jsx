import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserByUsername, editUserType } from "../../features/user/userSlice";

const AdminPanel = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [newUserType, setNewUserType] = useState("");
  const token = useSelector((state) => state.auth.token);
  const data = useSelector((state) => state.user.data);

  const handleUserSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleBtnClick = async () => {
    dispatch(getUserByUsername(search, token));
  };

  const handleUserTypeChange = (e) => {
    setNewUserType(e.target.value);
  };

  const handleSubmitClick = async () => {
    dispatch(editUserType(data.id, newUserType, token));
    alert("User type changed successfully!");
  };

  return (
    <div className="w-screen flex justify-center items-center pb-5 mt-10 ">
      <div className="px-20 py-5 mb-10 rounded-lg border">
        <h1 className="text-2xl font-semibold mb-4 flex justify-center">
          User Search
        </h1>
        <div className="mb-6">
          <input
            className="border border-gray-300 shadow-md rounded-md"
            type="text"
            id="user-search"
            onChange={handleUserSearch}
            placeholder="Search by username"
          />
          <div className="text-center mb-5 p-4">
            <button
              id="search-btn"
              className="btn btn-sm btn-primary shadow-md"
              type="button"
              onClick={handleBtnClick}
            >
              {"Search"}
            </button>
          </div>
        </div>
        {data && (
          <div>
            <div className="mb-6">
              <strong>User ID:</strong> {JSON.stringify(data.id)}
            </div>
            <div className="mb-6">
              <strong>Username:</strong>{" "}
              {JSON.stringify(data.username).replace(/["]+/g, "")}
            </div>
            <select
              id="role-select"
              className="mx-2 mt-3 select select-bordered justify-center"
              defaultValue={data.userType}
              onChange={handleUserTypeChange}
            >
              <option value="STUDENT">Student</option>
              <option value="TEACHER">Teacher</option>
              <option value="ADMIN">Admin</option>
            </select>
            <button
              id="role-sbmt-btn"
              className="btn btn-sm btn-primary shadow-md"
              type="button"
              onClick={handleSubmitClick}
            >
              {"Submit"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
