import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Switch } from '@material-ui/core';
import { Popconfirm } from 'antd';
import "./HotelDashboard.css"
import { useDispatch } from 'react-redux';
import { disableHotel, disableRoom, getDisabledHotels } from '../../../Redux/Actions/actions'

export function createData(
    _id: string,
    Name: string,
    Address: string,
    Owner: string,
    availability: boolean,
    RoomsData: { description: string; typeOfRoom: string; id: string; num_rooms: number; price: number; availability: boolean }[],
) {
  const Rooms = Array.isArray(RoomsData) ? RoomsData.map(room => ({
    description: room.description || 'Its a room',
    typeOfRoom: room.typeOfRoom || 'room',
    id: room.id || 'null',
    amount: room.num_rooms || 0,
    price: room.price || 0,
    availability: room.availability || true
  })) : [];

  return {
    _id,
    Name, 
    Address, 
    Owner,
    Rooms,
    availability,
  };
}

export function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [confirmedAction, setConfirmedAction] = useState(false);
    const [localAvailability, setLocalAvailability] = useState(row.availability);
    const dispatch = useDispatch()
    
    const handleToggleDisableHotel = async (hotelId) => {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setLocalAvailability(!localAvailability)
        dispatch(disableHotel(hotelId));
        setConfirmedAction(true);
      } catch (error) {
        console.error('Error during confirmation:', error);
      }
    };
    
    const handleToggleDisableRoom = async (roomId) => {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        dispatch(disableRoom(roomId));
        setConfirmedAction(true);

        setLocalAvailability(!localAvailability)
        } catch (error) {
      console.error('Error during confirmation:', error);
    }
  };
  
  const handleChangeAvailability = (checked) => {
    if (confirmedAction) {
      setConfirmedAction(false);
    }
  };
    const handleToggle = () => {
      setOpen(!open);
    };
  
    return (
      <React.Fragment>
        <TableRow className='table-row'>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={handleToggle}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.Name}
          </TableCell>
          <TableCell align="left">{row.Address}</TableCell>
          <TableCell align="left">{row.Owner}</TableCell>
          <TableCell align="right">
          <Popconfirm
            title="Are you sure you want to disable this property?"
            onConfirm={() => handleToggleDisableHotel(row._id)}
            onCancel={() => console.log('Cancel')}
            okText="Confirm"
            cancelText="Cancel"
          >
            <Switch
              checked={localAvailability}
              onChange={handleChangeAvailability}
              color="primary"
              />
            </Popconfirm>
          </TableCell>
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
                      <TableCell>Description</TableCell>
                      <TableCell>Type of Room</TableCell>
                      <TableCell>Room Id</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="center">Price per Night($)</TableCell>
                      <TableCell align="right">Availability</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.Rooms.map((room) => (
                      <TableRow key={room.id}>
                        <TableCell component="th" scope="row">
                          {room.description}
                        </TableCell>
                        <TableCell>{room.typeOfRoom}</TableCell>
                        <TableCell>{room.id}</TableCell>
                        <TableCell align="center">{room.amount}</TableCell>
                        <TableCell align="center">{room.price}</TableCell>
                        <TableCell align="right">
                          <Popconfirm
                            title="Are you sure you want to disable this property?"
                            onConfirm={() => handleToggleDisableRoom(room.id)}
                            onCancel={() => console.log('Cancel')}
                            okText="Confirm"
                            cancelText="Cancel"
                          >
                            <Switch
                              checked={localAvailability}
                              onChange={handleChangeAvailability}
                              color="primary"
                              />
                          </Popconfirm>
                        </TableCell>
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