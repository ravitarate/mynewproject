import { useState } from 'react';
import { X, User, UserCheck } from 'lucide-react';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

export const SeatSelection = ({ route, selectedDate, onClose, onConfirm }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [searchParams] = useSearchParams();
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';

  const generateSeats = () => {
    const seats = [];
    // Simulate some seats as occupied for demo purposes.
    const occupiedSeats = Array.from({ length: 8 }, () => Math.floor(Math.random() * 42) + 1);
    for (let i = 1; i <= 42; i++) {
      const seatNumber = i.toString();
      const isOccupied = occupiedSeats.includes(i);
      const isSelected = selectedSeats.includes(seatNumber);
      seats.push({
        number: seatNumber,
        isOccupied,
        isSelected,
        type: i <= 10 ? 'premium' : 'regular'
      });
    }
    return seats;
  };
  const seats = generateSeats();

  const totalFare = selectedSeats.reduce((total, seat) => {
    const seatObj = seats.find(s => s.number === seat);
    const price = seatObj && seatObj.type === 'premium'
      ? (route?.baseFare || 50) * 1.2
      : (route?.baseFare || 50);
    return total + price;
  }, 0);

  const toggleSeat = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatNumber));
    } else if (selectedSeats.length < 6) {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  return (
    <div>
      <div className="mb-2 text-lg font-semibold">
        {from || route?.from} → {to || route?.to} | {selectedDate}
      </div>
      <div className="mb-2 text-sm text-gray-600">
        Select up to <span className="font-bold">6 seats</span>. <span className="text-blue-700">Green</span>: Selected, <span className="text-red-700">Red</span>: Occupied, <span className="text-blue-600">Blue</span>: Premium.
      </div>
      <div className="grid grid-cols-4 gap-1 mb-3 max-w-xs mx-auto">
        {seats.map((seat, idx) => {
          let seatClass =
            "w-10 h-10 rounded-lg border-2 flex items-center justify-center text-sm font-medium cursor-pointer select-none transition-all duration-200 ";
          if (seat.isOccupied) {
            seatClass += "bg-red-100 border-red-300 text-red-600 cursor-not-allowed";
          } else if (seat.isSelected) {
            seatClass += "bg-green-100 border-green-500 text-green-700 hover:bg-green-200";
          } else {
            seatClass += seat.type === 'premium'
              ? "bg-blue-50 border-blue-300 text-blue-700 hover:bg-blue-100"
              : "bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100";
          }
          return (
            <div
              key={seat.number}
              className={seatClass}
              onClick={() => !seat.isOccupied && toggleSeat(seat.number)}
            >
              {seat.isSelected ? <UserCheck /> : <User />}
              <span className="ml-1">{seat.number}</span>
            </div>
          );
        })}
      </div>
      <div className="mb-2">
        <span className="font-medium">Selected Seats:</span> {selectedSeats.join(', ') || '---'}
      </div>
      <div className="mb-2">
        <span className="font-medium">Total Fare:</span> ₹{totalFare}
      </div>
      <div className="flex gap-2 mt-3">
        <button
          className="btn px-4 py-2 rounded bg-blue-600 text-white font-bold"
          disabled={selectedSeats.length === 0}
          onClick={() => onConfirm(selectedSeats, totalFare)}
        >
          Confirm Booking
        </button>
        <button
          className="btn px-4 py-2 rounded bg-gray-200"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
