import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const NavBar = (user) => {
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const orderPage = (event) => {
    navigate("order");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(user);
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleMenu}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Photos
        </Typography>

        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar src={user.avatar} alt={user.id} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={orderPage}>Order thing</MenuItem>

            <MenuItem onClick={logOut}>Log out</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
