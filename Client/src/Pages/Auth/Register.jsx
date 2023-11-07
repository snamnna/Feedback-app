import React, { useRef, useState, useEffect } from "react";
import { createUser } from "../../services/userServices";
import authBg from "../../assets/authBg.jpg";
import RegisterSuccess from "./components/RegisterSuccess";
import { useTranslation } from "react-i18next";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%+]).{6,24}$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const languageOptions = [
    { code: "en", name: "English", flag: "us" },
    { code: "fa", name: "Farsi", flag: "ir" },
    { code: "fi", name: "Finnish", flag: "fi" },
  ];

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const registerData = {
      username: user,
      password: pwd,
    };

    try {
      const registerResponse = await createUser(registerData);
      console.log("register successful:", registerResponse);
      setSuccess(true);
      setUser("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 401) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <RegisterSuccess />
      ) : (
        <div
          className="h-screen bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${authBg})`,
          }}
        >
          <div className=" flex justify-center items-center p-10">
            <div className="px-20 mt-10 py-5 w-xl bg-white opacity-90 rounded-lg shadow-md">
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
                  Register
                </h1>
              </div>
              <form onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Username:
                  </label>
                  <div>
                    <input
                      type="text"
                      id="username"
                      ref={userRef}
                      autoComplete="off"
                      onChange={(e) => setUser(e.target.value)}
                      value={user}
                      required
                      aria-invalid={validName ? "false" : "true"}
                      aria-describedby="uidnote"
                      onFocus={() => setUserFocus(true)}
                      onBlur={() => setUserFocus(false)}
                      className="input  input-bordered input-primary  w-full max-w-xs "
                    />
                    <div>
                      <p
                        id="uidnote"
                        className={
                          userFocus && user && !validName
                            ? "text-sm text-white bg-primary rounded-lg mt-2 p-2 max-w-xs "
                            : "hidden"
                        }
                      >
                        4 to 24 characters.
                      </p>
                    </div>
                  </div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password:
                  </label>
                  <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                    className="input input-bordered input-primary w-full max-w-xs"
                  />
                  <div>
                    <p
                      id="pwdnote"
                      className={
                        pwdFocus && !validPwd
                          ? "text-sm text-center text-white bg-primary rounded-lg  w-full max-w-xs my-2 p-2"
                          : "hidden"
                      }
                    >
                      password requirements
                    </p>
                  </div>

                  <label
                    htmlFor="confirm_pwd"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm Password:
                  </label>
                  <input
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                    className="input input-bordered input-primary w-full max-w-xs"
                  />
                  <div>
                    <p
                      id="confirmnote"
                      className={
                        matchFocus && !validMatch
                          ? "text-sm text-center text-white bg-primary rounded-lg  w-full max-w-xs my-2 p-2"
                          : "hidden"
                      }
                    >
                      Must match the first password input field.
                    </p>
                  </div>
                </div>
                <button
                  className="btn btn-primary my-2 w-full max-w-xs"
                  type="submit"
                  disabled={!validPwd || !validMatch || !validName} // Disable the button if validPwd is false
                >
                  Sign Up
                </button>
              </form>
              <p className="text-center">
                Already registered?
                <br />
                <a className="link link-primary" href="/Login">
                  Sign In
                </a>
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <select
              id="language-selector"
              name="language"
              className="mx-2 mt-3 select select-bordered"
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
      )}
    </>
  );
};

export default Register;
