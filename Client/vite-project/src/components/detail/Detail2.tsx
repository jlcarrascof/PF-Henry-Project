import React from "react";
//import React, { useEffect } from "react";
//import { useDispatch, useSelector } from "react-redux";
//import { useParams } from "react-router-dom";
//import { getHotel } from "../../redux/actions";

interface Hotel {
  _id: string;
  name: string;
  details: string;
  address: string;
  rooms: Room[];
  images: string[];
}

interface Room {
  description: string;
  typeOfRoom: string;
  price: number;
  availability: boolean;
}
 // const Detail: React.FC = () => {
  /*const dispatch = useDispatch();
  const { id } = useParams();
  const hotel = useSelector((state) => state.hotel);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getHotel(id));
    };

    fetchData();
  }, [dispatch, id]);

*/

const Detail: React.FC = () => {
  // datos del detalle pasados al estilo tanque de carton para aparentar el detalle
  const hotels: Hotel[] = [
    // lista de hoteles muy recortada
    {
      "_id": "65d786f27a1e27710f94fd1b",
      "name": "Central Park Grand Hotel",
      "owner": "61f3c7fe9d8d6c5e2186a123",
      "details": "A luxurious hotel overlooking Central Park in the heart of Manhattan.",
      "address": "123 Central Park West, New York, NY, USA",
      "services": [
        "Wifi",
        "Fitness center",
        "Spa",
        "Concierge service",
        "Fine dining restaurant"
      ],
      "rooms": [
        {
          "description": "Deluxe King Room with Park View",
          "typeOfRoom": "Deluxe",
          "price": 350,
          "availability": true
        },
        {
          "description": "Executive Suite with City View",
          "typeOfRoom": "Suite",
          "price": 500,
          "availability": true
        }
      ],
      "images": [
        "https://cf.bstatic.com/xdata/images/hotel/max1280x900/453296389.jpg?k=2cdf5859bae39c83a8e3756397cdf5e874b67d21c1e3caa23e9e49e552bffe40&o=&hp=1",
        "https://cf.bstatic.com/xdata/images/hotel/max1280x900/453296393.jpg?k=70d687503f29b3725d1e12246fd6525822d4c591114cf34a94963db361b1550b&o=&hp=1",
        "https://cf.bstatic.com/xdata/images/hotel/max1280x900/453296405.jpg?k=df923f9dea3b08b8c2ff28ec74011b64bd7a843d61c495fd643830855c3462b9&o=&hp=1"
      ],
      "contact": {
        "phone": "+1 212-555-1234",
        "mail": "info@centralparkgrandhotel.com"
      },
      "reviews": [
        {
          "description": "Absolutely stunning hotel with exceptional service!",
          "score": 4.9,
          "client": "61f3c7fe9d8d6c5e2186a456",
          "date": "2023-05-20"
        }
      ]
    }
  ];

  // Encontrar el hotel con el _id proporcionado
  const selectedHotel = hotels.find(hotel => hotel._id === '65d786f27a1e27710f94fd1b');

  if (!selectedHotel) {
    return <div>No se encontró el hotel seleccionado.</div>;
  }

  // Ordenar habitaciones por precio ascendente
  const sortedRooms = selectedHotel.rooms.slice().sort((a, b) => a.price - b.price);

  return (
    <div>
      <h2>{selectedHotel.name}</h2>
      <p>{selectedHotel.details}</p>
      <p>Dirección: {selectedHotel.address}</p>
      <h3>Habitaciones disponibles:</h3>
      <div>
        {sortedRooms.map((room, index) => (
          <div key={index}>
            <h4>{room.description}</h4>
            <p>Tipo: {room.typeOfRoom}</p>
            <p>Precio: ${room.price}</p>
            <p>Disponibilidad: {room.availability ? 'Disponible' : 'No disponible'}</p>
          </div>
        ))}
      </div>
      <h3>Imágenes:</h3>
      <div>
        {selectedHotel.images.map((image, index) => (
          <img key={index} src={image} alt={`Image ${index}`} style={{ width: '200px', height: 'auto' }} />
        ))}
      </div>
    </div>
  );
};

export default Detail;
