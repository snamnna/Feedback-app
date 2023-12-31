import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser, deleteUser } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import DelConf from "./components/deleteConfirmationPopUp";
import "../../i18n/config";
import { useTranslation } from "react-i18next";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%+]).{6,24}$/;

const UserDetails = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
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

  const languageOptions = [
    { code: "en", name: t("en"), flag: "us" },
    { code: "fa", name: t("fa"), flag: "ir" },
    { code: "fi", name: t("fi"), flag: "fi" },
  ];

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
        alert(t("no-match"));
      }
    } else {
      alert(t("fill-info-needed"));
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

  const changeLanguage = (lng) => {
    console.log("kieli vaihdettu: " + lng);
    i18n.changeLanguage(lng);
  };

  return (
    <div className={`text-${i18n.language === "fa" ? "start" : "end"}`}>
      <select
        id="language-selector"
        name="language"
        className=" mx-2 mt-3 select select-bordered "
        onChange={(e) => changeLanguage(e.target.value)}
      >
        {languageOptions.map((option) => (
          <option key={option.code} value={option.code}>
            {option.name}
          </option>
        ))}
      </select>
      <div className="w-screen flex justify-center items-center pb-5 ">
        <div className="px-20 py-5 mb-10 rounded-lg border">
          <h1 className="text-2xl font-semibold mb-4 flex justify-center">
            {t("user-settings")}
          </h1>
          <div>
            {error && <p>Error: {error}</p>}
            <form
              dir={i18n.language === "fa" ? "rtl" : "ltr"}
              className="flex flex-col items-center"
            >
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
                  placeholder={`${t("new-username")}`}
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
                  placeholder={`${t("new-password")}`}
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
                  placeholder={`${t("confirm-password")}`}
                />
              </div>

              <div className="text-center max-w-sm text-sm mb-5">
                <p>{t("requirements")}</p>
              </div>

              <div className="text-center border max-w-sm rounded-md mb-5 p-4">
                <p className="">{t("info-text")}</p>
              </div>
              <button
                type="button"
                onClick={handleEditUser}
                className="btn btn-sm btn-primary shadow-md"
              >
                {t("edit-user")}
              </button>
              <button
                type="button"
                onClick={handleDeleteUser}
                className="btn btn-sm btn-natural shadow-md mt-5"
              >
                {t("delete-user")}
              </button>
            </form>
            {showDelConf && (
              <DelConf onCancel={handleCancelDel} onConfirm={handleConfDel} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
