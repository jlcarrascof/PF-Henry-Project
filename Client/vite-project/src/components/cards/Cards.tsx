import Card from "../card/Card";

// interface CardsProps {
//   id?: string;
//   name: string;
//   address: string;
//   price: string;
//   images: ImageC[];
// }

// interface ImageC {
//   url: string;
//   alt: string;
// }
// const Cards: React.FC<CardsProps> = (props: CardsProps) => {
  interface CardsProps {
    allHotels: any[]; // Deberías definir un tipo más específico para los hoteles
  }
  
  const Cards: React.FC<CardsProps> = ({ allHotels }) => {
    return (
      <div>
        {allHotels.map((hotel: any, id_hotel: number) => (
          hotel.rooms.map((room: any, id_room: number) => (
            <Card
              key={`${id_hotel}-${id_room}`}
              id_hotel={id_hotel}
              id_room={id_room}
              hotel_name={hotel.name}
              hotel_detail={hotel.details}
              room_type={room.typeOfRoom}
              room_description={room.description}
              address={hotel.address}
              price={room.price}
              images={hotel.images[id_room]}
            />
          ))
        ))}
      </div>
    );
  };



  export default Cards;


