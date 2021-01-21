import React from "react";
import "./form-sections.styles.scss";

import { connect } from "react-redux"
import {createStructuredSelector } from 'reselect'
import { selectCurrentUser } from "../../redux/currentUser/current-user.selectors"
import { selectFormDatas } from "../../redux/form/form.selectors"
import { handleFormInputChangeAction } from "../../redux/form/form.actions"

const Dressing = ({currentUser, handleFormInputChange, formDatas}) => {

  return (
    <section className="form__section">
      <h6>Medida das Vestimentas</h6>
      <div className="row">
        {/* <!-- Camiseta --> */}
        <div className="col-sm-4 mt-3">
          <label htmlFor="shirt">Camiseta</label>
          <input
            className="form-control"
            type="text"
            name="shirt"
            required={!currentUser}
            id="shirt"
            placeholder="P, M, G, GG ou Plus"
            value={formDatas.shirt.value}
            onChange={(event) => handleFormInputChange(event)}
          />
        </div>

        {/* <!-- Calça --> */}
        <div className="col-sm-4 mt-3">
          <label htmlFor="pants">Calça</label>
          <input
            className="form-control"
            type="text"
            name="pants"
            required={!currentUser}
            id="pants"
            placeholder="Numeração"
            value={formDatas.pants.value}
            onChange={(event) => handleFormInputChange(event)}
          />
        </div>

        {/* <!-- Calçado --> */}
        <div className="col-sm-4 mt-3">
          <label htmlFor="shoes">Tênis</label>
          <input
            className="form-control"
            type="text"
            name="shoes"
            required={!currentUser}
            id="shoes"
            placeholder="Numeração"
            value={formDatas.shoes.value}
            onChange={(event) => handleFormInputChange(event)}
          />
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dressing);
