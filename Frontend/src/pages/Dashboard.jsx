import React from "react";
import Navbar from "../components/Navbar";
import ShipSearch from "../components/ShipSearch";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));


   useEffect(() => {
    toast.success("Welcome, " + user?.name);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-semibold">Welcome, {user?.name}</h2>
        
        {/* Dummy Marine Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-4 shadow rounded">🚢 Total Ships: 124</div>
          <div className="bg-white p-4 shadow rounded">
            🛳️ Active Vessels: 87
          </div>
          <div className="bg-white p-4 shadow rounded">
            ⚓ Port Entries: 453
          </div>
        </div>

        {/* Ship Search */}
        <ShipSearch />
      </div>
    </div>
  );
};

export default Dashboard;
