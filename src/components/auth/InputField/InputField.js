import React, { Fragment } from "react";

import "./InputField.css";

const InputField = ({
  isPhone = false,
  isPassword = false,
  isPin = false,
  value,
  handleChange,
  timer = null,
  onClick = null,
  inputRef
}) => {
  const label = () => {
    if (isPhone) {
      return <label>Введіть свій верифікований номер телефону</label>;
    }
    if (isPassword) {
      return <label>Введіть свій пароль</label>;
    }
    if (isPin) {
      return <label>Введіть свій PIN</label>;
    }
  };

  const input = isPhone ? (
    <div className="login-input">
      <input
        ref={inputRef}
        placeholder="Телефон"
        value={value}
        onChange={handleChange}
      />
    </div>
  ) : (
    <Fragment>
      <div className="login-input">
        <input
          type={isPassword ? "password" : "number"}
          placeholder={isPassword ? "Пароль" : "PIN"}
          value={value}
          onChange={handleChange}
          ref={inputRef}
        />
      </div>
      {isPin && timer === 0 && (
        <div className="get-pin-again" onClick={onClick}>
          Отримати знову
        </div>
      )}
    </Fragment>
  );
  return (
    <Fragment>
      {label()}
      {input}
    </Fragment>
  );
};

export default InputField;
