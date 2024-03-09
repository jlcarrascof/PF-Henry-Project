import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../../Redux/Reducer/reducer';
import { getDisabledHotels } from '../../../Redux/Actions/actions';
import TableContainer from '@material-ui/core/TableContainer';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import {Row, createData} from "./tableRow"
import "./HotelDashboard.css"

export default function HotelDashboard() {

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getDisabledHotels());
  }, []);
  
  const { allAdminHotels } = useSelector((state: State) => state);
  console.log(allAdminHotels)

  const rows = allAdminHotels.map((hotel) =>
  createData(
    hotel._id,
    hotel.name,
    hotel.address,
    hotel.owner || null,
    hotel.availability, 
    hotel.rooms?.map((room) => ({
      description: room.description || '',
      typeOfRoom: room.typeOfRoom || '',
      id: room.id || '',
      num_rooms: room.num_rooms || 0,
      price: room.price || 0,
      availability: room.availability || true
    })) || [],
  )
);
  return (
    <div className='dashboardContainer'>
    <TableContainer component={Paper} className='TableContainer'>
      <Typography variant="h3" gutterBottom component="div">
        Admin your Hotels
      </Typography>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell> </TableCell>
            <TableCell align="center">Hotel Name</TableCell>
            <TableCell align="center">Address</TableCell>
            <TableCell align="center">Owner</TableCell>
            <TableCell align="right">Available</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.Name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
  );
}
