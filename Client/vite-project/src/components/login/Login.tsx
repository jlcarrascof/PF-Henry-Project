import { Link } from "react-router-dom";

const Login: React.FC = () => {
  return (
    <>
      <h1>Holi soy el Login</h1>
      <form>
        <label>Email:</label>
        <input></input>

        <label>Password:</label>
        <input></input>

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
