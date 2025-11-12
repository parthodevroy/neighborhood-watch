import { 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  getIdToken, 
  
} from "firebase/auth";

import { auth } from "../component/authentication/firebase.init";
import { Authcontext } from "./Authcontext";
import { useEffect, useState } from "react";

const Authprovider = ({ children }) => {
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //  Registration
  const userregister = (gmail, password) => {
    return createUserWithEmailAndPassword(auth, gmail, password);
  };


  //  Login
  const userlogin = (gmail, password) => {
    return signInWithEmailAndPassword(auth, gmail, password);
  };

  // Google Login
  const googlelogin = () => {
    return signInWithPopup(auth, provider);
  };

  // Logout
  const signout = () => {
    return signOut(auth);
  };
  // 🔹 Forgot Password
  // const forgotPassword = (email) => {
  //   return sendPasswordResetEmail(auth, email);
  // };

  //  user set
   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          await currentUser.reload(); 
          setUser(currentUser); 
        } catch (error) {
          console.error("Error reloading user:", error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);


  const userinfo = {
    userregister,
    userlogin,
    user,
    setUser,
    signout,
    loading,
    googlelogin,
    
  };

  return (
    <Authcontext.Provider value={userinfo}>
      {children}
    </Authcontext.Provider>
  );
};

export default Authprovider;
