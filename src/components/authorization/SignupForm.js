import { useState } from 'react';
import { useInput } from '../../hooks';

import styles from './AuthForm.module.css';
const SignupForm = props => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValidity, setPasswordValidity] = useState(false);
  const {
    value: firstName,
    setIsTouched: firstNameIsTouched,
    isValid: firstNameIsValid,
    isInvalid: firstNameIsInvalid,
    inputChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
  } = useInput(value => value.length !== 0);

  const {
    value: lastName,
    setIsTouched: lastNameIsTouched,
    isValid: lastNameIsValid,
    isInvalid: lastNameIsInvalid,
    inputChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
  } = useInput(value => value.length !== 0);

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

  const {
    value: confirmPassword,
    setIsTouched: confirmPasswordIsTouched,
    isValid: confirmPasswordIsValid,
    isInvalid: confirmPasswordIsInvalid,
    inputChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
  } = useInput(value => value.length !== 0);

  const correctClasses = 'input-field responsive';
  const incorrectClasses = 'input-field responsive error';

  const firstNameClasses = firstNameIsInvalid
    ? incorrectClasses
    : correctClasses;
  const lastNameClasses = lastNameIsInvalid ? incorrectClasses : correctClasses;
  const emailClasses = emailIsInvalid ? incorrectClasses : correctClasses;
  const passwordClasses = passwordIsInvalid
    ? `${styles.inputWithIcon} input-field-icon responsive error`
    : `${styles.inputWithIcon} input-field-icon responsive`;
  const confirmPasswordClasses = confirmPasswordIsInvalid
    ? `${styles.inputWithIcon} input-field-icon responsive error`
    : `${styles.inputWithIcon} input-field-icon responsive`;

  const showPasswordHandler = () => {
    setShowPassword(prev => !prev);
  };
  const showConfirmPasswordHandler = () => {
    setShowConfirmPassword(prev => !prev);
  };

  return (
    <form className={`${styles.form} shadow`}>
      <div className="heading-5 text-center text-primary-dark">
        Create Your Account
      </div>
      <p className={styles.instruction}>
        Enter your credentials to access your account
      </p>
      <div className={styles.wrapperUsername}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            value={firstName}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
            className={firstNameClasses}
            id="firstName"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            value={lastName}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
            className={lastNameClasses}
            id="lastName"
            type="text"
          />
        </div>
      </div>
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

      <div>
        <label htmlFor="confirm-password">Confirm Password</label>
        <div className={confirmPasswordClasses}>
          <label>
            <span className="icon small" onClick={showConfirmPasswordHandler}>
              {showConfirmPassword ? (
                <i className="fas fa-eye-slash"></i>
              ) : (
                <i className="fas fa-eye"></i>
              )}
            </span>
            <input
              value={confirmPassword}
              onChange={confirmPasswordChangeHandler}
              onBlur={confirmPasswordBlurHandler}
              id="confirm-password"
              className="input-field "
              type={showConfirmPassword ? 'text' : 'password'}
            />
          </label>
        </div>
      </div>
      {passwordValidity && (
        <p className={styles.invalidMsg}>
          Password should be at least 6 characters long, contains one capital
          letter, one small letter, one special character!
        </p>
      )}

      <button type="submit" className="btn primary">
        Signup
      </button>
      <p className={styles.switchMsg}>
        Already a member?{' '}
        <span className={styles.switchMethod}>Login here</span>
      </p>
    </form>
  );
};
export { SignupForm };
