import React, { forwardRef } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/uk";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "semantic-ui-react";
import "./BillsDatePickerContent.css";
registerLocale("uk", ptBR);

const CustomInputStart = forwardRef(({ value, onClick }, ref) => (
  <Button
    className="bills-datepicker-button"
    content={value}
    ref={ref}
    onClick={onClick}
    icon="calendar alternate"
    basic
    color="blue"
  />
));
const CustomInputEnd = forwardRef(({ value, onClick }, ref) => (
  <Button
    className="bills-datepicker-button"
    content={value}
    ref={ref}
    onClick={onClick}
    icon="calendar alternate"
    basic
    color="red"
  />
));
const BillsDatePickerContent = ({ date, handleChange, label, end = false }) => {
  return (
    <div className="bills-datepicker-content">
      <div className="bills-datepicker-label">{label}</div>
      <DatePicker
        selected={date}
        onChange={handleChange}
        customInput={end ? <CustomInputEnd /> : <CustomInputStart />}
        dateFormat="dd MMMM yyyy"
        locale="uk"
        withPortal
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        minDate={new Date(2015, 0, 1, 0, 0, 0, 0)}
        maxDate={new Date()}
      />
    </div>
  );
};

export default BillsDatePickerContent;
