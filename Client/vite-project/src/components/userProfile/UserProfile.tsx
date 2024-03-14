import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Cloudinary from "../cloudinary/Cloudinary";
import { updateUser } from "../../Redux/Actions/actions";
import Modal from "../modal/Modal";
import "./UserProfile.css";
import { validation } from "./UserValidation";
import EditIcon from "../icons/EditIcon";
import { State } from "../../Redux/Reducer/reducer";

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
  </>
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
      name="phone"
      value={user.phone}
      onChange={handleChange}
    />
    {errors && errors.phone && (
      <p className="error-message">{errors.phone}</p>
    )}
  </>
);

let DataToSend: {[key: string]: string | number | {[key:string]:string}} = {};
let UsuarioI;


const UserProfile = () => {
  const UserData = localStorage.getItem('user');
  let usuario;
  if (UserData && UserData !== '') {
    usuario = JSON.parse(UserData);
  } else usuario = {};
  UsuarioI = usuario;


  function GetInitUser() {
    const initialuser = {
      username: usuario?.username || "",
      email: usuario?.user_email || "",
      firstName: usuario?.profile.firstName || "",
      lastName: usuario?.profile.lastName || "",
      phoneNumber: usuario?.phone || "",
      password: usuario?.password || null,
      image: usuario?.image || "",
      permissions: usuario?.permissions || "",
      _id: usuario?._id || "",
      repeatPassword: "",
    }
    return initialuser;
  }
  const [user, setuser] = useState(GetInitUser());
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  
  const handleEdit = (field) => {
    setEditMode(true);
  };

  const handleClose = () => {
     setEditMode(false);
  };

  const handleUpdate = async (id: string, prevData: any) => {
    
    const validationErrors = validation({
      email: user.email,
      password: user.password,
      repeatPassword: user.repeatPassword,
      phone: user.phoneNumber,
    });
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // return;
    }
    
    setErrors({});
    
    setEditMode(false);
    setShowModal(true);
    let fn = DataToSend.firstName;
    let ln = DataToSend.lastName;
    delete DataToSend.firstName;
    delete DataToSend.lastName;
    delete DataToSend.repeatPassword;
    if (fn) DataToSend['profile.firstName'] = fn;
    if (ln) DataToSend['profile.lastName'] = ln;
    console.log("DTS", DataToSend);

   // const updatedUser = async function 
    try {
       let newUser = await dispatch(updateUser(user._id, DataToSend));
       console.log(newUser, newUser !== null, newUser !== undefined);
       
       if (!newUser) return console.log("X");
        localStorage.setItem("user2", JSON.stringify({userData: newUser}))

        const localUser = {
          username: newUser?.username,
          user_email: newUser?.user_email,
          profile: newUser?.profile,
          phone: newUser?.phone,
          image: newUser?.image,
          _id: newUser?._id,
          role: newUser?.role,
          permissions: newUser?.permissions,
        };

         localStorage.setItem("user", JSON.stringify(localUser))
         usuario = {userData: newUser};
         setuser(GetInitUser());
         window.location.href = "/"
      } catch (error) {
        console.log("papi tenga cuidado", error)
      }
  };
  
    
    const handleChange = (e) => {
    const { name, value } = e.target;

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
      <div className="cloudinary-section">
      <div className="edita2-message">𝗘𝗱𝗶𝘁 𝗜𝗺𝗮𝗴𝗲</div>
        <Cloudinary
          imageUrl={user.image}
          onImageChange={(newImageUrl) => {
            DataToSend['image'] = newImageUrl;
            setuser((prevData) => ({ ...prevData, image: newImageUrl }))
          }}
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
          <EditIcon />
        </span>
        {editMode && (
          <>
            <span className="close-icon" onClick={handleClose}>
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