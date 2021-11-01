import React from "react";
import footer from "./footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__bg">
        <div className="footer__container container grid">
          <div>
            <h1 className="footer__title">Vaccine Passport</h1>
            <span className="footer__subtitle">
              Project from Vietnamese - German University
            </span>
          </div>
        </div>
        <p className="footer__copy">&#169; All right reserved</p>
      </div>
    </div>
  );
};

export default Footer;
