import { Link } from "react-router-dom";
import { useState } from "react";
import { validation } from "./LogValidation";
import { getAuth, signInWithPopup, GoogleAuthProvider, UserCredential } from 'firebase/auth';
import firebaseApp from './firebaseConfig';

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

const Login: React.FC = () => {
  interface Data {
    email: string;
    password: string;
  }

  const [data, setData] = useState<Data>({ email: "", password: "" });
  const [errors, setErrors] = useState<Data>({ email: "", password: "" });

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
      // Aquí podrías hacer algo con el usuario de Google si lo deseas
    } catch (error) {
      console.error('Error durante el inicio de sesión con Google:', error);
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

        <button type="button" onClick={handleGoogleLogin}>Continue with Google</button>
        {/* Agregar botones para continuar con otras redes sociales si lo deseas */}
        
        <Link to="/register">
          <span>Do not have an account? Sign up!</span>
        </Link>
      </form>
    </>
  );
};

export default Login;