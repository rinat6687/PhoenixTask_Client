import React from "react";
import "./CustomInput.css";

const CustomInput = ({ label, name, value, onChange, type = "text" }) => {
  return (
    <div className="input-container">
      <label htmlFor={name}>{label}</label>
      <input
        className="custom-input"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default CustomInput;
