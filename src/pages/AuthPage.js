import { useState, Fragment } from 'react';

import { LoginForm, SignupForm, Header } from '../components';
import LoginImg from '../assets/login.png';
import './AuthPage.css';

const AuthPage = props => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <Fragment>
      <Header />
      <main className='main-auth-page'>
        <section>
          <img className="img-responsive" src={LoginImg} alt="signup" />
        </section>
        <section>{isLogin ? <LoginForm /> : <SignupForm />}</section>
      </main>
    </Fragment>
  );
};
export { AuthPage };
