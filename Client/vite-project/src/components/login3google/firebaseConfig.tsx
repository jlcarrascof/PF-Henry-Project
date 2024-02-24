import { initializeApp, FirebaseOptions } from 'firebase/app';
const firebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyA2Vt2wAiR-Ct_sxPMK2rSzfRaSt3Njapg",
    authDomain: "rentify-login-ecead.firebaseapp.com",
    projectId: "rentify-login-ecead",
    storageBucket: "rentify-login-ecead.appspot.com",
    messagingSenderId: "863619983417",
    appId: "1:863619983417:web:4c761b109e93ea4271c5e8",
    measurementId: "G-60NWD1T4B2"
};

const app = initializeApp(firebaseConfig);

export default app;

