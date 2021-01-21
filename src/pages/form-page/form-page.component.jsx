import React from "react";
import "./form-page.styles.scss";

import Form from "../../components/form/form.component";
import FormEdit from "../../components/form-edit/form-edit.component";

const FormPage = ({ edit }) => {
  return <section>{edit ? <FormEdit /> : <Form />}</section>;
};

export default FormPage;
