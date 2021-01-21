import React from "react";
import "./form-sections.styles.scss";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/currentUser/current-user.selectors";
import { selectFormDatas } from "../../redux/form/form.selectors";
import { handleFormInputChangeAction } from "../../redux/form/form.actions";

const Experiences = ({ currentUser, handleFormInputChange, formDatas }) => {
  return (
    <section className="form__section">
      {/* <!-- Vida Profissional --> */}
      <div>
        <label className="my-1" htmlFor="professional">
          <h6>Vida Profissional</h6>
        </label>
        <p className="mb-1">
          <small>
            Conte-nos um pouco da sua experiência profissional e ocupação atual.
            Isso vai ajudar a gente a te conhecer melhor e saber onde podemos te
            alocar em eventuais demandas! Se não tiver nenhuma ainda, não tem
            problema. Nós temos como um dos nossos pilares o desenvolvimento dos
            nossos membros (:
          </small>
        </p>
        <textarea
          className="form-control"
          name="professional"
          id="professional"
          required={!currentUser}
          placeholder=""
          value={formDatas.professional.value}
          onChange={(event) => handleFormInputChange(event)}
        ></textarea>
      </div>
    </section>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  formDatas: selectFormDatas,
});
const mapDispatchToProps = (dispatch) => ({
  handleFormInputChange: (event) =>
    dispatch(handleFormInputChangeAction(event)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Experiences);
