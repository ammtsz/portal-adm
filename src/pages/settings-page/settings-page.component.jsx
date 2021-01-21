import React, { Suspense } from "react";
import "./settings-page.styles.scss";

import { Route, Switch, withRouter } from "react-router-dom";
import Spinner from "../../components/spinner/spinner.component";

import ErrorBoundary from "../../components/error-boundary/error-boundary";

const Settings = ({ history, match }) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path={match.path}>
            <section className="settings__container">
              <div className="settings__cards">
                <div
                  className="settings__card settings__card-adm"
                  onClick={() => {
                    history.push(`${match.url}`);
                  }}
                >
                  <i className="fas fa-users"></i>
                </div>
                <div
                  className="settings__card settings__card-user"
                  onClick={() => {
                    history.push(`${match.url}`);
                  }}
                >
                  <i className="fas fa-file-alt"></i>
                </div>
              </div>
            </section>
          </Route>
        </Switch>
      </Suspense>
    </ErrorBoundary>
  );
};

export default withRouter(Settings);
