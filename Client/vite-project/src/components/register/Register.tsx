import React, { useState } from "react";
import { Link } from "react-router-dom";
import { validation } from "./RegValidation";
import "./Register.modules.css";
import Cloudinary from "../cloudinary/Cloudinary";

interface RegisterProps {
  onSubmit: (formData: FormData) => void;
}

interface FormData {
  username: string;
  email: string;
  role: string;
  permissions: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  image?: string;
}

const Register: React.FC<RegisterProps> = ({ onSubmit }) => {
  const initialFormData: FormData = {
    username: "",
    email: "",
    role: "client",
    permissions: "read/write",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phone: "",
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));

    const fieldErrors = validation({ [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, ...fieldErrors }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validar todos los campos antes de enviar
    const formErrors = validation(formData);
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      onSubmit(formData);
      setFormData(initialFormData);
      setErrors({});

      // Establecer isRegistered después de limpiar el formulario
      setIsRegistered(true);
      setTimeout(() => {
        setIsRegistered(false);
      }, 2000); // Espera 2 segundos antes de quitar el mensaje de registro exitoso
    }
  };

  return (
    <div className="register-container">
      <h1>Register Form</h1>
      {isRegistered && <p>Registro exitoso. Redirigiendo...</p>}
      <form onSubmit={handleSubmit}>
        <label>Upload your user image:</label>
        <Cloudinary onImageChange={(newImageUrl) => setFormData((prevData) => ({ ...prevData, image: newImageUrl }))} />
        
        <div className="label-datos">
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
          {errors.username && <p>{errors.username}</p>}
        </div>
        
        <div className="label-datos">
          <label>Email:</label>
          <input type="text" name="email" value={formData.email} onChange={handleChange} required />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div className="label-datos">
          <label>First name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
          {errors.firstName && <p>{errors.firstName}</p>}
        </div>

        <div className="label-datos">
          <label>Last name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
          {errors.lastName && <p>{errors.lastName}</p>}
        </div>
        
        <div className="label-datos">
          <label>Date of Birth:</label>
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
          {errors.dateOfBirth && <p>{errors.dateOfBirth}</p>}
        </div>

        <div className="label-datos">
          <label>Phone number:</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          {errors.phone && <p>{errors.phone}</p>}
        </div>

        <button className="register-button" type="submit">Register</button>

        <Link to="/rooms" className="rooms-link">
          <span className="rooms-span">Check rooms</span>
        </Link>
      </form>
    </div>
  );
};

export default Register;

