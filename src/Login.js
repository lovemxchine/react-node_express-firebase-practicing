import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { auth } from "./firebase.js";
import axios from "axios";
import { AuthContext } from "./context/AuthProvider";
import firebase from "firebase/compat/app";

function Login() {
  const [inputs, setInputs] = useState({});
  const { logIn } = useContext(AuthContext);

  const defaultTheme = createTheme();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    // console.log(inputs);
  };
  // auth.onAuthStateChanged((userCredential) => {
  //   if (userCredential) {
  //     userCredential.getIdToken().then((token) => {
  //       console.log(token);
  //       setToken(token);
  //       setAuthState(true);
  //     });
  //   } else {
  //     setAuthState(false);
  //   }
  // });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userLogin = await logIn(inputs.email, inputs.password);
      await auth.currentUser.getIdToken().then((token) => {
        console.log(token);
        checkToken(token);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const checkToken = async (token) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/login",
        {
          email: inputs.email,
          password: inputs.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="email"
                name="email"
                autoComplete="email"
                autoFocus
                value={inputs.email || ""}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={inputs.password || ""}
                onChange={handleChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      {/* {" "}
      <form onSubmit={handleSubmit}>
        <label>
          Username :
          <input
            type="text"
            name="username"
            value={inputs.username || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Password :
          <input
            type="password"
            name="password"
            value={inputs.password || ""}
            onChange={handleChange}
          />
        </label>
        <input type="submit" />
      </form>
      <div>
        <button onClick={() => navigate("/register")}>Register</button>
      </div> */}
    </div>
  );
}

export default Login;

// try {
//   event.preventDefault();
//   const raw = JSON.stringify({
//     email: inputs.email,
//     password: inputs.password,
//     // expiresIn: 600000,
//   });
//   const response = await axios
//     .post("http://localhost:8080/api/login", raw, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//     .then((responseData) => {
//       const result = responseData.data;
//       // console.log(result);
//       if (result.status === "success") {
//         Swal.fire({
//           html: `<i>${result.message}</i>`,
//           icon: "success",
//         }).then(() => {
//           setToken(result.token);
//           window.localStorage.setItem("auth", "true");
//           navigate("/profile");
//         });
//       } else {
//         Swal.fire({
//           html: `<i>${result.message}</i>`,
//           icon: "error",
//         });
//         // navigate("/profile");
//       }
//     });
//   // .catch((error) => console.error(error));
// } catch (error) {
//   if (error.response && error.response.data) {
//     console.log(error.response.data);
//   }
//   Swal.fire({
//     html: `<i>${error.response.data.message}</i>`,
//     icon: "error",
//   });
// }
// fetch("http://localhost:8080/api/login", requestOptions)
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error(`Network response was not ok ${response.status}`);
//     }
//     return response.json();
//   })
//   .then((result) => {
//     if (result.status === "success") {
//       Swal.fire({
//         html: `<i>${result.message}</i>`,
//         icon: "success",
//       }).then(() => {
//            localStorage.setItem("token", result.accessToken);
//         navigate("/profile");
//       });
//     } else {
//       Swal.fire({ html: `<i>${result.message}</i>`, icon: "error" });
//       navigate("/profile");
//     }
//   })
//   .catch((error) => console.error(error));
