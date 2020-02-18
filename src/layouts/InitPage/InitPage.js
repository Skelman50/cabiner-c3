import React from "react";
import "./InitPage.css";
import logo from "../../assets/images/yavir.png";

const InitPage = () => {
  return (
    <div className="init-page">
      <img src={logo} alt="logo" />
      <div>Зачекайте. Йде завантаження додатку...</div>
    </div>
  );
};

export default InitPage;
