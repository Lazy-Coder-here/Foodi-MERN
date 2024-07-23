import React, { createContext, useContext, useEffect, useState } from "react";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";
import { BaseURL } from "../Config/config";

const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  // create an account
  const createUser = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // signup with gmail
  const signUpWithGmail = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // signup with facebook
  const signUpWithFacebook = () => {
    return signInWithPopup(auth, facebookProvider);
  };

  // login using email and password
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // logout
  const logOut = () => {
    return signOut(auth);
  };

  // update profile
  const updateUserProfile = ({ name, photoURL }) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  // check signed-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);

    return () => {
      return unsubscribe();
    };
  }, []);

  // function which is going to be called when we receive any user info
  function initializeUser(currentUser) {
    if (currentUser) {
      setUser(currentUser);
      if(!currentUser.email) {
        currentUser.email = currentUser.providerData[0].email;
      }
      setUserLoggedIn(true);
      const userInfo = { email: currentUser.email };
      axios.post(`${BaseURL}/jwt`, userInfo).then((res) => {
        if (res.data.token) {
          localStorage.setItem("access-token", res.data.token);
        }
      });
    } else {
      setUser(null);
      setUserLoggedIn(false);
      localStorage.removeItem("access-token");
    }
    setLoading(false);
  }

  const authInfo = {
    user,
    createUser,
    signUpWithGmail,
    signUpWithFacebook,
    login,
    logOut,
    updateUserProfile,
    loading,
    userLoggedIn,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
