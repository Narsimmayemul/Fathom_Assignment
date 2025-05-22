import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ShipSearch = () => {
  const [name, setName] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  // const handleSearch = async () => {
  //   let URL =
  //     name.trim() === ""
  //       ? `http://localhost:5000/api/ships/All`
  //       : `http://localhost:5000/api/ships?name=${name}`;

  //   try {
  //     setLoading(true);
  //     const res = await axios.get(URL, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });
  //     setResult(res.data);
  //   } catch (err) {
  //     console.error(err.response?.data?.message || err.message);
  //     setResult([]);
  //     toast.error("Ship not found");
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const handleSearch = async () => {
  let URL =
    name.trim() === ""
      ? `http://localhost:5000/api/ships/All`
      : `http://localhost:5000/api/ships?name=${name}`;

  try {
    setLoading(true);
    const res = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = res.data;

    if (Array.isArray(data)) {
      setResult(data);
    } else if (typeof data === "object" && data !== null) {
      setResult([data]); 
    } else {
      setResult([]);
      toast.error("Unexpected data format from API");
    }

  } catch (err) {
    console.error(err.response?.data?.message || err.message);
    setResult([]);
    toast.error("Ship not found");
  } finally {
    setLoading(false);
  }
};

  // Load all ships initially
  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="mt-6">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter ship name To Search"
          className="border bg-gray-100 p-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-label="Search ships by name"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading ships...</p>
      ) : result.length === 0 ? (
        <p className="text-center text-gray-500">No ships found.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-blue-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">IMO</th>
              <th className="p-2 border">Country</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Built</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(result) && result.length > 0 ? (
              result.map((ship, i) => (
                <tr className="bg-white" style={{ color: "green" }} key={i}>
                  <td className="p-2 border">{ship?.name || "N/A"}</td>
                  <td className="p-2 border">{ship?.IMO || "N/A"}</td>
                  <td className="p-2 border">{ship?.flag || "N/A"}</td>
                  <td className="p-2 border">{ship?.type || "N/A"}</td>
                  <td className="p-2 border">{ship?.built || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr className="bg-white" >
                <td colSpan="5" className="text-center p-2">
                  No ships found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShipSearch;
