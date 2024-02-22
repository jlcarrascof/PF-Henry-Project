import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faLocationDot, faPerson } from '@fortawesome/free-solid-svg-icons';

const SearchBar: React.FC = () => {
  return (
    <>
    <div className="">     
      <FontAwesomeIcon icon={faLocationDot} className="" />
      <input type="text" placeholder="Where we going?" className=""/>
    </div>
    <div className="">     
      <FontAwesomeIcon icon={faCalendar} className=""/>
      <span className=""> date to date </span>
    </div>
    <div className="">     
      <FontAwesomeIcon icon={faPerson} className=""/>
      <span className=""> 1 room </span>
    </div>
    </>
  );
};

export default SearchBar;
