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
  const Cards = () => {

    const props = [
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
      },
      {
        "_id": "65d786f27a1e27710f94fd1c",
        "name": "Eiffel Tower View Hotel",
        "owner": "61f3c7fe9d8d6c5e2186a123",
        "details": "A charming boutique hotel with stunning views of the Eiffel Tower.",
        "address": "123 Rue de la Paix, Paris, France",
        "services": [
          "Wifi",
          "Bar",
          "Room service",
          "Concierge",
          "Meeting facilities"
        ],
        "rooms": [
          {
            "description": "Classic Double Room with Eiffel Tower View",
            "typeOfRoom": "Double",
            "price": 300,
            "availability": true
          },
          {
            "description": "Junior Suite with Balcony",
            "typeOfRoom": "Suite",
            "price": 450,
            "availability": true
          }
        ],
        "images": [
          "https://cf.bstatic.com/xdata/images/hotel/max1280x900/284760315.jpg?k=9f584d73b2e32a1d5a0efb250ffe9a14d5db2a178ffcabecd9aca04535448034&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1280x900/112204305.jpg?k=7e88d3bc242d63c2a29be821e163bfa5c13b05d89134ce080d0d0b041b07056a&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1280x900/13767191.jpg?k=cab2273e78d0b41cf41f0e6ab84f97744c6e74e56609143177ce35f6275412ab&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1280x900/280068668.jpg?k=8ab0227b9c2acbe1ebed67dcbfc7f1fed321908cabf70ff2e4d2836525bbc61a&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1280x900/280072576.jpg?k=4ae259aad09d5e9e7fa5f971088fce9305fef965edf32b80185a717ef786b38c&o=&hp=1"
        ],
        "contact": {
          "phone": "+33 1 23 45 67 89",
          "mail": "info@eiffeltowerviewhotel.com"
        },
        "reviews": [
          {
            "description": "Lovely hotel with great staff and an unbeatable view!",
            "score": 4.7,
            "client": "61f3c7fe9d8d6c5e2186a456",
            "date": "2023-04-15"
          }
        ]
      },
      {
        "_id": "65d786f27a1e27710f94fd1d",
        "name": "Zen Garden Retreat",
        "owner": "61f3c7fe9d8d6c5e2186a123",
        "details": "A serene retreat nestled in the historic district of Kyoto.",
        "address": "123 Gionmachi Kitagawa, Higashiyama-ku, Kyoto, Japan",
        "services": [
          "Wifi",
          "Traditional tea ceremony",
          "Japanese garden",
          "Onsen (hot spring bath)",
          "Massage services"
        ],
        "rooms": [
          {
            "description": "Tatami Suite with Garden View",
            "typeOfRoom": "Suite",
            "price": 400,
            "availability": true
          },
          {
            "description": "Standard Room with Futon",
            "typeOfRoom": "Standard",
            "price": 250,
            "availability": true
          }
        ],
        "images": [
          "https://cf.bstatic.com/xdata/images/hotel/max1280x900/284760315.jpg?k=9f584d73b2e32a1d5a0efb250ffe9a14d5db2a178ffcabecd9aca04535448034&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1280x900/112204305.jpg?k=7e88d3bc242d63c2a29be821e163bfa5c13b05d89134ce080d0d0b041b07056a&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1280x900/13767191.jpg?k=cab2273e78d0b41cf41f0e6ab84f97744c6e74e56609143177ce35f6275412ab&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1280x900/280068668.jpg?k=8ab0227b9c2acbe1ebed67dcbfc7f1fed321908cabf70ff2e4d2836525bbc61a&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1280x900/280072576.jpg?k=4ae259aad09d5e9e7fa5f971088fce9305fef965edf32b80185a717ef786b38c&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1280x900/155550087.jpg?k=dcaeced46cce5ebe9d146bc4b925c26124548cb2bb592cf2504617824e7a7cb2&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1280x900/155550099.jpg?k=34c9d22af6c0a29d6c4c999f727d1f982969968ea772f590599992da17adbcf4&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1280x900/460920690.jpg?k=038841ade078c9e4a46c754c6e5f6a013188b5537f3f33ecb31428fd3db60a2a&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1280x900/155550111.jpg?k=22fe5cd4055d7f4ad2d7f7594adfa9c4cc584782d6c84be93d8032b46feb3ec8&o=&hp=1"
        ],
        "contact": {
          "phone": "+81 75-123-4567",
          "mail": "info@zengardenretreat.com"
        },
        "reviews": [
          {
            "description": "An oasis of tranquility in the heart of Kyoto!",
            "score": 4.8,
            "client": "61f3c7fe9d8d6c5e2186a456",
            "date": "2023-03-10"
          }
        ]
      }
    ]
  //const {name, address, price, images} = props;
  return (
    <div>
    {props.map((hotel, id_hotel) => (
      hotel.rooms.map((room, id_room) =>
      (
        <Card
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
