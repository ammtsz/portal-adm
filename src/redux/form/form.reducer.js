import { FormActionsType } from "./form.types";
import { USER_INITIAL_STATE } from "./form.datas";

const INITIAL_STATE = {
  formUserDatas: USER_INITIAL_STATE,
  editingtUserId: "",
  error: null,
};

const formReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FormActionsType.UPDATE_FORM_USER_DATAS:
      return {
        ...state,
        formUserDatas: { ...state.formUserDatas, ...action.payload },
      };

    case FormActionsType.RESET_FORM_DATAS:
      return { ...state, formUserDatas: USER_INITIAL_STATE };

    case FormActionsType.SET_EDITING_USER_ID:
      return { ...state, editingtUserId: action.payload };

    case FormActionsType.SET_FORM_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default formReducer;
