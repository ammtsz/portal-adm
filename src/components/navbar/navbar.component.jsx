import React, { useEffect } from "react";
import "./navbar.styles.scss";

import { withRouter, Link, useHistory } from "react-router-dom";

import logo from "../../assets/logo.png";
import SearchBar from "../search-bar/search-bar.component";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/currentUser/current-user.selectors";
import { selectUsersApprovedArray } from "../../redux/table/table.selectors";
import { signOutAction } from "../../redux/currentUser/current-user.actions";

const Navbar = ({ history, match, currentUser, signOut, usersArray }) => {
  const historyRouter = useHistory();

  useEffect(() => {}, [usersArray]);

  return (
    <div className={`navbar_    navbar navbar-light navbar-expand`}>
      <Link className="navbar-brand p-0" to="/">
        <img src={logo} height="50px" alt="logo" />
      </Link>

      {
        // if user is logged in, show all navbar elements 
      }
      {currentUser ? (
        <React.Fragment>
          <Link
            to="/users"
            className="navbar__count-members hide__sm   mb-0 pl-2"
          >
            <h3 className="pt-1 mb-0 pl-2">
              {usersArray.filter((user) => user.active.label === "Sim").length}
              <small>/{usersArray.length}</small>
              <span className="hide__lg"> Membros</span>
            </h3>
          </Link>

          <div className="navbar__container   collapse navbar-collapse">
            {
              //Search bar - displayed when it is on user page
              history.location.pathname === "/users" ? (
                <div className="navbar__search-bar">
                  <SearchBar placeholder="Pesquisar membro..." />
                </div>
              ) : null
            }

            {
              //add new member button - goes to `part-form` page ('cadastro rápido')
            }
            <div
              className="navbar__add-member--icon   btn"
              onClick={() => history.push(`${match.url}form-part`)}
            >
              <i className="fas fa-user-plus fa-lg"></i>
            </div>

            {
              // dropdown to logout button
            }
            <div className="dropdown">
              <button
                className="navbar__profile--icon   btn dropdown-toggle"
                id="navbarDropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fas fa-user fa-lg"></i>
              </button>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="navbarDropdown"
              >
                {
                  //dropdown elements
                }
                {}
                <span
                  className="dropdown-item disabled_    my-2 "
                  to="/profile"
                >
                  Perfil
                </span>
                <span className="dropdown-item disabled_   my-2" to="/settings">
                  Configurações
                </span>
                <div className="dropdown-divider"></div>
                <div
                  className="dropdown-item mt-3 mb-2"
                  onClick={() => {
                    signOut();
                    historyRouter.push("/login");
                  }}
                >
                  Sair
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      ) : (
        // if user is NOT logged in, hide all navbar elements, but logo
        <h3 className="navbar__external--title">Portal Adm</h3>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  usersArray: selectUsersApprovedArray,
});
const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOutAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));
