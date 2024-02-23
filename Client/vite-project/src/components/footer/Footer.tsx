import "./footer.css";

const Footer: React.FC = () => {
  return (
    <div className="footerContainer">
      <div className="marca">
        <h1>Rentify</h1>
        <h3>
          Welcome to the best app for discovering the best hotels for your
          holidays
        </h3>
      </div>
      <div className="comp">
        <h5>Company</h5>
        <h6>About us</h6>
        <h6>What is Rentify?</h6>
      </div>
      <div className="pay">
        <h5>Pay</h5>
        <h6>Cards</h6>
        <h6>Payment services</h6>
      </div>
    </div>
  );
};

export default Footer;
