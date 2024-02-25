import { useEffect, useState } from "react";
import RealCard from "../card/RealCard";

const RealCards: React.FC = () => {
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

  const [cards, setCards] = useState<Cards[]>([]);
  useEffect(() => {
    fetch("http://localhost:3001")
      .then((res) => res.json())
      .then((res) => setCards(res));
  }, []);
  return (
    <>
      <div className="cards">
        {cards.map((e) => {
          let { name, address, services, rooms, images, contact, reviews } = e;
          return (
            <RealCard>
              name = {name}, address= {address}, services={services}, rooms=
              {rooms}, images={images}, contact={contact}, reviews={reviews};
            </RealCard>
          );
        })}
      </div>
    </>
  );
};

export default RealCards;
