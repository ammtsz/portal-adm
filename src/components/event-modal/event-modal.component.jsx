import React, { useContext } from "react";
import "./event-modal.styles.scss";

import ModalContext from "../../contexts/modal/modal.context";
import EventForm from "../event-form/event-form.component";

import { closeModal } from "./event-modal.utils"

import { connect } from 'react-redux'
import { uploadEventOnFirestoreAction } from "../../redux/events/events.actions"


const ModalEvent = ({uploadEventOnFirestore}) => {
  const { setShowModal } = useContext(ModalContext);

  const submitNewEvent = async (event) => {
    event.preventDefault();
    closeModal();
    setShowModal(true);
    await uploadEventOnFirestore();
  };


  return (
    <React.Fragment>
      <button className="new-event__close-btn" onClick={() => closeModal()}>
        <i className="fas fa-times"></i>
      </button>
      <h3 className="new-event__title">Novo Evento</h3>
      <EventForm handleSubmit={submitNewEvent} />
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => ({
  uploadEventOnFirestore: () => dispatch(uploadEventOnFirestoreAction())
})

export default connect(null, mapDispatchToProps)(ModalEvent);
