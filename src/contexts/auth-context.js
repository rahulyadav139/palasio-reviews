import React, { useReducer } from 'react';

const AuthContext = React.createContext();

const defaultState = {
  isAuth: false,
  token: '',
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { isAuth: true, token: action.token };

    case 'LOGOUT':
      return { isAuth: false, token: '' };

    default:
      return defaultState;
  }
};

const AuthProvider = props => {
  const [state, dispatch] = useReducer(authReducer, defaultState);

  const loginHandler = token => {
    dispatch({ type: 'LOGIN', token });
  };

  const logoutHandler = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const defaultValues = {
    isAuth: state.isAuth,
    token: state.token,
    loginHandler,
    logoutHandler,
  };
  return (
    <AuthContext.Provider value={defaultValues}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
