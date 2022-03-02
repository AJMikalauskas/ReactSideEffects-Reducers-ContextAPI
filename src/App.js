import React, { useState, useEffect, useContext } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./context/auth-context";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // // Cannot do this because infinite loop created, if state is changed, the whole component is called again which is what creates the loop
  // // const storedUserLoggedInInfo = localStorage.getItem('isLoggedIn');

  // // if(storedUserLoggedInInfo === 'true')
  // // {
  // //   setIsLoggedIn(true);
  // // }

  // // To get out infinite loop, the 2 params are the first being: a function to run[anonymous] and the second being: array of dependencies
  //   // This runs after the component has rendered, but the difference is that it only runs if the dependencies change
  //     // No dependencies exist and once this runs they exist so that's why this runs - but it will only run again if the dependencies change 
  //       // No infinite loop
  // useEffect(() => {
  //   const storedUserLoggedInInfo = localStorage.getItem("isLoggedIn");

  //   if (storedUserLoggedInInfo === "true") {
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  // const loginHandler = (email, password) => {
  //   // We should of course check email and password
  //   // But it's just a dummy/ demo anyways
  //   // Application tab of browser, with a kvp, isLoggedIn is the key and the value to it is "true"
  //   localStorage.setItem("email", email);
  //   localStorage.setItem("password", password);
  //   localStorage.setItem("isLoggedIn", "true");
  //   setIsLoggedIn(true);
  // };

  // const logoutHandler = () => {
  //   localStorage.removeItem('isLoggedIn');
  //   setIsLoggedIn(false);
  // };
  const ctx = useContext(AuthContext)
  return (
    <React.Fragment>
{/* 
    // <AuthContext.Provider
    // // By setting the auth context object of isLoggedIn value to the state of app.js,
    //   // auth context can now be used anywhere in any component and the state is based on app.js
    //     // sent down by AuthContext.Consumer or useContext() hook
    // value={{ isLoggedIn: isLoggedIn, onLogout: logoutHandler }}
    // > */}
      {/* isAuthenticated={isLoggedIn} */}
      <MainHeader/>
      <main>
        {!ctx.isLoggedIn && <Login  />}
        {ctx.isLoggedIn && <Home />}
      </main>
    </React.Fragment>
    // </AuthContext.Provider>
  );
}

export default App;
