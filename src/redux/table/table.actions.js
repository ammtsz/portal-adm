import { TableActionsType } from "./table.types";

// STATE
export const setUsersTableArrayAction = (datas) => ({
  type: TableActionsType.SET_USERS_TABLE_ARRAY,
  payload: datas,
});
export const setUsersSearchArrayAction = (datas) => ({
  type: TableActionsType.SET_USERS_SEARCH_ARRAY,
  payload: datas,
});
export const setUsersApprovedArrayAction = (datas) => ({
  type: TableActionsType.SET_USERS_APPROVED_ARRAY,
  payload: datas,
});
export const setUsersPendingArrayAction = (datas) => ({
  type: TableActionsType.SET_USERS_PENDING_ARRAY,
  payload: datas,
});
export const setUsersDisplayArrayAction = (data) => ({
  type: TableActionsType.SET_USERS_DISPLAY_ARRAY,
  payload: data,
});

export const setIsApprovedTabShowAction = (data) => ({
  type: TableActionsType.SET_IS_APPROVED_TAB_SHOW,
  payload: data,
});
export const setIsApprovedTabActiveUsersAction = (data) => ({
  type: TableActionsType.SET_IS_APPROVED_TAB_ACTIVE_USERS,
  payload: data,
});
export const setTableColumnsAction = (data) => ({
  type: TableActionsType.SET_TABLE_COLUMNS,
  payload: data,
});
export const setTableErrorAction = (error) => ({
  type: TableActionsType.SET_TABLE_ERROR,
  payload: error,
});

// SAGAS
export const getUsersFromDbAction = () => ({
  type: TableActionsType.SAGA_GET_USERS_FROM_DB,
});
export const handleIsApprovedTabShowAction = (data) => ({
  type: TableActionsType.SAGA_SET_IS_APPROVED_TAB_SHOW,
  payload: data,
});
export const sortColumnAction = (eventAndName) => ({
  type: TableActionsType.SAGA_SORT_COLUMNS,
  payload: eventAndName,
});
export const setArraysAction = (datas) => ({
  type: TableActionsType.SAGA_SET_ARRAYS,
  payload: datas,
});
