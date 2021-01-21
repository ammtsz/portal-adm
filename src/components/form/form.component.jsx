import React, { useEffect, useState } from "react";
import "./form.styles.scss";

import { withRouter } from "react-router-dom";

import MainDatas from "../form-sections/form-main-datas.component";
import Education from "../form-sections/form-education.component";
import Experiences from "../form-sections/form-experiences.component";
import Dressing from "../form-sections/form-dressing.component";
import Health from "../form-sections/form-health.component";
import MembersOnly from "../form-sections/form-members-only.component";
import WhatsappGroups from "../form-sections/form-whatsapp-groups.component";
import Permissions from "../form-sections/form-permissions.component";

import ModalAlert from "../modal-alert/modal-alert.component";
import ModalContext from "../../contexts/modal/modal.context";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/currentUser/current-user.selectors";
import {
  handleSubmitNewFormAction,
  resetFormDatasAction,
} from "../../redux/form/form.actions";

const Form = ({
  location,
  history,
  currentUser,
  handleSubmitNewForm,
  resetFormDatas,
}) => {
  const [showModal, setShowModal] = useState(false);

  const partial = currentUser ? location.pathname === "/form-part" : false;

  useEffect(() => {
    return () => resetFormDatas();
  }, [showModal, resetFormDatas]);

  return (
    <section className="form_ container-box">
      <ModalContext.Provider value={{ setShowModal }}>
        {showModal ? (
          <ModalAlert title="Formulário enviado com Sucesso" text="..." />
        ) : null}
      </ModalContext.Provider>

      <div className="form__title">
        <h3>{partial ? "Cadastro Rápido" : "Pré Cadastro"}</h3>

        {
          // case user is logged in, it allows the form to alternate from complete form to partial form
          currentUser ? (
            <span
              onClick={() =>
                history.push(`${partial ? "/form" : "/form-part"}`)
              }
              className="btn btn-white"
            >
              {partial
                ? "Ir para Cadastro Completo"
                : "Ir para Cadastro Rápido"}
            </span>
          ) : null
        }
      </div>

      <form
        onSubmit={(event) => {
          handleSubmitNewForm(event);
          setShowModal(true);
        }}
        id="user-form"
      >
        <MainDatas />
        <Education />
        {partial ? null : <Experiences />}
        {partial ? null : <Dressing />}
        {partial ? null : <Health />}
        {partial ? null : <MembersOnly />}
        <WhatsappGroups />
        {partial ? null : <Permissions />}

        <div className="row mt-5" id="submit">
          <div className="col-12">
            <input
              type="submit"
              value="Cadastrar"
              className="form-control btn"
            />
          </div>
        </div>
      </form>
    </section>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  handleSubmitNewForm: (event) => dispatch(handleSubmitNewFormAction(event)),
  resetFormDatas: () => dispatch(resetFormDatasAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Form));
