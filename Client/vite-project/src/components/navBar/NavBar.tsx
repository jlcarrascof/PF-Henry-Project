import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LongMenu from "../dropDown/dropDown";
import "./navBar.css";
import { Avatar } from "antd";
import { useSelector } from "react-redux";
import RoomIcon from "../icons/RoomIcon";
import HomeIcon from "../icons/HomeIcon";

const NavBar: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [userData, setUserData] = useState({});
  // let user = window.localStorage.getItem("user");

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("user")));
  }, []);
  return (
    <header>
      <div className="navBar">
        {/* ------------------------------ Left -------------------------------- */}

        <div className="navBarLeft">
          <Link to="/">
            <h2 className="logo"> Rentify </h2>
          </Link>
        </div>

        {/* ------------------------------ Right -------------------------------- */}

        <div className="navBarRight">
          <div className="roomIcons">
            <Link to="/">
              <HomeIcon />
              <p>Home</p>
            </Link>
          </div>

          <div className="roomIcons">
            <Link to="/rooms">
              <RoomIcon />
              <p>Search for rooms</p>
            </Link>
          </div>

          {/* ------------------------------ Login e interfaz de administrador -------------------------------- */}

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
                  <strong className="strong">Hi!</strong> {userData.username} !
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
    </header>
  );
};

export default NavBar;
