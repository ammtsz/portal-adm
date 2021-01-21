import { createSelector } from 'reselect'

const selectTable = state => state.table

export const selectUsersTableArray = createSelector(
    [selectTable],
    table => table.usersTableArray
)

export const selectUsersSearchArray = createSelector(
    [selectTable],
    table => table.usersSearchArray
)

export const selectUsersApprovedArray = createSelector(
    [selectTable],
    table => table.usersApprovedArray
)

export const selectUsersPendingArray = createSelector(
    [selectTable],
    table => table.usersPendingArray
)

export const selectUsersDisplayArray = createSelector(
    [selectTable],
    table => table.usersDisplayArray
)

export const selectIsApprovedTab = createSelector(
    [selectTable],
    table => table.isApprovedTab
)

    export const selectIsApprovedTabShow = createSelector(
        [selectIsApprovedTab],
        isApprovedTab => isApprovedTab.show
    )

    export const selectIsApprovedTabActiveUsers = createSelector(
        [selectIsApprovedTab],
        isApprovedTab => isApprovedTab.activeUsers
    )

export const selectTableColumns = createSelector(
    [selectTable],
    table => table.tableColumns
)



