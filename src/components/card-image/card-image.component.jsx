import React from "react";
import "./card-image.styles.scss";

import { text_truncate, encodeUri } from "../../utils/utils";

import { withRouter } from "react-router-dom";

import { connect } from 'react-redux'
import { deleteEventFromCardAction } from '../../redux/events/events.actions'

const EventItem = ({
  history,
  match,
  eventName,
  img,
  infos,
  moreInfos,
  id,
  deleteEvent,
}) => {


  return (
    <div className="card_">
      <div className="card__container">
        <div
          className="card__background--img"
          style={{ backgroundImage: `url(${img})` }}
        />

        <div className="card__content">
          <h1 className="card__content--eventName">
            {text_truncate(eventName.toUpperCase(), 25)}
          </h1>

          {infos ? (
            <div className="card__content--infos">
              {infos.map((info, index) => (
                <h5 key={index} className="card__infos--text">
                  {info}
                </h5>
              ))}
            </div>
          ) : null}

          {
            //   moreInfos - it is displayed only on hover
          }
          <div className="card__content--moreInfos">
            <h5 className="">{eventName.toUpperCase()}</h5>
            {moreInfos
              ? moreInfos.map((info, index) => (
                  <p key={`moreInfos_${index}`} className="card__infos--text">
                    {info}
                  </p>
                ))
              : null}
            <button
              className="btn card__content--btn edit_"
              onClick={() =>
                //gets event name + 3 first id characteres and use as URL
                history.push(`${match.url}/${encodeUri(eventName, id)}`)
              }
            >
              Editar Evento
            </button>
            <button
              className="btn card__content--btn delete_"
              onClick={() => deleteEvent({id, eventName})}
            >
              Apagar Evento
            </button>
          </div>
          {
            //   /moreInfos
          }
        </div>
      </div>
    </div>
  );
};


const mapDispatchToProps = dispatch => ({
  deleteEvent: (datas) => dispatch(deleteEventFromCardAction(datas))
})

export default connect(null, mapDispatchToProps)(withRouter(EventItem));
