import React from "react";

const Input = ({ name, label, checkClass, ...rest }) => {
  return (
    <div className={`form-control ${checkClass}`}>
      <label htmlFor={name}>{label}</label>
      <input {...rest} id={name} name={name} />
    </div>
  );
};

export default Input;
