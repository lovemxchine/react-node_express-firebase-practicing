import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(false);
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthState(true);
      } else {
        setAuthState(false);
      }
      setLoading(false);
    }); // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const logIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // const user = userCredential.user;
      setAuthState(true);
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    auth
      .signOut()
      .then(() => {
        setAuthState(false);
        setToken("");
        window.localStorage.removeItem("auth");
        window.localStorage.removeItem("token");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <AuthContext.Provider value={{ user, authState, loading, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
