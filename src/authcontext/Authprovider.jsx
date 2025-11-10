import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

import { auth } from "../component/authentication/firebase.init";
import { Authcontext } from "./Authcontext";
import { useEffect, useState } from "react";







const Authprovider = ({children}) => {

    const provider = new GoogleAuthProvider();
    const [user,setUser]=useState(null)

    const [loading, setLoading] = useState(true);

    const userregister=(gmail,password)=>{
        return createUserWithEmailAndPassword(auth,gmail,password)
    }
    const userlogin=(gmail,password)=>{
        return signInWithEmailAndPassword (auth,gmail,password)
    }
    const googlelogin=()=>{
        return signInWithPopup(auth,provider)
        
    }
    const signout=()=>{
        signOut(auth).then(()=>{

        }).catch(error=>{
            console.log(error);
            
        })

    }

    useEffect(()=>{
        const loginuser=onAuthStateChanged(auth,(CurrentUser)=>{
            console.log("click by current user",CurrentUser);
            setUser(CurrentUser)
            setLoading(false)
        })
        return ()=>{
            loginuser
        }

    },[])

    const userinfo={
       userregister,
        userlogin,
        user,
        signout,
        loading,
         googlelogin
    //     contextuser,
    //    contextlogin,
    //   signout,
    //   googlelogin,
    }

    
    return (
        <Authcontext value={userinfo}>
            {children}
        </Authcontext>
    
    
    );
};

export default Authprovider;