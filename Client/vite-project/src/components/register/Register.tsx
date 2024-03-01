import React, { useState } from "react";
import { Link } from "react-router-dom";
import { validation } from "./RegValidation";
import "./Register.modules.css";
import Cloudinary from "../cloudinary/Cloudinary";

interface RegisterProps {
  onSubmit: (formData: FormData) => void;
}

interface FormData {
  name: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  image?: string;
}

const Register: React.FC<RegisterProps> = ({ onSubmit }) => {
  const initialFormData: FormData = {
    name: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Limpiar el error del campo actual
    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));

    // Validar el campo que se está editando
    const fieldErrors = validation({ [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, ...fieldErrors }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validar todos los campos antes de enviar
    const formErrors = validation(formData);
    setErrors(formErrors);

    // Verificar si hay errores
    if (Object.keys(formErrors).length === 0) {
      onSubmit(formData);

      // Limpiar el formulario después de registrarse
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
    <>
      <h1>Register Form</h1>
      {isRegistered && <p>Registro exitoso. Redirigiendo...</p>}
      <form onSubmit={handleSubmit}>
        <label>Upload your user image:</label>
        <Cloudinary onImageChange={(newImageUrl) => setFormData((prevData) => ({ ...prevData, image: newImageUrl }))} />

        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        {errors.name && <p>{errors.name}</p>}

        <label>Last name:</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        {errors.lastName && <p>{errors.lastName}</p>}

        <label>Date of Birth:</label>
        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
        {errors.dateOfBirth && <p>{errors.dateOfBirth}</p>}

        <label>Phone number:</label>
        <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
        {errors.phoneNumber && <p>{errors.phoneNumber}</p>}

        <button type="submit">Register</button>

        <Link to="/login">
          <span>Sign in</span>
        </Link>
      </form>
    </>
  );
};

export default Register;





