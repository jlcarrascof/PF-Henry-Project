import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
// ? -----------------------------------------------------COMPONENTS
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import LandingPage from "./components/landingPage/LandingPage";
import NavBar from "./components/navBar/NavBar";
import Favorites from "./components/favorites/Favorites";
import Detail from "./components/detail/Detail";
import Footer from "./components/footer/Footer";

//import About from "./components/";



import Home from "./components/home/Home";

// ? -----------------------------------------------------STYLES
import "./App.css";

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/login" ? <NavBar /> : ""}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/favorites" element={<Favorites />} />


        {/* <Route path="/about" element={<About />} /> */}
       

        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/home" element={<Home />} />

      </Routes>
      {location.pathname !== "/login" ? <Footer /> : ""}
    </>
  );
}

export default App;





// import { Routes, Route } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import NavBar from "./components/navBar/NavBar";
// import Detail from "./components/detail/Detail";
// import Footer from "./components/footer/Footer";
// import Home from "./components/home/Home";
// import Login from "./components/login/Login";
// import Register from "./components/register/Register";
// import LandingPage from "./components/landingPage/LandingPage";
// import Favorites from "./components/favorites/Favorites";

// import "./App.css";

// function App() {
//   const location = useLocation();
//   return (
//     <>
//       {location.pathname !== "/login" ? <NavBar /> : ""}
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/favorites" element={<Favorites />} />
//         <Route path="/detail/:id" element={<Detail />} />
//         <Route path="/home" element={<Home />} />
//       </Routes>
//       {location.pathname !== "/login" ? <Footer /> : ""}
//     </>
//   );
// }

// export default App;


