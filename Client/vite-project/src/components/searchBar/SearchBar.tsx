// framework Styles
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faLocationDot, faPerson } from '@fortawesome/free-solid-svg-icons';
//import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
// dependencies
import { useState } from "react";
// Styles
import styles from "../searchBar/SearchBar.module.css";

const SearchBar: React.FC = () => {
 
  // calendar framework
 // interface State {
 //   startDate: Date | undefined;
 //   endDate: Date | undefined;
 //   key: string;
 // }
  
 // const initialState: State = {
 //   startDate: new Date(),
 //   endDate: undefined,
 //   key: 'selection'
 // };
  

 // const [state, setState] = useState<State[]>([initialState]);

 // <DateRange
 //     editableDateInputs={true}
 //     onChange={item => setState([item.selection])}
 //     moveRangeOnFirstSelection={false}
 //     ranges={state}
 //      />
  interface Options {
    people: number;
    rooms: number;
  }

  const initialOptions: Options = {
    people: 0,
    rooms: 0
  };

  const [options, setOptions] = useState<Options[]>([initialOptions]);

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
      <span className={styles.headerSearchText}> {`${options.people} people - ${options.rooms}`} </span>
    </div>
    <div className={styles.headerSearchItem}>     
      <button className={styles.headerBtn}> Search </button>
    </div>
    </div>
  );
};


export default SearchBar;
