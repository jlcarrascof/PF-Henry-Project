import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  User,
  signOut,
  UserCredential,
} from "firebase/auth";
import firebaseApp from "./firebaseConfig";
import { authenticateUser } from "../../Redux/Actions/actions";
import "./Login.css";
import Register from "../register/Register";
import { useNavigate } from "react-router-dom";

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const [registration, setRegistration] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
      if (userFirebase) {
        const userData = {
          uid: userFirebase.uid,
          email: userFirebase.email,
          password: userFirebase.password,
          providerId: userFirebase.providerData[0]?.providerId,
          displayName: userFirebase.displayName,
        };
        dispatch(authenticateUser(userData));
      } else {
        dispatch(authenticateUser(null));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  console.log("Usuario en el store:", user); // Prueba de que el usuario está en el store

  useEffect(() => {
    // Si hay un usuario y el valor ha cambiado
    if (user) {
      // Realizar una solicitud al servidor express
      axios
        .post("http://localhost:3002/users/authenticate", user)
        .then((response) => {
          console.log("Información del usuario enviada al backend:", response);
          // Manejar la respuesta del backend si es necesario
        })
        .catch((error) => {
          console.error(
            "Error al enviar información del usuario al backend:",
            error
          );
          // Manejar el error si es necesario
        });
    }
  }, [user]);

  const firebaseAuthentication = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    try {
      if (registration) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      console.error("Error during Firebase authentication:", error);
    }
  };

  const handleGoogleLogin = async (): Promise<void> => {
    try {
      const result: UserCredential = await signInWithPopup(auth, provider);
      const user = result.user;
      //LOCAL STORAGE USER INTERFACE
      let localUser = {
        name: user.displayName,
        email: user.email,
        role: 'user'
      }
      window.localStorage.setItem('user', JSON.stringify(localUser))
      //LOCAL STORAGE USER INTERFACE
      console.log(user);
      navigate('/')
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  const handleSignOut = async (): Promise<void> => {
    try {
      await signOut(auth);
      window.localStorage.clear('user')
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  return (
    <>
      <div className="userFirebase">
        <div className="padreFirebase">
          <h1>Welcome to Rentify!</h1>
          <form onSubmit={firebaseAuthentication}>
            <label> Email: </label>
            <input
              type="text"
              placeholder="myexample@gmail.com"
              className="cajaTexto"
              id="email"
            />
            <label> Password: </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="cajaTexto"
              id="password"
            />
            <button className="loginButton">
              {registration ? "" : "Log in"}
            </button>
          </form>
          <div className="estilos-google">
            {/* <p>
              {" "}
              {registration ? "Already have an account?" : ""}
              <button onClick={() => setRegistration(!registration)}>
                {registration ? "Log in" : ""}
              </button>
            </p> */}
          </div>
          <div className="card-body">
            {user ? (
              <p>
                If you want to disconnect, click on <strong>Log out</strong>
              </p>
            ) : (
              <p>
                You can also log in with your <strong>Google account</strong>
              </p>
            )}
            {!user ? (
              <button
                className="googleButton"
                type="button"
                onClick={handleGoogleLogin}
              >
                <img
                  className="estilo-profile"
                  src="https://res.cloudinary.com/dqh2illb5/image/upload/v1709152706/login/qledtqlcwqfmqlh9zhe4.png"
                  alt="Google logo"
                />
                <strong>Continue with Google</strong>
              </button>
            ) : (
              <div className="googleTime">
                {user.providerId === "password" && (
                  <button type="button" onClick={handleSignOut}>
                    Log out
                  </button>
                )}
                {user.providerId === "google.com" && (
                  <button
                    className="googleButton"
                    type="button"
                    onClick={handleSignOut}
                  >
                    <img
                      className="estilo-profile"
                      src="https://res.cloudinary.com/dqh2illb5/image/upload/v1709152706/login/qledtqlcwqfmqlh9zhe4.png"
                      alt="Google logo"
                    />
                    Log out
                  </button>
                )}
              </div>
            )}
            {user && user.providerId === "password" && (
              <p>
                You have successfully connected with the email:{" "}
                <b>{user.email}</b>
              </p>
            )}
            {user && user.providerId === "google.com" && (
              <p>
                User connected: <b>{user.displayName}</b>
              </p>
            )}
            <Link to="/register">
              <p>Don't have an account? Sign up!</p>
            </Link>
          </div>
        </div>
      </div>

      {/* {user && <Register />} */}
    </>
  );
};

export default Login;
