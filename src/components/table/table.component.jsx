import React, { useEffect } from "react";
import "./table.styles.scss";

import TableHead from "../../components/table-head/table-head.component";
import TableBody from "../../components/table-body/table-body.component";


const Table = () => {
  useEffect(() => {
  }, []);

  return (
    <table className="table text-truncate" id="users-table">
      <TableHead />
      <TableBody />
    </table>
  );
};

export default Table;
