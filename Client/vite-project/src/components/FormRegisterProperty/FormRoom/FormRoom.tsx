import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cloudinary from "../../cloudinary/Cloudinary.tsx";
import { roomValidation } from "./RoomValidation.ts";
import "./FormRoom.css";
import { postRoom } from "../../../Redux/Actions/actions.ts";

interface FormRoomData {
  description: string;
  typeOfRoom: string;
  services: string[];
  price: number;
  num_rooms: number;
  images: File[];
  location: {
    latitude: number;
    longitude: number;
  };
}

interface RoomError {
  description?: string;
  typeOfRoom?: string;
  services?: string;
  price?: string;
  num_rooms?: string;
  images?: string;
  location?: string;
}

const FormRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormRoomData>({
    description: "",
    typeOfRoom: "",
    services: [],
    price: 0,
    num_rooms: 0,
    images: [],
    location: { latitude: 0, longitude: 0 },
  });

  const [error, setError] = useState<RoomError>({
    description: "",
    typeOfRoom: "",
    services: "",
    price: "",
    num_rooms: "",
    images: "",
    location: "",
  });

  useEffect(() => {
    const storageData = window.localStorage.getItem("form-roomdata");
    if (storageData !== null) {
      const parsedData = JSON.parse(storageData);
      setFormData(parsedData);
      const formErrors = roomValidation(parsedData);
      setError(formErrors);
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
  };

  const handleServiceRemove = (service: string) => {
    setFormData({
      ...formData,
      services: formData.services.filter((s) => s !== service),
    });
  };

  const services = [
    "Wifi",
    "Spa",
    "Bar",
    "Room Service",
    "Breakfast",
    "Jacuzzi",
    "Pool",
    "Gym",
    "Game room",
  ];

  const handleImageChange = (imageUrl: string) => {
    setFormData({
      ...formData,
      images: [...formData.images, imageUrl],
    });
  };

  const handleLocationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      location: {
        ...formData.location,
        [event.target.name]:
          event.target.name === "latitude"
            ? parseFloat(event.target.value)
            : parseFloat(event.target.value),
      },
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await dispatch(postRoom(formData));
      setFormData({
        description: "",
        typeOfRoom: "",
        services: [],
        price: 0,
        images: [],
        num_rooms: 0,
        location: { latitude: 0, longitude: 0 },
      });
      window.localStorage.removeItem("form-roomdata");
      navigate("/home");
    } catch (error) {
      console.error("Error al crear la habitación:", error);
    }
  };

  return (
    <div className="allFormRoom">
      <div className="form-rooms-container">
        <h1>
          Post your <span className="purple">room!</span>
        </h1>

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
            <select
              className="servicesSelect"
              multiple
              onChange={handleServicesChange}
            >
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
            <ul className="selectedServices">
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
              type="number"
              name="num_rooms"
              value={formData.num_rooms || ""}
              onChange={handleInputChange}
            />
          </label>

          <label>
            Latitude:
            <input
              type="number"
              name="latitude"
              value={formData.location.latitude || ""}
              onChange={handleLocationChange}
            />
          </label>

          <label>
            Longitude:
            <input
              type="text"
              name="longitude"
              value={formData.location.longitude || ""}
              onChange={handleLocationChange}
            />
          </label>

          {/* Nuevo componente de Cloudinary */}
          <Cloudinary onImageChange={handleImageChange} />

          <button type="submit" className="formLogin button">
            Submmit Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormRoom;




