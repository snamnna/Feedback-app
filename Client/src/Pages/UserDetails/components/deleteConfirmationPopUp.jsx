import React from "react";

const DelConf = ({ onCancel, onConfirm }) => {
  return (
    <div className="delete-conf flex flex-col items-center">
      <p>Are you sure you want to delete this user?</p>
      <button onClick={onConfirm}>YES</button>
      <button onClick={onCancel}>NO</button>
    </div>
  );
};

export default DelConf;
