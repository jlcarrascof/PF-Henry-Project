import { useState } from "react";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  return (
    <>
      <h1>Holi soy el Login</h1>
      <form>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
        ></input>

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
        ></input>

        <button>Log in</button>

        <button>Continue with Google</button>
        <button>Continue with Instagram</button>
        <button>Continue with Facebook</button>

        <Link to="/register">
          <span>Do not have an account? Sign in!</span>
        </Link>
      </form>
    </>
  );
};

export default Login;
