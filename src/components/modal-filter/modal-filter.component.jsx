import React, { useState } from "react";
import "./modal-filter.styles.scss";

import ButtonSwitch from "../button-switch/button-switch.component";

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectTableColumns } from "../../redux/table/table.selectors"
import { setTableColumnsAction } from "../../redux/table/table.actions"


const ModalFilter = ({tableColumn, setTableColumns}) => {
  const [filterColumns, setFilterColumns] = useState(tableColumn);

  // action for button to sellect all collumns ou none of them
  const selectAll = (checked) => {
    // update view
    const inputs = document.querySelectorAll(".user-filter__item .button-switch__container input");
    [...inputs].forEach((input) => (input.checked = checked));

    // update datas
    let allColumns = {};
    Object.keys(filterColumns).forEach((name) => {
      let obj = {
        ...filterColumns[name],
        filter:
          name !== "name" && name !== "id" && name !== "auxColumn"
            ? name !== "number" && name !== "complement"
              ? checked
              : false
            : true,
      };
      allColumns = { ...allColumns, [name]: obj };
    });
    setFilterColumns(allColumns);
  };


  // Bootstrap modal
  return (
    <div
      className="modal fade"
      id="userTableFilterModal"
      tabIndex="-1"
      aria-labelledby="userTableFilterModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="userTableFilterModal">
              Exibir Colunas
            </h5>

            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          {
            //modal body - show columns name if the column can be hidden
          }
          <div className="modal-body">
            {Object.keys(filterColumns).map((name) =>
              name !== "id" &&
              name !== "name" &&
              name !== "auxColumn" &&
              name !== "number" &&
              name !== "complement" ? (
                <div className="user-filter__item" key={filterColumns[name].id}>
                  <ButtonSwitch
                    type="checkbox"
                    className="user-filter__item--checkbox mr-2 justify-content-start"
                    id={`filter_${name}`}
                    checked={filterColumns[name].filter}
                    onChange={(event) => {
                      setFilterColumns({
                        ...filterColumns,
                        [name]: {
                          ...filterColumns[name],
                          filter: event.target.checked,
                        },
                      });
                    }}
                    label={filterColumns[name].columnName}
                  />
                </div>
              ) : null
            )}
          </div>
          {
            //modal footer - show buttons to sellect all columns or none + buttons to cancel/close and to filter columns
          }
          <div className="modal-footer d-flex justify-content-between">
            <div>
              <button
                type="button"
                className="filter__btn--selection   mr-2"
                onClick={() => selectAll(true)}
              >
                Todas
              </button>
              <button
                type="button"
                className="filter__btn--selection   mr-2"
                onClick={() => selectAll(false)}
              >
                Nenhuma
              </button>
            </div>
            <div>
              <button
                type="button"
                className="filter__btn--cancel   btn mr-2"
                data-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                className="filter__btn--ok   btn btn-secondary"
                data-dismiss="modal"
                onClick={() => setTableColumns(filterColumns)}
              >
                Filtrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  tableColumn: selectTableColumns
})

const madDispatchToProps = dispatch => ({
  setTableColumns: data => dispatch(setTableColumnsAction(data))
})

export default connect(mapStateToProps, madDispatchToProps)(ModalFilter);
