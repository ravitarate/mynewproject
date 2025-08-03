import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, ArrowRight, Star, Shield, Clock, Phone } from 'lucide-react';
import { format } from 'date-fns';
import React from 'react';


export const Home = () => {
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: format(new Date(), 'yyyy-MM-dd'),
  });

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchData.from && searchData.to && searchData.date) {
      navigate(`/route?from=${searchData.from}&to=${searchData.to}&date=${searchData.date}`);
    }
  };

  const popularRoutes = [
    { from: 'Delhi', to: 'Mumbai', price: 850, duration: '18h' },
    { from: 'Bangalore', to: 'Chennai', price: 450, duration: '6h' },
    { from: 'Pune', to: 'Goa', price: 650, duration: '10h' },
    { from: 'Hyderabad', to: 'Bangalore', price: 550, duration: '8h' },
  ];

  const features = [
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Secure payment gateway and verified bus operators',
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round the clock customer support for your journey',
    },
    {
      icon: Star,
      title: 'Best Price',
      description: 'Compare prices and get the best deals on bus tickets',
    },
    {
      icon: Phone,
      title: 'Easy Booking',
      description: 'Book tickets in just a few clicks with mobile-friendly interface',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Book Your Perfect Bus Journey
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Travel comfortably with India's most trusted bus booking platform. 
              Safe, secure, and affordable.
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-xl p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black h-5 w-5" />
                    <input
                      type="text"
                      value={searchData.from}
                      onChange={(e) => setSearchData({ ...searchData, from: e.target.value })}
                      placeholder="Departure city"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      value={searchData.to}
                      onChange={(e) => setSearchData({ ...searchData, to: e.target.value })}
                      placeholder="Destination city"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="date"
                      value={searchData.date}
                      onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
                      min={format(new Date(), 'yyyy-MM-dd')}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-orange-600 text-white py-3 px-6 rounded-md hover:bg-orange-700 transition-colors duration-200 flex items-center justify-center space-x-2 font-medium"
                  >
                    <Search className="h-5 w-5" />
                    <span>Search Buses</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Popular Routes */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Routes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the most popular bus routes across India with great prices and comfortable journeys.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularRoutes.map((route, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 cursor-pointer"
              onClick={() => navigate(`/routes?from=${route.from}&to=${route.to}&date=${searchData.date}`)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-900">{route.from}</span>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                  <span className="font-semibold text-gray-900">{route.to}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-blue-600">₹{route.price}</div>
                  <div className="text-sm text-gray-500">{route.duration}</div>
                </div>
                <div className="text-blue-600 hover:text-blue-700">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose BusBooker?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the best of bus travel with our comprehensive booking platform designed for your comfort and convenience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">1M+</div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">500+</div>
              <div className="text-gray-300">Bus Operators</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">1000+</div>
              <div className="text-gray-300">Routes</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">24/7</div>
              <div className="text-gray-300">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
