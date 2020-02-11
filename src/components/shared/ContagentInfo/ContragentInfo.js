import React, { useContext } from "react";
import "./ContagentInfo.css";
import { AuthContext } from "../../../context/auth/auth-context";

const ContagentInfo = () => {
  const { currentUser, users } = useContext(AuthContext);
  return (
    <div className="contragent-info-wrapper">
      <span className="center-text contragent-name">
        {currentUser ? currentUser.fullname : users[0].fullname}
      </span>
    </div>
  );
};

export default ContagentInfo;
