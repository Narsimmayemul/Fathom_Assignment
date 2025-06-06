import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import ship from "../assets/ship3.jpg";

const Login = ({authVerify}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://fathom-assignment-2zp4.vercel.app/api/auth/signin", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      authVerify(true);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      console.log(err)
      toast.error(err?.response?.data?.message);
      // alert(err?.response?.data?.message);
    }
  };

  // className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${ship})` }}
  return (
    <div className="flex items-center bg-cover bg-center justify-center min-h-screen bg-blue-100" style={{ backgroundImage: `url(${ship})` }}>
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-2 rounded cursor-pointer"
        >
          Login
        </button>
        <p className="mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
