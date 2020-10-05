import React, { useState } from "react";

const AuthContext = React.createContext([
  JSON.parse(localStorage.getItem("user")),
  () => {},
]);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  return (
    <AuthContext.Provider value={[user, setUser]}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
