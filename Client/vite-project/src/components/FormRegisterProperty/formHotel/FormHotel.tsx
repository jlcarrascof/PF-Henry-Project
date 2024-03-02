
// import { createHotels } from "../../../Redux/Actions/actions";
        import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hotelValidation } from "./HotelValidation";
import Cloudinary from "../../cloudinary/Cloudinary.tsx";
        
import "./FormHotel.css";

  interface RoomSchema {
  name: string;
  description?: string;
  price?: number;
}

interface FormSchema {
  name: string;
  details: string;
  address: string;
  images: File[];
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




interface FormHotelProps {
  setStepRegister: React.Dispatch<React.SetStateAction<number>>;
}

// const FormHotel: React.FC<FormProps> = (/*{ onSubmit }*/) => {

const FormHotel: React.FC<FormHotelProps> = ({ setStepRegister }) => {
  const dispatch = useDispatch();
 
  const [formData, setFormData] = useState<FormSchema>({
    name: "",
    details: "",
    images: [], // Cambiado a una matriz vacía
    address: '',
    contact: {
      phone: "",
      mail: "",
    },
  });
  const [error, setError] = useState<ErrorSchema>({
    name: "",
    details: "",
    images: [],
    address: "",
    contact: {
      phone: "",
      mail: "",
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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedImage = event.target.files[0];
      if (selectedImage.type.startsWith("image/")) {
        // Verificar si el archivo es de tipo imagen
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
  const handleContactChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    handleChange(event, true);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    handleChange(event);
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

      console.error("Error in create Hotel: ", error);

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
              name="mail"
              value={formData.contact.mail || ""}
              onChange={handleContactChange}
            />
          </label>
          {error.contact?.mail && <p>{error.contact?.mail}</p>}

              value={formData.contact.mail}
              onChange={handleInputChange}
            />
          </label>

          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={formData.contact.phone || ""}
              onChange={handleContactChange}
            />
          </label>
          {error.contact?.phone && <p>{error.contact?.phone}</p>}
        </div>
        <label>
          Image:
          <input
            type="file" // Cambiado a "file"
            accept="image/*" // Acepta solo archivos de imagen
            onChange={handleImageChange}
          />
          {/* Mostrar miniaturas de las imágenes cargadas */}
          {formData.images.map((image, index) => (
            <div key={index}>
              <p>{image.name}</p> {/* Mostrar el nombre del archivo */}
              <img
                src={URL.createObjectURL(image)}
                alt="thumbnail"
                style={{ maxWidth: "100px" }}
              />{" "}
              {/* Mostrar miniatura */}
            </div>
          ))}
        </label>

        {/* <label>
        Services:
        <select multiple onChange={handleServicesChange}>
          {services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
          </select>
        </label> */}
        <button type="submit" className="formLogin button">
          Submmit Hotel
        </button>

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
