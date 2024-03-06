import React from "react";
import HotelDisable from "./HotelDisable";
import './HotelDashboard.css';

interface Hotel {
  _id: string;
  name: string;
  address: string;
  price: string;
  availability: boolean;
}

interface HotelProps {
  allAdminHotels: Hotel[];
}


const HotelsDisable: React.FC<HotelProps> = ({ allAdminHotels }) => {
  console.log("En cards la lista que recibe cómo props:", allAdminHotels);

  return (
    <div className="Disable-Container">
      <table className="hotel-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Price</th>
            <th>ID</th>
            <th>Availability</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allAdminHotels.map((hotel) => (
            <HotelDisable key={hotel._id} hotel={hotel} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HotelsDisable;
