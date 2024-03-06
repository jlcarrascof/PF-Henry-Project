import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import './FormRoom.css'
import { useNavigate } from "react-router-dom";
import Cloudinary from "../../cloudinary/Cloudinary.tsx";


interface FormRoomData {
  description: string;
  typeOfRoom: string;
  services: string[];
  price: number;
  num_rooms: number;
  images: File[];
}


const FormRoom = (/*{ onSubmit }*/) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormRoomData>({
    description: "",
    typeOfRoom: "",
    services: [],
    price: 0,
    num_rooms: 0,
    images: [],
  });

  useEffect(() => {
    const storageData = window.localStorage.getItem("form-roomdata");
    if (storageData !== null) {
      const parsedData = JSON.parse(storageData);
      setFormData(parsedData);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("form-roomdata", JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    window.localStorage.setItem("form-roomdata", JSON.stringify(formData));
  };

  const handleServicesChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const services = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setFormData({
      ...formData,
      services,
    });
    window.localStorage.setItem("form-roomdata",JSON.stringify(formData))
  };

  const handleServiceRemove = (service: string) => {
    setFormData({
      ...formData,
      services: formData.services.filter((s) => s !== service),
    });
  };
  const services = [
    'wifi', 'pool', 'breakfast'
  ]
  // const handleRoomsChange = (index: number) => (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const rooms = [...formData.rooms];
  //   rooms[index] = {
  //     ...rooms[index],
  //     [event.target.name]: event.target.value,
  //   };
  //   setFormData({
  //     ...formData,
  //     rooms,
  //   });
  //   window.localStorage.setItem("form-roomdata",JSON.stringify(formData))
  // };


  const handleImageChange = (imageUrl: string) => {
    setFormData({
      ...formData,
      images: [...formData.images, imageUrl],
    });
        window.localStorage.setItem("form-roomdata",JSON.stringify(formData))
      } 

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Añade el mensaje al cuerpo del documento
    setFormData({
      description: "",
      typeOfRoom: "",
      services: [],
      price: 0,
      images: [],
      num_rooms: 0,
    });
    window.localStorage.removeItem("form-roomdata")
    navigate('/home')
  };

  return (
    <div className="form-rooms-container">
    <form onSubmit={handleSubmit}>
      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Name of room:
        <input
          type="text"
          name="typeOfRoom"
          value={formData.typeOfRoom}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
          Services:
          <select multiple onChange={handleServicesChange}>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          <ul>
            {formData.services.map((service, index) => (
              <li key={index} className="register-li">
                {service}
                <div className="btn-register-container">
                <button
                  onClick={() => handleServiceRemove(service)}
                  className="btn-delete-service"
                >
                  X
                </button>

                </div>

              </li>
            ))}
          </ul>
        </label>
      <label>
        Price:
        <input
          type="text"
          name="price"
          value={formData.price || ""}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Total of rooms:
        <input
          type="text"
          name="num_rooms"
          value={formData.num_rooms || ""}
          onChange={handleInputChange}
        />
      </label>
      
      {/* Nuevo componente de Cloudinary */}
      <Cloudinary onImageChange={handleImageChange} />

      <button type="submit" className="formLogin button">Submmit Room</button>
    </form>
    </div>
  );
};

export default FormRoom;