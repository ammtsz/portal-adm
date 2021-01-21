import React from "react";
import "./form-sections.styles.scss";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectFormDatas } from "../../redux/form/form.selectors";
import { handleFormInputChangeAction } from "../../redux/form/form.actions";

const MembersOnly = ({ handleFormInputChange, formDatas }) => {
  return (
    <section className="form__section">
      <p className="text-secondary">
        (opcional - se já for membro de gestões anteriores)
      </p>

      <div className="row">
        {/* <!-- diretoria --> */}
        <div className="col-lg-4 col-sm-12 mt-3">
          <label htmlFor="area">Diretoria</label>
          <select
            className="form-control"
            id="area"
            name="area"
            value={formDatas.area.value}
            onChange={(event) => handleFormInputChange(event)}
          >
            <option value="">---</option>
            <option value="events">Eventos</option>
            <option value="financial">Financeiro</option>
            <option value="mkt">Marketing</option>
            <option value="presidency">Presidência</option>
            <option value="rh">RH</option>
          </select>
        </div>
        {/* <!-- cargo --> */}
        <div className="col-lg-4 col-sm-12 mt-3">
          <label htmlFor="position">Cargo</label>
          <select
            className="form-control"
            id="position"
            name="position"
            value={formDatas.position.value}
            onChange={(event) => handleFormInputChange(event)}
          >
            <option value="">---</option>
            <option value="director">Diretor(a)</option>
            <option value="associated">Associad@</option>
          </select>
        </div>
        {/* <!-- membro desde --> */}
        <div className="col-lg-4 col-sm-12 mt-3">
          <label htmlFor="memberSince">Membro desde</label>
          <input
            className="form-control"
            type="date"
            name="memberSince"
            id="memberSince"
            value={formDatas.memberSince.value}
            onChange={(event) => handleFormInputChange(event)}
          />
        </div>
      </div>

      {/* <!-- membro ativo --> */}
      <h6 className="mt-4 mb-2">Membro Ativo</h6>
      <div>
        <input
          type="radio"
          name="active"
          id="activeY"
          value="activeY"
          checked={formDatas.active.value === "activeY"}
          onChange={(event) => handleFormInputChange(event)}
        />
        <label htmlFor="activeY">Sim</label>
      </div>
      <div>
        <input
          type="radio"
          name="active"
          id="activeN"
          value="activeN"
          checked={formDatas.active.value === "activeN"}
          onChange={(event) => handleFormInputChange(event)}
        />
        <label htmlFor="activeN">Não</label>
      </div>
    </section>
  );
};

const mapStateToProps = createStructuredSelector({
  formDatas: selectFormDatas,
});
const mapDispatchToProps = (dispatch) => ({
  handleFormInputChange: (event) =>
    dispatch(handleFormInputChangeAction(event)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MembersOnly);
