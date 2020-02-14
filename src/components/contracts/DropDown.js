import React, {
  useState,
  useContext,
  useEffect,
  Fragment,
  useCallback
} from "react";
import { Dropdown, Segment } from "semantic-ui-react";
import ObjectsList from "./objects/ObjectsList";
import { AuthContext } from "../../context/auth/auth-context";
import { domain } from "../../config/config";
import { useFetch } from "../../hooks/useFetch";
import ErrorMessage from "../shared/ErrorMessage/ErrorMessage";
import ContractSettings from "./settings/Settings";

const ContractDropDown = ({ contract, setUpdated }) => {
  const [openModalObjects, setOpenModalObjects] = useState(false);
  const [openModalSettings, setOpenModalSettings] = useState(false);
  const [objectResponse, doFetchObjects] = useFetch();
  const [settingsResponse, doFetchSettings] = useFetch();
  const { token } = useContext(AuthContext);

  const closeModalObjects = () => setOpenModalObjects(false);
  const closeModalSettings = useCallback(() => {
    setOpenModalSettings(false);
  }, []);

  const fetchObjects = () => {
    doFetchObjects({
      token,
      url: "api/objects",
      method: "POST",
      data: { Ref_Key: contract.Ref_Key }
    });
  };

  const fetchSettings = () => {
    doFetchSettings({
      token,
      url: "api/settings/contractsetting",
      method: "POST",
      data: { refKey: contract.Ref_Key }
    });
  };

  useEffect(() => {
    if (!objectResponse.response) return;
    setOpenModalObjects(true);
  }, [objectResponse.response]);

  useEffect(() => {
    if (!settingsResponse.response) return;
    setOpenModalSettings(true);
  }, [settingsResponse.response]);

  const param = token.replace("Bearer ", "");
  return (
    <Fragment>
      {(objectResponse.error || settingsResponse.error) && (
        <ErrorMessage
          error={"Помилка завантаження об'єктів охорони. Спробуйте ще раз!"}
        />
      )}
      <Segment
        as="div"
        floated="right"
        className="segment-no-border no-padding"
      >
        <Dropdown
          text="Опції"
          loading={objectResponse.isLoading || settingsResponse.isLoading}
          disabled={objectResponse.isLoading || settingsResponse.isLoading}
        >
          <Dropdown.Menu style={{ left: "-125px" }}>
            <Dropdown.Item
              text="Налаштування"
              icon="setting"
              onClick={fetchSettings}
            />
            <Dropdown.Item
              text="Переглянуты об'єкти"
              icon="building"
              onClick={fetchObjects}
            />
            <Dropdown.Item
              text="Угоди"
              icon="file pdf"
              onClick={() => {
                window.open(
                  `${domain}file/getbill/${contract.Ref_Key}?&&param=${param}`
                );
              }}
            />
            <Dropdown.Item
              text="Акти"
              icon="file pdf"
              onClick={() => {
                window.open(
                  `${domain}file/getact/${contract.Ref_Key}?&&param=${param}`
                );
              }}
            />
          </Dropdown.Menu>
        </Dropdown>
        <ObjectsList
          open={openModalObjects}
          onClose={closeModalObjects}
          objects={objectResponse.response && objectResponse.response.Result}
          contractNumber={contract.number}
        />
        <ContractSettings
          open={openModalSettings}
          onClose={closeModalSettings}
          contract={contract}
          data={settingsResponse && settingsResponse.response}
          setUpdated={setUpdated}
        />
      </Segment>
    </Fragment>
  );
};

export default ContractDropDown;
