import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../features/user/userSlice";
import { editUser } from "../../services/userServices";

const UserDetails = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [newName, setNewName] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const userRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: newName,
      password: newPwd,
    };
    const userRes = await editUser(user.id, data, token);
    console.log(data);
    console.log("update success", userRes);
    dispatch(updateUser({ username: newName }));
    if (userRes) {
      setNewName("");
    }
  };

  return (
    <div className="w-screen flex justify-center items-center p-10">
      <div className="px-20 py-5  bg-white opacity-70 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4 flex justify-center">
          User settings
        </h1>
        <form onSubmit={handleSubmit}>
          {/*<div className="mb-6">
            <input
              className="border border-gray-300 shadow-md rounded-md"
              type="text"
              placeholder="Old username*"
            />
          </div>*/}

          <div className="mb-6">
            <input
              className="border border-gray-300 shadow-md rounded-md"
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setNewName(e.target.value)}
              value={newName}
              required
              placeholder="New username*"
            />
          </div>
          <div className="flex justify-center mb-6">
            <button className="btn btn-xs btn-primary shadow-md">
              <span>Edit Username</span>
            </button>
          </div>
        </form>
        <form>
          <div className="mb-6">
            <input
              className="border border-gray-300 shadow-md rounded-md"
              type="text"
              placeholder="Old password*"
            />
          </div>
          <div className="mb-6">
            <input
              className="border border-gray-300 shadow-md rounded-md"
              type="text"
              placeholder="New password*"
            />
          </div>
          <div className="mb-6">
            <input
              className="border border-gray-300 shadow-md rounded-md"
              type="text"
              placeholder="Repeat a new password*"
            />
          </div>
          <div className="flex justify-center mb-6">
            <button className="btn btn-xs btn-primary shadow-md">
              <span>Edit password</span>
            </button>
          </div>
          <div className="flex justify-center mb-6">
            <button className="btn btn-xs btn-primary shadow-md">
              <span>Delete account</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDetails;
