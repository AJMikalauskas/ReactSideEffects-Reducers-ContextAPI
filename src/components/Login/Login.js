import React, { useEffect, useState, useReducer, useContext, useRef } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../context/auth-context";
import Input from "../UI/Input/Input";

// Reducer Function part of useReducer()
const emailReducer = (state, action) => {
  // The action is the dispatchEmail(), which is called in the emailChangeHandler
  // This if statement calls the below dispatchEmail function and checks aginst using the if statement
  // returns the val prop set with dispatchEmail and checks uses true false staement using val to get isValid
  if (action.type === "USER_INPUT_EMAIL") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    //state returns the last snapshot of the specified item such as the last snapshot of value by state.value
    // This dtermines whether or not the email field is red bordered.
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

// He tested us to create the same for the password
const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT_PASSWORD") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "PASSWORD_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  // In general return statement when nothing else in this function for now
  return { value: "", isValid: false };
};
const Login = (props) => {
  // need context to replace the props.onLogin
  const authCtx = useContext(AuthContext);
    // Forward Refs???
  const emailRef = useRef()
  const passwordRef = useRef();
  //const ref = React.createRef();

  // Can be commented out because not used, but still have to replace their functions where the state is changed.
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // The initial value of emailState is the secondParam in useReducer
  // Here, the initial value is an object with a value of empty string and isValid to false
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  // He uses object destructuring to help out and change the dependencies in the useEffect() - since it's using the passwordState
  // emailState and not emailstate.isValid or passwordState.isValid
  // the emailIsValid and passwordIsValid variables are placeholders/storedholders for the emailState.isValid property
  // and the passwordState.isValid
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;
  // This useEffect has dependencies
  // The useEffect() helps so that you aren't calling setFormIsValid in both the email and password Change Handlers, but rather,
  // you just call it in useEffect with the dependencies of the states values being used to compare against.
  // Don't add as dependency if it's a state updating function(setFormIsValid), built-in API/global functions(fetch(), localStorage)
  // or a variable that is part of a help function in another file or a varibale not within the component itself.
  useEffect(() => {
    // This could become a problem for http request since it's on every key stroke, while if you were checking if a username existed in a DB
    // you'd have to check with the overall username and not based on key stroke.
    const identifier = setTimeout(() => {
      console.log("Checking to see if setTimeout works");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    //This return statement is the useEffect() cleanup function
    // The timer set above will run the code after 500 ms
    // But if another character is typed, the time resets by clearTimeout() or the timer will reach 500 ms and run the code check above
    // This is helpful for http request thing above by only running form valid once over every key stroke it being run
    return () => {
      clearTimeout(identifier);
      console.log("Clean Up!");
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    //This is the first time we call the function with will change the emailState variable
    // This first field of type: 'USER_INPUT' is conventional, type is normally there and uppercase is conventional practice
    // - USER_INPUT can be changed to be specific to the project
    // ANy value after type is payaload and for here we store the event.target.value in the val
    dispatchEmail({ type: "USER_INPUT_EMAIL", val: event.target.value });
    //setEnteredEmail(event.target.value);

    // If I run this in this function it's bad practice and may lead to bugs for 2 reasons
    // 1: I'm using the previous value of enteredEmail and not the current one since in the same function enteredEmail doesn't chnage but only
    // once the function is exited does it change
    //2: The setFormIsValid() is checking not only against a previous value of e-mail but it's the email change handler
    // The e-mail change handler shouldn't have a form validator based on both password and email since it's a EMAIL changehandler

    // setFormIsValid(
    // event.target.value.includes('@') && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT_PASSWORD", val: event.target.value });

    //setEnteredPassword(event.target.value);
    //Bad practice to change this state based on the enteredEmail state
    // If enteredEmail state isn't update for any number of reason, emailIsValid will not return the right result
    // BAD PRACTICE!
    // setFormIsValid(
    //   event.target.value.trim().length > 6 && emailState.isValid
    // );
    // Both of these are replaced by the useEffect() above
  };

  const validateEmailHandler = () => {
    //Bad practice to change this state based on the enteredEmail state
    // If enteredEmail state isn't update for any number of reason, emailIsValid will not return the right result
    // BAD PRACTICE!
    //setEmailIsValid(emailState.isValid);

    // Instead, use dispatchEmail from useReducer()
    // All actions(dispatchEmail) should have the same format of object with type - optional val property
    // Uses the state param in the emailReducer function
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    //setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: "PASSWORD_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid)
    {
      // Both email and form is valid
    authCtx.onLogin(emailState.value, passwordState.value);
    } 
    else if(!emailIsValid)
    {
      // Email is invalid
      emailRef.current.focusInput();
    }
    else {
      // Password is Invalid
      passwordRef.current.focusInput();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailRef}
          isValid={emailIsValid}
          id="email"
          label="E-Mail"
          type="email"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordRef}
          isValid={passwordIsValid}
          id="password"
          label="Password"
          type="password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        {/* <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div> */}
        {/* <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div> */}
        <div className={classes.actions}>
          {/* disabled={!formIsValid} */}
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
