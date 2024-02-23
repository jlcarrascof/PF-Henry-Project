import { Link } from "react-router-dom";
import "./navBar.css";

const NavBar: React.FC = () => {
  return (
    <section className="navContainer">
      <div className="left">
        <h2> Rentify </h2>
      </div>

      <div className="right">
        <Link to="/">
          <p>Home</p>
        </Link>

        <Link to="/about">
          <p>About</p>
        </Link>


        <Link to="/favorites">
          <p>Favorites</p>
        </Link>

        <Link to="/login">
          <p>Login</p>
        </Link>
      </div>
    </section>
  );
};

export default NavBar;
