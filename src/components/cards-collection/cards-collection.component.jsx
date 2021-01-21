import React from "react";
import "./cards-collection.styles.scss";

import { returnEventInfos, returnMoreInfos } from "./cards-collection.utils";

import CardImage from "../card-image/card-image.component";

const CardsCollection = ({ title, id, events, buttonComponent }) => {
  return (
    <section className="cards-collection_">
      {id ? (
        <input
          type="checkbox"
          id={`events--${id}`}
          className="cards-collection__input"
          defaultChecked
        />
      ) : null}
      <label htmlFor={`events--${id}`} className="cards-collection__title">
        {title}
      </label>

      {events.length !== 0 ? (
        <div className="cards-collection__items">
          {events.map((event) => {
            return (
              <CardImage
                key={event.id}
                eventName={event.eventName}
                img={event.image}
                infos={returnEventInfos(event)}
                moreInfos={returnMoreInfos(event)}
                id={event.id}
              />
            );
          })}
        </div>
      ) : (
        // case there is no event settled, it will display the following message
        <h5 className="cards-collection__no-events">
          Nenhum evento cadastrado...
        </h5>
      )}

      {buttonComponent ? (
        <div className="cards-collection__new-event--btn">
          {buttonComponent}
        </div>
      ) : null}
    </section>
  );
};

export default CardsCollection;
