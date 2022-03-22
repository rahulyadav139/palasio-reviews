import { useState, Fragment } from 'react';

import { LoginForm, SignupForm, Header } from '../components';
import LoginImg from '../assets/login.png';
import styles from './AuthPage.module.css';

const AuthPage = props => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <Fragment>
      <Header />
      <main className={styles.main}>
        <section>
          <img className="img-responsive" src={LoginImg} alt="signup" />
        </section>
        <section>{isLogin ? <LoginForm /> : <SignupForm />}</section>
      </main>
    </Fragment>
  );
};
export { AuthPage };
