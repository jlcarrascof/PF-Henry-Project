import React, { useState } from "react";
import { Link } from "react-router-dom"
import "./navBar.css";
import LongMenu from "../dropDown/dropDown";

const NavBar: React.FC = () => {
  
  let user = window.localStorage.getItem('user');
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
          <Link to="/my-reservations">
            <p>My Reservations</p>
          </Link>
          <Link className="btnLogin" to="/login">
            <p>Login</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NavBar;
//