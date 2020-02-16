import React from "react";
import { Card, Form, Button } from "semantic-ui-react";

const EditForm = ({
  password,
  confirmPassword,
  setPassword,
  setConfirmPassword,
  onSubmit,
  loading
}) => {
  return (
    <Card.Content>
      <Form onSubmit={onSubmit} loading={loading}>
        <Form.Input
          type="password"
          label="Введіть новий пароль"
          icon="key"
          value={password}
          onChange={e => setPassword(e.target.value)}
          iconPosition="left"
          autoFocus
        />
        <Form.Input
          type="password"
          label="Підтвердіть новий пароль"
          icon="key"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          iconPosition="left"
        />
        <Button
          type="submit"
          disabled={loading}
          primary
          content="Надіслати"
          icon="send"
          floated="right"
        />
      </Form>
    </Card.Content>
  );
};

export default EditForm;
