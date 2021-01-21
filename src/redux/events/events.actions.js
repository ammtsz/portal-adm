import { EventsActionsType } from "./events.types";

// STATE
export const setAllEventsAction = (data) => ({
  type: EventsActionsType.SET_ALL_EVENTS,
  payload: data,
});
export const setEventsYearsAction = (data) => ({
  type: EventsActionsType.SET_EVENTS_YEARS,
  payload: data,
});
export const setEventFormDatasAction = (datas) => ({
  type: EventsActionsType.SET_EVENT_FORM_DATAS,
  payload: datas,
});
export const setEventFormImgURLAction = (datas) => ({
  type: EventsActionsType.SET_EVENT_FORM_IMAGE_URL,
  payload: datas,
});
export const setEventAttendeesIdsAction = (datas) => ({
  type: EventsActionsType.SET_EVENT_ATTENDEES_IDS,
  payload: datas,
});
export const setIsEditingAttendeesAction = (datas) => ({
  type: EventsActionsType.SET_IS_EDITING_ATTENDEES,
  payload: datas,
});
export const setEventsErrorAction = (error) => ({
  type: EventsActionsType.SET_EVENTS_ERROR,
  payload: error,
});

// SAGAS
// events page
export const getEventsFromFirestoreAction = () => ({
  type: EventsActionsType.SAGA_GET_EVENTS_FROM_FIRESTORE,
});
export const handleEventsFromFirestoreAction = (data) => ({
  type: EventsActionsType.SAGA_HANDLE_EVENTS_FROM_FIRESTORE,
  payload: data,
});

// event page
export const deleteEventAction = (data) => ({
  type: EventsActionsType.SAGA_DELETE_EVENT,
  payload: data,
});
export const deleteEventFromCardAction = (data) => ({
  type: EventsActionsType.SAGA_DELETE_EVENT_FROM_CARD,
  payload: data,
});
export const uploadEventOnFirestoreAction = () => ({
  type: EventsActionsType.SAGA_UPLOAD_EVENT_ON_FIRESTORE,
});
export const updateEventOnFirestoreAction = () => ({
  type: EventsActionsType.SAGA_UPDATE_EVENT_ON_FIRESTORE,
});

// event form
export const handleEventFormChangeAction = (datas) => ({
  type: EventsActionsType.SAGA_HANDLE_EVENT_FORM_CHANGE,
  payload: datas,
});
export const getEventFormDatasAction = (data) => ({
  type: EventsActionsType.SAGA_GET_EVENT_FORM_DATAS,
  payload: data,
});
export const resetEventFormAction = (datas) => ({
  type: EventsActionsType.SAGA_RESET_EVENT_FORM,
  payload: datas,
});

// event image
export const imageUploadListenerAction = () => {
  return (dispatch) => {
    const inputFile = document.getElementById("event-image");
    inputFile.addEventListener("change", (event) => {
      dispatch(uploadImageAction(event.target.files[0]));
    });
  };
};
export const uploadImageAction = (datas) => ({
  type: EventsActionsType.SAGA_UPLOAD_IMG,
  payload: datas,
});
export const getImageUrlAction = (datas) => ({
  type: EventsActionsType.SAGA_GET_IMG_URL,
  payload: datas,
});

// event attendees
export const handleSaveAttendeesAction = () => ({
  type: EventsActionsType.SAGA_HANDLE_SAVE_ATTENDEES,
});
export const deleteAttendeeAction = (datas) => ({
  type: EventsActionsType.SAGA_DELETE_ATTENDEE,
  payload: datas,
});
