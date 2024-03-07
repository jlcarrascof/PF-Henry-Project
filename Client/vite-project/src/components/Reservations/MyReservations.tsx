import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConfirmedReservations } from "../../Redux/Actions/actions";
import { State } from "../../Redux/Reducer/reducer";
import { Link } from "react-router-dom";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import ReviewModal from './reviewModal';
import "./MyRervations.css";

const MyReservations: React.FC = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector(state => state.user?.email);
  const confirmedReservations = useSelector((state: State) => state.confirmedReservations);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  useEffect(() => {
    if (userEmail) {
      dispatch(getConfirmedReservations(userEmail));
    }
  }, [dispatch, userEmail]);

  const handleReviewClick = (roomId: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); 
    setSelectedRoomId(roomId);
  };

  const handleCloseModal = () => {
    setSelectedRoomId(null);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'description', headerName: 'Description', width: 200 },
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
    { field: 'reservationMade', headerName: 'Reservation Made', width: 200 },
    {
      field: 'review',
      headerName: 'Review',
      width: 150,
      renderCell: (params) => (
        <button onClick={(e) => handleReviewClick(params.row.roomId, e)}>Leave Review</button>
      )
    }
  ];

  const rows = confirmedReservations.map((reservation: any, index: number) => ({
    id: index + 1,
    description: reservation.description,
    startDate: reservation.startDate,
    endDate: reservation.endDate,
    room: reservation.room,
    reservationMade: reservation.reservationMade,
    roomId: reservation.roomId
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
      {selectedRoomId && <ReviewModal roomId={selectedRoomId} onClose={handleCloseModal} />}
    </div>
  );
};

export default MyReservations;






