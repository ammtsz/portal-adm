import { createSelector } from "reselect";

const selectSidebar = (state) => state.sidebar;

export const selectShowSidebar = createSelector(
  [selectSidebar],
  (sidebar) => sidebar.showSidebar
);
