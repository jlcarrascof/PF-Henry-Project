import React, { useState, ChangeEvent } from "react";
import "./Cloudinary.modules.css";
import axios from "axios";

interface CloudinaryProps {
  onImageChange: (url: string) => void;
}

const Cloudinary: React.FC<CloudinaryProps> = ({ onImageChange }) => {
  const [urlImagen, setUrlImagen] = useState<string>("");

  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "Presents_react");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dah8tj4ry/image/upload",
          data
        );

        console.log(response.data);
        const imageUrl = response.data.secure_url;
        setUrlImagen(imageUrl);
        onImageChange(imageUrl); // Notifica al componente padre sobre el cambio de imagen
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
      }
    }
  };

  const handleDeleteImage = () => {
    setUrlImagen("");
    onImageChange(""); // Notifica al componente padre sobre la eliminación de la imagen
  };

  return (
    <>
      <div className="cloudinary-container">
        <input
          type="file"
          accept="image/*"
          onChange={handleUploadImage}
        />

        {urlImagen && (
          <div>
            <img src={urlImagen} alt="Uploaded" className="cloudinary-image" />
            <button onClick={handleDeleteImage} className="cloudinary-button">Delete image</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cloudinary;
