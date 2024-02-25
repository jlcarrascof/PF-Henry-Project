//? ----------------------------------------------------------FRAMEWORKS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faLocationDot,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
//? ----------------------------------------------------------DEPENDENCIES
import { useState, useEffect, ReactEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { State } from "../../Redux/Reducer/reducer";
import { useSelector, useDispatch } from "react-redux";
import { getFilteredHotels } from "../../Redux/Actions/actions";
//? ----------------------------------------------------------STYLES
// import styles from "../searchBar/SearchBar.module.css";
import "./searchbar.css";

const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInput(value);
  };

  const onClick = () => {
    dispatch(getFilteredHotels({ address: input })); 
    navigate("/hotels"); 
  };

  useEffect(() => {
    dispatch(getFilteredHotels(input));
    console.log(input);
  }, [input]);

  return (
    <div className="searchContainer">
      <input
        placeholder="Where are we going?"
        onChange={onChange}
        value={input}
      ></input>
      <button onClick={onClick}> Search</button>
    </div>
  );
};


export default SearchBar;






// const SearchBar: React.FC = () => {
//   const filteredHotels = useSelector((state: State) => state.filteredHotels);
//   // calendar framework
//   interface DateS {
//     startDate: Date;
//     endDate: Date | undefined;
//     key: string;
//   }

//   const initialState: DateS = {
//     startDate: new Date(),
//     endDate: new Date(),
//     key: "selection",
//   };

//   const [date, setDate] = useState<DateS>(initialState);

//   const [openState, setOpenState] = useState<boolean>(false);

//   // useState for people and rooms
//   interface Options {
//     people: number;
//     rooms: number;
//   }

//   const initialOptions: Options = {
//     people: 1,
//     rooms: 1,
//   };

//   const [options, setOptions] = useState<Options>(initialOptions);

//   const [openOptions, setOpenOptions] = useState<boolean>(false);

//   //handler for people and rooms
//   const handleOption = (name: "people" | "rooms", operation: "i" | "d") => {
//     setOptions((prev) => {
//       if (operation === "i") {
//         return {
//           ...prev,
//           [name]: (prev as { people: number; rooms: number })[name] + 1,
//         };
//       } else {
//         return {
//           ...prev,
//           [name]: (prev as { people: number; rooms: number })[name] - 1,
//         };
//       }
//     });
//   };

//   //handle change for calendar => change the code of JS
//   const handleChange = (selection: any) => {
//     setDate(selection);
//   };

//   //search button to home
//   const navigate = useNavigate();
//   const [destination, setDestination] = useState<string | null>(null);

//   const handleSearch = () => {
//     navigate("/home", {
//       state: { destination: destination, date: date, options: options },
//     });
//   };

//   return (
//     <div className={styles.headerSearch}>
//       <div className={styles.headerSearchItem}>
//         <FontAwesomeIcon icon={faLocationDot} className={styles.headerIcon} />
//         <input
//           type="text"
//           placeholder="Where we going?"
//           className={styles.headerSearchInput}
//           onChange={(e) => setDestination(e.target.value)}
//         />
//       </div>
//       <div className={styles.headerSearchItem}>
//         <FontAwesomeIcon icon={faCalendar} className={styles.headerIcon} />
//         <span
//           className={styles.headerSearchText}
//           onClick={() => setOpenState(!openState)}
//         >
//           {" "}
//           {`${format(date.startDate, "MM/dd/yyyy")} to ${
//             date.endDate ? format(date.endDate, "MM/dd/yyyy") : "--/--/----"
//           }`}{" "}
//         </span>
//         {openState && (
//           <DateRange
//             editableDateInputs={true}
//             onChange={(item) => handleChange(item.selection)}
//             moveRangeOnFirstSelection={false}
//             ranges={[date]}
//             className={styles.date}
//           />
//         )}
//       </div>
//       <div className={styles.headerSearchItem}>
//         <FontAwesomeIcon icon={faPerson} className={styles.headerIcon} />
//         <span
//           onClick={() => setOpenOptions(!openOptions)}
//           className={styles.headerSearchText}
//         >
//           {" "}
//           {`${options.people} people - ${options.rooms} rooms`}
//         </span>
//         {openOptions && (
//           <div className={styles.options}>
//             <div className={styles.optionItem}>
//               <span className={styles.optionText}> people </span>
//               <div className={styles.optionCounter}>
//                 <button
//                   className={styles.optionCounterButton}
//                   onClick={() => handleOption("people", "d")}
//                   disabled={options.people < 2}
//                 >
//                   -
//                 </button>
//                 <span className={styles.optionCounterNumber}>
//                   {options.people}
//                 </span>
//                 <button
//                   className={styles.optionCounterButton}
//                   onClick={() => handleOption("people", "i")}
//                 >
//                   +
//                 </button>
//               </div>
//             </div>
//             <div className={styles.optionItem}>
//               <span className={styles.optionText}> rooms </span>
//               <div className={styles.optionCounter}>
//                 <button
//                   className={styles.optionCounterButton}
//                   onClick={() => handleOption("rooms", "d")}
//                   disabled={options.rooms < 2}
//                 >
//                   -
//                 </button>
//                 <span className={styles.optionCounterNumber}>
//                   {options.rooms}
//                 </span>
//                 <button
//                   className={styles.optionCounterButton}
//                   onClick={() => handleOption("rooms", "i")}
//                 >
//                   +
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//       <div className={styles.headerSearchItem}>
//         <button className={styles.headerBtn} onClick={handleSearch}>
//           {" "}
//           Search{" "}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SearchBar;








