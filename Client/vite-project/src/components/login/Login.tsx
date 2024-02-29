import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { validation } from "./LogValidation";
import { getAuth, signInWithPopup, GoogleAuthProvider, User, signOut } from 'firebase/auth';
import firebaseApp from './firebaseConfig';

import "./Login.css";

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

const Login: React.FC = () => {
  interface Data {
    email: string;
    password: string;
  }

  const navigate = useNavigate();
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
    navigate("/rooms")
    // Aquí puedes agregar la lógica para el inicio de sesión con correo y contraseña
  };

  return (
    <>
    <div className="formLogin">
      <form onSubmit={handleSubmit} className="logcontainer">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={onChange}
          placeholder="myexample@gmail.com"
          className="formLogin input"
        />
        {errors.email && <p>{errors.email}</p>}

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={onChange}
          placeholder="enter your password"
          className="formLogin input"
        />
        {errors.password && <p>{errors.password}</p>}

        <button type="submit" className="formLogin button">Log in</button>

        <Link to="/register">
          {/*<span>Do not have an account? Sign up!</span>*/}
        </Link>
      </form>

      {/* Contenedor separado para el botón "Continue with Google" */}
      <div className="google-button-container">
        <div className="row">
          <div className="col-md-4">
            <div className="padre">
              <div className="card card-body">
                <img className="estilo-profile" src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" alt="Google logo" />
                <h4 className="text-center">Sign in with your Google account</h4>
                {user ? (
                  <button type="button" onClick={handleSignOut}>Log off</button>
                ) : (
                  <button type="button" onClick={handleGoogleLogin}>Continue with Google</button>
                )}
                {/* Agregar botones para continuar con otras redes sociales si lo deseas */}
              </div>
            </div>
          </div>
          <div className="col-md-8">
            {/*acá una imagen para la columna de la derecha*/}
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Login;




/* import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, User, signOut, UserCredential } from 'firebase/auth';
import firebaseApp from './firebaseConfig';
import { authenticateUser } from '../../Redux/Actions/actions';
import "./Login.css";

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const [registration, setRegistration] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
      if (userFirebase) {
        const userData = {
          uid: userFirebase.uid,
          email: userFirebase.email,
          providerId: userFirebase.providerData[0]?.providerId, // Add providerId to identify authentication method
          displayName: userFirebase.displayName,
        };
        dispatch(authenticateUser(userData));
      } else {
        dispatch(authenticateUser(null));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

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
      <div className="userFirebase">
        <div className="padreFirebase">
          <form onSubmit={firebaseAuthentication}>
            <input type="text" placeholder="Enter your email" className="cajaTexto" id="email" />
            <input type="password" placeholder="Enter your password" className="cajaTexto" id="password" />
            <button>{registration ? "Sign up" : "Log in"}</button>
          </form>
          <div className="estilos-google">
            <p> {registration ? "Already have an account?" : "Don't have an account?"}
              <button onClick={() => setRegistration(!registration)}>{registration ? "Log in" : "Sign up"}</button>
            </p>
          </div>
        </div>
      </div>

      <div className="auth-status">
        <div className="button-google">
          <div className="card card-body">
            {user ? (
              <p>If you want to disconnect, click on <strong>Log out</strong></p>
            ) : (
              <p>You can also log in with your <strong>Google account</strong></p>
            )}
            {!user ? (
              <button type="button" onClick={handleGoogleLogin}><img className="estilo-profile" src="https://res.cloudinary.com/dqh2illb5/image/upload/v1709152706/login/qledtqlcwqfmqlh9zhe4.png" alt="Google logo" />Continue with Google</button>
            ) : (
              <div className="">
                {user.providerId === "password" && (
                  <button type="button" onClick={handleSignOut}>Log out</button>
                )}
                {user.providerId === "google.com" && (
                  <button type="button" onClick={handleSignOut}><img className="estilo-profile" src="https://res.cloudinary.com/dqh2illb5/image/upload/v1709152706/login/qledtqlcwqfmqlh9zhe4.png" alt="Google logo" />Log out</button>
                )}
              </div>
            )}
            {user && user.providerId === "password" && (
              <p>You have successfully connected with the email: <b>{user.email}</b></p>
            )}
            {user && user.providerId === "google.com" && (
              <p>User connected: <b>{user.displayName}</b></p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
 */