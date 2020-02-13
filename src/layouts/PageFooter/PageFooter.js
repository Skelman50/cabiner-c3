import React, { useState, useEffect } from "react";
import { Segment, Image, Icon } from "semantic-ui-react";

import mastercard from "../../assets/images/mastercard.png";
import visa from "../../assets/images/visa.svg";
import privat from "../../assets/images/privat24.svg";

import "./PageFooter.css";
import AboutUs from "../../components/layouts/page-footer/AboutUs";
import { useFetch } from "../../hooks/useFetch";

const PageFooter = () => {
  const [open, setOpen] = useState(false);

  const [{ response, isLoading }, doFetch] = useFetch();

  const handleOpenOrg = () => {
    doFetch({ url: "api/liqpay/organizations" });
  };

  useEffect(() => {
    if (!response) return;
    setOpen(true);
  }, [response]);

  const onClose = () => setOpen(false);
  return (
    <Segment inverted className="segment-no-border no-radius main-footer">
      <div className="footer">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Segment
            className="footer-info-content top no-padding segment-no-border"
            onClick={handleOpenOrg}
            loading={isLoading}
            disabled={isLoading}
          >
            <Icon name="question circle" /> Про нас
          </Segment>
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
      <AboutUs
        open={open}
        onClose={onClose}
        data={response && response.organizations}
      />
    </Segment>
  );
};

export default PageFooter;
