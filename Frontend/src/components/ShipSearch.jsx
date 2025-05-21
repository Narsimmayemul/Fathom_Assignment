import React, { useState } from "react";
import axios from "axios";

const ShipSearch = () => {
  const [name, setName] = useState("");
  const [result, setResult] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/ships?name=${name}`
      );
      setResult(res.data);
    } catch (err) {
      alert("Ship not found");
    }
  };

  return (
    <div className="mt-6">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter ship name"
          className="border p-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>
      <table className="w-full border">
        <thead>
          <tr className="bg-blue-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">IMO</th>
            <th className="p-2 border">Flag</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Built</th>
          </tr>
        </thead>
        <tbody>
          {result.map((ship, i) => (
            <tr key={i}>
              <td className="p-2 border">{ship.name}</td>
              <td className="p-2 border">{ship.imo}</td>
              <td className="p-2 border">{ship.flag}</td>
              <td className="p-2 border">{ship.type}</td>
              <td className="p-2 border">{ship.built}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShipSearch;
