import { Clock, MapPin, Users, Star } from 'lucide-react';
import { format } from 'date-fns';
import React from 'react';

export const RouteCard = ({ route, onSelect, selectedDate }) => {
  const formatTime = (time) => {
    try {
      const [hours, minutes] = time.split(':');
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes));
      return format(date, 'hh:mm a');
    } catch {
      return time;
    }
  };

  return (
    <div
      className="border rounded-lg p-4 shadow-md hover:bg-blue-50 transition-all cursor-pointer mb-4"
      onClick={() => onSelect(route)}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-500" />
          <span className="font-semibold">{route.fromCity}</span>
          <span className="mx-1">→</span>
          <span className="font-semibold">{route.toCity}</span>
        </div>
        <div className="flex items-center gap-1 text-yellow-500 text-sm">
          <Star className="w-4 h-4" />
          {route.rating ? route.rating.toFixed(1) : '4.2'}
        </div>
      </div>
      <div className="flex items-center justify-between text-gray-600 mb-2">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>
            {formatTime(route.departureTime)} - {formatTime(route.arrivalTime)}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>{route.availableSeats ?? 25} seats</span>
        </div>
      </div>
      <div className="flex justify-between">
        <span className="font-medium text-blue-800">
          Operator: {route.busOperator}
        </span>
        <span className="font-bold text-green-600">
          ₹{route.baseFare || 300}
        </span>
      </div>
      {selectedDate &&
        <div className="mt-1 text-xs text-gray-500">For date: {selectedDate}</div>
      }
    </div>
  );
};
