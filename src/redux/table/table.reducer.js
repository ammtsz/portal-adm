import { TableActionsType } from "./table.types";
import { TABLE_COLUMNS_DATAS } from "./table.datas";

const INITIAL_STATE = {
  usersTableArray: [],
  usersSearchArray: [],
  usersApprovedArray: [],
  usersPendingArray: [],
  usersDisplayArray: [],

  isApprovedTab: { show: true, activeUsers: false },
  tableColumns: TABLE_COLUMNS_DATAS,
  error: null,
};

const tableReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TableActionsType.SET_USERS_TABLE_ARRAY:
      return { ...state, usersTableArray: action.payload };

    case TableActionsType.SET_USERS_SEARCH_ARRAY:
      return { ...state, usersSearchArray: action.payload };

    case TableActionsType.SET_USERS_APPROVED_ARRAY:
      return { ...state, usersApprovedArray: action.payload };

    case TableActionsType.SET_USERS_PENDING_ARRAY:
      return { ...state, usersPendingArray: action.payload };

    case TableActionsType.SET_USERS_DISPLAY_ARRAY:
      return { ...state, usersDisplayArray: action.payload };

    case TableActionsType.SET_IS_APPROVED_TAB_SHOW:
      return {
        ...state,
        isApprovedTab: { ...state.isApprovedTab, show: action.payload },
      };

    case TableActionsType.SET_IS_APPROVED_TAB_ACTIVE_USERS:
      return {
        ...state,
        isApprovedTab: { ...state.isApprovedTab, activeUsers: action.payload },
      };

    case TableActionsType.SET_TABLE_COLUMNS:
      return { ...state, tableColumns: action.payload };

    case TableActionsType.SET_TABLE_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default tableReducer;
