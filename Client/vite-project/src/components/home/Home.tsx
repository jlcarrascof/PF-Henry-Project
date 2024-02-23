import Cards from "../cards/Cards";
import NavBar from "../navBar/NavBar";
import SearchBar from "../searchBar/SearchBar";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css"; 
import "./Home.modules.css"

const Home: React.FC = () => {

return (
    <div className="home-container">
        <div>
        <NavBar />
        </div>

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
            <Cards />
            </div>
        </div>

    </div>
    );
}

// <Route path="/home" element={<Home />} />
export default Home;
