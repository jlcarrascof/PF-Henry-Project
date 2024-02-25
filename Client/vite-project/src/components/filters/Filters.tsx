import React, { useState } from "react";
import { useDispatch } from "react-redux";
//import { Action } from "../../Redux/Actions/actions";
import { getFilteredHotels } from "../../Redux/Actions/actions";
import "./filters.css";
//import { Select, MenuItem } from '@material-ui/core';

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
// :( xd
  type Services = {
    services: "all";
    Spa: "Spa";
    Wifi: "Wifi";
    Bar: "Bar";
    RoomService: "Room service";
    Concierge: "Concierge";
    MeetingFacilities: "Meeting facilities";
  }
  const x: Services = { "" };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFilterSubmit = () => {
    dispatch(getFilteredHotels(filters));
  };

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
      <input
        type="text"
        name="services"
        value={filters.services}
        onChange={handleFilterChange}
        placeholder="Services"
      />

      <select onChange = {handleFilterChange} value={filters.service}>
                <option value="all">Services</option>
                <option value="Spa">Spa</option>
                <option value="Wifi">Wifi</option>
                <option value="Bar">Bar</option>
                <option value="Room Service">Room Service</option>
                <option value="Concierge">Concierge</option>
                <option value="Meeting">Meeting</option>
      </select>

      <select onChange={handleFilterChange} >
                <option value="all">All Services</option>
                {services.map(services => (
                    <option key={services} value={services}>{services}</option>
                ))}
            </select>

      <button onClick={handleFilterSubmit}>Apply Filters</button>
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
