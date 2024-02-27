import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, User, signOut, UserCredential } from 'firebase/auth';
import firebaseApp from './firebaseConfig';
import "./Login.modules.css";

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

const Login: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [registration, setRegistration] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
      if (userFirebase) {
        setUser(userFirebase);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const firebaseAuthentication = async (e: React.FormEvent<HTMLFormElement>) => {
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
      console.error('Error during Firebase authentication:', error);
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
      <div className="userFirebase">
        <div className="padreFirebase">
          <form onSubmit={firebaseAuthentication}>
            <input type="text" placeholder="Enter your email" className="cajaTexto" id="email" />
            <input type="password" placeholder="Enter your password" className="cajaTexto" id="password" />
            <button>{registration ? "Sign up" : "Log in"}</button>
          </form>
          <div className="estilos-google">
            <p> {registration ? "Already have an account?" : "Don't have an account?"}
            <button onClick={() => setRegistration(!registration)}>{registration ? "Log in" : "Sign up"}</button></p>
          </div>
        </div>
      </div>

      <div className="auth-status">
        <div className="button-google">
          <div className="card card-body">
            {isLoggedIn ? (
              <p>If you want to disconnect, click on <strong>Log out</strong></p>
            ) : (
              <p>You can also log in with your <strong>Google account</strong></p>
            )}
            {!user ? (
              <button type="button" onClick={handleGoogleLogin}><img className="estilo-profile" src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" alt="Google logo" />Continue with Google</button>
            ) : (
              <div className="">
                {user.providerData[0].providerId === "password" && (
                  <button type="button" onClick={handleSignOut}>Log out</button>
                )}
                {user.providerData[0].providerId === "google.com" && (
                  <button type="button" onClick={handleSignOut}><img className="estilo-profile" src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" alt="Google logo" />Log out</button>
                )}
              </div>
            )}
            {user && user.providerData[0].providerId === "password" && (
              <p>You have successfully connected with the email: <b>{user.email}</b></p>
            )}
            {user && user.providerData[0].providerId === "google.com" && (
              <p>User connected: <b>{user.displayName}</b></p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
