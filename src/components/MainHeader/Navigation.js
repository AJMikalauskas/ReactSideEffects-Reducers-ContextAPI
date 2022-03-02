import React, { useContext } from "react";
import AuthContext from "../../context/auth-context";

import classes from "./Navigation.module.css";

// No more need for props since context is being used
const Navigation = () => {
  const ctx = useContext(AuthContext);
  return (
    // <AuthContext.Consumer> - replaced easier by useContext react hook
    //   {/* This receives the isLoggedIn state from auth Context which is dictated by the isLoggedIn state in app.js  
    //       This allows for props to be removed and forwarding to stop from mainheader to the app.js and to this file.
    //   */}
    //   {(ctx) => {
    //    return (
          <nav className={classes.nav}>
          <ul>
            {ctx.isLoggedIn && (
              <li>
                <a href="/">Users</a>
              </li>
            )}
            {ctx.isLoggedIn && (
              <li>
                <a href="/">Admin</a>
              </li>
            )}
            {ctx.isLoggedIn && (
              <li>
                <button onClick={ctx.onLogout}>Logout</button>
              </li>
            )}
          </ul>
        </nav>
    //    );
    //   }}
    // </AuthContext.Consumer>
  );
};

export default Navigation;
