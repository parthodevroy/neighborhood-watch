import { 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  getIdToken 
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

  //  user set
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
        
          const token = await getIdToken(currentUser);
          setUser({ 
            ...currentUser, 
            accessToken: token  
          });
        } catch (error) {
          console.error("Error fetching token:", error);
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
