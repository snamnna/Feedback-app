import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../../services/userServices";
import { useDispatch } from "react-redux";
import { setToken } from "../../features/auth/authSlice";
import bgpic from "../../assets/bgpic.jpg";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

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
      dispatch(setToken(loginResponse.token));
      setUser("");
      setPwd("");
      setSuccess(true);
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

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <Link to="/home">To home</Link>
          </p>
        </section>
      ) : (
        <div
          className="h-screen w-auto"
          style={{
            backgroundImage: `url(${bgpic})`,
          }}
        >
          <div className="max-w-full  flex justify-center items-center p-10">
            <div className="px-20 py-5 max-w-full bg-white opacity-70 rounded-lg shadow-md">
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
                  Sign in to your account
                </h1>
              </div>
              <form onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Username
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
                    Password
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
                    login
                  </button>
                </div>
              </form>
              <p className="text-center">
                Need an Account?
                <br />
                <a className="link link-primary" href="/register">
                  Register
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
