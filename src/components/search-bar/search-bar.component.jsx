import React, { useEffect } from "react";
import "./search-bar.styles.scss";

import SearchBarSuggestions from "../search-bar-suggestions/search-bar-suggestions.component";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectSearchTerm,
  selectShowSuggestions,
} from "../../redux/search-bar/search-bar.selectors";
import {
  setSearchTermAction,
  setShowSuggestionsAction,
  filterUsersAction,
} from "../../redux/search-bar/search-bar.actions";


const SearchBar = ({
  placeholder,
  suggestions,
  width_100,
  ids,
  handleSuggestionClick,
  searchTerm,
  setSearchTerm,
  showSuggestions,
  setShowSuggestions,
  filterUsers,
}) => {
  useEffect(() => {
    filterUsers(searchTerm);
  }, [searchTerm, filterUsers]);

  return (
    <div className={`search-bar_ ${width_100 ? "search-bar__width-100" : ""}`}>
      <div className="input-group">
        <input
          type="search"
          className="search-bar__input   form-control"
          id="search-bar"
          autoComplete="off"
          placeholder={placeholder}
          value={searchTerm}
          onClick={() => suggestions ? setShowSuggestions(true) : null}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <div
          className="input-group-append"
          onClick={() =>
            setSearchTerm(document.getElementById("search-bar").value)
          }
        >
          <div className="search-bar__icon   input-group-text ">
            <i className="fas fa-search"></i>
          </div>
        </div>
      </div>

      {suggestions && showSuggestions ? (
        <SearchBarSuggestions
          ids={ids}
          handleSuggestionClick={handleSuggestionClick}
        />
      ) : null}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  searchTerm: selectSearchTerm,
  showSuggestions: selectShowSuggestions,
});

const matDispatchToProps = (dispatch) => ({
  setSearchTerm: (datas) => dispatch(setSearchTermAction(datas)),
  setShowSuggestions: (datas) => dispatch(setShowSuggestionsAction(datas)),
  filterUsers: () => dispatch(filterUsersAction()),
});
export default connect(mapStateToProps, matDispatchToProps)(SearchBar);
