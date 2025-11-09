import React, { use } from 'react';

import { Navigate, useLocation } from 'react-router';
import { GoogleAuthProvider } from 'firebase/auth';
import { Authcontext } from '../../authcontext/Authcontext';


// const googleprovider=new GoogleAuthProvider();

const PrivateRoutes = ({children}) => {
    const{user,loading}=use(Authcontext)

    const location=useLocation()
    console.log(location);
    if (loading) return <div className="text-center py-10">Loading...</div>;
    
    if (user) {
        return children;
        
    }
    
        return <Navigate state={location?.pathname} to="/login"></Navigate>
    
};

export default PrivateRoutes;