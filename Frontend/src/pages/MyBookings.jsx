import React, { useEffect, useState } from 'react';

export const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('myBookings') || '[]');
    setBookings(saved);
  }, []);

  const downloadTicket = (booking) => {
    const content = `
Bus Ticket Confirmation
------------------------
Booking ID: ${booking.id}
Bus Operator: ${booking.busOperator}
Route: ${booking.fromCity} → ${booking.toCity}
Date: ${booking.date}
Seats: ${booking.selectedSeats.join(', ')}
Fare: ₹${booking.fare}
Departure: ${booking.departureTime}
Arrival: ${booking.arrivalTime}
Contact: ${booking.contact}
Booked On: ${new Date(booking.bookingTime).toLocaleString()}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Ticket_${booking.id}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (bookings.length === 0) {
    return <div className="p-6 max-w-xl mx-auto">You have no bookings yet.</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">My Bookings</h2>
      <ul className="space-y-4">
        {bookings.map((booking) => (
          <li key={booking.id} className="border p-4 rounded shadow">
            <div><b>Bus Operator:</b> {booking.busOperator}</div>
            <div><b>Route:</b> {booking.fromCity} → {booking.toCity}</div>
            <div><b>Date:</b> {booking.date}</div>
            <div><b>Seats:</b> {booking.selectedSeats.join(', ')}</div>
            <div><b>Fare:</b> ₹{booking.fare}</div>
            <div><b>Departure:</b> {booking.departureTime}</div>
            <div><b>Arrival:</b> {booking.arrivalTime}</div>
            <div><b>Contact:</b> {booking.contact}</div>
            <div><b>Booked On:</b> {new Date(booking.bookingTime).toLocaleString()}</div>
            <button
              className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
              onClick={() => downloadTicket(booking)}
            >
              Download Ticket
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
