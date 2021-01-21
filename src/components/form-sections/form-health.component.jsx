import React from "react";
import "./form-sections.styles.scss";

import { connect } from "react-redux"
import {createStructuredSelector } from 'reselect'
import { selectCurrentUser } from "../../redux/currentUser/current-user.selectors"
import { selectFormDatas } from "../../redux/form/form.selectors"
import { handleFormInputChangeAction } from "../../redux/form/form.actions"

const Health = ({currentUser, handleFormInputChange, formDatas}) => {

  return (
    <section className="form__section">
      <div className="row">
        {/* <!-- Alergias --> */}
        <div className="col-lg-6 mb-3">
          <label htmlFor="alergies">
            <h6>Alergias</h6>
          </label>
          <textarea
            className="form-control"
            name="alergies"
            id="alergies"
            required={!currentUser}
            placeholder="Inclua alergias alimentares, de contato e afins"
            value={formDatas.alergies.value}
            onChange={(event) => handleFormInputChange(event)}
          ></textarea>
        </div>

        {/* <!-- Medicamentos --> */}
        <div className="col-lg-6">
          <label htmlFor="medicines">
            <h6>Medicamentos</h6>
          </label>
          <textarea
            className="form-control"
            name="medicines"
            required={!currentUser}
            id="medicines"
            placeholder="Inclua os medicamentos de uso regular"
            value={formDatas.medicines.value}
            onChange={(event) => handleFormInputChange(event)}
          ></textarea>
        </div>

        {/* <!-- Contatos Emergência --> */}
        <div className="col-12 mt-3">
          <label className="my-1" htmlFor="emergencyContact">
            <h6>Contatos de Emergência</h6>
          </label>
          <p className="mb-1">
            <small>
              Mais de um é sempre bom! Pode relacionar em nome, telefone e grau
              de parentesco :D
            </small>
          </p>
          <textarea
            className="form-control"
            name="emergencyContact"
            required={!currentUser}
            id="emergencyContact"
            placeholder="É em caso de segurança, caso você algum dia - tomara que não, mas pode acontecer - tenha dor de barriga em um evento ou algo do tipo!"
            value={formDatas.emergencyContact.value}
            onChange={(event) => handleFormInputChange(event)}
          ></textarea>
        </div>
      </div>

      {/* <!-- Tipo Sanguíneo --> */}
      <h6 className="mt-3 mb-2">Tipo Sanguíneo</h6>
      <div className="row">
        <div className="col-sm-3 col-6">
          <input
            type="radio"
            name="bloodType"
            required={!currentUser}
            id="o-positive"
            value="o-positive"
            checked={formDatas.bloodType.value === "o-positive"}
            onChange={(event) => handleFormInputChange(event)}
          />
          <label htmlFor="o-positive">O+</label>
        </div>
        <div className="col-sm-3 col-6">
          <input
            type="radio"
            name="bloodType"
            required={!currentUser}
            id="o-negative"
            value="o-negative"
            checked={formDatas.bloodType.value === "o-negative"}
            onChange={(event) => handleFormInputChange(event)}
          />
          <label htmlFor="o-negative">O-</label>
        </div>
        <div className="col-sm-3 col-6">
          <input
            type="radio"
            name="bloodType"
            required={!currentUser}
            id="a-positive"
            value="a-positive"
            checked={formDatas.bloodType.value === "a-positive"}
            onChange={(event) => handleFormInputChange(event)}
          />
          <label htmlFor="a-positive">A+</label>
        </div>
        <div className="col-sm-3 col-6">
          <input
            type="radio"
            name="bloodType"
            required={!currentUser}
            id="a-negative"
            value="a-negative"
            checked={formDatas.bloodType.value === "a-negative"}
            onChange={(event) => handleFormInputChange(event)}
          />
          <label htmlFor="a-negative">A-</label>
        </div>
        <div className="col-sm-3 col-6">
          <input
            type="radio"
            name="bloodType"
            required={!currentUser}
            id="b-positive"
            value="b-positive"
            checked={formDatas.bloodType.value === "b-positive"}
            onChange={(event) => handleFormInputChange(event)}
          />
          <label htmlFor="b-positive">B+</label>
        </div>
        <div className="col-sm-3 col-6">
          <input
            type="radio"
            name="bloodType"
            required={!currentUser}
            id="b-negative"
            value="b-negative"
            checked={formDatas.bloodType.value === "b-negative"}
            onChange={(event) => handleFormInputChange(event)}
          />
          <label htmlFor="b-negative">B-</label>
        </div>
        <div className="col-sm-3 col-6">
          <input
            type="radio"
            name="bloodType"
            required={!currentUser}
            id="ab-positive"
            value="ab-positive"
            checked={formDatas.bloodType.value === "ab-positive"}
            onChange={(event) => handleFormInputChange(event)}
          />
          <label htmlFor="ab-positive">AB+</label>
        </div>
        <div className="col-sm-3 col-6">
          <input
            type="radio"
            name="bloodType"
            required={!currentUser}
            id="ab-negatiive"
            value="ab-negatiive"
            checked={formDatas.bloodType.value === "ab-negatiive"}
            onChange={(event) => handleFormInputChange(event)}
          />
          <label htmlFor="ab-negatiive">AB-</label>
        </div>
      </div>

      {/* <!-- Fuma --> */}
      <h6 className="mt-3 mb-2">Fuma</h6>
      <div>
        <input
          type="radio"
          name="smoke"
          required={!currentUser}
          id="smokeY"
          value="smokeY"
          checked={formDatas.smoke.value === "smokeY"}
          onChange={(event) => handleFormInputChange(event)}
        />
        <label htmlFor="smokeY">Sim</label>
      </div>
      <div>
        <input
          type="radio"
          name="smoke"
          required={!currentUser}
          id="smokeN"
          value="smokeN"
          checked={formDatas.smoke.value === "smokeN"}
          onChange={(event) => handleFormInputChange(event)}
        />
        <label htmlFor="smokeN">Não</label>
      </div>

      {/* <!-- Bebe --> */}
      <h6 className="mt-3 mb-2">Bebe</h6>
      <div>
        <input
          type="radio"
          name="drink"
          required={!currentUser}
          id="drinkY"
          value="drinkY"
          checked={formDatas.drink.value === "drinkY"}
          onChange={(event) => handleFormInputChange(event)}
        />
        <label htmlFor="drinkY">Sim</label>
      </div>
      <div>
        <input
          type="radio"
          name="drink"
          required={!currentUser}
          id="drinkN"
          value="drinkN"
          checked={formDatas.drink.value === "drinkN"}
          onChange={(event) => handleFormInputChange(event)}
        />
        <label htmlFor="drinkN">Não</label>
      </div>

      {/* <!-- Atividades Físicas --> */}
      <h6 className="mt-3 mb-2">Atividades Físicas</h6>
      <div>
        <input
          type="radio"
          name="exercises"
          required={!currentUser}
          id="sedentary"
          value="sedentary"
          checked={formDatas.exercises.value === "sedentary"}
          onChange={(event) => handleFormInputChange(event)}
        />
        <label htmlFor="sedentary">Sedentário</label>
      </div>
      <div>
        <input
          type="radio"
          name="exercises"
          required={!currentUser}
          id="regular"
          value="regular"
          checked={formDatas.exercises.value === "regular"}
          onChange={(event) => handleFormInputChange(event)}
        />
        <label htmlFor="regular">Exercícios Regulares</label>
      </div>
      <div>
        <input
          type="radio"
          name="exercises"
          required={!currentUser}
          id="intense"
          value="intense"
          checked={formDatas.exercises.value === "intense"}
          onChange={(event) => handleFormInputChange(event)}
        />
        <label htmlFor="intense">Exercícios intensos</label>
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

export default connect(mapStateToProps, mapDispatchToProps)(Health);