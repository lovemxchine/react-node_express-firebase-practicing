import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";

function PrivateRoute() {
  const { user } = useContext(AuthContext); // Assuming you have a context providing user state
  console.log(user);
  if (!user) {
    return <Navigate to="/"></Navigate>;
  } else {
    return <Outlet />;
  }
}

export default PrivateRoute;
