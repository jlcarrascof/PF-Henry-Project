import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../cards/Cards";
import Filters from "../filters/Filters";
import SearchBar from "../searchBar/SearchBar";
import { State } from "../../Redux/Reducer/reducer";
import { getFilteredRooms, addFavoriteRoom, removeFavoriteRoom, getFavoriteRooms } from "../../Redux/Actions/actions";
import "./Home.modules.css";
import RowRight from "../icons/RowRight";
import RowLeft from "../icons/RowLeft";

const initialFavoriteRooms = JSON.parse(window.localStorage.getItem("favoriteRooms") || "[]");

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { totalPages, allRooms, filteredRooms } = useSelector((state: State) => state);
  const [currentPage, setCurrentPage] = useState(1);
  //const identifier = useSelector((state: State) => state.user?.user_email);
  const favoriteRooms = useSelector((state: State) => state.favoriteRooms);

  
  //const user = useSelector((state: State) => state.user);

  const { user_email: identifier } = JSON.parse(window.localStorage.getItem("user") || "{}")
  const user = JSON.parse(window.localStorage.getItem("user") || "{}")

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      dispatch(getFilteredRooms({ p: currentPage + 1, ...filteredRooms }));
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      dispatch(getFilteredRooms({ p: currentPage - 1, ...filteredRooms }));
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    dispatch(getFilteredRooms({ p: page, ...filteredRooms }));
  };

  useEffect(() => {
    dispatch(getFilteredRooms({ p: currentPage, ...filteredRooms }));
    dispatch(getFavoriteRooms(identifier)); 
  }, [dispatch, currentPage, filteredRooms, identifier]);

  const handleAddFavorite = (roomId: string) => {
    dispatch(addFavoriteRoom(identifier, roomId));
  };

  const handleRemoveFavorite = (roomId: string) => {
    dispatch(removeFavoriteRoom(identifier, roomId));
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button key={i} onClick={() => handlePageChange(i)} disabled={i === currentPage}>
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="home-container">
      <div className="flex-home">
        <h1>Some of our best <span className="purple">hotels</span></h1>
        <SearchBar />
      </div>
        
      <div className="card-filter-container">
        <div className="filter-container">
          <Filters />
        </div>
        <div className="allCards">
          <Cards
            allRooms={allRooms}
            onAddFavorite={handleAddFavorite}
            onRemoveFavorite={handleRemoveFavorite}
            favoriteRooms={favoriteRooms}
            identifier={identifier}
          />
        </div>
      </div>

      <div className="pagination">
          <button onClick={handlePrevPage} className={currentPage === 1 ? "disabled" : ""}>
            <RowLeft />
          </button>
          {renderPageNumbers()}
         <button onClick={handleNextPage} className={currentPage === totalPages ? "disabled" : ""}>
            <RowRight />
          </button>
        </div>
    </div>
  );
};

export default Home;







