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
  SrvJacuzzi: false,
  SrvBreakfast: false,
  SrvPool: false,
  SrvGym: false,
  SrvGameRoom : false,
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
    filters.services += filters.SrvSpa                ? ",Spa"            : "";
    filters.services += filters.SrvWifi               ? ",Wifi"           : "";
    filters.services += filters.SrvBar                ? ",Bar"            : "";
    filters.services += filters.SrvJacuzzi            ? ",Jacuzzi"        : "";
    filters.services += filters.SrvBreakfast          ? ",Breakfast"      : "";
    filters.services += filters.SrvPool               ? ",Pool"           : "";
    filters.services += filters.SrvGym                ? ",Fitness center" : "";
    filters.services += filters.SrvGameRoom           ? ",Game Room"      : "";


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
      <h1>Filter your <span className="purple">search</span></h1>
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
      <input
        type="text"
        name="minScore"
        value={filters.minScore}
        onChange={handleFilterChange}
        placeholder="Min Score"
      />

      <h2 className="services-title">Services</h2>
      <div className="services-grid">
        <div >
          <label htmlFor="srvwifi">Wifi</label>
          <input onChange={handleFilterChange} type="checkbox" id="srvwifi" name="SrvWifi" checked={filters.SrvWifi} />
        </div>
        <div>
          <label htmlFor="srvbar">Bar</label>
          <input onChange={handleFilterChange} type="checkbox" id="srvbar" name="SrvBar" checked={filters.SrvBar} />
        </div>
        <div>
          <label htmlFor="srvspa">Spa</label>
          <input onChange={handleFilterChange} type="checkbox" id="srvspa" name="SrvSpa" checked={filters.SrvSpa} />
        </div>
        <div>
          <label htmlFor="srvfinediningrestaurant">Jacuzzi</label>
          <input onChange={handleFilterChange} type="checkbox" id="SrvJacuzzi" name="SrvJacuzzi" checked={filters.SrvJacuzzi} />
        </div>
        <div>
          <label htmlFor="srvwifi">Pool</label>
          <input onChange={handleFilterChange} type="checkbox" id="SrvPool" name="SrvPool" checked={filters.SrvPool} />
        </div>
        <div>
          <label htmlFor="srvwifi">Breakfast</label>
          <input onChange={handleFilterChange} type="checkbox" id="SrvBreakfast" name="SrvBreakfast" checked={filters.SrvBreakfast} />
        </div>
        <div>
          <label htmlFor="srvwifi">Fitness center</label>
          <input onChange={handleFilterChange} type="checkbox" id="SrvGym" name="SrvGym" checked={filters.SrvGym} />
        </div>
        <div>
          <label htmlFor="srvwifi">Game Room</label>
          <input onChange={handleFilterChange} type="checkbox" id="SrvGameRoom" name="SrvGameRoom" checked={filters.SrvGameRoom} />
        </div>
      </div>

      <button onClick={handleFilterSubmit}>Apply Filters</button>
      <button onClick={handleResetFilters}>Reset</button>
    </div>
  );
};

export default Filters;
