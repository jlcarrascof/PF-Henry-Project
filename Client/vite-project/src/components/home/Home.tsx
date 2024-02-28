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
import { getFilteredHotels, getHotels } from "../../Redux/Actions/actions";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { totalPages, allHotels, filteredHotels } = useSelector((state: State) => state);

  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      // Solo actualiza los filtros si hay cambios
      if (currentPage + 1 !== currentPage) {
        dispatch(getFilteredHotels({ p: currentPage + 1, ...filteredHotels }));
      }
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      // Solo actualiza los filtros si hay cambios
      if (currentPage - 1 !== currentPage) {
        dispatch(getFilteredHotels({ p: currentPage - 1, ...filteredHotels }));
      }
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Solo actualiza los filtros si hay cambios
      if (page !== currentPage) {
        dispatch(getFilteredHotels({ p: page, ...filteredHotels }));
      }
    }
  };

  useEffect(() => {
    dispatch(getFilteredHotels({ p: currentPage, ...filteredHotels }));
  }, [dispatch, currentPage, filteredHotels]);

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
          <Cards allHotels={allHotels} />
          
        </div>
      </div>
    </div>
  );
};

export default Home;



