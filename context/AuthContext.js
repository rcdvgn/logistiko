import React, { createContext, useContext, useState, useEffect } from "react";
import { collection, setDoc, getDoc, doc } from "firebase/firestore";
import { auth, db } from "../config/firebaseConfig";

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

  const createUser = async (uid, email) => {
    console.log("creating user with: " + uid, email);
    try {
      const userData = {
        email: email,
        expenses: [],
      };

      const docRef = doc(collection(db, "users"), uid);
      console.log("setting doc with user: " + userData);
      await setDoc(docRef, userData);
      console.log("Document written with ID: ", docRef.id);

      return { data: userData, uid: uid };
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const signUp = async (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Account created");
        // const { uid, email } = userCredential.user;
        // setUser(createUser(uid, email));
        setUser(userCredential.user);
      })
      .catch((error) => {
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
        // const errorCode = error.code;
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
    const unsubscribe = onAuthStateChanged(auth, async (currUser) => {
      console.log(currUser);
      if (currUser) {
        const userRef = doc(db, "users", currUser.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setUser({ data: userDoc.data(), uid: currUser.uid });
        } else {
          const newUser = await createUser(currUser.uid, currUser.email);
          setUser(newUser);
        }
      } else {
        setUser(null);
      }
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
