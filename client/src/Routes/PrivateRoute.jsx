import { AuthContext } from "../Context/AppContext";
import { Navigate } from "react-router-dom";
import React from "react";

function PrivateRoute({ children }) {
  const { userAuth,adminAuth } = React.useContext(AuthContext)
  

  if ( !adminAuth) {
    return <Navigate to="/login" />;
  }
   else if(!userAuth){
     return <Navigate to="/login" />;
  }



  return children;
}

export default PrivateRoute;