import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser, deleteUser } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import DelConf from "./components/deleteConfirmationPopUp";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%+]).{6,24}$/;

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

  const [validName, setValidName] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [validMatch, setValidMatch] = useState(false);

  useEffect(() => {
    setValidName(USER_REGEX.test(newName));
  }, [newName]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(newPassword));
    setValidMatch(newPassword === confPwd);
  }, [newPassword, confPwd]);

  const handleEditUser = () => {
    if (validName && validPwd && validMatch) {
      if (newPassword === confPwd) {
        dispatch(editUser(user.id, newName, newPassword, token));
        setNewName("");
        setNewPassword("");
        setConfPwd("");
      } else {
        alert("Passwords do not match!");
      }
    } else {
      alert(
        "Please fill in both new name and password and ensure they meet the requirements."
      );
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
                className={
                  validName
                    ? "border border-gray-300 shadow-md rounded-md"
                    : "border border-red-500 shadow-md rounded-md"
                }
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
                className={
                  validPwd // Käyttää validPwd-tilaa määrittelemään luokan
                    ? "border border-gray-300 shadow-md rounded-md"
                    : "border border-red-500 shadow-md rounded-md"
                }
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
                className={
                  validMatch
                    ? "border border-gray-300 shadow-md rounded-md"
                    : "border border-red-500 shadow-md rounded-md"
                }
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

            <div>
              <p className="flex justify-center">
                Password must contain at least one lowercase letter,
              </p>
              <p className="flex justify-center">
                one uppercase letter, one number,
              </p>
              <p className="flex justify-center mb-6">
                and one special character (!@#$%+).
              </p>
            </div>

            <div>
              <p className="flex justify-center">
                If you prefer to change only one of these,
              </p>
              <p className="flex justify-center mb-6">
                please provide your old credentials for the unchanged parts.
              </p>
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
