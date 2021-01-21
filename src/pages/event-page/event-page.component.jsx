import React, { useEffect, useState } from "react";
import "./event-page.styles.scss";

import { useHistory, withRouter } from "react-router-dom";

import EventForm from "../../components/event-form/event-form.component";
import ModalAlert from "../../components/modal-alert/modal-alert.component";
import ModalContext from "../../contexts/modal/modal.context";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectEventFormDatas } from "../../redux/events/events.selectors";
import {
  getEventFormDatasAction,
  deleteEventAction,
  updateEventOnFirestoreAction,
} from "../../redux/events/events.actions";

const EventPage = ({
  match,
  getEventFormDatas,
  eventFormDatas,
  deleteEvent,
  updateEventOnFirestore,
}) => {
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  const updateEvent = (event) => {
    event.preventDefault();
    updateEventOnFirestore()
    setShowModal(true);
  };

  useEffect(() => {
    getEventFormDatas(match.params.eventId);
  }, [getEventFormDatas, match.params.eventId]);

  return (
    <ModalContext.Provider value={{ showModal, setShowModal }}>
      {showModal ? (
        <ModalAlert
          title={"Evento Atualizado"}
          text={"..."}
          handleClick={() => history.push("/events")}
        />
      ) : null}

      <div className="event__page">
        <div className="event__image--box">
          <img
            className="event__image"
            src={eventFormDatas.image}
            alt="event"
          />
        </div>
        <div className="event__form--box">
          <h1 className="event__title">
            Editar: <span>{eventFormDatas.eventName}</span>
          </h1>

          <div className="event__form">
            <button
              className="event__btn--delete   btn"
              onClick={() => deleteEvent(history)}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
            {
              <EventForm
                editEventDatas={eventFormDatas}
                handleSubmit={updateEvent}
              />
            }
          </div>
        </div>
      </div>
    </ModalContext.Provider>
  );
};

const mapStateToProps = createStructuredSelector({
  eventFormDatas: selectEventFormDatas,
});

const mapDispatchToProps = (dispatch) => ({
  getEventFormDatas: (data) => dispatch(getEventFormDatasAction(data)),
  deleteEvent: (data) => dispatch(deleteEventAction(data)),
  updateEventOnFirestore: () => dispatch(updateEventOnFirestoreAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EventPage));
