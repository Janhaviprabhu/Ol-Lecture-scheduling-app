import React, { useState } from "react";


export const AuthContext = React.createContext();

function AuthContextProvider({ children }) {
  const [adminAuth, setadminAuth] = useState(false)
   const [userAuth, setuserAuth] = useState(false)
    const [logout, setLogout] = useState(false)

  const handleLogout= () => {
    if (adminAuth){
        setadminAuth(false)
    }
    if(userAuth){
        setuserAuth(false)
    }
  };
    function handleAdminLogin(){
    setadminAuth(true)
  }
    function handleUserLogin(){
    setuserAuth(true)
  }

  return (
    <AuthContext.Provider value={{ adminAuth,userAuth,handleAdminLogin,handleUserLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
