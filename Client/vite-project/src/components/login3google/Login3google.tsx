import React, { useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import configFirebase from "./ConfigFirebase";

const auth = getAuth(configFirebase);
const provider = new GoogleAuthProvider();

const LoginFirebase: React.FC = () => {
  const [user, setUser] = useState(null);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      {user ? (
        <p>¡Bienvenido, {user.displayName}!</p>
      ) : (
        <button onClick={handleGoogleLogin}>Iniciar sesión con Google</button>
      )}
    </div>
  );
};

export default LoginFirebase;
