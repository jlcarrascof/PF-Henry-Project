import React, { useState, useEffect } from "react";
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

