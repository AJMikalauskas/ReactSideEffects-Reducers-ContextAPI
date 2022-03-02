import React, { useRef, useEffect, useImperativeHandle } from "react";
import styles from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  // An empty array of dependencies runs onlye 1 time after this component has rendered
  //   useEffect(()=> {
  //     inputRef.current.focus();
  //   }, [])

  const focusInput = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => {
      return {
          focusInput: focusInput
      }
  });
  return (
    <div
      className={`${styles.control} ${
        props.isValid === false ? styles.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});

export default Input;
