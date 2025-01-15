import React from "react";
import "./CustomInput.css";

const CustomSelect = ({ name, value, onChange, options, label }) => {
  return (
    <div  className="input-container">
      <label>{label}</label>
      <select  className="custom-input"
        name={name}
        value={value}
        onChange={onChange}
      >
        <option value="" disabled>בחר...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
