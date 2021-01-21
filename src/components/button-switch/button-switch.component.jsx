import React from "react";
import "./button-switch.styles.scss";

const ButtomSwitch = ({ label, id, ...otherSwitchProps}) => (
  <div className="button-switch_">
    <label className="button-switch__container">
      <input type="checkbox" id={`button-switch--${id}`} {...otherSwitchProps}/>
      <span className="slider round"></span>
    </label>
    
    <label className="form-check-label" htmlFor={`button-switch--${id}`}>
      {label}
    </label>
  </div>
);

export default ButtomSwitch;

