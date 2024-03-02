import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getFilteredRooms, resetFilters } from "../../Redux/Actions/actions";
import "./filters.css";
import { Select, MenuItem } from '@material-ui/core';


const initialFilters = {
  p: 1,
  minPrice: "",
  maxPrice: "",
  address: "",
  desiredCheckInDate: "",
  desiredCheckOutDate: "",
  minScore: "",
  services: "",
  SrvSpa: false,
  SrvWifi: false,
  SrvBar: false,
  SrvRoomService: false,
  SrvConcierge: false,
  SrvFineDiningRestaurant: false
};

const Filters: React.FC = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState(initialFilters);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value, type } = e.target;

    setFilters((prevState) => ({
      ...prevState,
      [name]: type.toLowerCase() === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
};


  /* const services = [
    "a", "b"
  ] */

  const handleFilterSubmit = () => {
    filters.services = "";
    filters.services += filters.SrvSpa                  ? ",Spa"                    : "";
    filters.services += filters.SrvWifi                 ? ",Wifi"                   : "";
    filters.services += filters.SrvBar                  ? ",Bar"                    : "";
    filters.services += filters.SrvRoomService          ? ",Room Service"           : "";
    filters.services += filters.SrvConcierge            ? ",Concierge"              : "";
    filters.services += filters.SrvFineDiningRestaurant ? ",Fine dining restaurant" : "";

    filters.services = filters.services.startsWith(',') ? filters.services.slice(1) : filters.services;
    
    let ToSend = {
        p: filters.p,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        address: filters.address,
        desiredCheckInDate: filters.desiredCheckInDate,
        desiredCheckOutDate: filters.desiredCheckOutDate,
        minScore: filters.minScore,
        services: filters.services
    }

    console.log("Filters:", ToSend);

    dispatch(getFilteredRooms(ToSend));
  };


  const handleResetFilters = () => {
    setFilters(initialFilters); 
    dispatch(resetFilters()); 
  };


  return (
    <div className="filtros">
      <div>
        <h1>Filtra tu busqueda</h1>
      </div>
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
      {/* <input
        type="text"
        name="services"
        value={filters.services}
        onChange={handleFilterChange}
        placeholder="Services"
      /> */}

        <h2>Services</h2>
      <div className="services-grid">
        <label htmlFor="srvwifi">Wifi</label>
        <input onChange={handleFilterChange} type="checkbox" id="srvwifi" name="SrvWifi" checked={filters.SrvWifi} />
        <label for="srvbar">Bar</label>
        <input onChange={handleFilterChange} type="checkbox" id="srvbar" name="SrvBar" checked={filters.SrvBar} />
        <label for="srvspa">Spa</label>
        <input onChange={handleFilterChange} type="checkbox" id="srvspa" name="SrvSpa" checked={filters.SrvSpa} />
        <label for="srvroomservice">Room Service</label>
        <input onChange={handleFilterChange} type="checkbox" id="srvroomservice" name="SrvRoomService" checked={filters.SrvRoomService} />
        <label for="srvfinediningrestaurant">Fine dining restaurant</label>
        <input onChange={handleFilterChange} type="checkbox" id="srvfinediningrestaurant" name="SrvFineDiningRestaurant" checked={filters.SrvFineDiningRestaurant} />
        
        
      </div>

      <button onClick={handleFilterSubmit}>Apply Filters</button>
      <button onClick={handleResetFilters}>Reset</button>
    </div>
  );
};

{/* <input
        type="text"
        name="services"
        value={filters.services}
        onChange={handleFilterChange}
        placeholder="Services"
      /> */}
export default Filters;
