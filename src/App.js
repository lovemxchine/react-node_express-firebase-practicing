import Login from "./pages/Login.js";
import Profile from "./pages/Profile.js";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register.js";

import { useState, useEffect, useContext } from "react";
import Order from "./pages/Order.js";
import PrivateRoute from "./components/PrivateRoute.js";
import { AuthContext } from "./context/AuthProvider";
// import ProtectedRoute from "./components/ProtectedRoute.js";

function App() {
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    console.log(user);
  }, [user]);
  if (loading) {
    return <div>Loading...</div>; // or your loading component
  }

  return (
    <Routes>
      <Route>
        {!user && (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
      </Route>
      // Private Route for User Logged In
      <Route element={<PrivateRoute />}>
        <Route path="/login" element={<Navigate to="/" />} />
        <Route path="/register" element={<Navigate to="/" />} />
        <Route path="/" element={<Navigate to="/user" />} />

        <Route path="/user" element={<Profile />} />
        <Route path="/user/order" element={<Order />} />
      </Route>
    </Routes>
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
