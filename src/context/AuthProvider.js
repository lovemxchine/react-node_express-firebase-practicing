import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(false);
  const [token, setToken] = useState("");

  const logIn = (token) => {
    setAuthState(true);
    setToken(token);
    window.localStorage.setItem("auth", true);
    window.localStorage.setItem("token", token);
  };

  const logOut = () => {
    setAuthState(false);
    setToken("");
    window.localStorage.removeItem("auth");
    window.localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ authState, token, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
