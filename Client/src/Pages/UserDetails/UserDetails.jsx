import React from "react";
import { useSelector } from "react-redux";

const UserDetails = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="flex flex-col">
      <div className="px-10 py-3 flex flex-col items-center bg-base-100 opacity-90">
        <h1 className="text-2xl font-semibold mb-4">User settings</h1>
        <input
          className="border border-gray-300 shadow-md rounded-md mb-6"
          type="text"
          placeholder="New username"
        />
        <input
          className="border border-gray-300 shadow-md rounded-md mb-6"
          type="text"
          placeholder="Old password"
        />
        <input
          className="border border-gray-300 shadow-md rounded-md mb-6"
          type="text"
          placeholder="New password"
        />
        <input
          className="border border-gray-300 shadow-md rounded-md mb-6"
          type="text"
          placeholder="Repeat a new password"
        />
        <button className="btn btn-xs btn-primary shadow-md mb-6">
          <span>Edit User</span>
        </button>
        <button className="btn btn-xs btn-primary shadow-md mb-6">
          <span>Delete account</span>
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
