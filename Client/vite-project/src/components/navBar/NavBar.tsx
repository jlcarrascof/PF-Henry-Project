import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LongMenu from "../dropDown/dropDown";
import "./navBar.css";
import { Avatar } from "antd";
import { useSelector } from "react-redux";

export const NavBar: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [userData, setUserData] = useState({})
  // let user = window.localStorage.getItem("user");

  useEffect (() => {
    setUserData(JSON.parse(window.localStorage.getItem("user")))
  }, [])
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
          {userData === null || Object.keys(userData).length === 0 ? (
            <>
              <Link className="btnLogin" to="/login">
                <p>Login</p>
              </Link>
            </>
          ) : (
            <>
              <div className="dropbox">
                <div className="avatar">
                 Hi {userData.username} !
                  {userData && (
                    <Avatar
                      alt=""
                      src={userData.image}
                      size={48}
                      gap={25}
                      draggable="false"
                    />
                  )}
                </div>
                <LongMenu />
              </div>
            </>
          )}
        </div>
      </div>
      {/* {showLogin && <Login />} */}
    </div>
  );
};

export default NavBar;
