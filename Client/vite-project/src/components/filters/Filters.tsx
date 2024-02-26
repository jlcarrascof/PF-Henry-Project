import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Action } from "../../Redux/Actions/actions";
import { getFilteredHotels, resetFilters } from "../../Redux/Actions/actions";
import "./filters.css";

const Filters: React.FC = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState<any>({
    minPrice: "",
    maxPrice: "",
    address: "",
    desiredCheckInDate: "",
    desiredCheckOutDate: "",
    minScore: "",
    services: "",
  });
/*   type Services = {
    services: "all";
    Spa: "Spa";
    Wifi: "Wifi";
    Bar: "Bar";
    RoomService: "Room service";
    Concierge: "Concierge";
    MeetingFacilities: "Meeting facilities";
  } */
  // const x: Services = { "" };
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFilterSubmit = () => {
    dispatch(getFilteredHotels(filters));
  };

  const handleClick = () => {
    dispatch(resetFilters())
  }

  return (
    <div className="filtros">
      <input
        type="text"
        name="minPrice"
        value={filters.minPrice}
        onChange={handleFilterChange}
        placeholder="Min Price"
      />
      <input
        type="text"
        name="maxPrice"
        value={filters.maxPrice}
        onChange={handleFilterChange}
        placeholder="Max Price"
      />
      <input
        type="text"
        name="address"
        value={filters.address}
        onChange={handleFilterChange}
        placeholder="Address"
      />
      {/* <input
        type="text"
        name="desiredCheckInDate"
        value={filters.desiredCheckInDate}
        onChange={handleFilterChange}
        placeholder="Check In Date"
      />
      <input
        type="text"
        name="desiredCheckOutDate"
        value={filters.desiredCheckOutDate}
        onChange={handleFilterChange}
        placeholder="Check Out Date"
      /> */}
      <input
        type="text"
        name="minScore"
        value={filters.minScore}
        onChange={handleFilterChange}
        placeholder="Min Score"
      />
      <button onClick={handleFilterSubmit}>Apply Filters</button>
      <button onClick={handleClick}>Reset</button>
    </div>
  );
};

export default Filters;
