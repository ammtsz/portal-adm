import { call, all } from "redux-saga/effects";
import { formSagas } from "./form/form.sagas";
import { tableSagas } from "./table/table.sagas";
import { searchBarSagas } from "./search-bar/search-bar.sagas";
import { eventsSagas } from "./events/events.sagas";
import { currentUserSagas } from "./currentUser/current-user.sagas"

export default function* rootSaga() {
  yield all([
    call(formSagas),
    call(tableSagas),
    call(searchBarSagas),
    call(eventsSagas),
    call(currentUserSagas)
  ]);
}
