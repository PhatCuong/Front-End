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
              A project from Vietnamese - German University
            </span>
          </div>
          <div>
            <i
              className="footer__icon"
              class="location arrow icon "
              style={{ color: "white", marginLeft: "15%", marginTop: "10px" }}
              i
            />
            <span className="footer__subtitle" style={{ marginLeft: "10px" }}>
              Le Lai, Hoa Phu ward, Thu Dau Mot city, Binh Duong province.
            </span>
          </div>

          <div>
            <i
              className="footer__icon"
              class="envelope outline icon"
              style={{ color: "white", marginLeft: "15%", marginTop: "10px" }}
              i
            />
            <span className="footer__subtitle" style={{ marginLeft: "10px" }}>
              14155@student.vgu.edu.vn
            </span>
          </div>

          <div>
            <i
              className="footer__icon"
              class="phone icon"
              style={{ color: "white", marginLeft: "15%", marginTop: "10px" }}
              i
            />
            <span className="footer__subtitle" style={{ marginLeft: "10px" }}>
              +84 947 777 397
            </span>
          </div>
        </div>
        <p className="footer__copy">&#169; All right reserved</p>
      </div>
    </div>
  );
};

export default Footer;
