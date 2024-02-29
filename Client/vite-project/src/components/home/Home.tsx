import React, { useEffect, useState } from "react"; // Importa useState
import { useDispatch, useSelector } from "react-redux";
//import NavBar from "../navBar/NavBar";
import SearchBar from "../searchBar/SearchBar";
import Cards from "../cards/Cards";
import Filters from "../filters/Filters";
import { State } from "../../Redux/Reducer/reducer";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./Home.modules.css";
import { getFilteredRooms } from "../../Redux/Actions/actions";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { totalPages, allRooms, filteredRooms } = useSelector((state: State) => state);

  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      // Solo actualiza los filtros si hay cambios
      if (currentPage + 1 !== currentPage) {
        dispatch(getFilteredRooms({ p: currentPage + 1, ...filteredRooms }));
      }
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      // Solo actualiza los filtros si hay cambios
      if (currentPage - 1 !== currentPage) {
        dispatch(getFilteredRooms({ p: currentPage - 1, ...filteredRooms }));
      }
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Solo actualiza los filtros si hay cambios
      if (page !== currentPage) {
        dispatch(getFilteredRooms({ p: page, ...filteredRooms }));
      }
    }
  };

  useEffect(() => {
    dispatch(getFilteredRooms({ p: currentPage, ...filteredRooms }));
  }, [dispatch, currentPage, filteredRooms]);

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
      <div className="searchBar-container">
        <SearchBar />
      </div>
      <div>
        <h1>Some of our best hotels</h1>
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Prev
          </button>
          {renderPageNumbers()}
       
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
      <div className="card-filter-container">
        <div className="filter-container">
          <Filters />
        </div>
        <div className="allCards">
          <Cards allRooms={allRooms} />
          
        </div>
      </div>
    </div>
  );
};

export default Home;



