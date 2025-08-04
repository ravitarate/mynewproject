import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import React from 'react';
import { RouteCard } from '../components/RouteCard';
import { SeatSelection } from '../components/SeatSelection';

import { BUS_SERVICE_API_BASE_URL } from '../baseurls/BaseURLs';

const API_BASE_URL = BUS_SERVICE_API_BASE_URL;

export const Routes = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [showSeatSelection, setShowSeatSelection] = useState(false);
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const date = searchParams.get('date') || '';
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
        .then(res => res.json())
        .then(data => setRoutes(data))
        .catch(err => {
          // fallback mock data
          setRoutes([
            {
              id: 1,
              from,
              to,
              departureTime: '09:00',
              arrivalTime: '16:00',
              busOperator: 'RedBus Travels',
              baseFare: 850,
              availableSeats: 30,
              rating: 4.4,
            },
            {
              id: 2,
              from,
              to,
              departureTime: '15:30',
              arrivalTime: '23:30',
              busOperator: 'GoSafe Bus',
              baseFare: 900,
              availableSeats: 25,
              rating: 4.0,
            },
          ]);
        });
    } else {
      setRoutes([]);
    }
  }, [from, to, date]);

  const handleRouteSelect = (route) => {
    setSelectedRoute(route);
    setShowSeatSelection(true);
  };

  const handleSeatConfirm = (selectedSeats, totalFare) => {
    setShowSeatSelection(false);
    navigate(`/booking/${selectedRoute.id}`, {
      state: {
        route: selectedRoute,
        selectedSeats,
        totalFare,
        date,
      }
    });
  };

  return (
    <div className="px-6 py-4 max-w-2xl mx-auto">
      <form className="mb-4 flex gap-2 flex-wrap" onSubmit={handleSearch}>
        <input
          className="input input-bordered px-3 py-1"
          value={formData.from}
          onChange={e => setFormData({ ...formData, from: e.target.value })}
          placeholder="From"
        />
        <input
          className="input input-bordered px-3 py-1"
          value={formData.to}
          onChange={e => setFormData({ ...formData, to: e.target.value })}
          placeholder="To"
        />
        <input
          type="date"
          className="input input-bordered px-3 py-1"
          value={formData.date}
          onChange={e => setFormData({ ...formData, date: e.target.value })}
        />
        <button className="btn bg-blue-500 text-white font-semibold px-4" type="submit">
          Search
        </button>
      </form>
      {routes.length === 0 ? (
        <div>No routes found. Try changing your filters above.</div>
      ) : (
        routes.map(route => (
          <RouteCard
            key={route.id}
            route={route}
            selectedDate={date}
            onSelect={handleRouteSelect}
          />
        ))
      )}
      {showSeatSelection && selectedRoute && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-40">
          <div className="bg-white rounded-lg p-4 max-w-lg w-full shadow-2xl relative">
            <button
              onClick={() => setShowSeatSelection(false)}
              className="absolute top-2 right-2 p-2 text-gray-400 hover:text-black"
            >
              Close
            </button>
            <SeatSelection
              route={selectedRoute}
              selectedDate={date}
              onClose={() => setShowSeatSelection(false)}
              onConfirm={handleSeatConfirm}
            />
          </div>
        </div>
      )}
    </div>
  );
};
