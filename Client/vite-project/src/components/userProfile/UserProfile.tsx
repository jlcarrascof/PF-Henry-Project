import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cloudinary from "../cloudinary/Cloudinary";
import { getUserById, updateUser } from "../../Redux/Actions/actions";
import Modal from "../modal/Modal";
import "./UserProfile.css";
import { validation } from "./UserValidation";
import EditIcon from "../icons/EditIcon";

const UserDisplay = (initialuser: any) => (
  <div className="userProfile">
    <h1 className="edit-message">Edit Data</h1>
    <p>
      <strong>First Name:</strong> {initialuser?.firstName}
    </p>
    <p>
      <strong>Last Name:</strong> {initialuser?.lastName}
    </p>
    <p>
      <strong>Email:</strong> {initialuser?.email}
    </p>
    <p>
      <strong>Password:</strong> {initialuser?.password}
    </p>
    <p>
      <strong>Phone:</strong> {initialuser?.phoneNumber}
    </p>
  </div>
);

const UserEdit = ({ user, handleChange, errors }) => (
  <div className="edit-user">
    <div className="flexUser">
      <div className="flexItem">
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
        />
        {errors && errors.firstName && (
          <p className="errorForm">{errors.firstName}</p>
        )}
      </div>
      <div className="flexItem">
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={user.lastName}
          onChange={handleChange}
        />
        {errors && errors.lastName && (
          <p className="errorForm">{errors.lastName}</p>
        )}
      </div>
    </div>

    <div className="flexUser">
      <div className="flexItem">
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        {errors && errors.password && (
          <p className="errorForm">{errors.password}</p>
        )}
      </div>
      <div className="flexItem">
        <label>Repeat Password:</label>
        <input
          type="password"
          name="repeatPassword"
          value={user.repeatPassword}
          onChange={handleChange}
        />
        {errors && errors.repeatPassword && (
          <p className="errorForm">{errors.repeatPassword}</p>
        )}
      </div>
    </div>

    <label>Email:</label>
    <input
      type="text"
      name="email"
      value={user.email}
      onChange={handleChange}
    />
    {errors && errors.email && <p className="errorForm">{errors.email}</p>}

    <label>Phone:</label>
    <input
      type="text"
      name="phoneNumber"
      value={user.phoneNumber}
      onChange={handleChange}
    />
    {errors && errors.phone && <p className="errorForm">{errors.phone}</p>}
  </div>
);

let DataToSend: { [key: string]: string } = {};
let UsuarioI;

const UserProfile = () => {
  const UserData = localStorage.getItem("user2");
  let usuario;
  if (UserData && UserData !== "") {
    usuario = JSON.parse(UserData);
    console.log(usuario);
  } else usuario = {};
  UsuarioI = usuario?.userData;
  /* const usuario = useSelector((state: any) => {
    console.log("DBG_state user", state);
    return state.user
  });  */

  const initialuser = {
    username: usuario?.userData?.username,
    email: usuario?.userData?.user_email,
    firstName: usuario?.userData?.profile.firstName,
    lastName: usuario?.userData?.profile.lastName,
    phoneNumber: usuario?.userData?.phone,
    password: usuario?.userData?.password,
    imageUrl: usuario?.userData?.image,
    permissions: usuario?.userData?.permissions,
    _id: usuario?.userData?._id,
    repeatPassword: "",
  };

  const [user, setuser] = useState(initialuser);
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleEdit = (field) => {
    console.log(`Edit ${field}`);
    setEditMode(true);
  };

  const handleClose = () => {
    console.log("Cerrar formulario");
    setEditMode(false);
  };

  const handleUpdate = (id: string, prevData: any) => {
    const validationErrors = validation({
      email: user.email,
      password: user.password,
      repeatPassword: user.repeatPassword,
      phone: user.phoneNumber,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    console.log("Update user data");
    setEditMode(false);
    setShowModal(true);
    /*
    username:
    usuario:
    user_email:
    password:
    image:
    role:
    permissions:
    profile: {
      firstName: String,
      lastName: String,
      dateOfBirth: Date,
    },
    phone:
    reservation:
    favorites:
    */
    console.log("Data to view", DataToSend, user);
    let usuario = UsuarioI;
    let UserToSend = usuario;
    UserToSend.username = DataToSend.username ?? usuario.username;
    UserToSend.user_email = DataToSend.email ?? usuario.user_email;
    UserToSend.password = DataToSend.password ?? usuario.password;
    UserToSend.image = DataToSend.imageUrl ?? usuario.image;
    console.log("user object", usuario);
    UserToSend.profile = {
      firstName: DataToSend.firstName ?? usuario.profile.firstName,
      lastName: DataToSend.lastName ?? usuario.profile.lastName,
      dateOfBirth: usuario.profile?.dateOfBirth ?? "11/03/2000",
    };
    UserToSend.phone = Number(DataToSend.phoneNumber) ?? usuario.phone;
    console.log("to send user object", id, UserToSend);
    dispatch(updateUser(usuario._id, UserToSend));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Aplicar validaciones en tiempo real
    const validationErrors = validation({
      ...user,
      [name]: value,
    });

    setErrors(validationErrors);

    DataToSend[name] = value;
    setuser((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleModalClose = () => {
    setShowModal(false);
    setuser(initialuser);
  };

  return (
    <div className="user-profile-container">
      <div className="user-data">
        <div className="user-data-info">
          <h3>{user.username}</h3>
          {editMode ? (
            <>
              <div className="cloudinary-section">
                <Cloudinary
                  imageUrl={user.imageUrl}
                  onImageChange={(newImageUrl) => {
                    DataToSend["imageUrl"] = newImageUrl;
                    setuser((prevData) => ({
                      ...prevData,
                      imageUrl: newImageUrl,
                    }));
                  }}
                />
              </div>
              <UserEdit
                user={user}
                handleChange={handleChange}
                errors={errors}
              />
              <div className="user-data">
                <button className="update-button" onClick={handleClose}>
                  Update
                </button>
              </div>
            </>
          ) : (
            <UserDisplay {...user} />
          )}
        </div>
        <span className="edit-icon" onClick={() => handleEdit("data")}>
          <EditIcon />
        </span>
        {editMode && (
          <>
            <span className="close-icon" onClick={handleClose}>
              {/* <img src="url_del_icono" alt="Close" /> */}
              {/* Close */}
            </span>
          </>
        )}
      </div>

      {/* {editMode && (
        
      )} */}

      {showModal && (
        <Modal isOpen={showModal} onClose={handleModalClose} title="Success">
          <p>Your data has been edited</p>
        </Modal>
      )}
    </div>
  );
};

export default UserProfile;
