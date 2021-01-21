import React, { useEffect } from "react";
import "./table-tab.styles.scss";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectIsApprovedTabShow } from "../../redux/table/table.selectors";
import { handleIsApprovedTabShowAction } from "../../redux/table/table.actions.js";

const TableTab = ({
  isApprovedTab,
  setIsApprovedTab,
  content,
  approvedTab,
}) => {

  useEffect(() => {
  }, [isApprovedTab]);

  return (
    <span
      onClick={() => setIsApprovedTab(approvedTab)}
      className={`table__container--tab ${
        isApprovedTab === approvedTab ? "active" : ""
      }`}
    >
      {content}
    </span>
  );
};

const mapStateToProps = createStructuredSelector({
  isApprovedTab: selectIsApprovedTabShow,
});

const masDispatchToProps = (dispatch) => ({
  setIsApprovedTab: (data) => dispatch(handleIsApprovedTabShowAction(data)),
});
export default connect(mapStateToProps, masDispatchToProps)(TableTab);
