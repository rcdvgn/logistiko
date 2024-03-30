import React, { createContext, useContext, useState, useEffect } from "react";
import {
  collection,
  setDoc,
  getDoc,
  doc,
  Timestamp,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../config/firebaseConfig";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

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
        lastModified: Timestamp.now(),
      };

      const docRef = doc(collection(db, "users"), uid);
      await setDoc(docRef, userData);

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
    const unsubscribeAuth = onAuthStateChanged(auth, async (currUser) => {
      // console.log(currUser);
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

    return unsubscribeAuth;
  }, []);

  useEffect(() => {
    if (user?.uid) {
      const unsubscribeUser = onSnapshot(doc(db, "users", user.uid), (doc) => {
        if (doc.exists()) {
          setUser((currUser) => {
            return { ...currUser, data: { ...doc.data() } };
          });
        }

        setLoading(false);
      });
      return unsubscribeUser;
    }
  }, [user]);

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
