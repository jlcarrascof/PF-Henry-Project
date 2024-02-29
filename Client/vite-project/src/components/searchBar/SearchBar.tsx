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
import { getFilteredRooms } from "../../Redux/Actions/actions";
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
    dispatch(getFilteredRooms({ address: input })); 
    navigate("/hotels"); 
  };

  useEffect(() => {
    dispatch(getFilteredRooms(input));
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