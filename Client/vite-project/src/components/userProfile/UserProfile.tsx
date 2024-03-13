import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Cloudinary from "../cloudinary/Cloudinary";
import { updateUser } from "../../Redux/Actions/actions";
import Modal from "../modal/Modal";
import "./UserProfile.css";
import { validation } from "./UserValidation";

const UserDisplay = (initialuser: any) => (
  <>
    <div className="edit-message">𝗘𝗱𝗶𝘁 𝗗𝗮𝘁𝗮</div>
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
  </>
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
    {errors && errors.email && (
      <p className="error-message">{errors.email}</p>
    )}
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
    {errors && errors.phone && (
      <p className="error-message">{errors.phone}</p>
    )}
  </>
);

const UserProfile = () => {
  
  const usuario = useSelector((state: any) => state.user);

  useEffect(()=> {
    dispatch(getUsers())
  }, [])

  const initialuser = {
    username: usuario?.userData?.username,
    email: usuario?.userData?.user_email,
    firstName: usuario?.userData?.profile.firstName,
    lastName: usuario?.userData?.profile.lastName,
    phoneNumber: usuario?.userData?.phone,
    password: usuario?.userData?.password,
    imageUrl: usuario?.userData?.image,
    permissions: usuario?.userData?.permissions,
    id: usuario?.userData?._id,
    repeatPassword: "",
  }

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

  const handleUpdate = (id: string) => {
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
    dispatch(updateUser(id))
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Aplicar validaciones en tiempo real
    const validationErrors = validation({
      ...user,
      [name]: value,
    });

    setErrors(validationErrors);

    setuser((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleModalClose = () => {
    setShowModal(false);
    setuser(initialuser); 
  };

  return (
    <div className="user-profile-container">
      <div className="cloudinary-section">
      <div className="edita2-message">𝗘𝗱𝗶𝘁 𝗜𝗺𝗮𝗴𝗲</div>
        <Cloudinary
          imageUrl={user.imageUrl}
          onImageChange={(newImageUrl) => setuser((prevData) => ({ ...prevData, imageUrl: newImageUrl }))}
        />
      </div>

      <div className="separator"></div>

      <div className="user-data">
        <div className="user-data-info">
          <h3>{user.username}</h3>
          {editMode ? (
            <UserEdit user={user} handleChange={handleChange} errors={errors} />
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
