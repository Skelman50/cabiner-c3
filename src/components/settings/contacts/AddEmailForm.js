import React, { useState } from "react";
import { Card, Form, Button } from "semantic-ui-react";
import { validateEmail } from "../../../utils/inputs-validation";

const AddEmailForm = ({ isLoading, handleSubmit }) => {
  const [email, setEmail] = useState("");
  const [isFocus, setIsFocus] = useState(true);

  const validationError =
    !isFocus && !validateEmail(email) && "Введіть правильний email";
  return (
    <Card.Content>
      <Form loading={isLoading} onSubmit={e => handleSubmit(e, email)}>
        <Form.Input
          type="email"
          label="Введіть свій email"
          icon="mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          iconPosition="left"
          autoFocus
          error={validationError}
          onBlur={() => setIsFocus(false)}
        />
        <Button
          type="submit"
          primary
          content="Надіслати"
          icon="send"
          floated="right"
          disabled={!validateEmail(email) || isLoading}
        />
      </Form>
    </Card.Content>
  );
};

export default AddEmailForm;
