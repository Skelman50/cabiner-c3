import React, { useState, useContext, useEffect } from "react";
import { Card, Header } from "semantic-ui-react";

import "./SettingsPassword.css";
import { useFetch } from "../../../hooks/useFetch";
import ConfirmForm from "../../../components/settings/password/ConfirmForm";
import MessageContent from "../../../components/settings/password/MessageContent";
import CardAction from "../../../components/settings/password/CardAction";
import { AuthContext } from "../../../context/auth/auth-context";
import EditForm from "../../../components/settings/password/EditForm";

const SettingsPassword = () => {
  const [type, setType] = useState(null);
  const [confirmResponse, doFetchConfirm] = useFetch();
  const [editResponse, doFetchEdit] = useFetch();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmError, setConfirmError] = useState(false);
  const { token } = useContext(AuthContext);

  const handleConfirmPassword = () => {
    const data = {
      password,
      isRoot: token
    };
    doFetchConfirm({ url: "api/auth/login", method: "POST", data });
  };

  const handleEditPassword = () => {
    const data = { password };
    doFetchEdit({
      url: "api/auth/changepassword",
      method: "POST",
      token,
      data
    });
  };

  useEffect(() => {
    if (!editResponse.response) return;
    if (editResponse.response.save) {
      setType("success");
      setPassword("");
      setConfirmPassword("");
    }
  }, [editResponse.response]);

  useEffect(() => {
    if (!confirmResponse.response) return;
    if (confirmResponse.response.passwordRes) {
      setPassword("");
      setConfirmError(false);
      setType("edit");
    }
    if (!confirmResponse.response.passwordRes) {
      setConfirmError(true);
    }
  }, [confirmResponse.response]);

  return (
    <Card fluid>
      <Header style={{ margin: "0" }}>
        <MessageContent type={type} />
      </Header>
      {type === "confirm" && (
        <ConfirmForm
          loading={confirmResponse.isLoading}
          value={password}
          setValue={setPassword}
          onSubmit={handleConfirmPassword}
          error={confirmError}
        />
      )}
      {type === "edit" && (
        <EditForm
          password={password}
          loading={editResponse.isLoading}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          setPassword={setPassword}
          onSubmit={handleEditPassword}
        />
      )}
      {(!type || type === "success") && (
        <CardAction setType={setType} type={type} />
      )}
    </Card>
  );
};

export default SettingsPassword;
