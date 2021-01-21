import { createSelector } from "reselect";

const selectUser = (state) => state.currentUser;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);
export const selectAuthError = createSelector(
  [selectUser],
  (user) => user.error
);
export const selectPersistence = createSelector(
  [selectUser],
  (user) => user.persistence
);
