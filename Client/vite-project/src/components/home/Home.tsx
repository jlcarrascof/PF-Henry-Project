// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import NavBar from "../navBar/NavBar";
// import SearchBar from "../searchBar/SearchBar";
// import Cards from "../cards/Cards";
// import { State } from "../../Redux/Reducer/reducer";
// import { getHotels } from '../../Redux/Actions/actions'; // Importa la acción para obtener hoteles
// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";
// import "./Home.modules.css";

// //import { Action } from '../../Redux/Actions/actions';

// const Home: React.FC = () => {
//     const allHotels = useSelector((state: State) => state.allHotels);
//     const dispatch = useDispatch();

//     // Efecto secundario para cargar hoteles al montar el componente
//     useEffect(() => {
//         dispatch(getHotels());
//     }, [dispatch]);

//     console.log('En home después de definir el select de allHotels:', allHotels);

//     return (
//         <div className="home-container">
//             <NavBar />
//             <div className="searchBar-container">
//                 <SearchBar />
//             </div>
//             <div>
//                 <h1>Some of our best hotels</h1>
//             </div>
//             <div className="card-filter-container">
//                 <div className="filter-container">
//                     {/* Filtros */}
//                 </div>
//                 <div className="allCards">
//                     <Cards allHotels={allHotels} />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Home;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../navBar/NavBar";
import SearchBar from "../searchBar/SearchBar";
import Cards from "../cards/Cards";
import { State } from "../../Redux/Reducer/reducer";
import { getHotels } from "../../Redux/Actions/actions"; // Importa la acción para obtener hoteles
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./Home.modules.css";

//import { Action } from '../../Redux/Actions/actions';

const Home: React.FC = () => {
  const allHotels = useSelector((state: State) => state.allHotels);
  const dispatch = useDispatch();

  // Efecto secundario para cargar hoteles al montar el componente
  useEffect(() => {
    dispatch(getHotels());
  }, [dispatch]);

  console.log("En home después de definir el select de allHotels:", allHotels);

  return (
    <div className="home-container">
      <NavBar />
      <div className="searchBar-container">
        <SearchBar />
      </div>
      <div>
        <h1>Some of our best hotels</h1>
      </div>
      <div className="card-filter-container">
        <div className="filter-container">{/* Filtros */}</div>
        <div className="allCards">
          <Cards allHotels={allHotels} />
        </div>
      </div>
    </div>
  );
};

export default Home;
