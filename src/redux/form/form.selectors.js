import { createSelector } from 'reselect'

const selectForm = state => state.form

export const selectFormDatas = createSelector(
    [selectForm],
    form => form.formUserDatas
)

export const selectEditingUserId = createSelector(
    [selectForm],
    form => form.editingtUserId
)