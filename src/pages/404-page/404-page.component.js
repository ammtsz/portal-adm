import React from "react";

import "./404-page.styles.scss";
import SVG from "../../assets/error-404.svg";

import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/currentUser/current-user.selectors";

const NotFound = ({ currentUser }) => {
  return (
    <section className="notfound__container">
      <div>
        <figure>
          <img src={SVG} alt="erro 404" />
          <figcaption className="notfound__warning">
            Não foi possível encontrar esta página
          </figcaption>
        </figure>

        {currentUser ? (
          <p>
            Voltar para a{" "}
            <Link to="/" className="notfound__redirect">
              página princial
            </Link>
          </p>
        ) : (
          <p>
            Fazer{" "}
            <Link to="/login" className="notfound__redirect">
              login
            </Link>
          </p>
        )}
      </div>
    </section>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(NotFound);
