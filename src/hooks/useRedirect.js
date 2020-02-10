import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../context/auth/auth-context";

const useRedirect = () => {
  const { currentUser } = useContext(AuthContext);

  const [redirect, setRedirect] = useState(false);

  const currentUserRef = useRef(currentUser);

  useEffect(() => {
    if (currentUserRef.current !== currentUser) {
      setRedirect(true);
    }
  }, [currentUser]);

  return redirect;
};

export default useRedirect;
