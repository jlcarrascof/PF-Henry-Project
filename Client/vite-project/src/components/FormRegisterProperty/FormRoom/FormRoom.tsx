import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./FormRoom.css";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

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
    window.localStorage.setItem("form-roomdata", JSON.stringify(formData));
  };

  const handleServiceRemove = (service: string) => {
    setFormData({
      ...formData,
      services: formData.services.filter((s) => s !== service),
    });
  };
  const services = ["wifi", "pool", "breakfast"];
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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedImage = event.target.files[0];
      if (selectedImage.type.startsWith("image/")) {
        // Verificar si el archivo es de tipo imagen
        setFormData({
          ...formData,
          images: [...formData.images, selectedImage],
        });
        window.localStorage.setItem("form-roomdata", JSON.stringify(formData));
      } else {
        alert("Please select an image file."); // Mostrar un mensaje de error si no se selecciona un archivo de imagen
      }
    }
  };

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
    window.localStorage.removeItem("form-roomdata");
    navigate("/home");
  };

  return (
    <div className="allFormRoom">
      <div className="form-rooms-container">
        <h1>Post your hotel room!</h1>

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
            <div className="servicesSpace">
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
            </div>
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
          <button type="submit" className="formLogin button">
            Submmit Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormRoom;
