import { Link } from "react-router-dom";

const Register: React.FC = () => {
  return (
    <>
      <h1>Holi soy el Register</h1>
      <form>
        <label>Name:</label>
        <input></input>

        <label>Last name:</label>
        <input></input>

        <label>Email:</label>
        <input></input>

        <label>Phone number:</label>
        <input></input>

        <label>Password:</label>
        <input></input>

        <label>Repeat password:</label>
        <input></input>

        <Link to="/login">
          <span>Sign in</span>
        </Link>
      </form>
    </>
  );
};

export default Register;