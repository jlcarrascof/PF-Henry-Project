import { Link } from "react-router-dom";
import "./navBar.css";

const NavBar: React.FC = () => {
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
          <Link to="/register-hotel">
            <p>Post a hotel</p>
          </Link>
          <Link to="/cart-reservation">
            <p>Cart Reservation</p>
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
