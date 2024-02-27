import { useState, useEffect } from "react";


import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, User, signOut, UserCredential } from 'firebase/auth';
import firebaseApp from './firebaseConfig';
import "./Login.modules.css"

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

const Login: React.FC = () => {


const [user, setUser] = useState(null);

onAuthStateChanged(auth, (userFirebase) => {
  if(userFirebase){
    setUser(userFirebase);
  }
  else{
    setUser(null);
  }
})

const [registration, setRegistration] = useState(false);

const firebaseAuthentication = async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;
  console.log(email);

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


  return (
    <>
      <div className="userFirebase">
        <div className="padreFirebase">
          <form onSubmit={firebaseAuthentication}>
            <input type="text" placeholder="Enter your email" className="cajatexto" id="email"/>
            <input type="password" placeholder="Enter your password" className="cajatexto" id="password"/>
            <button className="btnform">{registration ? "Sign up" : "Log in"}</button>
          </form>
          <h4>{registration ? "Already have an account?" : "Don't have an account?"}<button onClick={() => setRegistration(!registration)}>{registration ? "Log in" : "Sign up"}</button></h4>
        </div>
      </div>
  
      <div className="auth-status">
        <div className="padre">
          <div className="card card-body">
            <h4>Quick start</h4>
            {!user ? (
              <button type="button" onClick={handleGoogleLogin}><img className="estilo-profile" src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" alt="Google logo" />Continue with Google</button>
            ) : (
              <button type="button" onClick={handleSignOut}><img className="estilo-profile" src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" alt="Google logo" />Log out</button>
            )}
          </div>
          <div className="auth-status">
            {user ? (
              <p>User connected: <b>{user.displayName}</b></p>
            ) : (
              <p>You're not logged in <strong>Google</strong></p>
            )}
          </div>
        </div>
      </div>
    </>
  );
  ;
};

export default Login;
