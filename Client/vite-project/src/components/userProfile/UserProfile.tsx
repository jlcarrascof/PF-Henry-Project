import React, { useState } from "react";
import Cloudinary from "../cloudinary/Cloudinary";
import Modal from "../modal/Modal";
import "./UserProfile.css";
import { validation } from "./UserValidation";

const UserDataDisplay = ({ email, password, phoneNumber }) => (
  <>
    <div className="edit-message">𝗘𝗱𝗶𝘁 𝗗𝗮𝘁𝗮</div>
    <p>
      <strong>𝗘𝗺𝗮𝗶𝗹:</strong> {email}
    </p>
    <p>
      <strong>𝗣𝗮𝘀𝘀𝘄𝗼𝗿𝗱:</strong> {password}
    </p>
    <p>
      <strong>𝐏𝐡𝐨𝐧𝐞:</strong> {phoneNumber}
    </p>
  </>
);

const UserDataEdit = ({ userData, handleChange, errors }) => (
  <>
    <label>Email:</label>
    <input
      type="text"
      name="email"
      value={userData.email}
      onChange={handleChange}
    />
    {errors && errors.email && (
      <p className="error-message">{errors.email}</p>
    )}
    <label>Password:</label>
    <input
      type="password"
      name="password"
      value={userData.password}
      onChange={handleChange}
    />
    {errors && errors.password && (
      <p className="error-message">{errors.password}</p>
    )}
    <label>Repeat Password:</label>
    <input
      type="password"
      name="repeatPassword"
      value={userData.repeatPassword}
      onChange={handleChange}
    />
    {errors && errors.repeatPassword && (
      <p className="error-message">{errors.repeatPassword}</p>
    )}
    <label>Phone:</label>
    <input
      type="text"
      name="phoneNumber"
      value={userData.phoneNumber}
      onChange={handleChange}
    />
    {errors && errors.phone && (
      <p className="error-message">{errors.phone}</p>
    )}
  </>
);

const UserProfile = () => {
  const initialUserData = {
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    repeatPassword: "",
    imageUrl: "",
  };

  const [userData, setUserData] = useState(initialUserData);
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

  const handleEdit = (field) => {
    console.log(`Edit ${field}`);
    setEditMode(true);
  };

  const handleClose = () => {
    console.log("Cerrar formulario");
    setEditMode(false);
  };

  const handleUpdate = () => {
    const validationErrors = validation({
      email: userData.email,
      password: userData.password,
      repeatPassword: userData.repeatPassword,
      phone: userData.phoneNumber,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({}); // Limpiar errores si no hay ninguno

    console.log("Update user data");
    setEditMode(false);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Aplicar validaciones en tiempo real
    const validationErrors = validation({
      ...userData,
      [name]: value,
    });

    setErrors(validationErrors);

    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleModalClose = () => {
    setShowModal(false);
    setUserData(initialUserData); // Limpiar el estado después de cerrar el modal
  };

  return (
    <div className="user-profile-container">
      <div className="cloudinary-section">
        <h3>𝗘𝗱𝗶𝘁 𝗜𝗺𝗮𝗴𝗲</h3>
        <Cloudinary
          imageUrl={userData.imageUrl}
          onImageChange={(newImageUrl) => setUserData((prevData) => ({ ...prevData, imageUrl: newImageUrl }))}
        />
      </div>

      <div className="separator"></div>

      <div className="user-data">
        <div className="user-data-info">
          <h3>{userData.username}</h3>
          {editMode ? (
            <UserDataEdit userData={userData} handleChange={handleChange} errors={errors} />
          ) : (
            <UserDataDisplay {...userData} />
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
          <button className="update-button" onClick={handleUpdate}>
            𝐔𝐩𝐝𝐚𝐭𝐞
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







