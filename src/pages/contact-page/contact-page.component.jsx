import React from "react";
import "./contact-page.styles.scss";

import userImage from "../../assets/profile.png";

const Contact = () => {
  return (
    <section className="contact__container">
      <section className="contact__people">
        <h3 className="contact__people--message">
          Cillum incididunt dolor cupidatat adipisicing pariatur aute et commodo
          laborum.
        </h3>
        <article className="contact__people--card">
          <img src={userImage} alt="..." height="128" />
          <h4>Nome do Contato</h4>
          <p>área</p>
        </article>
        <article className="contact__people--card">
        <img src={userImage} alt="..." height="128" />
          <h4>Nome do Contato</h4>
          <p>área</p>
        </article>
        <article className="contact__people--card">
        <img src={userImage} alt="..." height="128" />
          <h4>Nome do Contato</h4>
          <p>área</p>
        </article>
      </section>

      <section className="contact__contacts">
        <div className="contact__contacts--container">
          <div className="contact__contacts--info">
              <i className="fab fa-whatsapp"></i>
              <span>(11) 9 9999-9999</span>
          </div>
          <div className="contact__contacts--info">
              <i className="far fa-envelope"></i>    
              <span>contact@email.com</span>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Contact;
