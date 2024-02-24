//componente login TSX
import {useState} from "react";
import firebase from 'firebase';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword} form "firebase/auth" //onAuthStateChanged estado de auntentificación del login y registro; getAuth modulo de autenticación
// import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect} from "firebase/auth";

//import "./Login2.css";

import configFirebase from "./ConfigFirebase";

//




const auth = getAuth(configFirebase); //autenticación por medio de las credenciales


const LoginFirebase: React.FC = () => {
    const [user, setUser] = useState(null);
    const [userRegister, setUserRegister] = useState(false);

    onAuthStateChanged(auth, (userFirebase) => {
        (async () => {
          if (userFirebase) {
            // El usuario está autenticado.
            // ...
          } else {
            // El usuario no está autenticado.
            // ...
          }
        })();
      });

    
    firebase.initializeApp(configFirebase);

    
};

export default LoginFirebase;