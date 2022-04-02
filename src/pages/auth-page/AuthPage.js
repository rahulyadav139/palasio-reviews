import './AuthPage.css';
import { useState } from 'react';
import { LoginForm, SignupForm } from '../../components';
import LoginImg from '../../assets/login.png';

const AuthPage = props => {
  const [isLogin, setIsLogin] = useState(true);

  const authMethodSwitchHandler = () => {
    setIsLogin(prev => !prev);
  };

  return (
    <main className="main-auth-page">
      <section>
        <img className="img-responsive" src={LoginImg} alt="signup" />
      </section>
      <section>
        {isLogin ? (
          <LoginForm onSwitch={authMethodSwitchHandler} />
        ) : (
          <SignupForm onSwitch={authMethodSwitchHandler} />
        )}
      </section>
    </main>
  );
};
export { AuthPage };
