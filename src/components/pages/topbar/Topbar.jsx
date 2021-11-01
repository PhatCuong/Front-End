import React from "react";
import Home from "../home/Home";
import topbar from "./topbar.scss";
import { HashLink } from "react-router-hash-link";
import { Icon, Container } from "semantic-ui-react";

const Topbar = () => {
  return (
    <div className="header">
      <div className="header__nav">
        <div
          className="header__nav-item"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <Icon name="home" /> Home
        </div>

        <div className="header__nav-item">
          <HashLink to="../#vaccine-status">
            <Icon name="medkit" />
            Vaccinate Status
          </HashLink>
        </div>

        <div classNameName="header__nav-item">
          <HashLink to="../#contact">
            <Icon name="emergency" /> Emergency Contact
          </HashLink>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
