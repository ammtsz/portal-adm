import React from "react";
import "./form-sections.styles.scss";

import { connect } from "react-redux"
import {createStructuredSelector } from 'reselect'
import { selectCurrentUser } from "../../redux/currentUser/current-user.selectors"
import { selectFormDatas } from "../../redux/form/form.selectors"
import { handleFormInputChangeAction } from "../../redux/form/form.actions"

const Permissions = ({currentUser, handleFormInputChange, formDatas}) => {

  return (
    <section className="form__section">
      {/* <!-- Autorização de imagem e voz --> */}

      <div className="form-check mt-3">
        <input
          className="form-check-input"
          type="checkbox"
          name="permission"
          id="permission"
          // required={!currentUser}
          checked={formDatas.permission.checked}
          onChange={(event) => handleFormInputChange(event)}
        />
        <label className="form-check-label" htmlFor="permission">
          Autorizo expressamente a utilização da minha imagem e voz, em caráter
          definitivo e gratuito, constante em fotos e filmagens decorrentes da
          minha participação na Comissão.
        </label>
      </div>

      {/* <!-- Declaração de Informações --> */}

      <div className="form-check mt-3">
        <input
          className="form-check-input"
          type="checkbox"
          name="declaration"
          id="declaration"
          required={!currentUser}
          checked={formDatas.declaration.checked}
          onChange={(event) => handleFormInputChange(event)}
        />
        <label className="form-check-label" htmlFor="declaration">
          Declaro, para os devidos fins, que as informações contidas neste
          pré-cadastro são verdadeiras e assume o compromisso de apresentar,
          quando solicitado, os comprovantes originais, bem como acatar com as
          penalidades por quaisquer informações falsas.
        </label>
      </div>
    </section>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  formDatas: selectFormDatas
})
const mapDispatchToProps = dispatch => ({
  handleFormInputChange: event => dispatch(handleFormInputChangeAction(event))
})

export default connect(mapStateToProps, mapDispatchToProps)(Permissions);
