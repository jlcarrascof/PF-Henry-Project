import React, { useEffect, useState } from "react"; // Importa useState
import { useDispatch, useSelector } from "react-redux";
//import NavBar from "../navBar/NavBar";
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

  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual

  // Obtener el estado del paginado y hoteles filtrados
  const { totalPages, allHotels } = useSelector((state: State) => state);

  // Llamar a la acción getFilteredHotels al cargar la página o al cambiar de página
  useEffect(() => {
    dispatch(getFilteredHotels({ p: currentPage }));
  }, [dispatch, currentPage]);

  // Función para manejar la página siguiente
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1); // Actualiza la página actual
    }
  };

  // Función para manejar la página anterior
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1); // Actualiza la página actual
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page); // Establece la página actual
    }
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





