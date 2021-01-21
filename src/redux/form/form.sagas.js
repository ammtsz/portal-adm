import { all, call, takeLatest, put, select } from "redux-saga/effects";

import { FormActionsType } from "./form.types";
import {
  setEditingUserIdStateAction,
  setFormErrorAction,
  updateFormDatasAction,
} from "./form.actions";
import { selectFormDatas, selectEditingUserId } from "./form.selectors";

import { firestore } from "../../firebase/firebase.utils";

//  UTILS 
const tzOffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
const localISOTime = new Date(Date.now() - tzOffset).toISOString().slice(0, -1);

function* updateUsersOnFirebase(collection, id) {
  try {
    const formDatas = yield select(selectFormDatas);
    const setDatas = {
      ...formDatas,
      updatedDate: { type: "date", value: localISOTime, label: "" },
      recomputations: "",
      resetRecomputations: "",
      resultFunc: "",
      dependencies: "",
    };

    if (id) {
      yield firestore.collection(collection).doc(id).set(setDatas);
    } else {
      yield firestore.collection(collection).doc().set(setDatas);
    }
  } catch (error) {
    yield put(setFormErrorAction(error))
  }
}

//  ACTIONS 
export function* updateEditingUserId(id) {
  try {
    yield put(setEditingUserIdStateAction(id.payload));

    if (id.payload) {
      const doc = yield firestore.collection("users").doc(id.payload).get();
      yield put(updateFormDatasAction({ ...doc.data() }));
    }
  } catch (error) {
    yield put(setFormErrorAction(error))
  }
}
export function* changeFormInput(event) {
  const { name, value, type, checked } = event.payload.target;
  const label = event.payload.target.selectedOptions
    ? event.payload.target.selectedOptions[0].innerHTML
    : event.payload.target.labels[0]
    ? event.payload.target.labels[0].innerHTML
    : "";
  let keyObj = {};

  switch (type) {
    case "checkbox":
      keyObj = { type, checked };
      break;
    case "radio":
    case "select-one":
    case "date":
      keyObj = { type, label, value };
      break;
    case "text":
    case "tel":
    case "email":
    case "textarea":
      keyObj = { type, value };
      break;
    default:
      keyObj = { type, label, value };
  }
  try {
    yield put(updateFormDatasAction({ ...selectFormDatas, [name]: keyObj }));
  } catch (error) {
    yield put(setFormErrorAction(error))
  }
}
export function* submitNewForm(event) {
  event.payload.preventDefault();
  try {
    yield updateUsersOnFirebase("pendingUsers");
  } catch (error) {
    yield put(setFormErrorAction(error))
  }
}
export function* submitEditForm(event) {
  event.payload.preventDefault();
  try {
    const id = yield select(selectEditingUserId);
    yield updateUsersOnFirebase("users", id);
  } catch (error) {
    yield put(setFormErrorAction(error))
  }
}


//  CALLS 
export function* onEditingUserId() {
  yield takeLatest(
    FormActionsType.SAGA_SET_EDITING_USER_ID,
    updateEditingUserId
  );
}
export function* onChangeFormInput() {
  yield takeLatest(
    FormActionsType.SAGA_HANDLE_FORM_INPUT_CHANGES,
    changeFormInput
  );
}
export function* onSubmitNewForm() {
  yield takeLatest(FormActionsType.SAGA_HANDLE_SUBMIT_NEW_FORM, submitNewForm);
}
export function* onSubmitEditForm() {
  yield takeLatest(
    FormActionsType.SAGA_HANDLE_SUBMIT_EDIT_FORM,
    submitEditForm
  );
}



export function* formSagas() {
  yield all([
    call(onEditingUserId),
    call(onChangeFormInput),
    call(onSubmitNewForm),
    call(onSubmitEditForm),
  ]);
}
