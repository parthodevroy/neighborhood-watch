import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { Authcontext } from "../../authcontext/Authcontext";
import Loading from "../Loading";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(Authcontext);
  const location = useLocation();

  if (loading) {
    return <div className="text-center py-10"><Loading></Loading></div>;
  }

  if (user) {
    return children;
  }


  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoutes;
