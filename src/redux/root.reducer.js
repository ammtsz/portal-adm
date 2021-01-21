import { combineReducers } from "redux";
import currentUserReducer from "./currentUser/current-user.reducer";
import formReducer from "./form/form.reducer";
import tableReducer from "./table/table.reducer"
import searchBarReducer from "./search-bar/search-bar.reducer"
import eventsReducer from "./events/events.reducer"
import sidebarReducer from "./sidebar/sidebar.reducer"

export default combineReducers({
  currentUser: currentUserReducer,
  form: formReducer,
  table: tableReducer,
  searchBar: searchBarReducer,
  events: eventsReducer,
  sidebar: sidebarReducer,
});
