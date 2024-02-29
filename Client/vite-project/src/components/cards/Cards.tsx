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
}

const Cards: React.FC<CardsProps> = ({ allRooms }) => {
  console.log("En cards la lista que recibe cómo props:", allRooms);

  return (
    <div>
      {allRooms.map((room) => (
        <Card
          key={room._id} 
          room={room}
        />
      ))}
    </div>
  );
};

export default Cards;

