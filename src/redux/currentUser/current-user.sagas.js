import { all, call, takeLatest, put, select } from "redux-saga/effects";
import { CurrenUserActionsTypes } from "./current-user.types";
import {
  auth,
  createUserProfileDocumentFirebase,
  getCurrentUserFirebase,
} from "../../firebase/firebase.utils";
import firebase from "firebase/app";
import {
  signInFailureAction,
  signInSuccessAction,
  signOutFailureAction,
  signOutSuccessAction,
  signUpFailureAction,
} from "./current-user.actions";
import { selectPersistence } from "./current-user.selectors";

// UTILS
export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(
      createUserProfileDocumentFirebase,
      userAuth,
      additionalData
    );
    const userSnapshot = yield userRef.get();
    yield put(
      signInSuccessAction({
        id: userSnapshot.id,
        ...userSnapshot.data(),
      })
    );
  } catch (error) {
    yield put(signInFailureAction(error));
  }
}
export function* signInPersistence() {
  const persistence = yield select(selectPersistence);
  persistence
    ? auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    : auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
}

// ACTIONS
export function* setUserAuth() {
  try {
    const userAuth = yield getCurrentUserFirebase();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailureAction(error));
  }
}
export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccessAction());
  } catch (error) {
    yield put(signOutFailureAction(error));
  }
}
export function* emailSignIn({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield signInPersistence();
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailureAction(error));
  }
}
export function* emailSignUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user, {displayName})
  } catch (error) {
    yield put(signUpFailureAction(error));
  }
}

// CALLS
export function* onSetUserAuth() {
  yield takeLatest(CurrenUserActionsTypes.SAGA_SET_USER_AUTH, setUserAuth);
}
export function* onSignOut() {
  yield takeLatest(CurrenUserActionsTypes.SAGA_SIGN_OUT, signOut);
}
export function* onEmailSignIn() {
  yield takeLatest(CurrenUserActionsTypes.SAGA_EMAIL_SIGN_IN, emailSignIn);
}
export function* onEmailSignUp() {
  yield takeLatest(CurrenUserActionsTypes.SAGA_EMAIL_SIGN_UP, emailSignUp);
}

export function* currentUserSagas() {
  yield all([
    call(onSetUserAuth),
    call(onSignOut),
    call(onEmailSignIn),
    call(onEmailSignUp),
  ]);
}
