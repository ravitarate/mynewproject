import { useState } from 'react';
import { X, User, UserCheck } from 'lucide-react';
import React from 'react';

import { useSearchParams } from 'react-router-dom';

export const SeatSelection = ({ route, selectedDate, onClose, onConfirm }) => {
    console.log('Route passed to SeatSelection:', route);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [searchParams] = useSearchParams();
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  
  
    const [formData, setFormData] = useState({ from, to});


  const generateSeats = () => {
    const seats = [];
    const occupiedSeats = Array.from({ length: 8 }, () =>
      Math.floor(Math.random() * 42) + 1
    );

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
    const price = seatObj && seatObj.type === 'premium' ? route?.baseFare  || 50 * 1.2 : route?.baseFare || 50;
    return total + price;
  }, 0);

  const toggleSeat = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatNumber));
    } else if (selectedSeats.length < 6) {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const renderSeat = (seat, index) => {
    let seatClass = "w-10 h-10 rounded-t-lg border-2 flex items-center justify-center text-sm font-medium cursor-pointer transition-all duration-200 ";

    if (seat.isOccupied) {
      seatClass += "bg-red-100 border-red-300 text-red-600 cursor-not-allowed";
    } else if (seat.isSelected) {
      seatClass += "bg-green-100 border-green-500 text-green-700 hover:bg-green-200";
    } else {
      seatClass += seat.type === 'premium'
        ? "bg-blue-50 border-blue-300 text-blue-700 hover:bg-blue-100"
        : "bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100";
    }

    const isAisle = index % 4 === 1;

    return (
      <div key={seat.number} className="flex items-center">
        <div
          className={seatClass}
          onClick={() => !seat.isOccupied && toggleSeat(seat.number)}
        >
          {seat.isOccupied ? (
            <User className="h-4 w-4" />
          ) : seat.isSelected ? (
            <UserCheck className="h-4 w-4" />
          ) : (
            seat.number
          )}
        </div>
        {isAisle && <div className="w-8"></div>}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Select Seats</h2>
              <p className="text-gray-600">
                {from} → {to} | {selectedDate}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Seat Map */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Choose your seats</h3>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
                      <span>Available</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-green-100 border-2 border-green-500 rounded"></div>
                      <span>Selected</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
                      <span>Occupied</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
                      <span>Premium</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mb-4">
                  <div className="bg-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600">
                    Driver
                  </div>
                </div>

                <div className="space-y-2">
                  {Array.from({ length: 11 }, (_, rowIndex) => (
                    <div key={rowIndex} className="flex justify-center space-x-2">
                      {seats
                        .slice(rowIndex * 4, (rowIndex + 1) * 4)
                        .map((seat, seatIndex) => renderSeat(seat, seatIndex))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Route:</span>
                    <span className="font-medium">{from} → {to}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{selectedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Departure:</span>
                   <span className="font-medium">{route?.departureTime || 'N/A'}</span>

                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bus:</span>
                    <span className="font-medium">{route?.busOperator || 'N/A'}</span>
                  </div>
                </div>

                {selectedSeats.length > 0 ? (
                  <>
                    <div className="border-t border-gray-200 mt-4 pt-4">
                      <h4 className="font-medium mb-3">Selected Seats</h4>
                      <div className="space-y-2">
                        {selectedSeats.map(seatNumber => {
                          const seat = seats.find(s => s.number === seatNumber);
                          const price = seat && seat.type === 'premium' ? route?.baseFare  || 50 * 1.2 : route?.baseFare  || 50;
                          return (
                            <div key={seatNumber} className="flex justify-between text-sm">
                              <span>Seat {seatNumber} {seat && seat.type === 'premium' ? '(Premium)' : ''}</span>
                              <span>₹{price}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="border-t border-gray-200 mt-4 pt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-blue-600">₹{Math.round(totalFare)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onConfirm(selectedSeats, Math.round(totalFare))}
                      className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 mt-6"
                    >
                      Continue to Passenger Details
                    </button>
                  </>
                ) : (
                  <p className="text-gray-500 text-center mt-6">
                    Please select seats to continue
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
