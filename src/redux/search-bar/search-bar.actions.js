import { SearchBarActionsTypes } from "./search-bar.types";

// STATE
export const setSearchTermAction = (data) => ({
  type: SearchBarActionsTypes.SET_SEARCH_TERM,
  payload: data,
});

export const setSearchedResultsAction = (data) => ({
  type: SearchBarActionsTypes.SET_SEARCHED_RESULTS,
  payload: data,
});

export const setShowSuggestionsAction = (data) => ({
  type: SearchBarActionsTypes.SET_SHOW_SUGGESTIONS,
  payload: data,
});
export const setSearchBarErrorAction = (error) => ({
  type: SearchBarActionsTypes.SET_SEARCH_BAR_ERROR,
  payload: error,
});

// SAGA
export const filterUsersAction = () => ({
  type: SearchBarActionsTypes.SAGA_FILTER_USERS,
});
