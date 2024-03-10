import { useState } from "react";
import { getDisabledHotels, propertySearch } from "../../../Redux/Actions/actions";
import { useDispatch } from "react-redux";

const ReusableSearchBar: React.FC = () => {
    const dispatch = useDispatch();
  
    const [input, setInput] = useState<string>("");
  
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setInput(value);
    };
  
    const onClick = async () => {
        try{
            dispatch(propertySearch({ address: input })); 
        } catch (error) {
            console.log(error)
        }
    };

    const onClickReset = async () => {
        try{
            dispatch(getDisabledHotels());
            setInput("") 
        } catch (error) {
            console.log(error)
        }
    };
  
    return (
      <div className="searchContainer">
        <input
          placeholder="Where are we going?"
          onChange={onChange}
          value={input}
        ></input>
        <button onClick={onClickReset}>Reset</button>
        <button onClick={onClick}>Search</button>
      </div>
    );
  };
  
  
  export default ReusableSearchBar;