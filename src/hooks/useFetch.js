import { useState, useEffect, useCallback, useContext } from "react";
import { domain } from "../config/config";
import { AuthContext } from "../context/auth/auth-context";
import { request } from "../utils/request";

export const useFetch = url => {
  const baseUrl = domain;
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});

  const { token } = useContext(AuthContext);

  const doFetch = useCallback(options => {
    setOptions(options);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    let isDestroy = false;
    if (!isLoading) return;
    request({ ...options, token })
      .then(response => {
        if (!response.data.Error || !response.data.error) {
          if (!isDestroy) {
            setResponse(response.data);
          }
        } else {
          if (isDestroy) {
            setError(true);
          }
        }
      })
      .catch(error => {
        if (!isDestroy) {
          setError(true);
        }
      })
      .finally(() => setIsLoading(false));

    return () => {
      isDestroy = true;
    };
  }, [isLoading, options, url, baseUrl, token]);

  return [{ isLoading, response, error }, doFetch];
};
