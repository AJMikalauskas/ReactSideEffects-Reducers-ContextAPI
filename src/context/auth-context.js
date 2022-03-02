import React, { useState, useEffect } from "react";

// This is an object that will contain a component(AuthContext)
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin:(email, password) => {}
});

// export an auth context component - this replaces what's in app.js, even the handler functions?
export const AuthContextProvider = (props) => {
  // Similar to what's in app.js, but why add the login, logout handler functions
  // Manages auythentication state in this seprate provider component of app.js
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInfo = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInfo === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  const loginHandler = (email, password) => {
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

// export so it can be user by other components
export default AuthContext;
