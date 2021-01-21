import { all, call, takeLatest, put, select, fork } from "redux-saga/effects";

import { EventsActionsType } from "./events.types";
import {
  setEventsYearsAction,
  setAllEventsAction,
  setEventFormDatasAction,
  setEventFormImgURLAction,
  getImageUrlAction,
  setIsEditingAttendeesAction,
  setEventAttendeesIdsAction,
  setEventsErrorAction,
  handleEventsFromFirestoreAction,
} from "./events.actions";
import {
  selectEventFormDatas,
  selectEventAttendeesIds,
  selectEventFormImgURL,
} from "./events.selectors";
import { rsf, storage } from "../../firebase/firebase.utils";
import { encodeUri } from "../../utils/utils";

// ACTIONS
// events page
export function* getEventsFromFirestore() {
  try {
    yield fork(rsf.firestore.syncCollection, "events", {
      successActionCreator: handleEventsFromFirestoreAction,
      failureActionCreator: setEventsErrorAction,
    });
  } catch (error) {
    yield put(setEventsErrorAction(error));
  }
}
export function* handleEventsFromFirestore(datas) {
  try {
    let years = [];
    const eventsFromFirestore = [];
    datas.payload.docs.forEach((event) => {
      if (event.data().image) {
        const year = event.data().startDate.substr(0, 4);
        if (year.length === 4) years.push(year);
        eventsFromFirestore.push({ ...event.data(), id: event.id });
      }
    });
    yield put(
      setEventsYearsAction(
        [...new Set(years)].sort(function (a, b) {
          return b - a;
        })
      )
    );
    yield put(
      setAllEventsAction(
        eventsFromFirestore.sort((a, b) => (a.startDate < b.startDate ? -1 : 1))
      )
    );
  } catch (error) {
    yield put(setEventsErrorAction(error));
  }
}

// event page
export function* deleteEvent(history) {
  const event = yield select(selectEventFormDatas);
  try {
    if (window.confirm(`Deseja apagar o evento ${event.eventName}`)) {
      yield call(rsf.firestore.deleteDocument, `events/${event.id}`);
      history.payload.push("/events");
    }
  } catch (error) {
    yield put(setEventsErrorAction(error));
  }
}
export function* deleteEventFromCard({ payload: { eventName, id } }) {
  try {
    if (window.confirm(`Deseja apagar o evento ${eventName}`)) {
      yield call(rsf.firestore.deleteDocument, `events/${id}`);
    }
  } catch (error) {
    yield put(setEventsErrorAction(error));
  }
}
export function* uploadEventOnFirestore() {
  try {
    const newEventDatas = yield select(selectEventFormDatas);
    const imageUrl = yield select(selectEventFormImgURL);
    yield call(rsf.firestore.addDocument, "events", {
      ...newEventDatas,
      image: imageUrl,
    });
  } catch (error) {
    yield put(setEventsErrorAction(error));
  }
}
export function* updateEventOnFirestore() {
  const editEventDatas = yield select(selectEventFormDatas);
  const imageUrl = yield select(selectEventFormImgURL);
  try {
    yield call(rsf.firestore.updateDocument, `events/${editEventDatas.id}`, {
      ...editEventDatas,
      image: imageUrl,
    });
  } catch (error) {
    yield put(setEventsErrorAction(error));
  }
}

// event form
export function* handleEventFormChange(event) {
  const eventFormDatas = yield select(selectEventFormDatas);
  try {
    const { name, value } = event.payload.target;
    yield put(setEventFormDatasAction({ ...eventFormDatas, [name]: value }));
  } catch (error) {
    yield put(setEventsErrorAction(error));
  }
}
export function* getEventFormDatas(urlParams) {
  // get events from firestore and compare the name of each event with the current page URI
  // if the event name + 3 first id characteres is equal to page URL, then it saves the event datas on const 'event'
  try {
    let eventDatas = {};

    const snapshot = yield call(rsf.firestore.getCollection, "events");
    snapshot.forEach((event) => {
      if (encodeUri(event.data().eventName, event.id) === urlParams.payload) {
        eventDatas = { ...event.data(), id: event.id };
      }
    });
    yield put(setEventFormDatasAction(eventDatas));
    yield put(setEventFormImgURLAction(eventDatas.image));
  } catch (error) {
    yield put(setEventsErrorAction(error));
  }
}
export function* resetEventForm(datas) {
  try {
    yield put(
      setEventFormDatasAction({
        eventName: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        location: "",
        organizers: "",
        description: "",
        attendees: [],
      })
    );
    yield put(
      setEventFormImgURLAction(
        //default image case no image is selected
        "https://firebasestorage.googleapis.com/v0/b/portal-cjb.appspot.com/o/events%2Fphotos%2F1599172363294?alt=media&token=b3271816-b407-4505-9f4e-47fb3895b243"
      )
    );
    document.getElementById("event-image").value = "";
  } catch (error) {
    yield put(setEventsErrorAction(error));
  }
}

// event image
export function* uploadImage(fileDatas) {
  // 1 - after the image is selected, it will be uploaded on firebase storage db
  // file name is saved as the last modified date in miliseconds (can be improved to avoid identical names)
  let fileId =
    fileDatas.payload !== undefined ? fileDatas.payload.lastModified : "";
  document.getElementById("submit-event").disabled = true;

  try {
    let storageRef = storage.ref(`events/photos/${fileId}`);
    yield storageRef.put(fileDatas.payload);
    yield put(getImageUrlAction(fileId));
  } catch (error) {
    yield put(setEventsErrorAction(error));
  }
}
export function* getImageUrl(fileId) {
  try {
    // 2 - right after the image is uploaded, an image URL is going to be requested and generated
    const storageRef = yield storage.refFromURL("gs://portal-adm.appspot.com");
    const url = yield storageRef
      .child(`events/photos/${fileId.payload}`)
      .getDownloadURL();

    // 3 - the newest image URL will be saved in a const and when the form is sent, the URL will be saved on db
    yield put(setEventFormImgURLAction(url));

    // while the image is not uploaded and the URL is not created, submit button is disabled
    document.getElementById("submit-event").disabled = false;
  } catch (error) {
    yield put(setEventsErrorAction(error));
  }
}

// event attendees
export function* handleSaveAttendees() {
  try {
    const eventFormDatas = yield select(selectEventFormDatas);
    const eventAttendeesIds = yield select(selectEventAttendeesIds);

    yield put(setIsEditingAttendeesAction(false));
    yield put(
      setEventFormDatasAction({
        ...eventFormDatas,
        attendees: eventAttendeesIds,
      })
    );
    document.getElementById("submit-event").disabled = false;
  } catch (error) {
    yield put(setEventsErrorAction(error));
  }
}
export function* deleteAttendee(deleteAttendee) {
  try {
    const eventAttendeesIds = yield select(selectEventAttendeesIds);
    const attendees = eventAttendeesIds.filter(
      (attendee) => attendee !== deleteAttendee.payload
    );
    yield put(setEventAttendeesIdsAction(attendees));
  } catch (error) {
    yield put(setEventsErrorAction(error));
  }
}

// CALLS
// events page
export function* onGetEventsFromFirestore() {
  yield takeLatest(
    EventsActionsType.SAGA_GET_EVENTS_FROM_FIRESTORE,
    getEventsFromFirestore
  );
}
export function* onHandleEventsFromFirestore() {
  yield takeLatest(
    EventsActionsType.SAGA_HANDLE_EVENTS_FROM_FIRESTORE,
    handleEventsFromFirestore
  );
}

// event page
export function* onDeleteEvent() {
  yield takeLatest(EventsActionsType.SAGA_DELETE_EVENT, deleteEvent);
}
export function* onDeleteEventFromCard() {
  yield takeLatest(
    EventsActionsType.SAGA_DELETE_EVENT_FROM_CARD,
    deleteEventFromCard
  );
}
export function* onUploadEventOnFirestore() {
  yield takeLatest(
    EventsActionsType.SAGA_UPLOAD_EVENT_ON_FIRESTORE,
    uploadEventOnFirestore
  );
}
export function* onUpdateEventOnFirestore() {
  yield takeLatest(
    EventsActionsType.SAGA_UPDATE_EVENT_ON_FIRESTORE,
    updateEventOnFirestore
  );
}

// event form
export function* onHandleEventFormChange() {
  yield takeLatest(
    EventsActionsType.SAGA_HANDLE_EVENT_FORM_CHANGE,
    handleEventFormChange
  );
}
export function* onGetEventFormDatas() {
  yield takeLatest(
    EventsActionsType.SAGA_GET_EVENT_FORM_DATAS,
    getEventFormDatas
  );
}
export function* onResetEventForm() {
  yield takeLatest(EventsActionsType.SAGA_RESET_EVENT_FORM, resetEventForm);
}

// event image
export function* onUploadImage() {
  yield takeLatest(EventsActionsType.SAGA_UPLOAD_IMG, uploadImage);
}
export function* onGetImageUrl() {
  yield takeLatest(EventsActionsType.SAGA_GET_IMG_URL, getImageUrl);
}

// event attendees
export function* onHandleSaveAttendees() {
  yield takeLatest(
    EventsActionsType.SAGA_HANDLE_SAVE_ATTENDEES,
    handleSaveAttendees
  );
}
export function* onDeleteAttendee() {
  yield takeLatest(EventsActionsType.SAGA_DELETE_ATTENDEE, deleteAttendee);
}

export function* eventsSagas() {
  yield all([
    // events page
    call(onGetEventsFromFirestore),
    call(onHandleEventsFromFirestore),

    // event page
    call(onDeleteEvent),
    call(onDeleteEventFromCard),
    call(onUploadEventOnFirestore),
    call(onUpdateEventOnFirestore),

    // event form
    call(onHandleEventFormChange),
    call(onGetEventFormDatas),
    call(onResetEventForm),

    // event image
    call(onUploadImage),
    call(onGetImageUrl),

    // event attendees
    call(onHandleSaveAttendees),
    call(onDeleteAttendee),
  ]);
}
