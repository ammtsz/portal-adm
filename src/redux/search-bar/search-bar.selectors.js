import { createSelector } from 'reselect'


const selectSeachBar = state => state.searchBar

export const selectSearchTerm = createSelector(
    [selectSeachBar], 
    searchBar => searchBar.searchTerm
)

export const selectSearchedResults = createSelector(
    [selectSeachBar], 
    searchBar => searchBar.searchedResults
)

export const selectShowSuggestions = createSelector(
    [selectSeachBar], 
    searchBar => searchBar.showSuggestions
)