import React, { useReducer } from 'react';

const AuthContext = React.createContext();

const defaultState = {
  isAuth: false,
  token: '',
  userId: '',
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { isAuth: true, token: action.token, userId: action.userId };

    case 'LOGOUT':
      return { isAuth: false, token: '', userId: '' };

    default:
      return defaultState;
  }
};

const AuthProvider = props => {
  const [state, dispatch] = useReducer(authReducer, defaultState);

  const loginHandler = ({ token, userId }) => {
    dispatch({ type: 'LOGIN', token, userId });
  };

  const logoutHandler = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const defaultValues = {
    isAuth: state.isAuth,
    token: state.token,
    userId: state.userId,
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
