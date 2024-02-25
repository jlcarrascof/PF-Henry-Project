// import Cards from "../cards/RealCards";
import RealCards from "../cards/RealCards";

interface Rooms {
  description: string;
  typeOfRoom: string;
  prince: number;
  availability: boolean;
}

interface Contact {
  phone: number;
  mail: string;
}

interface Reviews {
  description: string;
  score: number;
  client: string;
  date: string;
}

interface Cards {
  id?: string;
  name: string;
  address: string;
  services: string[];
  rooms: Rooms[];
  images: string[];
  contact: Contact;
  reviews: Reviews[];
}

const RealCard: React.FC<Cards> = (props) => {
  const { name, address, services, rooms, images, contact, reviews } = props;
  return (
    <div>
      <p>Name: {name}</p>
      <p>Address: {address}</p>
      <p>Services:{services}</p>
      <img src={images[0]} />
    </div>
  );
};

export default RealCard;
