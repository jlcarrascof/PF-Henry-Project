import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../searchBar/SearchBar";
import Cards from "../cards/Cards";
import Filters from "../filters/Filters";
import { State } from "../../Redux/Reducer/reducer";
import { getFilteredHotels } from "../../Redux/Actions/actions";
import "./Home.modules.css";

import FilterManager from '../filters/FilterManager';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const filteredHotels = useSelector((state: State) => state.filteredHotels);
  const totalPages = useSelector((state: State) => state.totalPages);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (FilterManager.ApplyFilter()) {
        dispatch(getFilteredHotels({
          p: currentPage,
          ...FilterManager.GetFilterObject()
        }));
    } else {
      dispatch(getFilteredHotels({
        p: currentPage
      }));
    }
  }, [dispatch, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers: any[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? "active" : ""}
        >
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
          <Cards allHotels={filteredHotels} />
        </div>
      </div>
    </div>
  );
};

export default Home;





