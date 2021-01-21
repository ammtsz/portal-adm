import React from "react";
import "./form-sections.styles.scss";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectFormDatas } from "../../redux/form/form.selectors";
import { handleFormInputChangeAction } from "../../redux/form/form.actions";

const WhatsappGroups = ({ handleFormInputChange, formDatas }) => {
  return (
    <section className="form__section">
      <h6>Grupos do WhatsApp</h6>
      {/* <!-- Grupo Geral --> */}
      <p className="mb-1 mt-3">
        Você aceita ser colocado no <strong>GRUPO GERAL</strong> da Comissão no
        WhatsApp? Lá conversamos bastante sobre diversos assuntos, interagimos,
        compartilhamos coisas legais =D.
      </p>
      <div>
        <input
          type="radio"
          name="whatsAppGroup"
          id="whatsAppY"
          required
          value="whatsAppY"
          checked={formDatas.whatsAppGroup.value === "whatsAppY"}
          onChange={(event) => handleFormInputChange(event)}
        />
        <label htmlFor="whatsAppY">Sim</label>
      </div>
      <div>
        <input
          type="radio"
          name="whatsAppGroup"
          id="whatsAppN"
          required
          value="whatsAppN"
          checked={formDatas.whatsAppGroup.value === "whatsAppN"}
          onChange={(event) => handleFormInputChange(event)}
        />
        <label htmlFor="whatsAppN">Não</label>
      </div>

      {/* <!-- Grupo de Informações --> */}
      <p className="mb-1 mt-3">
        Você aceita ser colocado (a) no <strong>GRUPO DE INFORMAÇÕES</strong> da
        Comissão no WhatsApp? Lá só é enviado informações de eventos, e é
        proibido bater papo!
      </p>
      <div>
        <input
          type="radio"
          name="whatsAppInfos"
          id="infosY"
          required
          value="infosY"
          checked={formDatas.whatsAppInfos.value === "infosY"}
          onChange={(event) => handleFormInputChange(event)}
        />
        <label htmlFor="infosY">Sim</label>
      </div>
      <div>
        <input
          type="radio"
          name="whatsAppInfos"
          id="infosN"
          required
          value="infosN"
          checked={formDatas.whatsAppInfos.value === "infosN"}
          onChange={(event) => handleFormInputChange(event)}
        />
        <label htmlFor="infosN">Não</label>
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

export default connect(mapStateToProps, mapDispatchToProps)(WhatsappGroups);
