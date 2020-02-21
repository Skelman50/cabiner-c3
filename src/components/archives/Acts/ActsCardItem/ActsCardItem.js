import React, { forwardRef, useState, useContext } from "react";
import { Card } from "semantic-ui-react";
import ContractContent from "../../../shared/ContractContent/ContractContent";
import DatePicker, { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/uk";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "semantic-ui-react";
import { setValue } from "../../../../utils/set-value";

import "./ActsCardItem.css";
import { AuthContext } from "../../../../context/auth/auth-context";
import { getIsoTime } from "../../../../utils/iso-time";

registerLocale("uk", ptBR);

const CustomInput = forwardRef(({ value, onClick }, ref) => {
  return (
    <Button
      className="acts-datepicker-button"
      content={setValue(value)}
      ref={ref}
      onClick={onClick}
      icon="calendar alternate"
      basic
      color="blue"
    />
  );
});

const ActCardItem = ({ contract }) => {
  const { token } = useContext(AuthContext);
  const [date, setDate] = useState(new Date());
  const handleChangeDate = date => {
    setDate(date);
  };

  const getPdf = url => {
    const key = contract.Ref_Key;
    const [, param] = token.split(" ");
    const isoDate = getIsoTime(date);
    window.open(`
    https://cab.yavir2000.com/yavir2000/file/${url}/${key}?date=${isoDate}&&param=${param}`);
  };

  return (
    <Card fluid>
      <ContractContent contract={contract} />
      <div className="acts-datepicker-content">
        <div className="acts-datepicker-label">Оберіть архівний місяць</div>
        <DatePicker
          selected={date}
          onChange={handleChangeDate}
          customInput={<CustomInput />}
          dateFormat="MMMM yyyy"
          locale="uk"
          showMonthYearPicker
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          minDate={new Date(2015, 0, 1, 0, 0, 0, 0)}
          maxDate={new Date()}
        />
      </div>
      <div className="acts-card-item-actions">
        <Button
          className="archive-acts-button"
          primary
          content="Рахунок"
          icon="file pdf"
          onClick={() => getPdf("getbill")}
        />
        <Button
          className="archive-acts-button"
          primary
          content="Акт"
          icon="file pdf"
          onClick={() => getPdf("getact")}
        />
      </div>
    </Card>
  );
};

export default ActCardItem;
