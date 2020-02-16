import React, { useContext, useState } from "react";
import { ContractsContext } from "../../context/contracts/contracts-context";
import { Redirect } from "react-router-dom";
import useRedirect from "../../hooks/useRedirect";
import { Card, Icon, Form, Message, Popup } from "semantic-ui-react";
import PaymentCardDescription from "../../components/shared/PaymentCardDescription/PaymentCardDescription";
import { AuthContext } from "../../context/auth/auth-context";

import "./Privat.css";
import FormInputField from "../../components/contracts/privat/FormInputField/FormnputField";
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
      <Card.Content>
        <Popup
          content="Повернутися до вибору типів оплати"
          trigger={
            <Icon
              className="icon-back"
              name="reply"
              onClick={() => props.history.push("/payments")}
            />
          }
        />

        <Card.Header className="center-text privat-payment-header">{`Реквізити для оплати по угоді ${currentContract.number}`}</Card.Header>
        <Card.Header
          className="center-text privat-payment-header"
          style={{ marginTop: "0.25em" }}
        >
          ("Приват24", "ПУМБ-online" і т.і.)
        </Card.Header>
        <PaymentCardDescription currentContract={currentContract} />
      </Card.Content>
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
          <Message warning className="privat-helper-text-content">
            <Icon name="warning circle" size="large" />
            <div>
              <div>У призначенні платежу міститься службова інформація.</div>
              <div>
                При внесенні змін, зарахування Вашого платежу може бути
                затримано на невизначений термін!
              </div>
            </div>
          </Message>
        </div>
      </Form>
    </Card>
  );
};

export default Privat;
