// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   getAuth,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   signInWithPopup,
//   GoogleAuthProvider,
//   User,
//   signOut,
//   UserCredential,
//   EmailAuthCredential,
// } from "firebase/auth";
// import firebaseApp from "./firebaseConfig";
// import { authenticateUser, createUser } from "../../Redux/Actions/actions";
// import "./Login.css";
// import Register from "../register/Register";
// import app from "./firebaseConfig";
// import { State } from "../../Redux/Reducer/reducer";
// import { Button, Modal, Switch } from "antd";

// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

// export default function Login(): React.FC  {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const user = useSelector((state: State) => state.user);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedRole, setSelectedRole] = useState("client");

//   const handleRoleChange = (checked: boolean, role: string) => {
//     setSelectedRole(checked ? role : "client");
//   };

//   const [registration, setRegistration] = useState(false);

//   // const firebaseAuthentication = async (
//   //   e: React.FormEvent<HTMLFormElement>
//   // ) => {
//   //   e.preventDefault();

//   //   const email = e.target.email.value;
//   //   const password = e.target.password.value;
//   //     try {
//   //       await dispatch(authenticateUser(email, password));
//   //       // await signInWithEmailAndPassword(auth, email, password)
//   //       const localUser = {
//   //         message: user?.Message,
//   //         username: user?.userData?.username,
//   //         user_email: user?.userData?.user_email,
//   //         image: user?.userData?.image,
//   //         _id: user?.userData?._id,
//   //         role: user?.userData?.role,
//   //         permissions: user?.userData?.permissions,
//   //       };

//   //       window.localStorage.setItem("user", JSON.stringify(localUser));
//   //       window.location.href='/';
//   //     navigate("/");
//   //     } catch (error) {
//   //       console.error("Error during login:", error);
//   //     }
//   //   // }
//   // };
//   const firebaseAuthentication = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const email = e.target.email.value;
//     const password = e.target.password.value;
//     if (email && password) {

//     try {
//       // Realiza la autenticación

//       // const user = useSelector((state:State) => state.user)

//       await dispatch(authenticateUser(email, password));
//         // Guarda el usuario en el almacenamiento local
//         const localUser = {
//           message: user.Message,
//           username: user.userData.username,
//           user_email: user.userData.user_email,
//           password: user.userData.password,
//           image: user.userData.image,
//           _id: user.userData._id,
//           role: user.userData.role,
//           permissions: user.userData.permissions,
//         };

//         window.localStorage.setItem("user", JSON.stringify(localUser));

//         // Redirige después de guardar en localStorage
//         window.location.href = '/';

//     } catch (error) {
//       console.error("Error durante el inicio de sesión:", error);
//     }
//   }
// }
//   // useEffect(() => {
//   //   console.log("user login", user);
//   //   if (user) {

//   //   }
//   // }, [user]);

//   const handleGoogleLogin = async (): Promise<void> => {
//     try {
//       const result: UserCredential = await signInWithPopup(auth, provider);
//       const user = result.user;
//       const userGoogle = {
//         username: user.displayName,
//         user_email: user.email,
//         role: selectedRole,
//         image: user.photoURL,
//       };

//       dispatch(createUser(userGoogle)) && console.log(user);
//       // && dispatch(authenticateUser(user));
//       window.localStorage.setItem("user", JSON.stringify(userGoogle))

//       setIsModalOpen(true);

//       // window.location.href='/'  //A
//       // navigate("/");

//     } catch (error) {
//       console.error("Error durante el inicio de sesión con Google:", error);
//     }
//   };

//   console.log(user);

//   const handleSignOut = async (): Promise<void> => {
//     try {
//       await signOut(auth);
//       window.localStorage.clear();
//     } catch (error) {
//       console.error("Error durante la desconexión:", error);
//     }
//   };

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleOk = () => {
//     setIsModalOpen(false);
//     navigate("/");
//     window.location.reload();

//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//     navigate("/");
//     window.location.reload();

//   };

//   return (
//     <>
//       <div className="userFirebase">
//         <div className="padreFirebase">
//           <h1>Welcome to <span className="purple">Rentify!</span></h1>
//           <form onSubmit={firebaseAuthentication}>
//             <label> Email: </label>
//             <input
//               type="text"
//               placeholder="myexample@gmail.com"
//               className="cajaTexto"
//               id="email"
//             />
//             <label> Password: </label>
//             <input
//               type="password"
//               placeholder="Enter your password"
//               className="cajaTexto"
//               id="password"
//             />
//             <button className="loginButton" type="submit">
//               {registration ? "Log out" : "Log in"}
//             </button>
//           </form>
//           <div className="estilos-google">
//             {/* <p>
//               {" "}
//               {registration ? "Already have an account?" : ""}
//               <button onClick={() => setRegistration(!registration)}>
//                 {registration ? "Log in" : ""}
//               </button>
//             </p> */}
//           </div>
//           <div className="card-body">
//             <p>
//               You can also log in with your <strong>Google account</strong>
// </p>

//             {/* {user ? ( */}
//               <button
//                 className="googleButton"
//                 type="button"
//                 onClick={handleGoogleLogin}
//               >
//                 <img
//                   className="estilo-profile"
//                   src="https://res.cloudinary.com/dqh2illb5/image/upload/v1709152706/login/qledtqlcwqfmqlh9zhe4.png"
//                   alt="Google logo"
//                 />
//                 <strong>Continue with Google</strong>
//               </button>
//              {/* ) : (  */}
//               {/* <div className="googleTime"> */}
//                 {/* {user.provider === "password" && ( */}
//                   {/* <button type="button" onClick={handleSignOut}>
//                     Log out
//                   </button> */}
//                 {/* )} */}
//                 {/* {user.provider === "google.com" && ( */}
//                   {/* <button
//                     className="googleButton"
//                     type="button"
//                     onClick={handleSignOut}
//                   >
//                     <img
//                       className="estilo-profile"
//                       src="https://res.cloudinary.com/dqh2illb5/image/upload/v1709152706/login/qledtqlcwqfmqlh9zhe4.png"
//                       alt="Google logo"
//                     />
//                     Log out
//                   </button> */}
//                 {/* )} */}
//               {/* </div> */}
//             {/* )} */}
//             {/* {user && user.provider === "password" && ( */}
//               {/* <p>
//                 You have successfully connected with the email:{" "}
//                 <b>{user.email}</b>
//               </p> */}
//             {/* )} */}
//             {/* {user && user.provider === "google.com" && ( */}
//               {/* <p>
//                 User connected: <b>{user.displayName}</b>
//               </p> */}
//             {/* )} */}
//             <Link to="/register">
//               <p className="purple">Don't have an account? Sign up!</p>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* {user && <Register />} */}

//       <Modal
//         title="Select Role"
//         visible={isModalOpen}
//         onOk={handleOk}
//         onCancel={handleCancel}
//       >
//         <p>Select your role here</p>
//         <div style={{ display: "flex" }}>
//           <div>
//             <label style={{ marginRight: "10px" }}>Owner</label>
//             <Switch
//               checked={selectedRole === "owner"}
//               onChange={(checked) => handleRoleChange(checked, "owner")}
//             />
//           </div>
//           <div>
//             <label style={{ marginRight: "10px" }}>Client</label>
//             <Switch
//               checked={selectedRole === "client"}
//               onChange={(checked) => handleRoleChange(checked, "client")}
//             />
//           </div>
//         </div>
//       </Modal>

//     </>
//   )
// }

// // export default Login;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
  EmailAuthCredential,
} from "firebase/auth";
import firebaseApp from "./firebaseConfig";
import { authenticateUser, createUser } from "../../Redux/Actions/actions";
import "./Login.css";
import Register from "../register/Register";
import app from "./firebaseConfig";
import { State } from "../../Redux/Reducer/reducer";
import { Button, Modal, Switch } from "antd";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

interface LoginProps {
  setTheUser: React.Dispatch<React.SetStateAction<User | null>>;
  theUser: React.Dispatch<React.SetStateAction<User | null>>;
}
export const Login: React.FC<LoginProps> = ({ setTheUser, theUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: State) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("client");

  const handleRoleChange = (checked: boolean, role: string) => {
    setSelectedRole(checked ? role : "client");
  };

  const [registration, setRegistration] = useState(false);

  const firebaseAuthentication = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    console.log("Valor del estado antes del dispatch", user);
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      (await dispatch(authenticateUser(email, password))) &&
        (await signInWithEmailAndPassword(auth, email, password));
      if (localUser && localUser !== undefined) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  const localUser = {
    message: user?.Message,
    username: user?.userData?.username,
    user_email: user?.userData?.user_email,
    image: user?.userData?.image,
    _id: user?.userData?._id,
    role: user?.userData?.role,
    permissions: user?.userData?.permissions,
  };
  window.localStorage.setItem("user", JSON.stringify(localUser));

  console.log("LocalUser es:", localUser);

  // useEffect(() => {
  //   console.log("user login", user);
  //   if (user) {

  //   }
  // }, [user]);

  const handleGoogleLogin = async (): Promise<void> => {
    try {
      const result: UserCredential = await signInWithPopup(auth, provider);
      const user = result.user;
      const userGoogle = {
        username: user.displayName,
        user_email: user.email,
        role: selectedRole,
        image: user.photoURL,
      };

      dispatch(createUser(userGoogle)) && console.log(user);
      // && dispatch(authenticateUser(user));
      window.localStorage.setItem("user", JSON.stringify(userGoogle));

      setIsModalOpen(true);

      // window.location.href='/'  //A
      // navigate("/");
    } catch (error) {
      console.error("Error durante el inicio de sesión con Google:", error);
    }
  };

  const handleSignOut = async (): Promise<void> => {
    try {
      await signOut(auth);
      window.localStorage.clear();
    } catch (error) {
      console.error("Error durante la desconexión:", error);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    navigate("/");
    window.location.reload();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <div className="userFirebase">
        <div className="padreFirebase">
          <h1>Welcome to Rentify!</h1>
          <form onSubmit={firebaseAuthentication}>
            <label> Email: </label>
            <input
              type="text"
              placeholder="myexample@gmail.com"
              className="cajaTexto"
              id="email"
            />
            <label> Password: </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="cajaTexto"
              id="password"
            />
            <button
              onSubmit={firebaseAuthentication}
              className="loginButton"
              type="submit"
            >
              {registration ? "Log out" : "Log in"}
            </button>
          </form>
          <div className="estilos-google">
            {/* <p>
              {" "}
              {registration ? "Already have an account?" : ""}
              <button onClick={() => setRegistration(!registration)}>
                {registration ? "Log in" : ""}
              </button>
            </p> */}
          </div>
          <div className="card-body">
            <p>
              You can also log in with your <strong>Google account</strong>
            </p>

            {user ? (
              <button
                className="googleButton"
                type="button"
                onClick={handleGoogleLogin}
              >
                <img
                  className="estilo-profile"
                  src="https://res.cloudinary.com/dqh2illb5/image/upload/v1709152706/login/qledtqlcwqfmqlh9zhe4.png"
                  alt="Google logo"
                />
                <strong>Continue with Google</strong>
              </button>
            ) : (
              <div className="googleTime">
                {/* {user.provider === "password" && ( */}
                <button type="button" onClick={handleSignOut}>
                  Log out
                </button>
                {/* )} */}
                {/* {user.provider === "google.com" && ( */}
                <button
                  className="googleButton"
                  type="button"
                  onClick={handleSignOut}
                >
                  <img
                    className="estilo-profile"
                    src="https://res.cloudinary.com/dqh2illb5/image/upload/v1709152706/login/qledtqlcwqfmqlh9zhe4.png"
                    alt="Google logo"
                  />
                  Log out
                </button>
                {/* )} */}
              </div>
            )}
            {/* {user && user.provider === "password" && ( */}
            {/* <p>
                You have successfully connected with the email:{" "}
                <b>{user.email}</b>
              </p> */}
            {/* )} */}
            {/* {user && user.provider === "google.com" && ( */}
            {/* <p>
                User connected: <b>{user.displayName}</b>
              </p> */}
            {/* )} */}
            <Link to="/register">
              <p>Don't have an account? Sign up!</p>
            </Link>
          </div>
        </div>
      </div>

      {/* {user && <Register />} */}

      <Modal
        title="Select Role"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Select your role here</p>
        <div style={{ display: "flex" }}>
          <div>
            <label style={{ marginRight: "10px" }}>Owner</label>
            <Switch
              checked={selectedRole === "owner"}
              onChange={(checked) => handleRoleChange(checked, "owner")}
            />
          </div>
          <div>
            <label style={{ marginRight: "10px" }}>Client</label>
            <Switch
              checked={selectedRole === "client"}
              onChange={(checked) => handleRoleChange(checked, "client")}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Login;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useHistory } from 'react-router-dom';

// import {
//   getAuth,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   signInWithPopup,
//   GoogleAuthProvider,
//   User,
//   signOut,
//   UserCredential,
//   EmailAuthCredential,
// } from "firebase/auth";
// import firebaseApp from "./firebaseConfig";
// import { authenticateUser, createUser } from "../../Redux/Actions/actions";
// import "./Login.css";
// import Register from "../register/Register";
// import app from "./firebaseConfig";
// import { State } from "../../Redux/Reducer/reducer";

// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

// interface LoginProps {
//   setTheUser: React.Dispatch<React.SetStateAction<User | null>>;
//   theUser: React.Dispatch<React.SetStateAction<User | null>>;
// }
// export const Login: React.FC<LoginProps> = ({ setTheUser, theUser }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const user = useSelector((state: State) => state.user);
//   const [registration, setRegistration] = useState(false);

//   const firebaseAuthentication = async (
//     e: React.FormEvent<HTMLFormElement>
//   ) => {
//     e.preventDefault();
//     const email = e.target.email.value;
//     const password = e.target.password.value;
//     if (email && password) {
//       try {
//         dispatch(authenticateUser(email, password));
//         console.log(user)
//         const localUser = JSON.parse(window.localStorage.getItem("user"))
//         window.localStorage.setItem("user", JSON.stringify(localUser));
//         window.location.href = "/";

//       } catch (error) {
//         console.error("Error during login:", error);
//       }
//     }
//   };
//   // useEffect(() => {
//   //   if (user) {
//   //     console.log("actualicé", user);
//   //   }
//   // }, [user]);

//   const handleGoogleLogin = async (): Promise<void> => {
//     try {
//       const result: UserCredential = await signInWithPopup(auth, provider);
//       // const user = result.user;
//       const user = result.user;

//       dispatch(createUser(user));
//       // let localUser = {
//       //   usernname: user.displayName,
//       //   user_email: user.email,
//       //   role: "owner",
//       // };
//       console.log(user)

//       window.localStorage.setItem("user", JSON.stringify(user));
//       window.location.href = "/";
//     } catch (error) {
//       console.error("Error durante el inicio de sesión con Google:", error);
//     }
//   };

//   const handleSignOut = async (): Promise<void> => {
//     try {
//       await signOut(auth);
//       window.localStorage.clear();
//     } catch (error) {
//       console.error("Error durante la desconexión:", error);
//     }
//   };

//   return (
//     <>
//       <div className="userFirebase">
//         <div className="padreFirebase">
//           <h1>Welcome to Rentify!</h1>
//           <form onSubmit={firebaseAuthentication}>
//             <label> Email: </label>
//             <input
//               type="text"
//               placeholder="myexample@gmail.com"
//               className="cajaTexto"
//               id="email"
//             />
//             <label> Password: </label>
//             <input
//               type="password"
//               placeholder="Enter your password"
//               className="cajaTexto"
//               id="password"
//             />
//             <button className="loginButton" type="submit">
//               {registration ? "Log out" : "Log in"}
//             </button>
//           </form>
//           <div className="estilos-google">
//             {/* <p>
//               {" "}
//               {registration ? "Already have an account?" : ""}
//               <button onClick={() => setRegistration(!registration)}>
//                 {registration ? "Log in" : ""}
//               </button>
//             </p> */}
//           </div>
//           <div className="card-body">
//             <p>
//               You can also log in with your <strong>Google account</strong>
//             </p>

//             {user ? (
//               <button
//                 className="googleButton"
//                 type="button"
//                 onClick={handleGoogleLogin}
//               >
//                 <img
//                   className="estilo-profile"
//                   src="https://res.cloudinary.com/dqh2illb5/image/upload/v1709152706/login/qledtqlcwqfmqlh9zhe4.png"
//                   alt="Google logo"
//                 />
//                 <strong>Continue with Google</strong>
//               </button>
//             ) : (
//               <div className="googleTime">
//                 {user.provider === "password" && (
//                   <button type="button" onClick={handleSignOut}>
//                     Log out
//                   </button>
//                 )}
//                 {user.provider === "google.com" && (
//                   <button
//                     className="googleButton"
//                     type="button"
//                     onClick={handleSignOut}
//                   >
//                     <img
//                       className="estilo-profile"
//                       src="https://res.cloudinary.com/dqh2illb5/image/upload/v1709152706/login/qledtqlcwqfmqlh9zhe4.png"
//                       alt="Google logo"
//                     />
//                     Log out
//                   </button>
//                 )}
//               </div>
//             )}
//             {user && user.provider === "password" && (
//               <p>
//                 You have successfully connected with the email:{" "}
//                 <b>{user.email}</b>
//               </p>
//             )}
//             {user && user.provider === "google.com" && (
//               <p>
//                 User connected: <b>{user.displayName}</b>
//               </p>
//             )}
//             <Link to="/register">
//               <p>Don't have an account? Sign up!</p>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* {user && <Register />} */}
//     </>
//   );
// };
