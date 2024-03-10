import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

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

const Card: React.FC<CardProps> = ({ room, isFavorite, onAddFavorite, onRemoveFavorite }) => {
  const { _id, name, typeOfRoom, description, price, images } = room;

  const [favorite, setFavorite] = useState(isFavorite);

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
        <h3 className="card-title">{name}</h3>
        <p className="card-room-detail">{`${typeOfRoom} - ${description}`}</p>
      </div>
      <p className="card-price">${price}</p>
      <Link to={`/detail/${_id}`} className="card-link">
        <button className="card-button">
          𝐒𝐞𝐞 𝐃𝐞𝐭𝐚𝐢𝐥𝐬
        </button>
      </Link>

      <button onClick={handleToggleFavorite}>
        {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </button>
    </div>
  );
};

export default Card;











// import { Link } from "react-router-dom";
// import React from "react";
// import "./Card.css";

// interface Room {
//   _id: string;
//   name: string;
//   typeOfRoom: string;
//   description: string;
//   price: string;
//   images: string[];
// }

// interface CardProps {
//   room: Room;
// }

// const Card: React.FC<CardProps> = ({ room }) => {
//   const { _id, name, typeOfRoom, description, price, images } = room;

//   const onClick = () => {
//     console.log(_id);
//   };

//   return (
//     <div className="card-container">
//       <img className="card-image" src={images[0]} alt={`Photo of ${name}`} />
//       <div className="card-text-container">
//         <h3 className="card-title">{name}</h3>
//         <p className="card-room-detail">{`${typeOfRoom} - ${description}`}</p>
//       </div>
//       <p className="card-price">${price}</p>
//       <Link to={`/detail/${_id}`} className="card-link">
//         <button onClick={onClick} className="card-button">
//           𝐒𝐞𝐞 𝐃𝐞𝐭𝐚𝐢𝐥𝐬
//         </button>
//       </Link>
//     </div>
//   );
// };

// export default Card;
