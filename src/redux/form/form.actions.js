import { FormActionsType } from "./form.types";

// STATE
export const updateFormDatasAction = (datas) => {
  return {
    type: FormActionsType.UPDATE_FORM_USER_DATAS,
    payload: datas,
  };
};
export const resetFormDatasAction = () => ({
  type: FormActionsType.RESET_FORM_DATAS,
});

export const setEditingUserIdStateAction = (id) => ({
  type: FormActionsType.SET_EDITING_USER_ID,
  payload: id,
});
export const setFormErrorAction = (error) => ({
  type: FormActionsType.SET_FORM_ERROR,
  payload: error,
});

// SAGAS
export const setEditingUserIdAction = (id) => ({
  type: FormActionsType.SAGA_SET_EDITING_USER_ID,
  payload: id,
});

export const handleFormInputChangeAction = (event) => ({
  type: FormActionsType.SAGA_HANDLE_FORM_INPUT_CHANGES,
  payload: event,
});

export const handleSubmitNewFormAction = (event) => ({
  type: FormActionsType.SAGA_HANDLE_SUBMIT_NEW_FORM,
  payload: event,
});

export const handleSubmitEditFormAction = (event) => ({
  type: FormActionsType.SAGA_HANDLE_SUBMIT_EDIT_FORM,
  payload: event,
});
