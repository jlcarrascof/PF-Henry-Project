import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Card.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

interface Room {
  _id: string;
  name: string;
  typeOfRoom: string;
  description: string;
  price: string;
  images: string[];
}

interface CardProps {
  room: Room;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const Card: React.FC<CardProps> = ({
  room,
  isFavorite,
  onAddFavorite,
  onRemoveFavorite,
}) => {
  const { _id, name, typeOfRoom, description, price, images } = room;

  const [favorite, setFavorite] = useState(() => {
    const storedFavorite = localStorage.getItem(`favorite_${_id}`);
    return storedFavorite ? JSON.parse(storedFavorite) : isFavorite;
  });

  useEffect(() => {
    localStorage.setItem(`favorite_${_id}`, JSON.stringify(favorite));
  }, [favorite, _id]);

  const handleToggleFavorite = () => {
    setFavorite(!favorite);
    favorite ? onRemoveFavorite() : onAddFavorite();
  };

  return (
    <div className="card-container">
      {images && images.length > 0 && (
        <img className="card-image" src={images[0]} alt={`Photo of ${name}`} />
      )}
      <div className="card-text-container">
        <h3>{name}</h3>
        <p className="card-room-detail">{`${typeOfRoom} - ${description}`}</p>
        <p className="card-price">${price}</p>
        <Link to={`/detail/${_id}`} className="card-link">
          <button className="card-button">See Details</button>
        </Link>
      </div>

      <button onClick={handleToggleFavorite} className="fav-button">
        {/* {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />} */}
        {favorite ? <p>💜</p> : <p>🤍</p>}
      </button>
    </div>
  );
};

export default Card;
