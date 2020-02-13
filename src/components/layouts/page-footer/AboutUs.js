import React from "react";
import { Modal, List, Header } from "semantic-ui-react";

const AboutUs = ({ open, onClose, data }) => {
  return (
    <Modal open={open} onClose={onClose} closeIcon closeOnDimmerClick={false}>
      <Header icon="list ol" content={`Групи компаній "Явір-2000"`} />
      <Modal.Content scrolling>
        <List>
          {data &&
            data.map(item => (
              <List.Item
                key={item.position_agreement}
              >{`${item.position_agreement}. ${item.text_agreement}`}</List.Item>
            ))}
        </List>
      </Modal.Content>
    </Modal>
  );
};

export default AboutUs;
