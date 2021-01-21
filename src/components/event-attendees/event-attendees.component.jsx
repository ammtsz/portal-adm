import React, { useEffect } from "react";
import "./event-attendees.styles.scss";

import SearchBar from "../search-bar/search-bar.component";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUsersApprovedArray } from "../../redux/table/table.selectors";
import {
  selectEventFormDatas,
  selectEventAttendeesIds,
  selectIsEditingAttendees,
} from "../../redux/events/events.selectors";
import {
  setEventAttendeesIdsAction,
  setIsEditingAttendeesAction,
  handleSaveAttendeesAction,
  deleteAttendeeAction,
} from "../../redux/events/events.actions";
import { setSearchTermAction } from "../../redux/search-bar/search-bar.actions"

const AttendeesList = ({
  usersAprovedArray,
  eventFormDatas,
  eventAttendeesIds,
  isEditingAttendees,
  setEventAttendeesIds,
  setIsEditingAttendees,
  handleSaveAttendees,
  deleteAttendee,
  setSearchTerm
}) => {

  // get attendee member's ID after select the name on search-bar
  const handleSuggestionClick = (userId) => {
    setEventAttendeesIds([...eventAttendeesIds, userId]);
  };

  // Filter users and return only `attendees users` to display on `attendees list`
  const getAttendeeUsers = () => {
    const attendeesArray = usersAprovedArray.filter(
      (user) => eventAttendeesIds.indexOf(user.id) > -1
    );
    return attendeesArray;
  };

  useEffect(() => {
    setEventAttendeesIds(eventFormDatas.attendees);
    return () => setSearchTerm("")
  }, [eventFormDatas, setEventAttendeesIds, setSearchTerm]);

  return (
    <div className="attendees_">
      <div className="attendees__content">
        <div className="attendees__header">
          <h5 className="attendees__title">Participantes</h5>
          {
            // attendees edit button
          }
          <span
            className="attendees__edit"
            onClick={() => {
              setIsEditingAttendees(true);
              document.getElementById("submit-event").disabled = true;
            }}
          >
            Editar
          </span>
        </div>
        <div className="attendees__body">
          {isEditingAttendees ? (
            // attendees Searchbar
            <SearchBar
              suggestions
              placeholder={"Pesquisar membro"}
              width_100
              ids={eventAttendeesIds}
              handleSuggestionClick={handleSuggestionClick}
            />
          ) : null}
          {
            // attendees list
          }
          <div className="attendees__body--list">
            {getAttendeeUsers().map((attendee) => (
              <div key={attendee.id} className="attendee_">
                {isEditingAttendees ? (
                  <i
                    onClick={() => deleteAttendee(attendee.id)}
                    className="fas fa-times"
                  ></i>
                ) : null}
                <span>{attendee.name.value} ({attendee.email.value})</span>
              </div>
            ))}
          </div>
        </div>
        {
          // attendees save button
        }
        {isEditingAttendees ? (
          <button
            type="button"
            className="attendees__save   btn btn-secondary"
            data-dismiss="modal"
            onClick={() => handleSaveAttendees()}
          >
            Salvar
          </button>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  usersAprovedArray: selectUsersApprovedArray,
  eventFormDatas: selectEventFormDatas,
  eventAttendeesIds: selectEventAttendeesIds,
  isEditingAttendees: selectIsEditingAttendees,
});

const mapDispatchToProps = (dispatch) => ({
  setEventAttendeesIds: (datas) => dispatch(setEventAttendeesIdsAction(datas)),
  setIsEditingAttendees: (datas) => dispatch(setIsEditingAttendeesAction(datas)),
  handleSaveAttendees: () => dispatch(handleSaveAttendeesAction()),
  deleteAttendee: (data) => dispatch(deleteAttendeeAction(data)),
  setSearchTerm: (data) => dispatch(setSearchTermAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AttendeesList);
