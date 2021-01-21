import { all, call, takeLatest, put, select } from "redux-saga/effects";
import { SearchBarActionsTypes } from "./search-bar.types";

import { selectSearchTerm, selectShowSuggestions } from "./search-bar.selectors";
import { selectUsersApprovedArray, selectUsersTableArray } from "../table/table.selectors";
import {
  setSearchBarErrorAction,
  setSearchedResultsAction,
} from "./search-bar.actions";
import { setUsersSearchArrayAction } from "../table/table.actions";

// ACTIONS
export function* filterUsers() {
  try {
    const searchTerm = yield select(selectSearchTerm);
    const showSuggestions = yield select(selectShowSuggestions)
    
    const usersApprovedArray = yield select(selectUsersApprovedArray);
    const usersTableArray = yield select(selectUsersTableArray);
    const usersArray = showSuggestions ? usersApprovedArray : usersTableArray
    const usersSearched = usersArray.filter((user) =>
      user["name"].value.toLowerCase().includes(searchTerm.toLowerCase())
    );

    yield put(setSearchedResultsAction(usersSearched)); // update users suggestions array
    yield put(setUsersSearchArrayAction(usersSearched)); // update users table array
  } catch (error) {
    yield put(setSearchBarErrorAction(error));
  }
}

// CALLS
export function* onFilterUsers() {
  yield takeLatest(SearchBarActionsTypes.SAGA_FILTER_USERS, filterUsers);
}

export function* searchBarSagas() {
  yield all([call(onFilterUsers)]);
}
