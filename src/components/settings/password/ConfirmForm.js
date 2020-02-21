import React from "react";
import { Card, Form, Button } from "semantic-ui-react";

const ConfirmForm = ({
  value,
  setValue,
  loading,
  onSubmit,
  error,
  disabled
}) => {
  return (
    <Card.Content>
      <Form onSubmit={onSubmit} loading={loading}>
        <Form.Input
          type="password"
          label="Пароль"
          icon="lock"
          placeholder="Введіть пароль"
          value={value}
          onChange={e => setValue(e.target.value)}
          iconPosition="left"
          autoFocus
          error={error && "Ви ввели невірний пароль!"}
        />
        <Button
          disabled={loading || disabled}
          type="submit"
          primary
          content="Надіслати"
          icon="send"
          floated="right"
        />
      </Form>
    </Card.Content>
  );
};

export default ConfirmForm;
