import { CurrenUserActionsTypes } from "./current-user.types"

// STATE
export const setCurrentUserAction = user => ({
    type: CurrenUserActionsTypes.SET_CURRENT_USER,
    payload: user
})
export const setAuthErrorAction = data => ({
    type: CurrenUserActionsTypes.SET_AUTH_ERROR,
    payload: data
})
export const setPersistenceAction = data => ({
    type: CurrenUserActionsTypes.SET_PERSISTENCE,
    payload: data
})


// REDUCER
export const signInSuccessAction = user => ({
    type: CurrenUserActionsTypes.SIGN_IN_SUCCESS,
    payload: user
})
export const signInFailureAction = error => ({
    type: CurrenUserActionsTypes.SIGN_IN_FAILURE,
    payload: error
})
export const signOutSuccessAction = user => ({
    type: CurrenUserActionsTypes.SIGN_OUT_SUCCESS,
    payload: user
})
export const signOutFailureAction = error => ({
    type: CurrenUserActionsTypes.SIGN_OUT_FAILURE,
    payload: error
})
export const signUpFailureAction = error => ({
    type: CurrenUserActionsTypes.SIGN_UP_FAILURE,
    payload: error
})



// SAGA
export const setUserAuthAction = user => ({
    type: CurrenUserActionsTypes.SAGA_SET_USER_AUTH,
    payload: user
})
export const signOutAction = () => ({
    type: CurrenUserActionsTypes.SAGA_SIGN_OUT,
})
export const emailSignInAction = (datas) => ({
    type: CurrenUserActionsTypes.SAGA_EMAIL_SIGN_IN,
    payload: datas,
})
export const emailSignUpAction = (datas) => ({
    type: CurrenUserActionsTypes.SAGA_EMAIL_SIGN_UP,
    payload: datas,
})
