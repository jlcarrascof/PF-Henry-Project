import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    User,
    signOut,
    UserCredential,
  } from "firebase/auth";
  import firebaseApp from "../login/firebaseConfig.tsx";

import { useNavigate } from "react-router-dom";
const options = [
  { name: "My purchases", role: "client" },
  { name: "Cart", role: "client" },
  { name: "Search hotels", role: "client" },
  { name: "Post hotel", role: "owner" },
  { name: "Post room", role: "owner" },
  { name: "Administer", role: "owner" },
  { name: "My hotels", role: "owner" },
  { name: "Log Out", role: "client" },
  { name: "Log Out", role: "owner" },

];

const ITEM_HEIGHT = 48;

export default function LongMenu() {
    const auth = getAuth(firebaseApp);

    const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  let user = window.localStorage.getItem('user');
  if (user) {
    user = JSON.parse(user); // user.role
  } 
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClose = async (option_name) => {
    if (option_name === 'Log Out') {
        await handleSignOut()
        navigate('/')
    }
    setAnchorEl(null);
  };


  const handleSignOut = async (): Promise<void> => {
    try {
      await signOut(auth);
      window.localStorage.clear('user')
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        style={{color: 'white'}}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.name}
            onClick={() => {handleItemClose(option.name)}}
            style={{display: user ? user.role === option.role ? 'bloque' : 'none' : 'none'}}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
