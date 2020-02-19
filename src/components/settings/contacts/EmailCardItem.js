import React, {
  useState,
  Fragment,
  useContext,
  useEffect,
  useCallback
} from "react";
import { Icon, List, Popup } from "semantic-ui-react";
import ConfirmDeleteEmail from "./ConfirmDeleteEmail";
import { useFetch } from "../../../hooks/useFetch";
import { AuthContext } from "../../../context/auth/auth-context";

const EmailCardItem = ({ email }) => {
  const { currentUser, deleteEmail, users } = useContext(AuthContext);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPopup, setIsPopup] = useState(true);
  const [{ response, isLoading }, doFetch] = useFetch();

  const closeConfirm = () => {
    setIsPopup(true);
    setShowConfirm(false);
  };
  const openConfirm = () => {
    setIsPopup(false);
    setShowConfirm(true);
  };

  const handleDeleteEmail = useCallback(() => {
    deleteEmail({ users, email, currentUser });
  }, [users, deleteEmail, email, currentUser]);

  useEffect(() => {
    if (!response) return;
    handleDeleteEmail();
  }, [response, deleteEmail, handleDeleteEmail]);

  const handleDelete = () => {
    const data = {
      email,
      refKey: currentUser.Ref_Key
    };
    closeConfirm();
    doFetch({ url: "api/settings", method: "PATCH", data });
  };

  return (
    <Fragment>
      <div className="email-card-item-wrapper">
        <div className="email-text-content">
          <Icon name="mail" className="email-icon" />
          <div className="email-text">{email}</div>
        </div>
        {isPopup && (
          <Popup
            content={`Видалення електронної пошти ${email}.`}
            trigger={
              <List.Icon
                loading={isLoading}
                disabled={isLoading}
                name="delete"
                className="email-delete-icon"
                onClick={openConfirm}
              />
            }
          />
        )}
        {!isPopup && (
          <List.Icon
            loading={isLoading}
            disabled={isLoading}
            name="delete"
            className="email-delete-icon"
            onClick={openConfirm}
          />
        )}
      </div>
      <ConfirmDeleteEmail
        open={showConfirm}
        closeConfirm={closeConfirm}
        handleDelete={handleDelete}
      />
    </Fragment>
  );
};

export default EmailCardItem;
