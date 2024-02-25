import "./footer.css";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footerContent">
        <h1>Rentify</h1>
        <h4>
          Welcome to the best app for discovering the best hotels for your
          holidays
        </h4>
      </div>
      <div className="footerContent">
        <h4>Company</h4>
        <Link to="/about">
          <h5> About us</h5>
        </Link>
        <h5>What is Rentify?</h5>
      </div>
      <div className="footerContent">
        <h4>Pay</h4>
        <h5>Cards</h5>
        <h5>Payment services</h5>
      
      </div>
    </footer>
  );
};

export default Footer;
