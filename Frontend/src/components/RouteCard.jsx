import { Clock, MapPin, Users, Star } from 'lucide-react';
import { format } from 'date-fns';

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
    <div className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div className="p-6">
        {/* Timing Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {formatTime(route.departure_time)}
              </div>
              <div className="text-sm text-gray-600">{route.from_city}</div>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <div className="flex items-center space-x-2 text-gray-500">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div className="flex-1 h-px bg-gray-300"></div>
                <Clock className="h-4 w-4" />
                <span className="text-sm">{route.duration}</span>
                <div className="flex-1 h-px bg-gray-300"></div>
                <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {formatTime(route.arrival_time)}
              </div>
              <div className="text-sm text-gray-600">{route.to_city}</div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">{route.bus_operator}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">{route.bus_type}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm text-gray-600">4.2</span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">₹{route.base_fare}</div>
            <div className="text-sm text-gray-600">per seat</div>
          </div>
        </div>

        {/* Amenities & CTA */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {route.amenities.slice(0, 3).map((amenity, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {amenity}
              </span>
            ))}
            {route.amenities.length > 3 && (
              <span className="text-xs text-gray-500">
                +{route.amenities.length - 3} more
              </span>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-green-600 font-medium">
              {route.available_seats} seats available
            </div>
            <button
              onClick={() => onSelect(route)}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Select Seats
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
