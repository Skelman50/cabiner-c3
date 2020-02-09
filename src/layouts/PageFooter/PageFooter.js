import React from "react";
import { Segment, Image, Icon } from "semantic-ui-react";

import mastercard from "../../assets/images/mastercard.png";
import visa from "../../assets/images/visa.svg";
import privat from "../../assets/images/privat24.svg";

import "./PageFooter.css";

const PageFooter = () => {
  return (
    <Segment inverted className="segment-no-border no-radius main-footer">
      <div className="footer">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span className="footer-info-content top">
            <Icon name="question circle" /> Про нас
          </span>
          <span className="footer-info-content bottom">
            <Icon name="clipboard list" />
            Угода користувача
          </span>
        </div>
        <div className="footer-images-content">
          <Image src={mastercard} alt="" className="pay-image" />
          <Image
            src={visa}
            alt=""
            className="pay-image"
            style={{ margin: "0 0.25em" }}
          />
          <Image src={privat} alt="" className="pay-image" />
        </div>
      </div>
    </Segment>
  );
};

export default PageFooter;
