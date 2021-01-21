import React, { Suspense, useEffect, useState, lazy } from "react";
import "./events-page.styles.scss";

import { Route, Switch, withRouter } from "react-router-dom";
import {
  addEventClick,
  getEventsByYear,
  getNextEvents,
} from "./events-page.utils";

import CardsCollection from "../../components/cards-collection/cards-collection.component";
import Calendar from "../../components/calendar/calendar.component";
import ButtonCustom from "../../components/button-custom/button-custom.component";
import EventModal from "../../components/event-modal/event-modal.component";
import ModalAlert from "../../components/modal-alert/modal-alert.component";

import ModalContext from "../../contexts/modal/modal.context";
import Spinner from "../../components/spinner/spinner.component";

import ErrorBoundary from "../../components/error-boundary/error-boundary";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectAllEvents,
  selectEventsYears,
} from "../../redux/events/events.selectors";
import { getEventsFromFirestoreAction } from "../../redux/events/events.actions";

const EventPage = lazy(() => import("../event-page/event-page.component"));

const Events = ({ match, allEvents, eventsYears, getEventsFromFirestore }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getEventsFromFirestore();
  }, []);

  return (
    <ModalContext.Provider value={{ showModal, setShowModal }}>
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route exact path={`${match.path}`}>
              {showModal ? (
                <ModalAlert
                  title={"Evento Cadastrado com Sucesso"}
                  text={"..."}
                />
              ) : null}

              <section className="events__container">
                <CardsCollection
                  main
                  title={"Próximos Eventos"}
                  events={getNextEvents(allEvents)}
                  buttonComponent={
                    <ButtonCustom
                      primary
                      handleClick={addEventClick}
                      display="Adicionar Evento"
                    />
                  }
                />

                <section className="events__calendar">
                  <Calendar />
                  <section className="events__modal">
                    <EventModal />
                  </section>
                </section>

                <section className="events__collections">
                  <CardsCollection
                    title={"Todos os Eventos"}
                    id={"all-events"}
                    events={allEvents}
                  />
                </section>
                {
                  // A new year section is created automatically when an event in a new year is created
                }
                <section className="events__collections">
                  {eventsYears.map((year) => (
                    <CardsCollection
                      key={year}
                      title={year}
                      id={year}
                      events={getEventsByYear(year, allEvents)}
                    />
                  ))}
                </section>
              </section>
            </Route>

            <Route path={`${match.path}/:eventId`} component={EventPage} />
          </Switch>
        </Suspense>
      </ErrorBoundary>
    </ModalContext.Provider>
  );
};

const mapStateToProps = createStructuredSelector({
  allEvents: selectAllEvents,
  eventsYears: selectEventsYears,
});

const mapDispatchToProps = (dispatch) => ({
  getEventsFromFirestore: () => dispatch(getEventsFromFirestoreAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Events));
