import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function Register() {
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    console.log(name);
    console.log(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrors([]);

    const validateData = (userData) => {
      let newErrors = {};

      if (!userData.fname) {
        newErrors = { ...newErrors, fname: "กรุณาใส่ชื่อจริง" };
      }
      if (!userData.lname) {
        newErrors = { ...newErrors, lname: "กรุณาใส่นามสกุล" };
      }
      if (!userData.username) {
        newErrors = { ...newErrors, username: "กรุณาใส่ username" };
      }
      if (!userData.email) {
        newErrors = { ...newErrors, email: "กรุณาใส่ email" };
      }
      if (!userData.avatar) {
        newErrors = { ...newErrors, avatar: "กรุณาใส่ avatar" };
      }
      if (!userData.password) {
        newErrors = { ...newErrors, password: "กรุณาใส่รหัสผ่าน" };
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);

        throw {
          message: "กรอกข้อมูลไม่ครบ",
          error: newErrors,
        };
      }
    };
    const source = axios.CancelToken.source();
    try {
      const data = {
        fname: inputs.fname,
        lname: inputs.lname,
        username: inputs.username,
        password: inputs.password,
        email: inputs.email,
        avatar: inputs.avatar,
      };
      validateData(data);
      console.log(inputs);
      axios
        .post("http://localhost:8080/api/register", data, {
          cancelToken: source.token,
        })
        .then((response) => {
          const result = response.data;
          console.log(result);
          if (result.status === "success") {
            Swal.fire({
              html: `<i>${result.message}</i>`,
              icon: "success",
            }).then(() => {
              navigate("/");
            });
          } else {
            Swal.fire({ html: `<i>${result.message}</i>`, icon: "error" });
          }
          setLoading(false);
        })
        .catch((error) => {
          if (axios.isCancel(error)) {
            console.log("Request canceled", error.message);
          } else {
            // handle error
            console.log(error.message);
            Swal.fire({ html: `<i>Something went wrong!</i>`, icon: "error" });
          }
          setLoading(false);
        });
    } catch (error) {
      if (error.error !== undefined) {
        console.log("Error creating new user:", error.error);
      } else {
        console.log("Error", error);
      }
      setLoading(false);
    }
  };

  return (
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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="fname"
                required
                fullWidth
                error={!!errors.fname}
                id="fname"
                label="First Name"
                autoFocus
                value={inputs.fname || ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                error={!!errors.lname}
                id="lname"
                label="Last Name"
                name="lname"
                autoComplete="family-name"
                value={inputs.lname || ""}
                onChange={handleChange}
              />
            </Grid>{" "}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                error={!!errors.username}
                name="username"
                label="Username"
                type="username"
                id="username"
                autoComplete="username"
                value={inputs.username || ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                error={!!errors.email}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={inputs.email || ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                error={!!errors.avatar}
                id="avatar"
                label="Avatar"
                name="avatar"
                autoComplete="avatar"
                value={inputs.avatar || ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                error={!!errors.password}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={inputs.password || ""}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Box mt={2} mb={1}>
            {Object.keys(errors).length > 0 && (
              <p style={{ textAlign: "center", color: "#ED4337", margin: 0 }}>
                " กรุณากรอกข้อมูลให้ครบ "
              </p>
            )}
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
            disabled={loading}
          >
            Register
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
