import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { auth } from "axios";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { AuthContext } from "../context/AuthProvider";
import NavBar from "../components/NavBar";

function Profile() {
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
    avatar: "",
  });
  const token = localStorage.getItem("token");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const uid = localStorage.getItem("uid");

  // Function to fetch data from the server
  const fetchData = async (id) => {
    try {
      const response = await axios.get("http://localhost:8080/api/read/" + id);
      console.log(response.data);
      return response.data;
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

  useEffect(() => {
    fetchData(uid).then((data) => {
      setUser(data.message);
    });
  }, [uid]);

  if (isLoaded) {
    return <CircularProgress />;
  } else {
    return (
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <NavBar data={user}></NavBar>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
