import React from "react";
import Card from "../card/Card";

interface Room {
  _id: string;
  name: string;
  typeOfRoom: string;
  description: string;
  price: string;
  images: string[];
}

interface CardsProps {
  allRooms: Room[];
  favoriteRooms: string[];
  onAddFavorite: (roomId: string) => void; 
  onRemoveFavorite: (roomId: string) => void;
 
}

const Cards: React.FC<CardsProps> = ({ allRooms, onAddFavorite, onRemoveFavorite, favoriteRooms }) => {
  return (
    <>
      {allRooms.map((room) => (
        <Card
          key={room._id} 
          room={room}
          isFavorite={favoriteRooms.includes(room._id)} 
          onAddFavorite={() => onAddFavorite(room._id)} 
          onRemoveFavorite={() => onRemoveFavorite(room._id)} 
        />
      ))}
    </>
  );
};

export default Cards;

