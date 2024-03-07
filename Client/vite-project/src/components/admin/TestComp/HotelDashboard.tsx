import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../../Redux/Reducer/reducer';
import { getDisabledHotels } from '../../../Redux/Actions/actions';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(
    Name: string,
    Address: string,
    Owner: string,
    RoomsData: { typeOfRoom: string; RoomId: string; Amount: number; Price: number }[],
) {
  const Rooms = Array.isArray(RoomsData) ? RoomsData.map(room => ({
    Type: room.typeOfRoom || '',
    RoomId: room.RoomId || '',
    Amount: room.Amount || 0,
    Price: room.Price || 0,
  })) : [];

  return {
    Name, 
    Address, 
    Owner,
    Rooms,
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" >
            {row.Name}
        </TableCell>
        <TableCell align="left">{row.Address}</TableCell>
        <TableCell align="right">{row.Owner}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Rooms
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Type of Room</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.Rooms.map((room) => (
                    <TableRow key={room.RoomId}>
                      <TableCell component="th" scope="row">
                        {room.Type}
                      </TableCell>
                      <TableCell>{room.RoomId}</TableCell>
                      <TableCell align="right">{room.Amount}</TableCell>
                      <TableCell align="right">{room.Price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
    
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDisabledHotels());
  }, []);
  
  const { allAdminHotels } = useSelector((state: State) => state);
  console.log(allAdminHotels)

  const rows = allAdminHotels.map((hotel) =>
    createData(hotel.name, hotel.address, hotel.rooms?.length || 0, hotel.owner ?? 0)
  );
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.Name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
