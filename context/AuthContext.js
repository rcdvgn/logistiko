import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../config/firebaseConfig";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// Create a context for authentication
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signUp = async (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Account created");
        setUser(userCredential.user);
      })
      .catch((error) => {
        //   const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage);
      });
  };

  const signIn = async (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Signed up");
        setUser(userCredential.user);
      })
      .catch((error) => {
        //   const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage);
      });
  };

  const logOut = (auth) => {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signUp,
        logOut,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);
