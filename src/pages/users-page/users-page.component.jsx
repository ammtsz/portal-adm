import React from "react";
import "./users-page.styles.scss";

import Table from "../../components/table/table.component";
import ButtonSwitch from "../../components/button-switch/button-switch.component";
import TableTab from "../../components/table-tab/table-tab.component";
import ModalFilter from "../../components/modal-filter/modal-filter.component";
import SearchBar from "../../components/search-bar/search-bar.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectIsApprovedTabShow,
  selectUsersApprovedArray,
} from "../../redux/table/table.selectors";
import {
  getUsersFromDbAction,
  setIsApprovedTabActiveUsersAction,
} from "../../redux/table/table.actions";

const Users = ({ isApprovedTab, setActiveUsers }) => {
  return (
    <React.Fragment>
      <ModalFilter />
      <section className="table__container">
        <div className="table__search-bar">
          <input
            type="checkbox"
            id="table-search-bar"
            className="table__search-bar--input"
          />
          <label htmlFor="table-search-bar">Pesquisar Membro </label>
          <SearchBar placeholder="Pesquisar membro..." />
        </div>

        <nav className="table__container--menu">
          <div className="table__container--active-btn">
            {isApprovedTab ? (
              <ButtonSwitch
                label={"ativos"}
                id="active-selector"
                onChange={(event) => setActiveUsers(event.target.checked)}
              />
            ) : null}
          </div>
          <div className="table__container--tabs">
            <TableTab content="Em aprovação" approvedTab={false} />
            <TableTab content="Cadastros" approvedTab={true} />
          </div>
        </nav>
        <div className="table__scroll-x">
          <Table />
        </div>
      </section>
    </React.Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  isApprovedTab: selectIsApprovedTabShow,
  usersApprovedArray: selectUsersApprovedArray,
});

const mapDispatchToProps = (dispatch) => ({
  setActiveUsers: (data) => dispatch(setIsApprovedTabActiveUsersAction(data)),
  getUsersFromDb: (data) => dispatch(getUsersFromDbAction(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Users);
