import React, { useEffect } from "react";
import "./table-body.styles.scss";

import { withRouter } from "react-router-dom";
import {
  onDeleteApprovedUser,
  onDeletePendingUser,
  approvePendingUser,
  usersDisplay,
} from "./table-body.utils";

import EditableTextarea from "../textarea-editable/textarea-editable.component";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { setEditingUserIdAction } from "../../redux/form/form.actions";
import { setUsersDisplayArrayAction } from "../../redux/table/table.actions";
import {
  selectUsersSearchArray,
  selectTableColumns,
  selectIsApprovedTabShow,
  selectIsApprovedTabActiveUsers,
  selectUsersDisplayArray,
  selectUsersApprovedArray,
  selectUsersPendingArray,
} from "../../redux/table/table.selectors";

const TableBody = ({
  history,
  isApprovedTab,
  activeUsers,
  tableColumns,
  setUserEditId,
  setUsersDisplayArray,
  usersSearchArray,
  usersDisplayArray,
  usersApprovedArray,
  usersPendingArray,
}) => {
  useEffect(() => {
    setUsersDisplayArray(usersDisplay(usersSearchArray));
  }, [usersSearchArray, isApprovedTab, usersApprovedArray, usersPendingArray, setUsersDisplayArray]);

  return (
    <tbody className="table__body">
      {usersDisplayArray
        .filter((user) => (activeUsers ? user.active === "Sim" : true))
        .map((user) => {
          return (
            <tr key={user.id} className="table__body--row">
              {!isApprovedTab ? (
                // First (Frozen) column
                <td
                  // case PENDING USERS table: Delete + Approve Icons
                  className="table__frozen--body table__frozen--col-1"
                >
                  <button
                    onClick={() => onDeletePendingUser(user.id, user.name)}
                    className="table__body--delete-icon   btn btn-sm"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                  <button
                    onClick={() => approvePendingUser(user.id, user.name)}
                    className="table__body--approve-icon   btn btn-sm"
                  >
                    <i className="fas fa-check"></i>
                  </button>
                </td>
              ) : (
                <td
                  // case APPROVED USERS table: Delete + Edit Icons
                  className="table__frozen--body table__frozen--col-1"
                >
                  <button
                    onClick={() => onDeleteApprovedUser(user.id, user.name)}
                    className="table__body--delete-icon   btn btn-sm"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                  <button
                    onMouseDown={() => setUserEditId(user.id)}
                    onMouseUp={() => history.push("/form-edit")}
                    className="table__body--edit-icon   btn btn-sm"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                </td>
              )}

              {Object.keys(tableColumns).map((name) =>
                name !== "id" && tableColumns[name].filter ? (
                  <td
                    key={tableColumns[name].id}
                    className={`table__body--row-td ${
                      // add a className if it's a frozen column
                      name === "name"
                        ? "table__frozen--body table__frozen--col-2"
                        : ""
                    } ${
                      // add a className if it's a textarea
                      tableColumns[name].textarea ? "table__body--textarea" : ""
                    }`}
                  >
                    {tableColumns[name].textarea ? (
                      // ========= >>> create a textarea box if it is a textarea column
                      name === "internalNotes" ? (
                        <EditableTextarea
                          id={user.id}
                          note={user["internalNotes"]}
                        />
                      ) : (
                        <textarea value={user[name]} disabled></textarea>
                      )
                    ) : (
                      // ========= >>> otherwise just print the value
                      user[name]
                    )}
                  </td>
                ) : null
              )}
            </tr>
          );
        })}
    </tbody>
  );
};

const mapStateToProps = createStructuredSelector({
  usersSearchArray: selectUsersSearchArray,
  tableColumns: selectTableColumns,
  isApprovedTab: selectIsApprovedTabShow,
  activeUsers: selectIsApprovedTabActiveUsers,
  usersDisplayArray: selectUsersDisplayArray,
  usersApprovedArray: selectUsersApprovedArray,
  usersPendingArray: selectUsersPendingArray,
});

const mapDispatchToProps = (dispatch) => ({
  setUserEditId: (id) => dispatch(setEditingUserIdAction(id)),
  setUsersDisplayArray: (data) => dispatch(setUsersDisplayArrayAction(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TableBody));
