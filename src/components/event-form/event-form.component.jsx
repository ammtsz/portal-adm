import React, { useEffect } from "react";
import "./event-form.styles.scss";

import FormInput from "../form-input/form-input.component";
import SwitchButton from "../button-switch/button-switch.component";
import CustomButton from "../button-custom/button-custom.component";
import EventAttendees from "../event-attendees/event-attendees.component";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectEventFormDatas } from "../../redux/events/events.selectors";
import {
  setEventFormDatasAction,
  handleEventFormChangeAction,
  imageUploadListenerAction,
  resetEventFormAction,
  setIsEditingAttendeesAction,
  setEventAttendeesIdsAction,
} from "../../redux/events/events.actions";
import { setShowSuggestionsAction } from "../../redux/search-bar/search-bar.actions";

const EventForm = ({
  handleSubmit,
  editEventDatas,
  eventFormDatas,
  setEventFormDatas,
  handleEventFormChange,
  imageUploadListener,
  resetEventForm,
  setIsEditingAttendees,
  setShowSuggestions,
  setEventAttendeesIds,
}) => {
  const {
    eventName,
    startDate,
    endDate,
    startTime,
    endTime,
    location,
    organizers,
    description,
    publicEvent,
  } = eventFormDatas;

  const submitForm = (event) => {
    handleSubmit(event);
    resetEventForm();
    setEventAttendeesIds([]);
  };

  useEffect(() => {
    imageUploadListener();

    return () => {
      imageUploadListener();
      setIsEditingAttendees(false);
      setShowSuggestions(false);
      resetEventForm();
      setEventAttendeesIds([]);
    };
  }, [
    imageUploadListener,
    setIsEditingAttendees,
    setShowSuggestions,
    resetEventForm,
    setEventAttendeesIds,
  ]);

  return (
    <form onSubmit={(event) => submitForm(event)} className="new-event__form">
      <FormInput
        type="text"
        id="event-name"
        placeholder="Nome do Evento"
        value={eventName}
        name="eventName"
        handleChange={(event) => handleEventFormChange(event)}
      />
      <div className="new-event__group">
        <FormInput
          label={<label htmlFor="event-start-date">Início:</label>}
          type="date"
          id="event-start-date"
          placeholder="Data de Início do Evento"
          value={startDate}
          name="startDate"
          handleChange={(event) => handleEventFormChange(event)}
        />
        <FormInput
          type="time"
          id="event-start-time"
          placeholder="Hora do Início do Evento"
          value={startTime}
          name="startTime"
          handleChange={(event) => handleEventFormChange(event)}
        />
      </div>
      <div className="new-event__group">
        <FormInput
          label={<label htmlFor="event-end-date">Término:</label>}
          type="date"
          id="event-end-date"
          placeholder="Data de Término do Evento"
          value={endDate}
          name="endDate"
          handleChange={(event) => handleEventFormChange(event)}
        />

        <FormInput
          type="time"
          id="event-end-time"
          placeholder="Hora do Término do Evento"
          value={endTime}
          name="endTime"
          handleChange={(event) => handleEventFormChange(event)}
        />
      </div>
      <FormInput
        label={<i className="fas fa-map-marker-alt"></i>}
        type="text"
        id="event-location"
        placeholder="Local do evento"
        value={location}
        name="location"
        handleChange={(event) => handleEventFormChange(event)}
      />
      <FormInput
        label={<i className="fas fa-users"></i>}
        type="text"
        id="event-organizers"
        placeholder="Organizadores do evento"
        value={organizers}
        name="organizers"
        handleChange={(event) => handleEventFormChange(event)}
      />
      <textarea
        id="event-description"
        placeholder="Conte um pouquinho mais sobre este evento"
        value={description}
        name="description"
        onChange={(event) => handleEventFormChange(event)}
      />
      <SwitchButton
        label="Evento aberto ao público"
        id="new-public-event"
        name="publicEvent"
        checked={publicEvent}
        onChange={(event) =>
          setEventFormDatas({
            ...eventFormDatas,
            publicEvent: event.target.checked,
          })
        }
      />

      <EventAttendees />

      <FormInput
        label={
          <label htmlFor="event-end-time">
            {editEventDatas ? "Alterar Foto:" : "Fotos:"}
          </label>
        }
        type="file"
        id="event-image"
        name="image"
      />

      <div className="mt-5">
        <CustomButton
          id="submit-event"
          type="submit"
          display={editEventDatas ? "Atualizar Evento" : "Adicionar Evento"}
          primary
        />
      </div>
    </form>
  );
};

const mapStateToProps = createStructuredSelector({
  eventFormDatas: selectEventFormDatas,
});

const mapDispatchToProps = (dispatch) => ({
  setEventFormDatas: (datas) => dispatch(setEventFormDatasAction(datas)),
  handleEventFormChange: (data) => dispatch(handleEventFormChangeAction(data)),
  imageUploadListener: (data) => dispatch(imageUploadListenerAction(data)),
  resetEventForm: (data) => dispatch(resetEventFormAction(data)),
  setIsEditingAttendees: (data) => dispatch(setIsEditingAttendeesAction(data)),
  setShowSuggestions: (data) => dispatch(setShowSuggestionsAction(data)),
  setEventAttendeesIds: (data) => dispatch(setEventAttendeesIdsAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);
