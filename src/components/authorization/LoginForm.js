import styles from './AuthForm.module.css';
import { useInput } from '../../hooks';
import { useState } from 'react';

const LoginForm = props => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    value: email,
    setIsTouched: emailIsTouched,
    isValid: emailIsValid,
    isInvalid: emailIsInvalid,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(
    value => value.includes('@') === true && value.includes('.') === true
  );

  const {
    value: password,
    setIsTouched: passwordIsTouched,
    isValid: passwordIsValid,
    isInvalid: passwordIsInvalid,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(value => value.length !== 0);

  const emailClasses = emailIsInvalid
    ? 'input-field responsive error'
    : 'input-field responsive';
  const passwordClasses = passwordIsInvalid
    ? `${styles.inputWithIcon} input-field-icon responsive error`
    : `${styles.inputWithIcon} input-field-icon responsive`;

  const showPasswordHandler = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <form className={`${styles.form} shadow`}>
      <div className="heading-5 text-center text-primary-dark">
        Welcome Back
      </div>
      <p className={styles.instruction}>
        Enter your credentials to access your account
      </p>
      <div>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          id="email"
          className={emailClasses}
          type="email"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <div className={passwordClasses}>
          <label>
            <span className="icon small" onClick={showPasswordHandler}>
              {showPassword ? (
                <i className="fas fa-eye-slash"></i>
              ) : (
                <i className="fas fa-eye"></i>
              )}
            </span>
            <input
              value={password}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              id="password"
              className="input-field "
              type={showPassword ? 'text' : 'password'}
            />
          </label>
        </div>
      </div>

      <button type="submit" className="btn primary">
        Login
      </button>
      <p className={styles.switchMsg}>
        Already a member?{' '}
        <span className={styles.switchMethod}>Signup here</span>
      </p>
    </form>
  );
};
export { LoginForm };
