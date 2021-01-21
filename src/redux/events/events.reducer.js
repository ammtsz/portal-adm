import { EventsActionsType } from "./events.types";

const INITIAL_STATE = {
  allEvents: [],
  eventsYears: [],
  eventFormDatas: {
    eventName: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    description: "",
    location: "",
    organizers: "",
    publicEvent: false,
    attendees: [],
  },
  eventFormImgURL:
  "https://firebasestorage.googleapis.com/v0/b/portal-cjb.appspot.com/o/events%2Fphotos%2F1599172363294?alt=media&token=b3271816-b407-4505-9f4e-47fb3895b243",
  eventAttendeesIds: [],
  isEditingAttendees: false,
  error: null,
};

const eventsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EventsActionsType.SET_ALL_EVENTS:
      return { ...state, allEvents: action.payload };

    case EventsActionsType.SET_EVENTS_YEARS:
      return { ...state, eventsYears: action.payload };

    case EventsActionsType.SET_EVENT:
      return { ...state, event: action.payload };

    case EventsActionsType.SET_EVENT_FORM_DATAS:
      return { ...state, eventFormDatas: action.payload };

    case EventsActionsType.SET_EVENT_FORM_IMAGE_URL:
      return { ...state, eventFormImgURL: action.payload };

    case EventsActionsType.SET_EVENT_ATTENDEES_IDS:
      return { ...state, eventAttendeesIds: action.payload };

    case EventsActionsType.SET_IS_EDITING_ATTENDEES:
      return { ...state, isEditingAttendees: action.payload };
      
    case EventsActionsType.SET_EVENTS_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default eventsReducer;
