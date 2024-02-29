import React from "react";
import CardLanding from "../cardLanding/CardLanding";
import "./CardsLanding.css";

interface CardsProps {
  allHotels: {
    _id: string;
    name: string;
    address: string;
    details: string;
    rooms: {
      // id: string;
      typeOfRoom: string;
      description: string;
      price: string;
    }[];
    images: string[];
  }[];
}

const CardsLanding: React.FC<CardsProps> = ({ allHotels }) => {
  console.log("En cards la lista que recibe cómo props:", allHotels);

  return (
    <div className="cardsLandContainer">
      {allHotels.map((hotel, id_hotel) =>
        hotel.rooms.map((room, id_room) => (
          <CardLanding
            key={`${id_hotel}-${id_room}`}
            id_hotel={hotel._id}
            // id_room={Number(room.id)} // Convertir a número
            hotel_name={hotel.name}
            hotel_detail={hotel.details}
            room_type={room.typeOfRoom}
            room_description={room.description}
            address={hotel.address}
            price={Number(room.price)} // Convertir a número
            images={hotel.images[0]} // Tomar solo la URL de la imagen
          />
        ))
      )}
    </div>
  );
};

export default CardsLanding;
