import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
import { authenticateUser, createUser } from "../../Redux/Actions/actions";
import "./Login.css";
import app from "./firebaseConfig";
import Register from "../register/Register";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

interface LoginProps {
  setTheUser: React.Dispatch<React.SetStateAction<User | null>>;
  theUser: React.Dispatch<React.SetStateAction<User | null>>;
}
const Login: React.FC<LoginProps> = ({ setTheUser, theUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: any) => state.user);
  const [registration, setRegistration] = useState(false);

  useEffect(() => {
    // const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
    //   if (userFirebase) {
    //     const userData = {
    //       uid: userFirebase.uid,
    //       email: userFirebase.email,
    //       password: userFirebase.password,
    //       providerId: userFirebase.providerData[0]?.providerId,
    //       displayName: userFirebase.displayName,
    //     };
    //     dispatch(authenticateUser(userData));
    //   } else {
    //     dispatch(authenticateUser(null));
    //   }
    // });
    // return () => unsubscribe()
    // dispatch(authenticateUser(userData));
    // if (userData.email.length > 0 && userData.password.length > 0) {
    //   dispatch(authenticateUser(userData));
    // }
  }, [dispatch]);

  console.log("Usuario en el store:", user); // Prueba de que el usuario está en el store

  // useEffect(() => {
  //   // Si hay un usuario y el valor ha cambiado
  //   if (user) {
  //     // Realizar una solicitud al servidor express
  //     axios
  //       .get(`http://localhost:3002/users/authenticate/${user.email}`)
  //       .then((response) => {
  //         console.log("Información del usuario enviada al backend:", response);
  //         // Manejar la respuesta del backend si es necesario
  //       })
  //       .catch((error) => {
  //         console.error(
  //           "Error al enviar información del usuario al backend:",
  //           error
  //         );
  //         // Manejar el error si es necesario
  //       });
  //   }
  // }, [user]);

  const firebaseAuthentication = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    signInWithEmailAndPassword(auth, email, password).then(
      (usuario) => dispatch(authenticateUser(email)) && setTheUser(usuario)
    );

    // try {
    //   if (registration) {

    //     await createUserWithEmailAndPassword(auth, email, password);
    //   } else {
    //     await signInWithEmailAndPassword(auth, email, password);
    //   }
    // } catch (error) {
    //   console.error("Error during Firebase authentication:", error);
    // }
  };
  const handleGoogleLogin = async (): Promise<void> => {
    try {
      const result: UserCredential = await signInWithPopup(auth, provider);
      const user = result.user;
      //LOCAL STORAGE USER INTERFACE
      let localUser = {
        name: user.displayName,
        email: user.email,
        role: "owner",
      };
      window.localStorage.setItem("user", JSON.stringify(localUser));
      //LOCAL STORAGE USER INTERFACE
      console.log(user);
      navigate("/");
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };
  // const handleGoogleLogin = () => {
  //   signInWithPopup(auth, provider)
  //     .then(
  //       (result) => dispatch(createUser(result.user)) && setTheUser(result.user)
  //     )
  //     .catch((err) => {
  //       console.log("el error es: ", err);
  //     });
  //   //  .catch (error) {
  //   //   console.error("Error during Google sign-in:", error)
  //   // }
  // };

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <>
      <div className="userFirebase">
        <div className="padreFirebase">
          <h1>Welcome to Rentify!</h1>
          <form onSubmit={firebaseAuthentication}>
            <label htmlFor="email"> Email: </label>
            <input
              type="text"
              placeholder="myexample@gmail.com"
              className="cajaTexto"
              id="email"
            />
            <label htmlFor="password"> Password: </label>
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
                type="submit"
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
