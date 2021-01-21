import { SidebarActionsTypes } from "./sidebar.types";

export const setShowSidebarAction = (data) => ({
  type: SidebarActionsTypes.SET_SHOW_SIDEBAR,
  payload: data,
});
