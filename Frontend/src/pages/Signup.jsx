import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import ship from "../assets/ship1.jpg";

const Signup = ({authVerify}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        email,
        password,
        name,
      });
      console.log(res.data)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      // alert("Signup successful!");
      toast.success("Signup successful!");
      authVerify(true);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response.data.message);
      // alert(err.response.data.message);
    }
  };

  return (
    <div  className="flex items-center bg-cover bg-center justify-center min-h-screen bg-blue-100" style={{ backgroundImage: `url(${ship})`}}>
      <div className="bg-gray-100 p-8 rounded-lg shadow-md w-96" >
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          onClick={handleSignup}
          className="w-full bg-blue-600 text-white p-2 rounded cursor-pointer"
        >
          Sign Up
        </button>
        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
