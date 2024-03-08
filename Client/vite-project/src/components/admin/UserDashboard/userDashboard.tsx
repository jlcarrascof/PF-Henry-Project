import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../../Redux/Reducer/reducer';
import { getUsers } from '../../../Redux/Actions/actions';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  makeStyles,
} from '@mui/material';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const UserTable = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const { users } = useSelector((state: State) => state);

  const rows = users.map((user) => ({
    disable: user.disable,
    uid: user.uid,
    firstName: user.profile.firstName,
    lastName: user.profile.lastName,
    dateOfBirth: user.profile.dateOfBirth,
    email: user.email,
    phone: user.phone,
    role: user.role,
    permissions: user.permissions,
    reservation: user.reservation, // Esto es un array, ¿cómo se procese?
  }));
//sx puede que este sobrando
  return (
    <TableContainer className='TableContainer' component={Paper} sx={{ maxHeight: '80%' }, { maxWidth: '85%' }}>
      <Typography variant="h3" gutterBottom component="div">
        Admin your Users
      </Typography>
      <Table aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell align="right">Disable</TableCell>
            <TableCell>UID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Date of Birth</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Permissions</TableCell>
            <TableCell>Reservation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="right">{row.disable}</TableCell>
              <TableCell>{row.uid}</TableCell>
              <TableCell>{row.firstName}</TableCell>
              <TableCell>{row.lastName}</TableCell>
              <TableCell>{row.dateOfBirth}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>{row.permissions}</TableCell>
              {/* Puedes agregar lógica aquí para mostrar la información de la reserva como desees */}
              <TableCell>{row.reservation ? 'Has reservations' : 'No reservations'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
