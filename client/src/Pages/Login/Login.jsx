import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { loginAuth } from "../../Utils/Api/Auth.api";
import { toast } from "react-toastify";
import { Link, Navigate } from "react-router-dom";
import bgVideo from "../../assets/Appassests/bg-video.mp4";

const Login = () => {
  const [Auth, SetAuth] = useState({
    email: "",
    password: "",
  });
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    loginAuth({ email: Auth.email, password: Auth.password }, dispatch);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={bgVideo}
        autoPlay
        loop
        muted
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black bg-opacity-60 text-center px-4">
        <h1 className="text-5xl md:text-5xl font-bold mb-8 text-sky-400 ">
          Log to G0verse
        </h1>
        <div className="w-[500px] h-[400px] flex items-center justify-center mt-[200px]">
          <div
            className="flex flex-col items-center justify-center z-10 mt-[-300px]"
            style={{ flex: 1 }}
          >
            <form className="bg-slate-50" onSubmit={handleLogin}>
              <div className="bg-transparent rounded-lg shadow-lg p-8 max-w-md w-full relative">
                <input
                  type="email"
                  placeholder="Email"
                  className="h-12 rounded-lg border border-gray-300 text-lg px-4 mb-4 w-full focus:outline-none"
                  autoComplete="on"
                  onChange={(e) => {
                    SetAuth({ ...Auth, email: e.target.value });
                  }}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="h-12 rounded-lg border border-gray-300 text-lg px-4 mb-4 w-full focus:outline-none"
                  autoComplete="on"
                  onChange={(e) => {
                    SetAuth({ ...Auth, password: e.target.value });
                  }}
                  required
                  minLength={4}
                />
                <button
                  className="h-12 rounded-lg bg-green-600 hover:bg-green-700 transition text-white text-lg font-bold w-full"
                  disabled={isFetching}
                >
                  {isFetching ? "Logging In..." : "Login"}
                </button>
                <span className="text-green-600 cursor-pointer block text-center mt-4">
                  Forgot your password?
                </span>
              </div>
            </form>
            <Link className="relative text-orange-600 mt-[10px]" to="/register">
              Dont you have an account Sign
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
