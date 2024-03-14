import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  User,
  signOut,
  UserCredential,
} from "firebase/auth";
import { authenticateUser, createUser } from "../../Redux/Actions/actions";
import "./Login.css";
import app from "./firebaseConfig";
import { State } from "../../Redux/Reducer/reducer";
import { Modal, Switch } from "antd";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

let Executed = false;

export const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: State) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("client");

  const [registration, setRegistration] = useState(false);

  const firebaseAuthentication = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
  
    console.log("Valor del estado antes del dispatch", user)
    const email = e.target.email.value;
    const password = e.target.password.value;
  
    try {
      await dispatch(authenticateUser(email, password));
      if(localUser && localUser !== undefined) {
        const lastVisitedPage = localStorage.getItem('lastVisitedPage');
        if (lastVisitedPage){
          navigate(lastVisitedPage)
        } else {
          navigate("/")
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  const localUser = {
    message: user?.Message,
    username: user?.userData?.username,
    user_email: user?.userData?.user_email,
    profile: user?.userData?.profile,
    phone: user?.userData?.phone,
    image: user?.userData?.image,
    _id: user?.userData?._id,
    role: user?.userData?.role,
    permissions: user?.userData?.permissions,
  };
  if (!Executed) {
    window.localStorage.setItem("user2", JSON.stringify(user));
    Executed = true;
  }
  localStorage.setItem("user", JSON.stringify(localUser));
  
  console.log("LocalUser es:", localUser)


  const handleGoogleLogin = async (userGoogle: any): Promise<void> => {
    setIsModalOpen(true);
    try {
      const create = dispatch(createUser(userGoogle))
      let existingUser = create?.error

      if (existingUser && existingUser !== undefined) {
       await signInWithPopup(auth, provider);
       console.log("Solucionado y logueado")
      }
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

  const handleOk = async () => {
    try {
      setIsModalOpen(false);
      const result: UserCredential = await signInWithPopup(auth, provider);
  
      const user = result.user;
        const userGoogle = {
          username: user.displayName,
          user_email: user.email,
          role: selectedRole,
          image: user.photoURL,
        };
      
      localStorage.setItem("user", JSON.stringify(userGoogle));
      navigate("/");
      window.location.reload();

    } catch (error) {
      console.log("Error handleOk")
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleRoleChange = (checked: boolean, role: string) => {
    console.log("ChangeRol", checked, role);
    setSelectedRole(checked ? role : "client");
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
