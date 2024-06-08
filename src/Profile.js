import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";
import firebase from "./firebase.js";

function Profile() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  useEffect(async () => {
    firebase.auth().onAuthChangeState((userCred) => {
      setUser(userCred);
    });
  }, [token]);
  const fetchData = async (token) => {
    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data);
      }
      Swal.fire({
        html: `<i>${error.response.data.message}</i>`,
        icon: "error",
      });
    }
  };

  if (isLoaded) {
    return <div>Loading</div>;
  } else {
    return (
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
                  <MenuItem onClick={logout}>Log out</MenuItem>
                </Menu>
              </div>
            </Toolbar>
          </AppBar>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    noValidate
                    name="fname"
                    required
                    fullWidth
                    id="fname"
                    label="First Name"
                    value={user.fname}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    noValidate
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    id="lname"
                    label="Last Name"
                    name="lname"
                    value={user.lname}
                  />
                </Grid>{" "}
                <Grid item xs={12}>
                  <TextField
                    noValidate
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    name="username"
                    label="Username"
                    type="username"
                    id="username"
                    value={user.username}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    noValidate
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={user.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    noValidate
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    name="avatar"
                    label="Avatar"
                    type="avatar"
                    id="avatar"
                    value={user.avatar}
                  />
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
      </div>
    );
  }
}

export default Profile;
