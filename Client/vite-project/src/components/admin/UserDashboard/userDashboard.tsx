import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../Redux/Reducer/reducer";
import { getUsers } from "../../../Redux/Actions/actions";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
} from "@mui/material";

const UserDashboard: React.FC<{}> = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const users = useSelector((state: State) => state.allUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const { users } = useSelector((state: State) => state);

  useEffect(() => {
    console.log("Users:", users); // verificar los datos de usuarios
  }, [users]);

  // Verifica si los usuarios están disponibles antes de mapearlos
  const rows = users
    ? users.map((user) => ({
        uid: user.uid,
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
        dateOfBirth: user.profile.dateOfBirth,
        email: user.email,
        phone: user.phone,
        role: user.role,
        permissions: user.permissions,
      }))
    : [];

  return (
    <TableContainer
      className="TableContainer"
      component={Paper}
      sx={({ maxHeight: "80%" }, { maxWidth: "85%" })}
    >
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
