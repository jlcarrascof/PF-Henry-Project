import { Link } from "react-router-dom";
import { useState } from "react";
import { validation } from "./LogValidation";
import "./Login.modules.css";

const Login: React.FC = () => {
  interface Data {
    email: string;
    password: string;
  }

  const [data, setData] = useState<Data>({ email: "", password: "" });

  interface Errors {
    email?: string;
    password?: string;
  }

  const [errors, setErrors] = useState<Errors>({ email: "", password: "" });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
    setErrors({
      ...errors,
      ...validation({ [name]: value }),
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
        />
        {errors.email && <p>{errors.email}</p>}

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={onChange}
          placeholder="enter your password"
        />
        {errors.password && <p>{errors.password}</p>}

        {/* Cambios en los botones para redirigir a /home */}
        <Link to="/home">
          <button type="submit">Log in</button>
        </Link>

        <Link to="/home">
          <button>Continue with Google</button>
        </Link>

        <Link to="/home">
          <button>Continue with Instagram</button>
        </Link>

        <Link to="/home">
          <button>Continue with Facebook</button>
        </Link>

        <Link to="/register">
          <span>Do not have an account? Sign in!</span>
        </Link>
      </form>
    </>
  );
};

export default Login;
