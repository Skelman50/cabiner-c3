import React from "react";
import { Card, Form, Button } from "semantic-ui-react";

const ConfirmForm = ({ value, setValue, loading, onSubmit, error }) => {
  return (
    <Card.Content>
      <Form onSubmit={onSubmit} loading={loading}>
        <Form.Input
          type="password"
          label="Введіть старий пароль"
          icon="key"
          value={value}
          onChange={e => setValue(e.target.value)}
          iconPosition="left"
          autoFocus
          error={error && "Ви ввели невірний пароль!"}
        />
        <Button
          disabled={loading}
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
