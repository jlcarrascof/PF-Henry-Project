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
  EmailAuthCredential,
} from "firebase/auth";
import firebaseApp from "./firebaseConfig";
import { authenticateUser, createUser } from "../../Redux/Actions/actions";
import "./Login.css";
import Register from "../register/Register";
import app from "./firebaseConfig";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

interface LoginProps {
  setTheUser: React.Dispatch<React.SetStateAction<User | null>>;
  theUser: React.Dispatch<React.SetStateAction<User | null>>;
}
export const Login: React.FC<LoginProps> = ({ setTheUser, theUser }) => {
  // const Overlay = styled.div`
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   height: 100%;
  //   background-color: rgba(0, 0, 0, 0.5);
  //   z-index: 1000;
  // `;

  // const ContenedorModal = styled.div`
  //   position: fixed;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate(-50%, -50%);
  //   background-color: white;
  //   padding: 20px;
  //   border-radius: 8px;
  //   z-index: 1001;
  // `;

  // const Encabezado = styled.div`
  //   display: flex;
  //   justify-content: space-between;
  //   align-items: center;
  //   font-size: 20px;
  //   padding-bottom: 10px;
  //   border-bottom: 1px solid #ccc;
  // `;

  // const LoginButton = styled.button`
  //   background-color: transparent;
  //   border: none;
  //   font-size: 20px;
  //   cursor: pointer;
  // `;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: any) => state.user);
  const [registration, setRegistration] = useState(false);
  
  const firebaseAuthentication = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    if (email && password) {
      try {
        await dispatch(authenticateUser(email, password));
        navigate("/")
        
      } catch (error) {
        console.error("Error during login:", error);
      }
    }
  };
  const localUser = {
    message: user?.Message,
    username: user?.userData?.username,
    user_email: user?.userData?.user_email,
    image: user?.userData?.image,
    _id: user?.userData?._id,
    role: user?.userData?.role,
    permissions: user?.userData?.permissions,
  };

  window.localStorage.setItem("user", JSON.stringify(localUser));
  
  const TratedUser = user;
  /* Por si se debe mover algun dato antes de guardar */

  window.localStorage.setItem("user2", JSON.stringify(TratedUser));

  const handleGoogleLogin = async (): Promise<void> => {

    try {
      const result: UserCredential = await signInWithPopup(auth, provider);
      const user = result.user;
      dispatch(createUser(user)) && console.log(user);

      //LOCAL STORAGE USER INTERFACE
      let localUser = {
        usernname: user.displayName,
        user_email: user.email,
        role: "owner",
      };
      window.localStorage.setItem("user", JSON.stringify(localUser));
      //LOCAL STORAGE USER INTERFACE
      console.log(user);
      navigate("/");
    } catch (error) {
      console.error("Error durante el inicio de sesión con Google:", error);
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

  const handleSignOut = async (): Promise<void> => {
    try {
      await signOut(auth);
      window.localStorage.clear();
    } catch (error) {
      console.error("Error durante la desconexión:", error);
    }
    // try {
    //   await signOut(auth);
    //   window.localStorage.clear("user");
    // } catch (error) {
    //   console.error("Error during sign-out:", error);
    // }
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
            <button className="loginButton" type="submit">
              {registration ? "Log out" : "Log in"}
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
            <p>
              You can also log in with your <strong>Google account</strong>
            </p>

            {user ? (
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
                {user.provider === "password" && (
                  <button type="button" onClick={handleSignOut}>
                    Log out
                  </button>
                )}
                {user.provider === "google.com" && (
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
            {user && user.provider === "password" && (
              <p>
                You have successfully connected with the email:{" "}
                <b>{user.email}</b>
              </p>
            )}
            {user && user.provider === "google.com" && (
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
