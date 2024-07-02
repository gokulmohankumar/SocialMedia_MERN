import React, { useState } from "react";
import { toast } from "react-toastify";
import { registerUser } from "../../Utils/Api/Auth.api";
import { Link, useNavigate } from "react-router-dom";
import bgVideo from "../../assets/Appassests/bg-video.mp4";

const Register = ({ onClose }) => {
  const [auth, setAuth] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (auth.confirmPassword !== auth.password) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await registerUser({
          username: auth.username,
          email: auth.email,
          password: auth.password,
        });
        toast.success(res.data.message);
        navigate("/login");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
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
        <h1 className="text-5xl md:text-5xl font-bold mb-8 text-sky-400 mt-[-500px]">
          Register to G0verse
        </h1>
      </div>
      <div className="flex flex-col justify-center h-[400px] max-w-[500px] w-full absolute top-[250px] left-[520px] z-10">
        <form
          onSubmit={handleRegister}
          className="w-full h-full p-8 rounded-lg bg-white shadow-lg relative"
        >
          <input
            type="text"
            placeholder="Username"
            className="h-12 rounded-lg border border-gray-300 text-lg px-4 mb-4 w-full focus:outline-none"
            onChange={(e) => {
              setAuth({
                ...auth,
                username: e.target.value,
              });
            }}
            required
            autoComplete="on"
          />
          <input
            type="email"
            placeholder="Email"
            className="h-12 rounded-lg border border-gray-300 text-lg px-4 mb-4 w-full focus:outline-none"
            onChange={(e) => {
              setAuth({
                ...auth,
                email: e.target.value,
              });
            }}
            required
            autoComplete="on"
          />
          <input
            type="password"
            placeholder="Password"
            className="h-12 rounded-lg border border-gray-300 text-lg px-4 mb-4 w-full focus:outline-none"
            onChange={(e) => {
              setAuth({
                ...auth,
                password: e.target.value,
              });
            }}
            required
            autoComplete="on"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="h-12 rounded-lg border border-gray-300 text-lg px-4 mb-4 w-full focus:outline-none"
            onChange={(e) => {
              setAuth({
                ...auth,
                confirmPassword: e.target.value,
              });
            }}
            required
            autoComplete="on"
          />
          <button
            className="h-12 rounded-lg bg-green-600 hover:bg-green-700 transition text-white text-lg font-bold w-full"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <Link to="/login" className="text-orange-600 block text-center mt-4">
          Log into your account
        </Link>
      </div>
    </div>
  );
};

export default Register;
