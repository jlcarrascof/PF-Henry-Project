import React from "react";
import CardLanding from "../cardLanding/CardLanding";
import "./CardsLanding.css";

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

const CardsLanding: React.FC<CardsProps> = ({ allRooms }) => {
  console.log("En cards la lista que recibe cómo props:", allRooms);

  return (
    <div className="cardsLandContainer">
      {allRooms.map((room) => (
        <CardLanding
          key={room._id} 
          room={room}
        />
      ))}
    </div>
  );
};

export default CardsLanding;
