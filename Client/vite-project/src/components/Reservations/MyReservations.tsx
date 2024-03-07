import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConfirmedReservations } from "../../Redux/Actions/actions";
import { State } from "../../Redux/Reducer/reducer";
import { Link } from "react-router-dom";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import ReviewModal from './reviewModal';
import "./MyRervations.css"

const MyReservations: React.FC = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector(state => state.user?.email);
  const confirmedReservations = useSelector((state: State) => state.confirmedReservations);

  useEffect(() => {
    if (userEmail) {
      dispatch(getConfirmedReservations(userEmail));
    }
  }, [dispatch, userEmail]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150 },
    // { field: 'description', headerName: 'Description', width: 200 },
    { field: 'startDate', headerName: 'Start Date', width: 150 },
    { field: 'endDate', headerName: 'End Date', width: 150 },
    {
      field: 'room',
      headerName: 'Room',
      width: 200,
      renderCell: (params) => (
        <Link to={`/detail/${params.value}`}>{params.value}</Link>
      )
    },
    { field: 'reservationMade', headerName: 'Reservation Made', width: 200 }
  ];

  // Generar un ID único para cada fila
  const rows = confirmedReservations.map((reservation: any, index: number) => ({
    id: index + 1,
    // description: reservation.description,
    startDate: reservation.startDate,
    endDate: reservation.endDate,
    room: reservation.room,
    reservationMade: reservation.reservationMade
  }));

  return (
    <div className="my-reservations-container">
      <div className="data-grid-container">
        <DataGrid
          className="data-grid"
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
        />

      </div>
      <ReviewModal /> 
  
    </div>
  );
};

export default MyReservations;
