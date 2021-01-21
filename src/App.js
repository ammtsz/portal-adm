import React, { useEffect, Suspense, lazy } from "react";
import "./App.scss";

import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import Navbar from "./components/navbar/navbar.component";
import Sidebar from "./components/sidebar/sidebar.component";
import Footer from "./components/footer/footer.component.jsx";
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary";

import SIDEBAR_ROUTES from "./datas/routes.data";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/currentUser/current-user.selectors";
import { setUserAuthAction } from "./redux/currentUser/current-user.actions";
import { getUsersFromDbAction } from "./redux/table/table.actions"

const Home = lazy(() => import("./pages/home-page/home-page.components"));
const Login = lazy(() => import("./pages/login-page/login-page.component"));

const App = ({ history, currentUser, setUserAuth, getUsersFromDb }) => {

  useEffect(() => {
    setUserAuth()
    getUsersFromDb()
    return () => setUserAuth();
  }, []);

  return (
    <div className="page__background">
      <header className="sticky-top">
        <Navbar />
      </header>

      <main className="page__container">
        <Sidebar />

        <nav className="page__content">
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() =>
                    !currentUser ? <Redirect to="/login" /> : <Home />
                  }
                />
                <Route
                  path="/login"
                  render={() => (currentUser ? <Redirect to="/" /> : <Login />)}
                />
                {SIDEBAR_ROUTES.filter((route) =>
                  currentUser ? route.loggedIn : route.loggedOut
                ).map((route) => (
                  <Route key={route.id} exact path={route.linkUrl}>
                    {route.main}
                  </Route>
                ))}
              </Switch>
            </Suspense>
          </ErrorBoundary>
        </nav>
      </main>

      {
        // it renders footer if it is not login or contact page
        history.location.pathname !== "/login" &&
        history.location.pathname !== "/contact" ? (
          <Footer />
        ) : null
      }
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setUserAuth: () => dispatch(setUserAuthAction()),
  getUsersFromDb: () => dispatch(getUsersFromDbAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
