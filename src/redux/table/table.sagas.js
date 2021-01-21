import { all, call, takeLatest, put, select, fork } from "redux-saga/effects";

import { TableActionsType } from "./table.types";
import {
  setUsersTableArrayAction,
  setUsersDisplayArrayAction,
  setIsApprovedTabShowAction,
  setUsersPendingArrayAction,
  setUsersApprovedArrayAction,
  setUsersSearchArrayAction,
  setTableErrorAction,
  setArraysAction,
} from "./table.actions";
import { setSearchTermAction } from "../search-bar/search-bar.actions";

import {
  selectUsersDisplayArray,
  selectUsersApprovedArray,
  selectUsersPendingArray,
  selectIsApprovedTabShow,
} from "./table.selectors";

import { rsf } from "../../firebase/firebase.utils";
import { originalDate } from "../../utils/utils";

// UTILS
export function* getDatasFromFirestore(collection) {
  try {
    yield fork(rsf.firestore.syncCollection, collection, {
      successActionCreator: setArraysAction,
      failureActionCreator: setTableErrorAction,
      transform: (payload) => ({ payload, collection }),
    });
  } catch (error) {
    yield put(setTableErrorAction(error));
  }
}

// ACTIONS
export function* getUsersFromDb() {
  try {
    yield* getDatasFromFirestore("pendingUsers");
    yield getDatasFromFirestore("users");
  } catch (error) {
    yield put(setTableErrorAction(error));
  }
}
export function* setArrays(datas) {
  try {
    const isApprovedTab = yield select(selectIsApprovedTabShow);
    const docs = [];
    datas.payload.payload.docs.forEach((doc) => {
      if (doc.data().name) docs.push({ ...doc.data(), id: doc.id });
    });

    if (datas.payload.collection === "users") {
      yield put(setUsersApprovedArrayAction(docs));
      if (isApprovedTab) {
        yield put(setUsersTableArrayAction(docs));
        yield put(setUsersSearchArrayAction(docs));
      }
    }
    if (datas.payload.collection === "pendingUsers") {
      yield put(setUsersPendingArrayAction(docs));
      if (!isApprovedTab) {
        yield put(setUsersTableArrayAction(docs));
        yield put(setUsersSearchArrayAction(docs));
      }
    }
  } catch (error) {
    yield put(setTableErrorAction(error));
  }
}
export function* setIsApprovedTable(isIt) {
  const tableArray = yield isIt.payload
    ? select(selectUsersApprovedArray)
    : select(selectUsersPendingArray);
  yield put(setIsApprovedTabShowAction(isIt.payload));
  yield put(setUsersTableArrayAction(tableArray));
  yield put(setUsersSearchArrayAction(tableArray));
  yield put(setSearchTermAction(""));
}
export function* sortColumn({ payload: { event, name } }) {
  const usersDisplayArray = yield select(selectUsersDisplayArray);
  const check = event.target.checked;
  event.target.nextSibling.className = check
    ? "fas fa-chevron-up table__thead--check-icon"
    : "fas fa-chevron-down table__thead--check-icon";

  try {
    //case it is a date column
    if (name === "birth" || name === "memberSince" || name === "updatedDate") {
      yield put(
        setUsersDisplayArrayAction([
          ...usersDisplayArray.sort((a, b) =>
            originalDate(a[name]) > originalDate(b[name])
              ? check
                ? 1
                : -1
              : check
              ? -1
              : 1
          ),
        ])
      );
    } else {
      //case it is NOT a date column
      yield put(
        setUsersDisplayArrayAction([
          ...usersDisplayArray.sort((a, b) =>
            a[name] > b[name] ? (check ? 1 : -1) : check ? -1 : 1
          ),
        ])
      );
    }
  } catch (error) {
    yield put(setTableErrorAction(error));
  }
}

// CALLS
export function* onGetUsersFromDb() {
  yield takeLatest(TableActionsType.SAGA_GET_USERS_FROM_DB, getUsersFromDb);
}
export function* onSetArrays() {
  yield takeLatest(TableActionsType.SAGA_SET_ARRAYS, setArrays);
}
export function* onSetIsApprovedTable() {
  yield takeLatest(
    TableActionsType.SAGA_SET_IS_APPROVED_TAB_SHOW,
    setIsApprovedTable
  );
}
export function* onSortColumn() {
  yield takeLatest(TableActionsType.SAGA_SORT_COLUMNS, sortColumn);
}

export function* tableSagas() {
  yield all([
    call(onGetUsersFromDb),
    call(onSetArrays),
    call(onSetIsApprovedTable),
    call(onSortColumn),
  ]);
}
