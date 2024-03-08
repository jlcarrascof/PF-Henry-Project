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
import swal from 'sweetalert'
import styled from 'styled-components'

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ContenedorModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  z-index: 1001;
`;

const Encabezado = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
`;

const LoginButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;
const Login: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const [registration, setRegistration] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
      if (userFirebase) {
        const userData = {
          uid: userFirebase.uid,
          email: userFirebase.email,
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

  useEffect(() => {
    if (user) {
      axios
        .post("http://localhost:3002/users/authenticate", user)
        .then((response) => {
          console.log("Información del usuario enviada al backend:", response);
        })
        .catch((error) => {
          console.error("Error al enviar información del usuario al backend:", error);
        });
    }
  }, [user]);

  const firebaseAuthentication = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    try {
      if (!email || !password) {
        console.error("Correo electrónico y contraseña son obligatorios.");
        return;
      }

      if (registration) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      console.error("Error durante la autenticación de Firebase:", error);
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
        role: 'owner'
      }
      window.localStorage.setItem('user', JSON.stringify(localUser))
      //LOCAL STORAGE USER INTERFACE
      console.log(user);
      navigate('/')
    } catch (error) {
      console.error("Error durante el inicio de sesión con Google:", error);
    }
  };

  const handleSignOut = async (): Promise<void> => {
    try {
      await signOut(auth);
      window.localStorage.clear('user')
    } catch (error) {
      console.error("Error durante la desconexión:", error);
    }
  };

  return (
    <>
      {showModal && (
        <Overlay>
          <ContenedorModal>
            <Encabezado>
              <LoginButton>Login</LoginButton>
              <LoginButton onClick={() => setShowModal(false)}>x</LoginButton>
            </Encabezado>
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
          </ContenedorModal>
        </Overlay>
      )}
    </>
  );
};

export default Login;
