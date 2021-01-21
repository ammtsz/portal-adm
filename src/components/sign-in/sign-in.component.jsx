import React, { useState } from "react";
import "./sign-in.styles.scss";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../button-custom/button-custom.component";
import ButtonSwitch from "../button-switch/button-switch.component";
import FormErrorMessage from "../form-error-message/form-error-message.component";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  setPersistenceAction,
  emailSignInAction,
} from "../../redux/currentUser/current-user.actions";
import {
  selectPersistence,
  selectAuthError,
} from "../../redux/currentUser/current-user.selectors";

const SignIn = ({
  newAccount,
  persistence,
  setPersistence,
  error,
  emailSignIn,
}) => {
  const [signInDatas, setSignInDatas] = useState({
    email: "",
    password: "",
  });
  const { email, password } = signInDatas;

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setSignInDatas({ ...signInDatas, [name]: value });
  };

  return (
    <form
      className="login__signin"
      onSubmit={(event) => {
        event.preventDefault();
        emailSignIn({ email, password });
      }}
    >
      <FormInput
        label={<i className="far fa-envelope"></i>}
        name="email"
        type="text"
        id="login-user"
        placeholder="Email"
        handleChange={(event) => handleChange(event)}
      />
      <FormInput
        label={<i className="fas fa-lock"></i>}
        name="password"
        type="password"
        id="login-password"
        placeholder="Senha"
        handleChange={(event) => handleChange(event)}
      />

      <FormErrorMessage
        error={error}
        message={
          error === "auth/invalid-email" || error === "auth/user-not-found"
            ? "email e/ou senha inválidos"
            : "Error ao logar. Tente novamente mais tarde."
        }
      />

      <div className="login__signin--help">
        <div className="login__signin--remind   form-check form-check-inline">
          {
            // if checked it will set Persistence.LOCAL - requires logout to reset the state
            // if unchecked it will set Persistence.SESSION - does a logout after leaving the page
          }
          <ButtonSwitch
            label="salvar usuário"
            className="form-check-input"
            id="signin"
            checked={persistence}
            onChange={(event) => setPersistence(event.target.checked)}
          />
        </div>

        {
          //forgot my password - it does nothing for now
        }
        <span className="login__signin--forget-password">esqueci a senha</span>
      </div>

      <CustomButton primary display="Entrar" path="/" type="submit" />

      <CustomButton
        disabled
        display="Criar Conta"
        type="button"
        handleClick={() => {
          newAccount();
        }}
      />
      <FormErrorMessage
        error={true}
        message="*utilize user@email.com, senha: 123456, para acessar o portal"
      />
    </form>
  );
};

const mapStateToProps = createStructuredSelector({
  persistence: selectPersistence,
  error: selectAuthError,
});
const mapDispatchToProps = (dispatch) => ({
  setPersistence: (data) => dispatch(setPersistenceAction(data)),
  emailSignIn: (data) => dispatch(emailSignInAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
