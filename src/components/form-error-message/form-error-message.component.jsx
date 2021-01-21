import React from "react";
import "./form-error-message.styles.scss";

function FormErrorMessage({ error, message }) {
  return error ? <p className="error-message_">{message}</p> : null;
}

export default FormErrorMessage;
