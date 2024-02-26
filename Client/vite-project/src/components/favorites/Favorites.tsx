import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../card/Card";
import "./Favorites.modules.css";

interface Hotel {
  _id: { $oid: string };
  name: string;
  price: number;
  image: string;
}

const Favorites: React.FC = () => {
  const [favoriteHotels, setFavoriteHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3002/fav")
      .then((response) => {
        setFavoriteHotels(response.data);
      })
      .catch((error) => {
        console.error("Error fetching favorite hotels:", error);
      });
  }, []);

  return (
    <div className="favorites-container">
      <h1>Mis Favoritos</h1>
      <div className="favorites-grid">
        {favoriteHotels.map((hotel) => (
          <div className="hotel-card" key={hotel._id.$oid}>
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