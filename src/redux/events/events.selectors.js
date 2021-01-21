import { createSelector } from "reselect";

const selectEvents = (state) => state.events;

export const selectAllEvents = createSelector(
  [selectEvents],
  (events) => events.allEvents
);
export const selectEventsYears = createSelector(
  [selectEvents],
  (events) => events.eventsYears
);
export const selectEventFormDatas = createSelector(
  [selectEvents],
  (events) => events.eventFormDatas
);
export const selectEventFormImgURL = createSelector(
  [selectEvents],
  (events) => events.eventFormImgURL
);
export const selectEventAttendeesIds = createSelector(
  [selectEvents],
  (events) => events.eventAttendeesIds
);
export const selectIsEditingAttendees = createSelector(
  [selectEvents],
  (events) => events.isEditingAttendees
);
