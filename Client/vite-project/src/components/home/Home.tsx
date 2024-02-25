import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../navBar/NavBar";
import SearchBar from "../searchBar/SearchBar";
import Cards from "../cards/Cards";
import Filters from "../filters/Filters";
import { State } from "../../Redux/Reducer/reducer";
import { getHotels } from "../../Redux/Actions/actions"; // Importa la acción para obtener hoteles
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./Home.modules.css";

const Home: React.FC = () => {
  const allHotels = useSelector((state: State) => state.allHotels);

  // const filteredHotels = useSelector((state: State) => state.filteredHotels);

  const filteredHotels = useSelector((state: State) => state.filteredHotels);

  const dispatch = useDispatch();
  // Efecto secundario para cargar hoteles al montar el componente
  useEffect(() => {
    dispatch(getHotels());
  }, [dispatch]);

  console.log("En home después de definir el select de allHotels:", allHotels);

  return (
    <div className="home-container">
      <div>
        <NavBar />
      </div>

      <div className="searchBar-container">
        <SearchBar />
      </div>

      <div>
        {" "}
        <Filters />{" "}
      </div>

      <div>
        {" "}
        <Filters />{" "}
      </div>

      <div>
        <h1>Some of our best hotels</h1>
      </div>

      <div className="card-filter-container">
        <div className="filter-container">{/* Filtros */}</div>

        <div className="allCards">
          <Cards
            allHotels={filteredHotels.length > 0 ? filteredHotels : allHotels}
          />{" "}
          {/* Renderiza hoteles filtrados si hay, de lo contrario todos los hoteles */}
          <Cards
            allHotels={filteredHotels.length > 0 ? filteredHotels : allHotels}
          />{" "}
          {/* Renderiza hoteles filtrados si hay, de lo contrario todos los hoteles */}
        </div>
      </div>
    </div>
  );
};

export default Home;
