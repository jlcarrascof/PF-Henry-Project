import { createHotels } from "../../../Redux/Actions/actions";
import { useDispatch, Dispatch } from "react-redux";
import { useEffect, useState } from "react";
import './FormHotel.css';
import Cloudinary from "../../cloudinary/Cloudinary.tsx";




interface FormSchema {
  name: string;
  details: string;
  address: string;
  images: string[]; 
  contact: {
    phone: number;
    mail: string;
  };
}

interface FormHotelProps {
  setStepRegister: React.Dispatch<React.SetStateAction<number>>;
}

const FormHotel: React.FC<FormHotelProps> = ({ setStepRegister }) => {
  const dispatch = useDispatch<Dispatch>(); // Ajusta 'TuTipoDeAccion' según tu implementación

  const [formData, setFormData] = useState<FormSchema>({
    name: "",
    details: "",
    images: [], // Cambiado a una matriz vacía
    address: '',
    contact: {
      phone: 0,
      mail: "",
    },
  });

  useEffect(() => {
    const storageData = window.localStorage.getItem("form-hoteldata");
    if (storageData !== null) {
      const parsedData = JSON.parse(storageData);
      setFormData(parsedData);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("form-hoteldata", JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    window.localStorage.setItem("form-hoteldata", JSON.stringify(formData));
  };

  const handleImageChange = (imageUrl: string) => {
    setFormData({
      ...formData,
      images: [...formData.images, imageUrl],
    });
    window.localStorage.setItem("form-hoteldata", JSON.stringify(formData));
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      dispatch(createHotels(formData));
      window.localStorage.removeItem("form-hoteldata");
      setStepRegister(2);
    } catch (error) {
      console.error('Error in create Hotel: ', error);
    }
  };

  return (
    <div className="form-hotels-container">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Details:
          <textarea
            name="details"
            value={formData.details}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address || ""}
            onChange={handleInputChange}
          />
        </label>
        <div>
          <label>
            Email:
            <input
              type="text"
              name="mail"
              value={formData.contact.mail}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={formData.contact.phone }
              onChange={handleInputChange}
            />
          </label>
        </div>

        {/* Nuevo componente de Cloudinary */}
        <Cloudinary onImageChange={handleImageChange} />

        <button type="submit" className="formLogin button">Submit Hotel</button>
      </form>
    </div>
  );
};

export default FormHotel;
