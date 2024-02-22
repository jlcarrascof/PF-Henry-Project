// framework Styles
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faLocationDot, faPerson } from '@fortawesome/free-solid-svg-icons';
// Styles
import styles from "../searchBar/SearchBar.module.css";

const SearchBar: React.FC = () => {
  return (
    <div className={styles.headerSearch}>
    <div className={styles.headerSearchItem}>     
      <FontAwesomeIcon icon={faLocationDot} className={styles.headerIcon} />
      <input type="text" placeholder="Where we going?" className={styles.headerSearchInput}/>
    </div>
    <div className={styles.headerSearchItem}>     
      <FontAwesomeIcon icon={faCalendar} className={styles.headerIcon}/>
      <span className={styles.headerSearchText}> date to date </span>
    </div>
    <div className={styles.headerSearchItem}>     
      <FontAwesomeIcon icon={faPerson} className={styles.headerIcon}/>
      <span className={styles.headerSearchText}> # people # room </span>
    </div>
    <div className={styles.headerSearchItem}>     
      <button className={styles.headerBtn}> Search </button>
    </div>
    </div>
  );
};

export default SearchBar;
