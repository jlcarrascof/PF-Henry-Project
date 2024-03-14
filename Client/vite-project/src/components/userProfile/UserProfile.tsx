import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cloudinary from "../cloudinary/Cloudinary";
import { getUserById, updateUser } from "../../Redux/Actions/actions";
import Modal from "../modal/Modal";
import "./UserProfile.css";
import { validation } from "./UserValidation";

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
  <>
    <label>First Name:</label>
    <input
      type="text"
      name="firstName"
      value={user.firstName}
      onChange={handleChange}
    />
    {errors && errors.firstName && (
      <p className="error-message">{errors.firstName}</p>
    )}

    <label>Last Name:</label>
    <input
      type="text"
      name="lastName"
      value={user.lastName}
      onChange={handleChange}
    />
    {errors && errors.lastName && (
      <p className="error-message">{errors.lastName}</p>
    )}

    <label>Email:</label>
    <input
      type="text"
      name="email"
      value={user.email}
      onChange={handleChange}
    />
    {errors && errors.email && <p className="error-message">{errors.email}</p>}
    <label>Password:</label>
    <input
      type="password"
      name="password"
      value={user.password}
      onChange={handleChange}
    />
    {errors && errors.password && (
      <p className="error-message">{errors.password}</p>
    )}
    <label>Repeat Password:</label>
    <input
      type="password"
      name="repeatPassword"
      value={user.repeatPassword}
      onChange={handleChange}
    />
    {errors && errors.repeatPassword && (
      <p className="error-message">{errors.repeatPassword}</p>
    )}
    <label>Phone:</label>
    <input
      type="text"
      name="phoneNumber"
      value={user.phoneNumber}
      onChange={handleChange}
    />
    {errors && errors.phone && <p className="error-message">{errors.phone}</p>}
  </>
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
              <UserEdit
                user={user}
                handleChange={handleChange}
                errors={errors}
              />

              <div className="cloudinary-section">
                <div className="edita2-message">Edit image</div>
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
            </>
          ) : (
            <UserDisplay {...user} />
          )}
        </div>
        <span className="edit-icon" onClick={() => handleEdit("data")}>
          <img src="url_del_icono" alt="Edit" />
        </span>
        {editMode && (
          <>
            <span className="edit-icon" onClick={handleClose}>
              <img src="url_del_icono" alt="Close" />
            </span>
          </>
        )}
      </div>

      {editMode && (
        <div className="user-data">
          <button className="update-button" onClick={handleClose}>
            Update
          </button>
        </div>
      )}

      {showModal && (
        <Modal isOpen={showModal} onClose={handleModalClose} title="Success">
          <p>Your data has been edited</p>
        </Modal>
      )}
    </div>
  );
};

export default UserProfile;







