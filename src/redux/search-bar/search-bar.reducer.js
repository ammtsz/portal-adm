import { SearchBarActionsTypes } from "./search-bar.types";

const INITIAL_STATE = {
  searchTerm: "",
  searchedResults: [],
  showSuggestions: false,
  error: null,
};

const searchBarReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SearchBarActionsTypes.SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload };
    case SearchBarActionsTypes.SET_SEARCHED_RESULTS:
      return { ...state, searchedResults: action.payload };
    case SearchBarActionsTypes.SET_SHOW_SUGGESTIONS:
      return { ...state, showSuggestions: action.payload };
    case SearchBarActionsTypes.SET_SEARCH_BAR_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default searchBarReducer;
