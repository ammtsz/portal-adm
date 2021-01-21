import React, { useEffect, useState } from "react";
import "./form-edit.styles.scss";

import { Link, withRouter } from "react-router-dom";

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
import {
  handleSubmitEditFormAction,
  resetFormDatasAction,
} from "../../redux/form/form.actions";
import { selectFormDatas } from "../../redux/form/form.selectors";

const FormEdit = ({
  history,
  handleSubmitEditForm,
  resetFormDatas,
  formDatas,
}) => {
  const [showModal, setShowModal] = useState(false);

  // redirect the page to users page
  const handleModalClick = () => {
    history.push("/users");
  };

  useEffect(() => {
    return () => resetFormDatas();
  }, []);

  return (
    <section className="form_ container-box">
      {
        //modal displayed after the form is submited
      }
      <ModalContext.Provider value={{ setShowModal }}>
        {showModal ? (
          <ModalAlert
            title="Cadastro atualizado com Sucesso"
            handleClick={handleModalClick}
            text="..."
          />
        ) : null}
      </ModalContext.Provider>

      <div className="form__title">
        <h3>
          {" "}
          Editar cadastro -
          {formDatas.name.value === "" ? (
            <Link to="/users"> Selecione um usuário</Link>
          ) : (
            <span> {formDatas.name.value}</span>
          )}
        </h3>
      </div>

      <form
        onSubmit={(event) => {
          handleSubmitEditForm(event);
          setShowModal(true);
        }}
      >
        <MainDatas />
        <Education />
        <Experiences />
        <Dressing />
        <Health />
        <MembersOnly />
        <WhatsappGroups />
        <Permissions />

        <div className="row mt-5" id="submit">
          <div className="col-12">
            <input
              type="submit"
              value="Atualizar"
              className="form-control btn"
            />
          </div>
        </div>
      </form>
    </section>
  );
};

const mapStateToProps = createStructuredSelector({
  formDatas: selectFormDatas,
});

const mapDispatchToProps = (dispatch) => ({
  handleSubmitEditForm: (event) => dispatch(handleSubmitEditFormAction(event)),
  resetFormDatas: () => dispatch(resetFormDatasAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(FormEdit));
