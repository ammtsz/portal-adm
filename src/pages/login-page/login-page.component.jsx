import React, { useState } from "react";
import "./login-page.styles.scss";

import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

const Login = () => {

  // if there is no sign up option, newAccount state can be disconsidered, it will always gonna be false
  const [newAccount, setNewAccount] = useState(false);

  const isNewAccount = () => {
    setNewAccount(!newAccount);
  };

  return (
    <div className="login_">
      <div className="turbulence__background">
      {
        //water effect
      }
        <div className="turbulence__water">
          <svg>
            <filter id="turbulence" x="0" y="0" width="100%" height="100%">
              <feTurbulence
                id="water"
                numOctaves="10"
                seed="1"
                stitchTiles="noStitch"
                baseFrequency="0.1 0.1"
              ></feTurbulence>
              <feDisplacementMap
                scale="20"
                in="SourceGraphic"
              ></feDisplacementMap>
              <animate
                href="#water"
                attributeName="baseFrequency"
                dur="60s"
                keyTimes="0;0.5;1"
                values="0.02 0.06;0.04 0.08;0.02 0.06"
                repeatCount="indefinite"
              />
            </filter>
          </svg>
        </div>
      </div>

      
      <div className="login__gradient">
        <section className="login__box">
          {
            //if newAccount state is false, it shows signIn form
            !newAccount ? (
            <div className="login__cbox--content">
            
              <h3 className="login__title">Login</h3>
              <SignIn newAccount={isNewAccount} />
            </div>
          ) : (

            //if newAccount state is true, it shows signUp form (which is disabled)
            <div className="login__cbox--content">
            
              <h3 className="login__title">Cadastro</h3>
              <SignUp newAccount={isNewAccount} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Login;
