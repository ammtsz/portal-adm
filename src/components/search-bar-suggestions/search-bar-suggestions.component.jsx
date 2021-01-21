import React, { useEffect } from "react";
import "./search-bar-suggestions.styles.scss";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectSearchedResults } from "../../redux/search-bar/search-bar.selectors";
import { setShowSuggestionsAction, setSearchedResultsAction } from "../../redux/search-bar/search-bar.actions";

const SearchBar = ({
  ids,
  handleSuggestionClick,
  searchedResults,
  setShowSuggestions,
  setSearchedResults
}) => {
  useEffect(() => {
    setSearchedResults([])
  }, []);

  return (
    <div className="search-bar__suggestions">
      <button
        type="button"
        className="search-bar__suggestions--close"
        onClick={() => setShowSuggestions(false)}
      >
        <i className="fas fa-times"></i>
      </button>
      {searchedResults
        .filter((user) => ids.indexOf(user.id) === -1)
        .map((user) => (
          <div
            key={user.id}
            className="search-bar__suggestions--item"
            onClick={() => {
              setShowSuggestions(false); // suggestions will disappeare after clicking in a suggested user
              handleSuggestionClick(user.id);
            }}
          >
            <span key={user.id} className="ml-2">
              {
                // it will display user name and email. It can be modified
              }
              {user.name.value} ({user.email.value})
            </span>
          </div>
        ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  searchedResults: selectSearchedResults,
});

const matDispatchToProps = (dispatch) => ({
  setShowSuggestions: (datas) => dispatch(setShowSuggestionsAction(datas)),
  setSearchedResults: (datas) => dispatch(setSearchedResultsAction(datas)),
});
export default connect(mapStateToProps, matDispatchToProps)(SearchBar);
