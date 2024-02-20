import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Login: React.FC = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <>
      <form>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={onChange}
          placeholder="myexample@gmail.com"
        ></input>

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={onChange}
          placeholder="enter yout password"
        ></input>

        <button type="submit">Log in</button>

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
