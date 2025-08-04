import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import { BUS_SERVICE_API_BASE_URL } from "../baseurls/BaseURLs";

const API_BASE_URL = BUS_SERVICE_API_BASE_URL;

export const Routes = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [routes, setRoutes] = useState([]);

  const [selectedRoute, setSelectedRoute] = useState(null);

  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const date = searchParams.get("date") || "";

  const [formData, setFormData] = useState({ from, to, date });

  const handleSearch = (e) => {
    e.preventDefault();
    const { from, to, date } = formData;
    if (from && to && date) {
      navigate(`/route?from=${from}&to=${to}&date=${date}`);
    }
  };

  useEffect(() => {
    if (from && to && date) {
      fetch(`${API_BASE_URL}/route?from=${from}&to=${to}&date=${date}`)
        .then((res) => res.json())
        .then((data) => setRoutes(data))
        .catch((err) => console.error("Failed to fetch routes:", err));
    } else {
      setRoutes([]);
    }
  }, [from, to, date]);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Search Bus Routes</h2>

      {/* 🔍 Filter Form */}
      <form
        onSubmit={handleSearch}
        className="bg-white rounded-lg shadow-md p-6 mb-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="From"
            value={formData.from}
            onChange={(e) => setFormData({ ...formData, from: e.target.value })}
            className="border p-3 rounded-md"
            required
          />
          <input
            type="text"
            placeholder="To"
            value={formData.to}
            onChange={(e) => setFormData({ ...formData, to: e.target.value })}
            className="border p-3 rounded-md"
            required
          />
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="border p-3 rounded-md"
            required
          />
          <button
            type="submit"
            className="bg-orange-600 text-white py-3 px-6 rounded-md hover:bg-orange-700 font-medium"
          >
            Update Search
          </button>
        </div>
      </form>

      {/* 🚌 Routes Display */}
      {routes.length > 0 ? (
        <ul className="space-y-4">
          {routes.map((route) => (
            <li key={route.id} className="border p-4 rounded shadow">
              <div className="flex justify-between">
                <div>
                  <strong>{route.busOperator}</strong>
                  <br />
                  {route.departureTime} → {route.arrivalTime} <br />₹
                  {route.baseFare} • {route.duration}
                </div>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => navigate(`/bookseat`)}
                >
                  Book Now
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No routes found. Try changing your filters above.</p>
      )}
    </div>
  );
};
