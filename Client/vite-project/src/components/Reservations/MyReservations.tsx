import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConfirmedReservations } from "../../Redux/Actions/actions";
import { State } from "../../Redux/Reducer/reducer";
import { Link } from "react-router-dom";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import ReviewModal from './reviewModal';
import "./MyRervations.css";
import EmptyComp from "./EmptyComp";

const MyReservations: React.FC = () => {
  const dispatch = useDispatch();
  //const userEmail = useSelector(state => state.user?.email);
  //const { user_email: userEmail } = JSON.parse(window.localStorage.getItem("user") || "{}")
  const userId = JSON.parse(window.localStorage.getItem("user") || "{}")?._id;

  const confirmedReservations = useSelector((state: State) => state.confirmedReservations);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      dispatch(getConfirmedReservations(userId));
    }
  }, [dispatch, userId]);

  const handleReviewClick = (roomId: string) => {
    setSelectedRoomId(roomId);
  };

  const handleCloseModal = () => {
    setSelectedRoomId(null);
  };

  const handleReviewSubmitted = () => {
    console.log("userId en MyReservations review: ", userId)
    if (userId) {
      dispatch(getConfirmedReservations(userId));
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150 },
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
    // { field: 'reservationMade', headerName: 'Reservation Made', width: 200 },
    {
      field: 'review',
      headerName: 'Review',
      width: 150,
      renderCell: (params) => (
        <button onClick={() => handleReviewClick(params.row.roomId)}>Leave Review</button>
      )
    }
  ];

  const rows = confirmedReservations.map((reservation: any, index: number) => {
    console.log("Reservation:", reservation)
   return { 
    id: index + 1,
    startDate: reservation.startDate,
    endDate: reservation.endDate,
    room: reservation.room,
    // reservationMade: reservation.reservationMade,
    roomId: reservation.room
   }
  });

  return (
    
    <div className="my-reservations-container">
      {!rows || rows.length == 0 ? (<EmptyComp />) : (
      <div className="data-grid-container">
        <DataGrid
          className="data-grid"
          rows={rows}
          columns={columns}
          pageSize={5}
          />
      </div>
      )}
      {selectedRoomId !== null && <ReviewModal roomId={selectedRoomId} onClose={handleCloseModal} onSubmitReview={handleReviewSubmitted} />}
    </div>
  );
};

export default MyReservations;





// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getConfirmedReservations } from "../../Redux/Actions/actions";
// import { State } from "../../Redux/Reducer/reducer";
// import { Link } from "react-router-dom";
// import { DataGrid, GridColDef } from '@mui/x-data-grid';
// import ReviewModal from './reviewModal';
// import "./MyRervations.css";
// import EmptyComp from "./EmptyComp";

// const MyReservations: React.FC = () => {
//   const dispatch = useDispatch();
//   //const userEmail = useSelector(state => state.user?.email);
//   const { user_email: userEmail } = JSON.parse(window.localStorage.getItem("user") || "{}")

//   const confirmedReservations = useSelector((state: State) => state.confirmedReservations);
//   const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

//   useEffect(() => {
//     if (userEmail) {
//       dispatch(getConfirmedReservations(userEmail));
//     }
//   }, [dispatch, userEmail]);

//   const handleReviewClick = (roomId: string) => {
//     setSelectedRoomId(roomId);
//   };

//   const handleCloseModal = () => {
//     setSelectedRoomId(null);
//   };

//   const handleReviewSubmitted = () => {
//     if (userEmail) {
//       dispatch(getConfirmedReservations(userEmail));
//     }
//   };

//   const columns: GridColDef[] = [
//     { field: 'id', headerName: 'ID', width: 150 },
//     { field: 'startDate', headerName: 'Start Date', width: 150 },
//     { field: 'endDate', headerName: 'End Date', width: 150 },
//     {
//       field: 'room',
//       headerName: 'Room',
//       width: 200,
//       renderCell: (params) => (
//         <Link to={`/detail/${params.value}`}>{params.value}</Link>
//       )
//     },
//     // { field: 'reservationMade', headerName: 'Reservation Made', width: 200 },
//     {
//       field: 'review',
//       headerName: 'Review',
//       width: 150,
//       renderCell: (params) => (
//         <button onClick={() => handleReviewClick(params.row.roomId)}>Leave Review</button>
//       )
//     }
//   ];

//   const rows = confirmedReservations.map((reservation: any, index: number) => {
//     console.log("Reservation:", reservation)
//    return { 
//     id: index + 1,
//     startDate: reservation.startDate,
//     endDate: reservation.endDate,
//     room: reservation.room,
//     // reservationMade: reservation.reservationMade,
//     roomId: reservation.room
//    }
//   });

//   return (
    
//     <div className="my-reservations-container">
//       {!rows || rows.length == 0 ? (<EmptyComp />) : (
//       <div className="data-grid-container">
//         <DataGrid
//           className="data-grid"
//           rows={rows}
//           columns={columns}
//           pageSize={5}
//           />
//       </div>
//       )}
//       {selectedRoomId !== null && <ReviewModal roomId={selectedRoomId} onClose={handleCloseModal} onSubmitReview={handleReviewSubmitted} />}
//     </div>
//   );
// };

// export default MyReservations;




