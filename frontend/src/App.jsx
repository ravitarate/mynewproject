import { Routes as RouterRoutes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/AuthContext";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Routes as RoutesPage } from "./pages/Routes";
import { Booking } from "./pages/Booking";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import React from "react"; // Importing React to avoid potential issues with JSX

import "./App.css"; // Importing global styles
import { SeatSelection } from "./components/SeatSelection";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <RouterRoutes>
          <Route path="/" element={<Home />} />
          <Route path="/route" element={<RoutesPage />} />
          <Route path="/book/:routeId" element={<Booking />} />
          <Route path="/bookseat" element={<SeatSelection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </RouterRoutes>
        <Toaster position="top-right" />
      </div>
    </AuthProvider>
  );
}

export default App;
