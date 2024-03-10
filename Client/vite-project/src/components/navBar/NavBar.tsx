import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../login/Login"; // Asumiendo que la importación de Login es correcta
import "./navBar.css";
import LongMenu from "../dropDown/dropDown";

export const NavBar: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  let user = window.localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user); // user.role
  }

  return (
    <div className="navBar">
      <div className="navContainer">
        <Link to="/">
          <h2 className="logo"> Rentify </h2>
        </Link>
        <div className="navSeparator"></div>
        <div className="navItems">
          <Link to="/admin">
            <p>Admin</p>
          </Link>
          <Link to="/">
            <p>Home</p>
          </Link>
          <Link to="/rooms">
            <p>Search for rooms</p>
          </Link>
          <Link to="/register-hotel">
            <p>Post a hotel</p>
          </Link>
          {/* <Link to="/reservations">
            <p>Cart Reservation</p>
          </Link> */}
          <Link to="/favorites">
            <p>Favorites</p>
          </Link>
          <Link to="/my-reservations">
            <p>My Reservations</p>
          </Link>
          {user ? (
            <>
              <div>Hola {user.name}!</div>
              <LongMenu />
            </>
          ) : (
            <>
              <Link className="btnLogin" to="/login">
                <p>Login</p>
              </Link>
              {/* <button className="btnLogin" onClick={() => setShowLogin(true)}>
                Login
              </button> */}
            </>
          )}
        </div>
      </div>
      {/* {showLogin && <Login />} */}
    </div>
  );
};

export default NavBar;
//
