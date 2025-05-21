import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // const handle_Login = () => {
  //   navigate("/login");
  // }

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <button onClick={handleLogout} className="bg-red-500 px-4 py-1 rounded">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
