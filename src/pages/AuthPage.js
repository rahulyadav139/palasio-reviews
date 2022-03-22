import { useState } from 'react';

import { LoginForm, SignupForm } from '../components';
import LoginImg from '../assets/login.png';
import styles from './AuthPage.module.css';

const Auth = props => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <main className={styles.main}>
      <section>
        <img className="img-responsive" src={LoginImg} alt="signup" />
      </section>
      <section>{isLogin ? <LoginForm /> : <SignupForm />}</section>
    </main>
  );
};
export { Auth };
