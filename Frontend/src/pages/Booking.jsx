import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const Booking = () => {
  const { routeId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [contact, setContact] = useState('');
  const route = state?.route;
  const selectedSeats = state?.selectedSeats || [];
  const totalFare = state?.totalFare || 0;
  const date = state?.date;

  if (!route) return <div className="p-6">Loading route data or no data passed.</div>;

  const handleBooking = () => {
    // Prepare booking data to save
    const bookingRecord = {
      id: `${routeId}-${Date.now()}`,
      busOperator: route.busOperator,
      fromCity: route.fromCity,
      toCity: route.toCity,
      date,
      selectedSeats,
      fare: totalFare,
      departureTime: route.departureTime,
      arrivalTime: route.arrivalTime,
      contact,
      bookingTime: new Date().toISOString(),
    };

    // Get existing bookings from localStorage
    const existing = JSON.parse(localStorage.getItem('myBookings') || '[]');

    // Add new booking and save back
    localStorage.setItem('myBookings', JSON.stringify([bookingRecord, ...existing]));

    toast.success('Booking confirmed!');
    navigate('/my-bookings');
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-2">Booking Summary</h2>
      <div className="mb-1"><b>Bus Operator:</b> {route.busOperator}</div>
      <div className="mb-1"><b>Route:</b> {route.fromCity} → {route.toCity}</div>
      <div className="mb-1"><b>Date:</b> {date}</div>
      <div className="mb-1"><b>Selected Seats:</b> {selectedSeats.join(', ')}</div>
      <div className="mb-1"><b>Fare:</b> ₹{totalFare}</div>
      <div className="mb-1"><b>Departure Time:</b> {route.departureTime}</div>
      <div className="mb-1"><b>Arrival Time:</b> {route.arrivalTime}</div>

      <form className="mt-4" onSubmit={e => { e.preventDefault(); handleBooking(); }}>
        <label className="block mb-1 font-medium">Contact Mobile Number</label>
        <input
          className="input input-bordered px-3 py-2 mb-2 w-full"
          required
          value={contact}
          minLength={10}
          maxLength={10}
          pattern="[0-9]{10}"
          onChange={e => setContact(e.target.value)}
          placeholder="Enter 10 digit mobile number"
        />
        <button className="btn bg-blue-600 text-white px-6 py-2 rounded font-bold" type="submit">
          Pay & Confirm
        </button>
      </form>
    </div>
  );
};
