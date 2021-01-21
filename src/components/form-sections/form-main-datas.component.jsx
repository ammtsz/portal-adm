import React, { useState } from "react";
import "./form-sections.styles.scss";

import { connect } from "react-redux"
import {createStructuredSelector } from 'reselect'
import { selectFormDatas } from "../../redux/form/form.selectors"
import { handleFormInputChangeAction } from "../../redux/form/form.actions"


import {
  cpfValidation,
  formatPhoneNumber,
  formatCpf,
  getAge
} from "./form-sections.utils";

import FormErrorMessage from "../form-error-message/form-error-message.component";


const MainDatas = ({handleFormInputChange, formDatas}) => {

  const [cpfError, setcpfError] = useState(false);

  return (
    <section className="form__section">
      <div className="row">
        {/* <!-- nome --> */}
        <div className="col-lg-6 col-md-12 mt-3">
          <label htmlFor="name">Nome</label>
          <input
            className="form-control"
            type="text"
            name="name"
            id="name"
            required
            placeholder="Nome Completo"
            value={formDatas.name.value}
            onChange={(event) => handleFormInputChange(event)}
          />
        </div>
        {/* <!-- email --> */}
        <div className="col-lg-6 col-md-12 mt-3">
          <label htmlFor="email">Email</label>
          <input
            className="form-control"
            type="email"
            name="email"
            id="email"
            required
            value={formDatas.email.value}
            placeholder="exemplo@exemplo.com"
            onChange={(event) => handleFormInputChange(event)}
          />
        </div>
        {/* <!-- RG --> */}
        <div className="col-lg-3 col-md-6 mt-3">
          <label htmlFor="rg">RG</label>
          <input
            className="form-control"
            type="text"
            name="rg"
            id="rg"
            required
            value={formDatas.rg.value}
            placeholder="xx.xxx.xxx-x"
            onChange={(event) => handleFormInputChange(event)}
          />
        </div>
        {/* <!-- CPF -->*/}
        <div className="col-lg-3 col-md-6 mt-3">
          <label htmlFor="cpf">CPF</label>
          <input
            className="form-control"
            type="text"
            name="cpf"
            id="cpf"
            required
            value={formDatas.cpf.value}
            placeholder="xxx.xxx.xxx-xx"
            onChange={(event) =>
              handleFormInputChange(formatCpf(event.target.value))
            }
            onBlur={(event) => setcpfError(!cpfValidation(event.target.value))}
          />

          <FormErrorMessage error={cpfError} message="CPF inválido" />

        </div>
        {/* <!-- Nascimento --> */}
        <div className="col-lg-3 col-md-6 mt-3">
          <label htmlFor="birth">Data de Nascimento</label>
          <input
            className="form-control"
            type="date"
            name="birth"
            id="birth"
            required
            value={formDatas.birth.value}
            onBlur={event => handleFormInputChange(getAge(event.target.value))}
            onChange={event => {handleFormInputChange(event)}}
          />
        </div>
        {/* <!-- whatsapp --> */}
        <div className="col-lg-3 col-md-6 mt-3">
          <label htmlFor="phone">WhatsApp</label>
          <input
            className="form-control"
            type="tel"
            name="phone"
            id="phone"
            required
            value={formDatas.phone.value}
            placeholder="(ddd) x xxxx-xxxx"
            onChange={(event) =>
              handleFormInputChange(formatPhoneNumber(event.target.value))
            }
          />
        </div>
      </div>

      {/* // <!-- endereço --> */}
      <h6 className="mt-4">Endereço</h6>
      <div className="row mt-2 mb-5">
        {/* <!-- rua -->                 */}
        <div className="col-lg-7 col-md-12 mt-3">
          <input
            className="form-control"
            type="text"
            name="street"
            id="street"
            required
            value={formDatas.street.value}
            placeholder="Rua / Travessa / Avenida / Alameda"
            onChange={(event) => handleFormInputChange(event)}
          />
        </div>
        {/* <!-- número --> */}
        <div className="col-lg-2 col-md-3 col-sm-6 mt-3">
          <input
            className="form-control"
            type="text"
            name="number"
            id="number"
            required
            value={formDatas.number.value}
            placeholder="Número"
            onChange={(event) => handleFormInputChange(event)}
          />
        </div>
        {/* <!-- complemento --> */}
        <div className="col-lg-3 col-md-3 col-sm-6 mt-3">
          <input
            className="form-control"
            type="text"
            name="complement"
            id="complement"
            value={formDatas.complement.value}
            placeholder="Complemento"
            onChange={(event) => handleFormInputChange(event)}
          />
        </div>
        {/* <!-- bairro -->                 */}
        <div className="col-lg-5 col-md-6 mt-3">
          <input
            className="form-control"
            type="text"
            name="neighborhood"
            id="neighborhood"
            required
            value={formDatas.neighborhood.value}
            placeholder="Bairro"
            onChange={(event) => handleFormInputChange(event)}
          />
        </div>
        {/* <!-- cidade --> */}
        <div className="col-lg-4 col-md-6 mt-3">
          <input
            className="form-control"
            type="text"
            name="city"
            id="city"
            required
            value={formDatas.city.value}
            placeholder="Cidade"
            onChange={(event) => handleFormInputChange(event)}
          />
        </div>
        {/* <!-- estado --> */}
        <div className="col-lg-3 col-md-6 mt-3">
          <select
            className="form-control"
            name="state"
            id="state"
            required
            value={formDatas.state.value}
            onChange={(event) => handleFormInputChange(event)}
          >
            <option value=""> -- Estado -- </option>
            <option value="AC">AC</option>
            <option value="AL">AL</option>
            <option value="AP">AP</option>
            <option value="AM">AM</option>
            <option value="BA">BA</option>
            <option value="CE">CE</option>
            <option value="DF">DF</option>
            <option value="ES">ES</option>
            <option value="GO">GO</option>
            <option value="MA">MA</option>
            <option value="MT">MT</option>
            <option value="MS">MS</option>
            <option value="MG">MG</option>
            <option value="PA">PA</option>
            <option value="PB">PB</option>
            <option value="PR">PR</option>
            <option value="PE">PE</option>
            <option value="PI">PI</option>
            <option value="RJ">RJ</option>
            <option value="RN">RN</option>
            <option value="RS">RS</option>
            <option value="RO">RO</option>
            <option value="RR">RR</option>
            <option value="SC">SC</option>
            <option value="SP">SP</option>
            <option value="SE">SE</option>
            <option value="TO">TO</option>
          </select>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = createStructuredSelector({
  formDatas: selectFormDatas
})
const mapDispatchToProps = dispatch => ({
  handleFormInputChange: event => dispatch(handleFormInputChangeAction(event))
})

export default connect(mapStateToProps, mapDispatchToProps)(MainDatas);
