import { CurrenUserActionsTypes } from "./current-user.types";

const INITIAL_STATE = {
  currentUser: null,
  persistence: false,
  error: null,
};

const currentUserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CurrenUserActionsTypes.SET_CURRENT_USER:
      return { ...state, currentUser: action.payload };
    case CurrenUserActionsTypes.SET_PERSISTENCE:
      return { ...state, persistence: action.payload };
    case CurrenUserActionsTypes.SET_AUTH_ERROR:
      return { ...state, error: action.payload };

    case CurrenUserActionsTypes.SIGN_IN_SUCCESS:
      return { ...state, currentUser: action.payload, error: null };
    case CurrenUserActionsTypes.SIGN_OUT_SUCCESS:
      return { ...state, currentUser: null, error: null };

    case CurrenUserActionsTypes.SIGN_IN_FAILURE:
    case CurrenUserActionsTypes.SIGN_OUT_FAILURE:
    case CurrenUserActionsTypes.SIGN_UP_FAILURE:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default currentUserReducer;
