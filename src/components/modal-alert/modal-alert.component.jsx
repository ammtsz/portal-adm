import React, { useContext } from "react";
import "./modal-alert.styles.scss";

import { withRouter } from "react-router-dom";
import ModalContext from "../../contexts/modal/modal.context";

const ModalAlert = ({ title, text, handleClick }) => {
  const { setShowModal } = useContext(ModalContext);
  
  const onclick = () => {
    if(handleClick) handleClick()
    setShowModal(false);

    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

  };

  return (
    <div className="modal-alert__container">
      <div className="modal-alert__box">
        <div className="modal-alert__message">
          <h3 className="modal-alert__message--title">{title}</h3>
          <p className="modal-alert__message--text">{text}</p>
        </div>
        <button
          onClick={onclick}
          className="modal-alert__button     btn btn-dark"
        >
          ok
        </button>
      </div>
    </div>
  );
};

export default withRouter(ModalAlert);
