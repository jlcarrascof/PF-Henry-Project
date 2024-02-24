import React from 'react';
import { useSelector } from 'react-redux';
import NavBar from "../navBar/NavBar";
import SearchBar from "../searchBar/SearchBar";
import Cards from "../cards/Cards";
import { State } from "../../Redux/Reducer/reducer"; // Importa el tipo de estado
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css"; 
import "./Home.modules.css";

const Home: React.FC = () => {
    const allHotels = useSelector((state: State) => state.allHotels); 

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
                <div className="filter-container">
                    {/* Filtros */}
                </div>
                <div className="allCards">
                    
                    <Cards allHotels={allHotels} />
                </div>
            </div>
        </div>
    );
}

export default Home;


