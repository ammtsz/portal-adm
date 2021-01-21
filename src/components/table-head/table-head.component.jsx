import React from "react";
import "./table-head.styles.scss";

import { copyTable } from "./table-head.utils";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectTableColumns } from "../../redux/table/table.selectors";
import { sortColumnAction } from "../../redux/table/table.actions"


const TableHead = ({ tableColumns, sortColumn }) => {

  return (
    <thead className="table__head">
      <tr className="table__head--row">
        <th
          // First (Frozen) column -> Filter + Copy Icons
          className="table__frozen--head table__frozen--col-1"
        >
          {
            //copyTable button - will copy table content when clicked
          }
          <span
            className="table__head--copy-icon"
            onClick={() => copyTable("#users-table")}
          >
            <i className="fas fa-copy pr-2"></i>
          </span>

          {
            // filter modal button - shows filter modal when clicked
          }
          <span
            className="table__head--filter-icon"
            data-toggle="modal"
            data-target="#userTableFilterModal"
          >
            <i className="fas fa-filter"></i>
          </span>
        </th>

        {Object.keys(tableColumns).map((name) =>
          //   show selected tableColumns settled on filter modal - the default is to show all tableColumns. It can be changed on 'users-table.data.js'
          name !== "id" && tableColumns[name].filter ? (
            <th
              key={tableColumns[name].id}
              className={`${
                name === "name"
                  ? "table__frozen--head table__frozen--col-2"
                  : ""
              }`}
            >
              <div className="table__thead--column-name">
                {tableColumns[name].orderBy ? (
                  //   show dropdown icon if column can be sorted
                  <React.Fragment>
                    <input
                      type="checkbox"
                      className="table__thead--checkbox"
                      onClick={(event) => sortColumn({event, name})}
                    />
                    <i className="fas fa-chevron-down table__thead--check-icon"></i>
                  </React.Fragment>
                ) : null}
                {tableColumns[name].columnName}
              </div>
            </th>
          ) : null
        )}
      </tr>
    </thead>
  );
};

const mapSateToProps = createStructuredSelector({
  tableColumns: selectTableColumns,
});

const mapDispatchProps = dispatch => ({
  sortColumn: datas => dispatch(sortColumnAction(datas)),
})

export default connect(mapSateToProps, mapDispatchProps)(TableHead);
