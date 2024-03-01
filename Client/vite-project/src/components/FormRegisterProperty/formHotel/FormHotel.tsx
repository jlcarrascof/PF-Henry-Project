import { createHotels } from "../../../Redux/Actions/actions";
import { useDispatch } from "react-redux";
import './FormHotel.css'

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
      phone: number;
      mail: string;
    };
  }


  import React, { useEffect, useState } from "react";

// interface FormProps {
//   onSubmit: (formData: FormSchema) => void;
// }

// const FormHotel: React.FC<FormProps> = (/*{ onSubmit }*/) => {
  interface FormHotelProps {
    setStepRegister: React.Dispatch<React.SetStateAction<number>>;
  }
  
  const FormHotel: React.FC<FormHotelProps> = ({ setStepRegister }) => {
    const dispatch= useDispatch()
  const [formData, setFormData] = useState<FormSchema>({
    name: "",
    details: "",
    images: [],
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
      setFormData(parsedData)
    }
  }, []);
  
  useEffect(() => {
    window.localStorage.setItem("form-hoteldata",JSON.stringify(formData))
  }, [formData]);
  


  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    window.localStorage.setItem("form-hoteldata",JSON.stringify(formData))
  };

  

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedImage = event.target.files[0];
      if (selectedImage.type.startsWith('image/')) { // Verificar si el archivo es de tipo imagen
        setFormData({
          ...formData,
          images: [...formData.images, selectedImage],
        });
        window.localStorage.setItem("form-hoteldata",JSON.stringify(formData))
      } else {
        alert('Please select an image file.'); // Mostrar un mensaje de error si no se selecciona un archivo de imagen
      }
    }
  };

  const handleContactChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      contact: {
        ...formData.contact,
        [event.target.name]: event.target.value,
      },
    });
    window.localStorage.setItem("form-hoteldata",JSON.stringify(formData))
  };


  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    const {name,value} = event.target
    event.preventDefault();
    
    try{
      // setFormData({...formData,
      //   [name]:value

      // });
      dispatch(createHotels(formData));
      window.localStorage.removeItem("form-hoteldata")
      setStepRegister(2)
    } catch (error) {
      console.error('Error in create Hotel: ', error)
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
          value={formData.contact.mail || ""}
          onChange={handleContactChange}
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
            <img src={URL.createObjectURL(image)} alt="thumbnail" style={{ maxWidth: '100px' }} /> {/* Mostrar miniatura */}
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
                <button type="submit" className="formLogin button">Submmit Hotel</button>

        </form>

    </div>

  )}

  export default FormHotel