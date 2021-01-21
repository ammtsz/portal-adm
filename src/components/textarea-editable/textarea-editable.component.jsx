import React, { useState } from "react";
import "./textarea-editable.styles.scss";


import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectIsApprovedTabShow } from "../../redux/table/table.selectors"

import {
  editInternalNotes,
  submitInternalNotes,
} from "./textarea-editable.utils";

const EditableTextarea = ({ id, note, isApprovedTab }) => {
  const [internalNote, setInternalNote] = useState(note);

  return (
    // ========= >>> create a textarea box if it is a textarea column
    <div className="textarea_" id={`internalNote--${id}`}>
      <textarea
        value={internalNote}
        onChange={(event) => setInternalNote(event.target.value, id)}
        disabled
      ></textarea>

      {
        // create an edit and save buttons if it is an internal notes column

        <div className="textarea__buttons">
          <button
            className="textarea__buttons--icon"
            onClick={() => editInternalNotes(id)}
          >
            <i className="fas fa-edit"></i>
          </button>
          <button
            className="textarea__buttons--icon"
            onClick={() => submitInternalNotes(id, internalNote, isApprovedTab)}
          >
            <i className="fas fa-save"></i>
          </button>
        </div>
      }
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isApprovedTab: selectIsApprovedTabShow
})

export default connect(mapStateToProps)(EditableTextarea);
