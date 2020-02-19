import React, { useContext, useEffect } from "react";
import { Message, Card, Header, Icon } from "semantic-ui-react";
import AddEmailForm from "../../../../components/settings/contacts/AddEmailForm";
import BackIcon from "../../../../components/shared/BackIcon/BackIcon";
import { useFetch } from "../../../../hooks/useFetch";
import { AuthContext } from "../../../../context/auth/auth-context";
import classNames from "classnames";

import "./AddEmail.css";

const AddEmail = ({ setAddEmail }) => {
  const [{ error, isLoading, response }, doFetch] = useFetch();
  const { currentUser } = useContext(AuthContext);

  const redirectTo = () => {
    setAddEmail(false);
  };

  useEffect(() => {}, [response]);

  const handleSubmit = (e, email) => {
    e.preventDefault();
    const data = { refKey: currentUser.Ref_Key, email };
    doFetch({ url: "api/email", method: "POST", data });
  };

  const messageClassName = classNames({
    "message-response": response,
    "message-without-response": !response
  });
  return (
    <Card fluid>
      <Header style={{ margin: "0" }}>
        {!error && (
          <Message info className={messageClassName}>
            <Icon name="info circle" />
            {!response && <span>Введіть свій Email</span>}
            {response && (
              <span className="response-text">
                Вам на пошту відправлене посилання для підвердження вашої пошти,
                яке буде діяти наступні 2 хвилини. Будь ласка, знайдіть це
                посилання та перейдіть за ним
              </span>
            )}
            <BackIcon
              redirectTo={redirectTo}
              margin={response ? "2.5em" : "0"}
              content="Повернутися до контактів"
            />
          </Message>
        )}
        {error && (
          <Message info style={{ paddingRight: "0.75em" }}>
            <Icon name="info circle" />
            <span>Помилка відправлення пошти. Спробуйте ще раз</span>
            <BackIcon
              redirectTo={redirectTo}
              content="Повернутися до контактів"
            />
          </Message>
        )}
      </Header>
      {!response && (
        <AddEmailForm isLoading={isLoading} handleSubmit={handleSubmit} />
      )}
    </Card>
  );
};

export default AddEmail;
