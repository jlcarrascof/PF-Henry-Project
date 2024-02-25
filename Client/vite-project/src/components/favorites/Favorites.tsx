import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../card/Card";
// import "./Favorites.modules.css";

const Favorites: React.FC = () => {
  // const [favoriteHotels, setFavoriteHotels] = useState([]);
  const img =
    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/112204305.jpg?k=7e88d3bc242d63c2a29be821e163bfa5c13b05d89134ce080d0d0b041b07056a&o=&hp=1";

  const favoriteHotels = [
    { id: 1, name: "Hotel A", image: img, price: 350 },
    { id: 2, name: "Hotel B", image: img, price: 380 },
    { id: 3, name: "Hotel C", image: img, price: 150 },
    { id: 4, name: "Hotel D", image: img, price: 200 },
  ];

  // useEffect(() => {
  //   axios.get("http://localhost:3001/hotels/favs")
  //     .then((response) => {
  //       setFavoriteHotels(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching favorite hotels:", error);
  //     });
  // }, []);

  return (
    <div className="favorites-container">
      <h1>Mis Favoritos</h1>
      <div className="favorites-grid">
        {favoriteHotels.map((hotel) => (
          <div key={hotel.id} className="hotel-card">
            <img src={hotel.image} alt={hotel.name} />
            <h3>{hotel.name}</h3>
            <h2>{hotel.price}€</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
