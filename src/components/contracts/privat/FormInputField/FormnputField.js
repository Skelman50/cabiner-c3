import React, { useState } from "react";
import { Icon } from "semantic-ui-react";

import { CopyToClipboard } from "react-copy-to-clipboard";

import "./FormInputField.css";

const FormInputField = ({ name, value, textarea = false, setIsCopy }) => {
  const [isOutline, setIsOutline] = useState(true);
  const copyToBuffer = () => {
    if (name === "Одержувач") {
      setIsCopy(`Назва одержувача скопійована!`);
      return;
    }
    setIsCopy(`${name} скопійовано!`);
  };
  return (
    <div>
      <label className="privat-input-label">{name}</label>
      <div className="privat-input-content">
        {!textarea && (
          <input
            className="segment-no-border privat-input"
            type="text"
            value={value}
            disabled
          />
        )}
        {textarea && (
          <textarea
            className="segment-no-border privat-input privat-textarea"
            value={value}
            rows="2"
            disabled
          />
        )}
        <CopyToClipboard text={value} onCopy={copyToBuffer}>
          <Icon
            name={isOutline ? "copy outline" : "copy"}
            className="copy-icon"
            size="large"
            onMouseOver={() => setIsOutline(false)}
            onMouseOut={() => setIsOutline(true)}
          />
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default FormInputField;
