import React from 'react';
import { useParams, useLocation } from 'react-router-dom';


export const Booking = () => {
  const { routeId } = useParams();
  const { state } = useLocation(); // Optional if passing full route data
  const route = state?.route;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Booking for Route ID: {routeId}</h2>
      {route ? (
        <div className="p-4 border rounded-md shadow-md">
          <p><strong>Bus Operator:</strong> {route.busOperator}</p>
          <p><strong>Fare:</strong> ₹{route.baseFare}</p>
          <p><strong>Departure:</strong> {route.departureTime}</p>
          <p><strong>Arrival:</strong> {route.arrivalTime}</p>
          {/* Add Booking Form */}
        </div>
      ) : (
        <p>Loading route data or no data passed.</p>
      )}
    </div>
  );
};
