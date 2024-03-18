import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { validation } from "./RegValidation";
import "./Register.modules.css";
import Cloudinary from "../cloudinary/Cloudinary";
import { createUser } from "../../Redux/Actions/actions";
import emailjs from "@emailjs/browser";
import app from "../login/firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Switch } from "antd";

import { format, differenceInYears } from "date-fns";

interface RegisterProps {
  onSubmit: (formData: FormData) => void;
}

interface FormData {
  username: string;
  user_email: string;
  password: string;
  repeatPassword: string;
  role: string;
  permissions: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  image?: string;
}

interface Values {
  user_email: string;
  message: string;
}

const Register: React.FC<RegisterProps> = ({ onSubmit }) => {
  const auth = getAuth(app);
  const [values, setValues] = useState<Values>({
    user_email: "",
    message:
      "Oh, it's someone new!! Welcome to Rentify, the best app where you don't have to worry about spending hours looking for a hotel to go! We are so glad to have you with us :D",
  });
  const initialFormData: FormData = {
    username: "",
    user_email: values.user_email,
    password: "",
    repeatPassword: "",
    role: "client",
    permissions: "read/write",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phone: "",
    //message: values.message
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useRef<HTMLFormElement>();

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setValues((prevData) => ({ ...prevData, [name]: value }));

    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));

    const fieldErrors = validation({ ...formData, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, ...fieldErrors }));
  };

  const handleRoleChange = (checked: boolean, role: string) => {
    const newRole = checked ? role : "";
    setFormData((prevData) => ({ ...prevData, role: newRole }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (!form.current) return;

    // emailjs
    //   .sendForm("service_7ocfmjp", "template_l1f8bz9", form.current, {
    //     publicKey: "b645crolwMFi4MBSX",
    //   })
    //   .then(
    //     () => {
    //       console.log("SUCCESS!");
    //       navigate("/login");
    //     },
    //     (error) => {
    //       console.log("FAILED...", error.text);
    //     }
    //   );
    const formErrors = validation(formData);
    setErrors(formErrors);

    // if (!Object.keys(formErrors)) {
    try {
      const email = e.target.emailReg.value;
      const password = e.target.passwordReg.value;
      console.log(formData);
      const backResponse = await dispatch(createUser(formData));
      if (!backResponse) {
        return;
      }
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login");

      setIsRegistered(true);
      setFormData(initialFormData);
      setErrors({});

      // Establecer isRegistered después de limpiar el formulario
      setTimeout(() => {
        setIsRegistered(false);
      }, 2000); // Espera 2 segundos antes de quitar el mensaje de registro exitoso
    } catch (error) {
      console.log("Error en el registro:", error);
    }
    // if (isRegistered) {
    //   navigate("/login");
    // } else {
    //   alert("An error occured on your registration");
    // }

    // Establecer isRegistered después de limpiar el formulario
  };

  return (
    <div className="allRegister">
      <div className="register-container">
        <h1>Register now!</h1>
        {isRegistered && <p>Registro exitoso. Redirigiendo...</p>}
        <form ref={form} onSubmit={handleSubmit}>
          <label>Upload your user image:</label>
          <Cloudinary
            onImageChange={(newImageUrl) =>
              setFormData((prevData) => ({ ...prevData, image: newImageUrl }))
            }
          />

          <div className="label-datos">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && <p>{errors.username}</p>}
          </div>

          <div className="label-datos">
            <label>First name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            {errors.firstName && <p>{errors.firstName}</p>}
          </div>

          <div className="label-datos">
            <label>Last name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            {errors.lastName && <p>{errors.lastName}</p>}
          </div>

          <div className="label-datos">
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
            {errors.dateOfBirth && <p>{errors.dateOfBirth}</p>}
          </div>

          <div className="label-datos">
            <label>Phone number:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && <p>{errors.phone}</p>}
          </div>

          <div className="label-datos">
            <label>Email:</label>

            <input
              id="emailReg"
              type="text"
              name="user_email"
              value={values.user_email}
              onChange={handleChange}
              required
            />
            {/* {errors.email && <p>{errors.email}</p>} */}
          </div>

          <div className="label-datos">
            <label>Password:</label>
            <input
              id="passwordReg"
              type="password" // Cambiado a 'password' para ocultar la contraseña
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p>{errors.password}</p>}
          </div>

          <div className="label-datos">
            <label>Repeat password:</label>
            <input
              type="password" // Cambiado a 'password' para ocultar la contraseña
              name="repeatPassword"
              value={formData.repeatPassword}
              onChange={handleChange}
              required
            />
            {errors.repeatPassword && (
              <p>{formData.repeatPassword && "Passwords must match"}</p>
            )}
          </div>

          {/* <div className="label-datos">
            <label>Role:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleRoleChange}
            >
              <option value="client">Client</option>
              <option value="owner">Owner</option>
            </select>
          </div> */}

          <div className="label-datos">
            <label>Role:</label>
            <div style={{ display: "flex" }}>
              <div>
                <label style={{ marginRight: "10px" }}>Owner</label>
                <Switch
                  checked={formData.role === "owner"} // Utiliza checked en lugar de defaultChecked
                  onChange={(checked) => handleRoleChange(checked, "owner")}
                />
              </div>
              <div>
                <label style={{ marginRight: "10px" }}>Client</label>
                <Switch
                  checked={formData.role === "client"} // Utiliza checked en lugar de defaultChecked
                  onChange={(checked) => handleRoleChange(checked, "client")}
                />
              </div>
            </div>
          </div>

          <input
            className="messageInput"
            name="message"
            value={values.message}
          ></input>

          <button className="register-button" type="submit">
            Register
          </button>

          <Link to="/rooms" className="rooms-link">
            <span className="rooms-span">Check rooms</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
