import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/userServices";
import { useDispatch } from "react-redux";
import { setAuth } from "../../features/auth/authSlice";
import authBg from "../../assets/authBg.jpg";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import "../../i18n/config";

const Login = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const languageOptions = [
    { code: "en", name: "English", flag: "us" },
    { code: "fa", name: "Farsi", flag: "ir" },
    { code: "fi", name: "Finnish", flag: "fi" },
  ];

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      username: user,
      password: pwd,
    };
    try {
      const loginResponse = await loginUser(loginData);
      console.log("Login successful:", loginResponse);
      const { token, user } = loginResponse;
      dispatch(setAuth({ token, user }));
      setUser("");
      setPwd("");
      navigate(location.state?.from ? location.state.from : "/");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const changeLanguage = (lng) => {
    console.log("kieli vaihdettu: " + lng);
    i18n.changeLanguage(lng);
  };

  return (
    <div
      className="bg-no-repeat bg-cover w-screen h-screen"
      style={{
        backgroundImage: `url(${authBg})`,
      }}
    >
      <div className=" w-screen flex justify-center items-center p-10">
        <div className="px-20 py-5  bg-white opacity-80 rounded-lg shadow-md">
          <div>
            <div
              ref={errRef}
              className={errMsg ? "alert alert-error" : "hidden"}
              aria-live="assertive"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {errMsg}
            </div>
            <h1 className="mt-3 text-xl font-bold leading-9 tracking-tight text-gray-900 text-center">
              {t("header")}
            </h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {t("username-label")}
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                  className="input  input-bordered input-primary  w-full max-w-xs "
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {t("password-label")}
              </label>
            </div>
            <div className="mt-2">
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                className="input input-bordered input-primary w-full max-w-xs"
              />
            </div>

            <div>
              <button
                className="btn btn-primary my-2 w-full max-w-xs "
                type="submit"
              >
                {t("login-button")}
              </button>
            </div>
          </form>
          <p className="text-center">
            {t("need-account-text")}
            <br />
            <a className="link link-primary" href="/register">
              {t("link-to-register")}
            </a>
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center">
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
      </div>
    </div>
  );
};
export default Login;
