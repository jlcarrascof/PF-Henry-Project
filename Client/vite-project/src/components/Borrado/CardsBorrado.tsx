import React from "react";
import CardBorrado from "./CardBorrado";

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
}

const CardsBorrado: React.FC<CardsProps> = ({ allRooms }) => {
  console.log("En cards la lista que recibe cómo props:", allRooms);

  return (
    <div className="cardsLandContainer">
      {allRooms.map((room) => (
        <CardBorrado
          key={room._id} 
          room={room}
        />
      ))}
    </div>
  );
};

export default CardsBorrado;
