import { Link } from "react-router-dom";
import "./navBar.css";

const NavBar: React.FC = () => {
  return (
    <div className="navBar"> 
      <div className="navContainer">
        <h2 className="logo"> Rentify </h2>
        <div className="navSeparator"></div>
        <div className="navItems">
          <Link to="/">
            <p>Home</p>
          </Link>
         
          <Link to="/favorites">
            <p>Favorites</p>
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
