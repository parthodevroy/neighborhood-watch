import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { auth } from "../component/authentication/firebase.init";
import { Authcontext } from "./Authcontext";
import { useEffect, useState } from "react";







const Authprovider = ({children}) => {
    const [user,setUser]=useState(null)

    const [loading, setLoading] = useState(true);

    const userregister=(gmail,password)=>{
        return createUserWithEmailAndPassword(auth,gmail,password)
    }
    const userlogin=(gmail,password)=>{
        return signInWithEmailAndPassword (auth,gmail,password)
    }
    // const googlelogin=()=>{
    //     signInWithPopup(auth,googleprovider)
        
    // }
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
        loading
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