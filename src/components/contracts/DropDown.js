import React, { useState, useContext } from "react";
import { Dropdown, Segment } from "semantic-ui-react";
import ObjectsList from "./objects/ObjectsList";
import { request } from "../../utils/request";
import { AuthContext } from "../../context/auth/auth-context";

const ContractDropDown = ({ contract }) => {
  const [loading, setLoading] = useState(false);
  const [objects, setObjects] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const { token } = useContext(AuthContext);

  const closeModal = () => setOpenModal(false);
  const fetchObjects = async () => {
    setLoading(true);
    const token = localStorage.getItem("auth");
    try {
      const response = await request({
        token,
        url: "loadobjects",
        method: "POST",
        data: { Ref_Key: contract.Ref_Key }
      });
      if (
        response.data.response &&
        response.data.response.Result &&
        !response.data.response.Error
      ) {
        setObjects(response.data.response.Result);
        setOpenModal(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const param = token.replace("Bearer ", "");
  return (
    <Segment as="div" floated="right" className="segment-no-border no-padding">
      <Dropdown text="Опції" loading={loading} disabled={loading}>
        <Dropdown.Menu style={{ left: "-125px" }}>
          <Dropdown.Item text="Налаштування" icon="setting" />
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
                `https://cab.yavir2000.com/yavir2000/file/getbill/${contract.Ref_Key}?&&param=${param}`
              );
            }}
          />
          <Dropdown.Item
            text="Акти"
            icon="file pdf"
            onClick={() => {
              window.open(
                `https://cab.yavir2000.com/yavir2000/file/getact/${contract.Ref_Key}?&&param=${param}`
              );
            }}
          />
        </Dropdown.Menu>
      </Dropdown>
      <ObjectsList
        open={openModal}
        onClose={closeModal}
        objects={objects}
        contractNumber={contract.number}
      />
    </Segment>
  );
};

export default ContractDropDown;
