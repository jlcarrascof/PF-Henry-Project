import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from '../login/Login'; // Asumiendo que la importación de Login es correcta
import "./navBar.css";

const NavBar: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);

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
          <Link to="/register">
            <p>Register</p>
          </Link>
          <Link to="/cart-reservation">
            <p>Cart Reservation</p>
          </Link>
          <button className="btnLogin" onClick={() => setShowLogin(true)}>
            Login
          </button>
        </div>
      </div>
      {showLogin && <Login />}
    </div>
  );
};

export default NavBar;
//
