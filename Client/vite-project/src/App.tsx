import { Routes, Route } from "react-router-dom";
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
import MercadoPago from "./components/mercadoPago/MercadoPago";
import UserProfile from "./components/userProfile/UserProfile";
// ? -----------------------------------------------------STYLES
import "./App.css";

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
        <Route path="/profile" element={<UserProfile />} />

      </Routes>
      <Footer />
     </> 
  );
}

export default App;

