import React, { useContext, useState } from "react";
import { ContractsContext } from "../../context/contracts/contracts-context";
import { Redirect } from "react-router-dom";
import useRedirect from "../../hooks/useRedirect";
import { Card, Form, Message } from "semantic-ui-react";
import { AuthContext } from "../../context/auth/auth-context";

import "./Privat.css";
import FormInputField from "../../components/contracts/privat/FormInputField/FormnputField";
import PrivatCardContent from "../../components/contracts/privat/PrivatCardContent/PrivatCardContent";
import PrivatMessage from "../../components/contracts/privat/PrivatMessage/PrivatMessage";
const Privat = props => {
  const redirect = useRedirect();
  const { currentContract } = useContext(ContractsContext);
  const { currentUser } = useContext(AuthContext);

  const [isCopy, setIsCopy] = useState(null);

  const handleDismiss = () => setIsCopy(null);

  if (redirect || !currentContract) {
    return <Redirect to="/" />;
  }

  return (
    <Card fluid>
      <PrivatCardContent currentContract={currentContract} {...props} />
      <Form>
        <div className="privat-content">
          {isCopy && (
            <Message
              onDismiss={handleDismiss}
              content={isCopy}
              icon="check"
              info
              className="privat-copy_to_buffer-info_text"
            />
          )}
          <FormInputField
            name="Номер рахунку"
            value={currentContract.iban}
            setIsCopy={setIsCopy}
          />
          <FormInputField
            name="ЄДРПОУ"
            value={currentContract.edrpou}
            setIsCopy={setIsCopy}
          />
          <FormInputField
            name="Номер угоди"
            value={currentContract.number}
            setIsCopy={setIsCopy}
          />
          <FormInputField
            name="Одержувач"
            value={currentContract.orgName}
            setIsCopy={setIsCopy}
          />
          <FormInputField
            setIsCopy={setIsCopy}
            textarea
            name="Призначення"
            value={`P24. ${currentUser.fullname}. За послуги охорони по угоді ${currentContract.number}. Key: ${currentContract.Ref_Key}`}
          />
          <PrivatMessage />
        </div>
      </Form>
    </Card>
  );
};

export default Privat;
