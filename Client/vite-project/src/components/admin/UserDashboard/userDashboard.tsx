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
} from '@mui/material';

const UserDashboard = () => {
  const users  = useSelector((state: State) => state.allUsers);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  console.log(users)

  const rows = users ? users.map((user) => ({
    uid: user.uid || "No UID",
    firstName: user?.profile?.firstName || "No firstName",
    lastName: user?.profile?.lastName || "No lastName",
    dateOfBirth: user?.profile?.dateOfBirth || "No Birthday",
    email: user.email || "No Email",
    phone: user.phone || "No Phone",
    role: user.role,
    permissions: user.permissions,
  })) : [];

  return (
    <TableContainer className='TableContainer' component={Paper} sx={{ maxWidth: '85%', maxHeight: '80%' }}>
      <Typography variant="h3" gutterBottom component="div">
        Admin your Users
      </Typography>
      <Table aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>UID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Date of Birth</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Permissions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.uid}</TableCell>
              <TableCell>{row.firstName}</TableCell>
              <TableCell>{row.lastName}</TableCell>
              <TableCell>{row.dateOfBirth}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>{row.permissions}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserDashboard;
