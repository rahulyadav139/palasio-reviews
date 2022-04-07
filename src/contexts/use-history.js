import React, { useState } from 'react';
import { useFetch } from '../hooks';

const HistoryContext = React.createContext();

let isHistoryReadyToUpdate = true;

const HistoryProvider = props => {
  const { sendData } = useFetch();
  const [history, setHistory] = useState([]);
  console.log(history);

  const addToHistoryHandler = async videoData => {
    if (isHistoryReadyToUpdate) {
      isHistoryReadyToUpdate = false;

      let updatedHistory;

      history.findIndex(el => el._id === videoData._id) >= 0
        ? (updatedHistory = history.map(el =>
            el._id === videoData._id
              ? { ...el, watchedAt: new Date().toISOString() }
              : el
          ))
        : (updatedHistory = history.concat({
            ...videoData,
            watchedAt: new Date().toISOString(),
          }));

      const { status, data, error } = await sendData(
        'http://localhost:8080/user/update-history',
        'POST',
        updatedHistory,
        true
      );

      if (!error) setHistory(updatedHistory);

      isHistoryReadyToUpdate = true;
    }
  };

  const removeFromHistoryHandler = async id => {
    if (isHistoryReadyToUpdate) {
      isHistoryReadyToUpdate = false;

      const updatedHistory = history.filter(el => el._id !== id);

      const { status, data, error } = await sendData(
        'http://localhost:8080/user/update-history',
        'POST',
        updatedHistory,
        true
      );

      if (!error) setHistory(updatedHistory);

      isHistoryReadyToUpdate = true;
    }
  };

  const clearHistoryHandler = async () => {
    if (isHistoryReadyToUpdate) {
      isHistoryReadyToUpdate = false;

      const { status, data, error } = await sendData(
        'http://localhost:8080/user/update-history',
        'POST',
        [],
        true
      );
      if (!error) setHistory([]);

      isHistoryReadyToUpdate = true;
    }
  };

  const getHistoryDataHandler = history => {
    setHistory(history);
  };

  const defaultValues = {
    history,
    addToHistory: addToHistoryHandler,
    removeFromHistory: removeFromHistoryHandler,
    clearHistory: clearHistoryHandler,
    getHistory: getHistoryDataHandler,
  };

  return (
    <HistoryContext.Provider value={defaultValues}>
      {props.children}
    </HistoryContext.Provider>
  );
};

export { HistoryContext, HistoryProvider };
