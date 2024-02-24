// Login3google.tsx
import React, { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, UserCredential } from 'firebase/auth';
import firebaseApp from './firebaseConfig';

const auth = getAuth(firebaseApp);

const provider = new GoogleAuthProvider();

const Login3Google: React.FC = () => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async (): Promise<void> => {
    try {
      const result: UserCredential = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      setError(null); // Limpiar cualquier error anterior
    } catch (error) {
      setError('Se produjo un error durante el inicio de sesión');
      console.error('Error durante el inicio de sesión:', error);
    }
  };

  return (
    <div>
      {user ? (
        <p>¡Bienvenido, {user.displayName}!</p>
      ) : (
        <>
          {error && <p>{error}</p>}
          <button onClick={handleGoogleLogin}>Iniciar sesión con Google</button>
        </>
      )}
    </div>
  );
};

export default Login3Google;
