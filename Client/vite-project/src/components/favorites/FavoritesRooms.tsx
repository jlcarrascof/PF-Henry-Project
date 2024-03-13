import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../Redux/Reducer/reducer";
import {
  getFavoriteRooms,
  removeFavoriteRoom,
} from "../../Redux/Actions/actions";
import Card from "../card/Card";
import EmptyFavorites from "./EmptyFavorites";

const FavoritesRoom: React.FC = () => {
  const dispatch = useDispatch();
  const favoriteRooms = useSelector((state: State) => state.favoriteRooms);
  const identifier = useSelector((state: State) => state.user?.email);

  useEffect(() => {
    if (identifier) {
      dispatch(getFavoriteRooms(identifier));
    }
  }, [dispatch, identifier]);

  const handleRemoveFavorite = (roomId: string) => {
    dispatch(removeFavoriteRoom(identifier, roomId));
  };

  return (
    <div className="favorites-container">
      {favoriteRooms.length === 0 ? (
        <EmptyFavorites />
      ) : (
        <>
          <h1>Your Favorite Rooms</h1>
          <div className="favorites-cards-container">
            {favoriteRooms.map((room) => (
              <Card
                key={room._id}
                room={room}
                isFavorite={true}
                onAddFavorite={() => {}}
                onRemoveFavorite={() => handleRemoveFavorite(room._id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FavoritesRoom;
