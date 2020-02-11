import React from "react";
import { Card, Button } from "semantic-ui-react";
import useMediaQuery from "react-use-media-query-hook";

const ContractCardAction = ({ onClick }) => {
  const isMobile = useMediaQuery("(max-width: 550px)");
  return (
    <Card.Content extra>
      {isMobile && (
        <div className="ui two buttons">
          <Button primary onClick={onClick}>
            Сплатити{" "}
          </Button>
        </div>
      )}
      {!isMobile && (
        <div className="pay-button-content" onClick={onClick}>
          <Button primary className="pay-button">
            Сплатити{" "}
          </Button>
        </div>
      )}
    </Card.Content>
  );
};

export default ContractCardAction;
