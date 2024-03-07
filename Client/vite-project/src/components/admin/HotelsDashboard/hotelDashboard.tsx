import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../Redux/Reducer/reducer";
import { getDisabledHotels } from "../../../Redux/Actions/actions";
import HotelDisable from "./HotelDisable"; 
import './HotelDashboard.css';
import HotelsDisable from "./HotelsDisable";

const HotelDashboard: React.FC = () => {
  const { allAdminHotels } = useSelector((state: State) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDisabledHotels());
  }, []);

  return (
    <div className="hotel-dashboard">
      <h2>Hotels Dashboard</h2>
      <table className="hotel-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Price</th>
            <th>ID</th>
            <th>Action</th> 
          </tr>
        </thead>
        <tbody>
          {<HotelsDisable allAdminHotels={allAdminHotels}/>}
        </tbody>
      </table>
    </div>
  );
};

export default HotelDashboard;


{/*           <button className={`availability-button ${hotel.availability ? 'disable' : 'enable'}`}>
                  {hotel.availability ? 'Deshabilitar' : 'Habilitar'}
                </button> */}


