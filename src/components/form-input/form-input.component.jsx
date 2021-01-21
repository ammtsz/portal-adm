import React from "react";
import './form-input.styles.scss'

const FormInput = ({ label, handleChange, ...otheInputProps }) => (
  <div className="form-input__box">
    {label}
    <input className="form-input_" {...otheInputProps} onChange={handleChange} />
  </div>
);

export default FormInput;
