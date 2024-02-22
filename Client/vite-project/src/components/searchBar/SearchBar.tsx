// framework Styles
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faLocationDot,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { Range, DateRange, DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
// dependencies
import { useState } from "react";
// Styles
import styles from "../searchBar/SearchBar.module.css";

const SearchBar: React.FC = () => {
  // calendar framework
  interface State {
    startDate: Date | undefined;
    endDate: Date | undefined;
    key: string;
  }

  const initialState: State = {
    startDate: new Date(),
    endDate: undefined,
    key: "selection",
  };

  const [state, setState] = useState<State>(initialState);

  // useState for people and rooms
  interface Options {
    people: number;
    rooms: number;
  }

  const initialOptions: Options = {
    people: 1,
    rooms: 1,
  };

  const [options, setOptions] = useState<Options>(initialOptions);

  const handleOption = (name: "people" | "rooms", operation: "i" | "d") => {
    setOptions((prev) => {
      if (operation === "i") {
        return {
          ...prev,
          [name]: (prev as { people: number; rooms: number })[name] + 1,
        };
      } else {
        return {
          ...prev,
          [name]: (prev as { people: number; rooms: number })[name] - 1,
        };
      }
    });
  };

  //handle change for calendar => change the code of JS
  const handleChange = (item: { selection: State }) => {
    setState(item.selection);
  };

  //hable options for people and rooms
  // const handleOption = (name: keyof Options, operation: "i" | "d") => {
  //   setOptions((prev) => ({
  //     ...prev,
  //     [name]: operation === "i" ? prev[name] + 1 : prev[name] - 1,
  //   }));
  // };

  return (
    <div className={styles.headerSearch}>
      <div className={styles.headerSearchItem}>
        <FontAwesomeIcon icon={faLocationDot} className={styles.headerIcon} />
        <input
          type="text"
          placeholder="Where we going?"
          className={styles.headerSearchInput}
        />
      </div>
      <div className={styles.headerSearchItem}>
        <FontAwesomeIcon icon={faCalendar} className={styles.headerIcon} />
        <span className={styles.headerSearchText}> date to date </span>
      </div>
      <div className={styles.headerSearchItem}>
        <FontAwesomeIcon icon={faPerson} className={styles.headerIcon} />
        <span className={styles.headerSearchText}>
          {" "}
          {`${options.people} people - ${options.rooms}`}{" "}
        </span>
        <DateRangePicker
          editableDateInputs={true}
          onChange={() => handleChange}
          moveRangeOnFirstSelection={false}
          ranges={[state]}
        />
        <div className={styles.options}>
          <div className={styles.optionItem}>
            <span className={styles.optionText}> people </span>
            <div className={styles.optionCounter}>
              <button
                className={styles.optionCounterButton}
                onClick={() => handleOption("people", "d")}
              >
                -
              </button>
              <span className={styles.optionCounterNumber}>1</span>
              <button
                className={styles.optionCounterButton}
                onClick={() => handleOption("people", "i")}
              >
                +
              </button>
            </div>
          </div>
          <div className={styles.optionItem}>
            <span className={styles.optionText}> rooms </span>
            <div className={styles.optionCounter}>
              <button
                className={styles.optionCounterButton}
                onClick={() => handleOption("rooms", "d")}
              >
                -
              </button>
              <span className={styles.optionCounterNumber}>1</span>
              <button
                className={styles.optionCounterButton}
                onClick={() => handleOption("rooms", "i")}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.headerSearchItem}>
        <button className={styles.headerBtn}> Search </button>
      </div>
    </div>
  );
};

export default SearchBar;
