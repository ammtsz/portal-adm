// component disabled

import React, { useState } from "react";
import "./sing-up.styles.scss";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../button-custom/button-custom.component";
import FormErrorMessage from "../form-error-message/form-error-message.component";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  setAuthErrorAction,
  emailSignUpAction,
} from "../../redux/currentUser/current-user.actions";
import { selectAuthError } from "../../redux/currentUser/current-user.selectors";

const SignUp = ({ newAccount, error, setError, emailSignUp }) => {
  const [signUpDatas, setSignUpDatas] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { displayName, email, password, confirmPassword } = signUpDatas;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("passwords don't match");
      return;
    }
    emailSignUp({ email, password, displayName });
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setSignUpDatas({ ...signUpDatas, [name]: value });
  };

  return (
    <form className="login__signup" onSubmit={(event) => handleSubmit(event)}>
      <FormInput
        label={<i className="fas fa-user"></i>}
        type="text"
        id="login-user"
        placeholder="Nome"
        value={displayName}
        name="displayName"
        handleChange={(event) => handleChange(event)}
      />

      <FormInput
        label={<i className="far fa-envelope"></i>}
        type="email"
        id="login-email"
        placeholder="exemplo@email.com"
        value={email}
        name="email"
        handleChange={(event) => handleChange(event)}
      />

      <FormInput
        label={<i className="fas fa-lock"></i>}
        type="password"
        id="login-password"
        placeholder="Senha"
        value={password}
        name="password"
        handleChange={(event) => handleChange(event)}
      />

      <FormInput
        label={<i className="fas fa-lock"></i>}
        type="password"
        id="login-confirm-password"
        placeholder="Confirmar Senha"
        value={confirmPassword}
        name="confirmPassword"
        handleChange={(event) => handleChange(event)}
      />

      <FormErrorMessage
        error={error}
        message={
          error
            ? error === "passwords don't match"
              ? "A senha não confere"
              : error.code === "auth/email-already-in-use"
              ? "Email já cadastrado. Clique em 'Já tenho uma conta' para entrar"
              : "Erro ao cadastrar. Tente novamente."
            : ""
        }
      />

      <CustomButton
        primary
        display={"Criar Conta"}
        path={"/login"}
        type={"submit"}
      />
      <CustomButton
        primary={false}
        display={"Já tenho uma conta"}
        type={"button"}
        path={"/login"}
        handleClick={() => {
          newAccount();
        }}
      />
    </form>
  );
};

const mapStateToProps = createStructuredSelector({
  error: selectAuthError,
});
const mapDispatchToProps = (dispatch) => ({
  emailSignUp: (data) => dispatch(emailSignUpAction(data)),
  setError: (data) => dispatch(setAuthErrorAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
