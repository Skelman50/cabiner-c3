import React, { useState, useContext, useEffect } from "react";
import ContractContent from "../../../shared/ContractContent/ContractContent";
import { Card, Button, Message, Icon } from "semantic-ui-react";
import BillsDatePickerContent from "../BillsDatePickerContent/BillsDatePickerContent";

import "./BillsCardIten.css";
import { getIsoTime } from "../../../../utils/iso-time";
import { useFetch } from "../../../../hooks/useFetch";
import { AuthContext } from "../../../../context/auth/auth-context";
import BillsModalList from "../BillsModalList/BillsModalList";

const BillsCardItem = ({ contract }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { token } = useContext(AuthContext);

  const [{ response, isLoading }, doFetch] = useFetch();
  const [showError, setShowError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChangeStart = date => {
    setStartDate(date);
  };

  const handleChangeEnd = date => {
    setEndDate(date);
  };

  useEffect(() => {
    if (!response) return;
    if (response.Error) {
      setShowError(true);
    } else {
      setShowModal(true);
      setShowError(false);
    }
  }, [response, setShowError]);

  const handleClick = () => {
    const data = {
      Ref_Key: contract.Ref_Key,
      StartPeriod: getIsoTime(startDate),
      EndPeriod: getIsoTime(endDate)
    };
    doFetch({ url: "api/archives/bills", data, method: "POST", token });
  };

  const onDismiss = () => {
    setShowError(false);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Card fluid>
      <ContractContent contract={contract} />
      {showError && (
        <div style={{ padding: "0 1em 1em" }}>
          <Message
            style={{ maxWidth: "90%" }}
            error
            content={`За обраний період оплат не знайдено`}
            onDismiss={onDismiss}
          />
        </div>
      )}
      <div className="bills-card-content">
        <BillsDatePickerContent
          date={startDate}
          handleChange={handleChangeStart}
          label="Оберіть початкову дату"
        />
        <BillsDatePickerContent
          date={endDate}
          handleChange={handleChangeEnd}
          label="Оберіть кінцеву дату"
          end
        />
      </div>

      <div className="bills-card-actions">
        <Button
          disabled={isLoading}
          loading={isLoading}
          primary
          onClick={handleClick}
          floated="right"
        >
          Переглянути <Icon name="chevron right" />
        </Button>
      </div>
      <BillsModalList
        showModal={showModal}
        onCloseModal={onCloseModal}
        billsList={response}
        number={contract.number}
        startDate={startDate}
        endDate={endDate}
      />
    </Card>
  );
};

export default BillsCardItem;
