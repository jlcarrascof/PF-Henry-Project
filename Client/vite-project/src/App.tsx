import { Routes, Route } from "react-router-dom";
import { useState } from "react";
// ? -----------------------------------------------------COMPONENTS
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import LandingPage from "./components/landingPage/LandingPage";
import NavBar from "./components/navBar/NavBar";
import Favorites from "./components/favorites/Favorites";
import Detail from "./components/detail/Detail";
import Footer from "./components/footer/Footer";
import About from "./components/about/About";
import Home from "./components/home/Home";
import FormProperty from "./components/FormRegisterProperty/FormPropertyIndex";
import CartReservation from "./components/cart/CartReservation";
import DisableRooms from "./components/DisableRooms/DisableRooms";
import MyReservations from "./components/Reservations/MyReservations";
// ? -----------------------------------------------------STYLES
import "./App.css";

interface User {
  email: string;
  password: string;
}
function App() {
  const [user, setUser] = useState<User | null>(null);
  // const location = useLocation();
  // const dispatch = useDispatch();
  // const isAuthenticated = useSelector((state) => state.isAuthenticated);
  // const user = useSelector((state) => state.user);

  // useEffect(() => {
  //   if (user) {
  //     dispatch(getReservations(user.uid));
  //   } else {
  //     dispatch(authenticateUser(null));
  //   }
  // }, [dispatch, user]);

  return (
    <>
      <NavBar />
      {user ? <LandingPage /> : <Login setUser={setUser} />}
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register onSubmit={onsubmit} />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/detail" element={<Detail />} /> */}
        <Route path="/rooms" element={<Home />} />
        <Route path="/reservations" element={<CartReservation />} />
        <Route path="/my-reservations" element={<MyReservations />} />
        <Route path="/register-hotel" element={<FormProperty />} />
        <Route path="/admin" element={<DisableRooms />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
