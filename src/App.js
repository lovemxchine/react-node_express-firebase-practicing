import "./App.css";
import Login from "./Login.js";
import Profile from "./Profile.js";
import { Routes, Route } from "react-router-dom";
import Register from "./Register.js";
import { AuthProvider } from "./context/AuthProvider";

import { useState } from "react";
// import firebase from "./firebase.js";
function App() {
  const [authState, setAuthState] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );
  const [token, setToken] = useState("");
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
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
