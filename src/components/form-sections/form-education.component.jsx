import React from "react";
import "./form-sections.styles.scss";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectFormDatas } from "../../redux/form/form.selectors";
import { handleFormInputChangeAction } from "../../redux/form/form.actions";

const Education = ({ handleFormInputChange, formDatas }) => {
  
  return (
    <section className="form__section">
      {/* <!-- escolaridade --> */}
      <h6 className="mb-2">Nível de Escolaridade</h6>
      <div>
        <input
          type="radio"
          name="education"
          id="middleschool"
          required
          value="middleschool"
          checked={formDatas.education.value === "middleschool"}
          onChange={(event) => handleFormInputChange(event)}
        />
        <label htmlFor="middleschool">Estudante do Ensino Fundamental</label>
      </div>
      <div>
        <input
          type="radio"
          name="education"
          id="highschool"
          required
          value="highschool"
          checked={formDatas.education.value === "highschool"}
          onChange={(event) => handleFormInputChange(event)}
        />
        <label htmlFor="highschool">Estudante do Ensino Médio</label>
      </div>
      <div>
        <input
          type="radio"
          name="education"
          id="college"
          required
          value="college"
          checked={formDatas.education.value === "college"}
          onChange={(event) => handleFormInputChange(event)}
        />
        <label htmlFor="college">Estudante do Ensino Superior</label>
      </div>
      <div>
        <input
          type="radio"
          name="education"
          id="graduated"
          required
          value="graduated"
          checked={formDatas.education.value === "graduated"}
          onChange={(event) => handleFormInputChange(event)}
        />
        <label htmlFor="graduated">Ensino Superior Completo</label>
      </div>

      {/* <!-- curso --> */}
      {formDatas.education.value === "college" ||
      formDatas.education.value === "graduated" ? (
        <div className="form__course  mt-3">
          <label htmlFor="course">
            <h6>Curso ou Área de Atuação</h6>
          </label>
          <input
            className="form-control"
            type="text"
            name="course"
            id="course"
            placeholder=""
            value={formDatas.course.value}
            onChange={(event) => handleFormInputChange(event)}
          />
        </div>
      ) : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(Education);
