import { Link } from "react-router-dom";
import { useState } from "react";
import { validation } from "./LogValidation";

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
      [name]: validation({ [name]: value }),
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
        {errors.email && <p>{errors.email}</p>}

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={onChange}
          placeholder="enter yout password"
        ></input>
        {errors.password && <p>{errors.password}</p>}

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
