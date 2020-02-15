import React from "react";
import { Modal, Header, List, Message, Icon } from "semantic-ui-react";
import moment from "moment";
import "moment/locale/uk";
import "./BillsModalList.css";
import { calculateBills } from "../../../../utils/calculate-bills";
moment.locale("uk");

const BillsModalList = ({
  showModal,
  onCloseModal,
  number,
  startDate,
  endDate,
  billsList
}) => {
  return (
    <Modal
      open={showModal}
      onClose={onCloseModal}
      closeIcon
      closeOnDimmerClick={false}
    >
      <Header className="bills-modal-header segment-no-border">
        <Icon name="list ol" style={{ marginRight: "0.5em" }} />
        <div>
          <div>{`Cписок платежів по угоді ${number}`}</div>
          <div>{`з ${moment(startDate).format("LL")} по ${moment(
            endDate
          ).format("LL")}`}</div>
        </div>
      </Header>
      <div className="bills-header">
        <div>№</div>
        <div>Дата</div>
        <div>Сума</div>
      </div>
      <Modal.Content scrolling style={{ maxHeight: "50vh" }}>
        <List>
          {billsList &&
            billsList.Result &&
            billsList.Result.map((item, idx) => (
              <div className="bills-modal-list-item" key={idx}>
                <div style={{ width: "33%" }}>{idx + 1}</div>
                <div style={{ width: "33%", textAlign: "center" }}>
                  {moment(item.date).format("L")}
                </div>
                <div style={{ width: "33%", textAlign: "right" }}>
                  {item.sum} грн.
                </div>
              </div>
            ))}
        </List>
      </Modal.Content>
      <div style={{ textAlign: "left", padding: "1rem 1.5rem" }}>
        <Message success>
          <Icon name="warning circle" />
          Загальна сума <strong>{calculateBills(billsList)} грн.</strong>
        </Message>
      </div>
    </Modal>
  );
};

export default BillsModalList;
