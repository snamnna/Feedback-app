import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser, deleteUser } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import DelConf from "./components/deleteConfirmationPopUp";

const UserDetails = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const error = useSelector((state) => state.auth.error);
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confPwd, setConfPwd] = useState("");
  const navigate = useNavigate();
  const [showDelConf, setShowDelConf] = useState("");

  const handleEditUser = () => {
    if (newName && newPassword && confPwd) {
      if (newPassword === confPwd) {
        dispatch(editUser(user.id, newName, newPassword, token));
        setNewName("");
        setNewPassword("");
        setConfPwd("");
      } else {
        alert("Passwords do not match!");
      }
    } else {
      alert("Please fill in both new name and password.");
    }
  };

  const handleDeleteUser = () => {
    setShowDelConf(true);
  };

  const handleConfDel = () => {
    dispatch(deleteUser(user.id, token));
    navigate("/login");
  };

  const handleCancelDel = () => {
    setShowDelConf(false);
  };

  return (
    <div className="w-screen flex justify-center items-center p-10">
      <div className="px-20 py-5  bg-white opacity-70 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4 flex justify-center">
          User settings
        </h1>
        <div>
          {error && <p>Error: {error}</p>}
          <form className="flex flex-col items-center">
            <div className="mb-6">
              <input
                className="border border-gray-300 shadow-md rounded-md"
                type="text"
                id="newName"
                name="newName"
                autoComplete="off"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
                placeholder="New username*"
              />
            </div>

            <div className="mb-6">
              <input
                className="border border-gray-300 shadow-md rounded-md"
                type="password"
                id="newPassword"
                name="newPassword"
                autoComplete="off"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="New password*"
              />
            </div>

            <div className="mb-6">
              <input
                className="border border-gray-300 shadow-md rounded-md"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                autoComplete="off"
                value={confPwd}
                onChange={(e) => setConfPwd(e.target.value)}
                required
                placeholder="Confirm password*"
              />
            </div>

            <div className="flex justify-center mb-6">
              <button
                type="button"
                onClick={handleEditUser}
                className="btn btn-xs btn-primary shadow-md"
              >
                <span>Edit User</span>
              </button>
            </div>

            <div className="flex justify-center mb-6">
              <button
                type="button"
                onClick={handleDeleteUser}
                className="btn btn-xs btn-primary shadow-md"
              >
                <span>Delete User</span>
              </button>
            </div>
          </form>
          {showDelConf && (
            <DelConf onCancel={handleCancelDel} onConfirm={handleConfDel} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
