import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { validation } from "./LogValidation";
import { getAuth, signInWithPopup, GoogleAuthProvider, User, signOut, UserCredential } from 'firebase/auth';
import firebaseApp from './firebaseConfig';
import "./Login.modules.css"

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

const Login: React.FC = () => {
  interface Data {
    email: string;
    password: string;
  }

  const [data, setData] = useState<Data>({ email: "", password: "" });
  const [errors, setErrors] = useState<Data>({ email: "", password: "" });
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

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

  const handleGoogleLogin = async (): Promise<void> => {
    try {
      const result: UserCredential = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
    } catch (error) {
      console.error('Error during Google sign-in:', error);
    }
  };

  const handleSignOut = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error during sign-out:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para el inicio de sesión con correo y contraseña
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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

        <button type="submit">Log in</button>
        <Link to="/register">
          <span>Do not have an account? Sign in!</span>
        </Link>
      </form>

      {/* Botón para iniciar sesión con Google */}
      <div className="google-button-container">
        <button type="button" onClick={handleGoogleLogin}>Continue with Google</button>
      </div>

      {/* Contenedor separado para mostrar el estado de la autenticación */}
      <div className="auth-status">
        {user ? (
          <button type="button" onClick={handleSignOut}>Log out</button>
        ) : (
          <p>You are not logged in</p>
        )}
      </div>
    </>
  );
};

export default Login;
