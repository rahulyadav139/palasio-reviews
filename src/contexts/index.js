import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContext, AuthProvider } from './auth-context';

const Providers = props => {
  return (
    <AuthProvider>
      <Router>{props.children}</Router>
    </AuthProvider>
  );
};
export { Providers, AuthContext };
