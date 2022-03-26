import { useAuth } from './index';
import { useCallback } from 'react';

const useFetch = () => {
  const { token } = useAuth();

  const sendData = useCallback(
    async (url, method, body, authStatus = false) => {
      let data, error, status;
      const headers = !authStatus
        ? { 'Content-Type': 'application/json' }
        : {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          };

      try {
        const res = await fetch(url, {
          method,
          headers,
          body: JSON.stringify(body),
        });

        status = res.status;

        data = await res.json();
      } catch (err) {
        error = err;
        console.log(err);
      }

      return { status, data, error };
    },
    [token]
  );

  const getData = useCallback(
    async (url, authStatus = false) => {
      let status, data, error;
      const options = !authStatus
        ? {}
        : {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

      try {
        const res = await fetch(url, options);

        status = res.status;

        data = await res.json();
      } catch (err) {
        error = err;
      }

      return { data, error, status };
    },
    [token]
  );

  return { sendData, getData };
};

export { useFetch };
