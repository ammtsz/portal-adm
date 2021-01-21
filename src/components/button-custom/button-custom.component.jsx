import React from "react";
import "./button-custom.styles.scss";


function CustomButton({
  primary, //if it's a primary button, the color is primary
  path,
  display,
  handleClick,
  ...otherButtonProps
}) {
  return (
    <button
      className={`${
        primary
          ? "primary-button_ btn-dark"
          : "secondary-button_ btn-light"
      } form-control btn`}
      {...otherButtonProps}
      onClick={handleClick}
    >
      {display}
    </button>
  );
}

export default CustomButton;
