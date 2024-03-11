import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
// ? -----------------------------------------------------COMPONENTS
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import LandingPage from "./components/landingPage/LandingPage";
import NavBar from "./components/navBar/NavBar";
import Detail from "./components/detail/Detail";
import Footer from "./components/footer/Footer";
import About from "./components/about/About";
import Home from "./components/home/Home";
import FormProperty from "./components/FormRegisterProperty/FormPropertyIndex";
import CartReservation from "./components/cart/CartReservation";
import Cloudinary from "./components/cloudinary/Cloudinary";
import MyReservations from "./components/Reservations/MyReservations";
import HotelDashboard from "./components/admin/HotelsDashboard/hotelDashboard";
import FavoritesRoom from "./components/favorites/FavoritesRooms";
import UserDashboard from "./components/admin/UserDashboard/userDashboard";

// ? -----------------------------------------------------STYLES
import "./App.css";


interface User {
  email: string;
  password: string;
}
function App() {
  const [theUser, setTheUser] = useState<User | null>(null);

  return (
    <>
      <NavBar />

      <Routes>
        <Route>
          <Route
            path="/"
            element={theUser ? <LandingPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={<Login setTheUser={setTheUser} theUser={theUser} />}
          />
        </Route>
        <Route path="/register" element={<Register onSubmit={onsubmit} />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/home" element={<Home />} />
        <Route path="/rooms" element={<Home />} />
        <Route path="/reservations" element={<CartReservation />} />
        <Route path="/my-reservations" element={<MyReservations />} />
        <Route path="/favorites" element={<FavoritesRoom />} />
        <Route path="/register-hotel" element={<FormProperty />} />
        <Route path="/cloudinary" element={<Cloudinary />} />
        <Route path="/admin/hotels" element={<HotelDashboard />} />
        <Route path="/admin/users" element={<UserDashboard />} />
        <Route path="/pay" element={<MercadoPago />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

