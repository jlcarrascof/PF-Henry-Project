import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../navBar/NavBar";
import SearchBar from "../searchBar/SearchBar";
import Cards from "../cards/Cards";
import Filters from "../filters/Filters";
import { State } from "../../Redux/Reducer/reducer";
import { getFilteredHotels } from "../../Redux/Actions/actions";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./Home.modules.css";

const Home: React.FC = () => {
  const dispatch = useDispatch(); // Obtener la función dispatch

  // Obtener el estado del paginado y hoteles filtrados
  const { filteredHotels, currentPage, totalPages, allHotels } = useSelector((state: State) => state);

  // Llamar a la acción getFilteredHotels al cargar la página o al cambiar de página
  useEffect(() => {
    dispatch(getFilteredHotels({ p: currentPage }));
  }, [dispatch, currentPage]);

  // Función para manejar la página siguiente
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(getFilteredHotels({ p: currentPage + 1 }));
    }
  };

  // Función para manejar la página anterior
  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(getFilteredHotels({ p: currentPage - 1 }));
    }
  };

  console.log("En home después de definir el select de allHotels:", allHotels);




  
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
            <span>{currentPage}</span>
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







