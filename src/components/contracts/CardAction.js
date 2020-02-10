import React from "react";
import { Card, Button } from "semantic-ui-react";
import useMediaQuery from "react-use-media-query-hook";

const ContractCardAction = () => {
  const isMobile = useMediaQuery("(max-width: 550px)");
  return (
    <Card.Content extra>
      {isMobile && (
        <div className="ui two buttons">
          <Button color="green" basic>
            Сплатити{" "}
          </Button>
        </div>
      )}
      {!isMobile && (
        <div className="pay-button-content">
          <Button color="green" className="pay-button">
            Сплатити{" "}
          </Button>
        </div>
      )}
    </Card.Content>
  );
};

export default ContractCardAction;
