import "./footer.css";

const Footer: React.FC = () => {
  return (
    <div className="footerContainer">
      <div className="marca">
        <h1>Rentify</h1>
        <h4>
          Welcome to the best app for discovering the best hotels for your
          holidays
        </h4>
      </div>
      <div className="comp">
        <h4>Company</h4>
        <h5>About us</h5>
        <h5>What is Rentify?</h5>
      </div>
      <div className="pay">
        <h4>Pay</h4>
        <h5>Cards</h5>
        <h5>Payment services</h5>
      </div>
    </div>
  );
};

export default Footer;
