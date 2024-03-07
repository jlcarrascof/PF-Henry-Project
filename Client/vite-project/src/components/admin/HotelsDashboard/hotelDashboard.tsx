import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../../Redux/Reducer/reducer';
import { getDisabledHotels } from '../../../Redux/Actions/actions';
import TableContainer from '@material-ui/core/TableContainer';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
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
    hotel.name,
    hotel.address,
    hotel.owner || null,
    hotel.rooms?.map((room) => ({
      description: room.description || '',
      typeOfRoom: room.typeOfRoom || '',
      id: room.id || '',
      num_rooms: room.num_rooms || 0,
      price: room.price || 0,
    })) || []
  )
);
  return (
    <TableContainer component={Paper} className='TableContainer'>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell> </TableCell>
            <TableCell>Hotel Name</TableCell>
            <TableCell align="left">Address</TableCell>
            <TableCell align="left">Owner</TableCell>
            <TableCell align="right">Disable</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.Name} row={row} />
          ))}
          <TableCell>
            <switch>Disable</switch>
          </TableCell>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
