import { SidebarActionsTypes } from "./sidebar.types";

const INITIAL_STATE = {
  showSidebar: false,
};

const sidebarReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SidebarActionsTypes.SET_SHOW_SIDEBAR:
      return { ...state, showSidebar: action.payload };
    default:
      return state;
  }
};

export default sidebarReducer;
