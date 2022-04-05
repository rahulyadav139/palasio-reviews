import React, { useState } from 'react';

const ToastContext = React.createContext();

const initialToast = { type: '', message: '', status: false };

const ToastProvider = props => {
  const [toast, setToast] = useState(initialToast);

  const defaultValues = {
    toast,
    setToast,
    resetToast() {
      setToast(initialToast);
    },
  };

  return (
    <ToastContext.Provider value={defaultValues}>
      {props.children}
    </ToastContext.Provider>
  );
};

export { ToastContext, ToastProvider };
