// framework Styles
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faLocationDot, faPerson } from '@fortawesome/free-solid-svg-icons';
// Styles
import styles from "../searchBar/SearchBar.module.css";

const SearchBar: React.FC = () => {
  return (
    <>
    <div className={styles.headerSearch}>     
      <FontAwesomeIcon icon={faLocationDot} className="" />
      <input type="text" placeholder="Where we going?" className=""/>
    </div>
    <div className={styles.headerSearch}>     
      <FontAwesomeIcon icon={faCalendar} className=""/>
      <span className=""> date to date </span>
    </div>
    <div className={styles.headerSearch}>     
      <FontAwesomeIcon icon={faPerson} className=""/>
      <span className=""> 1 room </span>
    </div>
    </>
  );
};

export default SearchBar;
