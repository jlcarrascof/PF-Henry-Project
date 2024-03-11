import { createHotels } from "../../../Redux/Actions/actions";
import { useDispatch, Dispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { hotelValidation } from "./HotelValidation.ts";
import "./FormHotel.css";
import Cloudinary from "../../cloudinary/Cloudinary.tsx";
import emailjs from "@emailjs/browser";

interface FormSchema {
  name: string;
  details: string;
  address: string;
  images: string[];
  contact: {
    phone: string;
    mail: string;
  };
}
interface ErrorSchema {
  name?: string;
  details?: string;
  address?: string;
  images?: File[];
  contact?: {
    phone?: string;
    mail?: string;
  };
}
interface Values {
  user_email: string;
  message: string;
}

interface FormHotelProps {
  setStepRegister: React.Dispatch<React.SetStateAction<number>>;
}

const FormHotel: React.FC<FormHotelProps> = ({ setStepRegister }) => {
  const dispatch = useDispatch();
  const form = useRef<HTMLFormElement>();

  const [values, setValues] = useState<Values>({
    user_email: "",
    message: `Wohoo! It looks like you have posted a new hotel! Now it's public for people who wants to go on holidays in our app :D `,
  });

  const [formData, setFormData] = useState<FormSchema>({
    name: "",
    details: "",
    images: [], // Cambiado a una matriz vacía
    address: "",
    contact: {
      phone: "",
      mail: values.user_email,
    },
  });

  const [error, setError] = useState<ErrorSchema>({
    name: "",
    details: "",
    images: [],
    address: "",
    contact: {
      phone: "",
      mail: values.user_email,
    },
  });

  useEffect(() => {
    const storageData = window.localStorage.getItem("form-hoteldata");
    if (storageData !== null) {
      const parsedData = JSON.parse(storageData);
      setFormData(parsedData);
      const formErrors = hotelValidation(formData);
      setError(formErrors);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("form-hoteldata", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    isContact: boolean = false
  ) => {
    const { name, value } = event.target;
    const updatedFormData = isContact
      ? {
          ...formData,
          contact: {
            ...formData.contact,
            [name]: value,
          },
        }
      : {
          ...formData,
          [name]: value,
        };
    setFormData(updatedFormData);

    setError(hotelValidation(updatedFormData));
    window.localStorage.setItem(
      "form-hoteldata",
      JSON.stringify(updatedFormData)
    );
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedImage = event.target.files[0];
      if (selectedImage.type.startsWith("image/")) {
        setFormData({
          ...formData,
          images: [...formData.images, selectedImage],
        });
        window.localStorage.setItem("form-hoteldata", JSON.stringify(formData));
      } else {
        alert("Please select an image file."); // Mostrar un mensaje de error si no se selecciona un archivo de imagen
      }
    }
  };

  const handleContactChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let { name, value } = event.target;
    handleChange(event, true);
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    handleChange(event);
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      dispatch(createHotels(formData));
      window.localStorage.removeItem("form-hoteldata");
      // if (!form.current) return;

      // emailjs
      //   .sendForm("service_7ocfmjp", "template_l1f8bz9", form.current, {
      //     publicKey: "b645crolwMFi4MBSX",
      //   })
      //   .then(
      //     () => {
      //       console.log("SUCCESS!");
      //     },
      //     (error) => {
      //       console.log("FAILED...", error.text);
      //     }
      //   );
      setStepRegister(2);
    } catch (error) {
      console.error("Error in create Hotel: ", error);
    }
  };

  return (
    <div className="allFormHotel">
      <div className="form-hotels-container">
        <h1>Post your hotel!</h1>
        <form ref={form} onSubmit={handleSubmit}>
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
          {error.name && <p>{error.name}</p>}
          <label>
            Details:
            <textarea
              name="details"
              value={formData.details}
              onChange={handleInputChange}
              required
            />
          </label>
          {error.details && <p>{error.details}</p>}
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={formData.address || ""}
              onChange={handleInputChange}
            />
          </label>
          {error.address && <p>{error.address}</p>}
          <div>
            <label>
              Email:
              <input
                type="text"
                name="user_email"
                value={values.user_email}
                onChange={handleContactChange}
              />
            </label>
            {/* {error.contact?.mail && <p>{error.contact?.mail}</p>} */}
            <label>
              Phone:
              <input
                type="text"
                name="phone"
                value={formData.contact.phone}
                onChange={handleContactChange}
              />
            </label>
            {error.contact?.phone && <p>{error.contact?.phone}</p>}
          </div>

          {/* Nuevo componente de Cloudinary */}
          <Cloudinary onImageChange={handleImageChange} />
          {/* <input
            className="messageInput"
            name="user_email"
            value={values.user_email}
          ></input> */}
          <input
            className="messageInput"
            name="message"
            value={values.message}
          ></input>

          <button type="submit" className="formLogin button">
            Submit Hotel
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormHotel;
