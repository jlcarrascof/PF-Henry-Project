import React, { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, AuthError } from 'firebase/auth';
import configFirebase from './ConfigFirebase';

const auth = getAuth();

const provider = new GoogleAuthProvider();

const Login3Google: React.FC = () => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
    } catch (error: any) {
      if (error instanceof AuthError) {
        setError(error.message);
      } else {
        setError("An error occurred");
      }
    }
  };

  return (
    <div>
      {user ? (
        <p>Welcome, {user.displayName}!</p>
      ) : (
        <>
          {error && <p>{error}</p>}
          <button onClick={handleGoogleLogin}>Sign in with Google</button>
        </>
      )}
    </div>
  );
};

export default Login3Google;
