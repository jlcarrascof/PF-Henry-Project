import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  UserCredential
} from 'firebase/auth';
import firebaseApp from './firebaseConfig';
import { authenticateUser } from '../../Redux/Actions/actions';
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
        setShowModal(true);
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
    e.currentTarget.email.value="";
    e.currentTarget.password.value="";
    try {
      if (!email || !password) {
        console.error("Correo electrónico y contraseña son obligatorios.");
        return;
      }

      if (registration) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const user = result.user;
        if (!user) {
          // Si el usuario es nulo, entonces la autenticación falló
          swal('Invalid email or password. Please try again or press "Sign up" to create a new account.');
        } else if (!user.emailVerified) {
          //swal('An error has occurred, you can try again or authenticate with the alternative method')
          //el proceso de verificación de correo electronico no se encuentra implementado
        }
      }
    } catch (error) {
      console.error('Error during Firebase authentication:', error);
      if(!user){swal('Invalid email or password.', 'Remember that you can also use your Google account.')};

    }
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

  return (
    <>
      (
        <Overlay>
          <ContenedorModal>
            <Encabezado>
              <LoginButton>Login</LoginButton>
              <LoginButton as={Link} to="/rooms">✖️</LoginButton>

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
            </div>
          </ContenedorModal>
        </Overlay>

      )

    </>
  );
};

export default Login;