import { useState, useEffect } from 'react';
import {
  useInput,
  useFetch,
  useAuth,
  usePlaylists,
  useToast,
} from '../../hooks';
import { textFormatter } from '../../utils';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';

const SignupForm = props => {
  const { sendData } = useFetch();
  const { loginHandler } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValidity, setPasswordValidity] = useState(false);
  // const [toast, setToast] = useState(false);
  const { setToast } = useToast();
  const navigate = useNavigate();
  const { getPlaylistsData } = usePlaylists();

  // useEffect(() => {
  //   let timer;

  //   if (toast) {
  //     timer = setTimeout(() => setToast(null), 2000);
  //   }

  //   return () => clearTimeout(timer);
  // }, [toast]);
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
    ? ' input-field-icon responsive error'
    : ' input-field-icon responsive';
  const confirmPasswordClasses = confirmPasswordIsInvalid
    ? ' input-field-icon responsive error'
    : ' input-field-icon responsive';

  const showPasswordHandler = () => {
    setShowPassword(prev => !prev);
  };
  const showConfirmPasswordHandler = () => {
    setShowConfirmPassword(prev => !prev);
  };

  const submitHandler = async e => {
    e.preventDefault();

    setPasswordValidity(false);

    if (
      !firstNameIsValid ||
      !lastNameIsValid ||
      !emailIsValid ||
      !passwordIsValid ||
      !confirmPasswordIsValid
    ) {
      firstNameIsTouched(true);
      lastNameIsTouched(true);
      emailIsTouched(true);
      passwordIsTouched(true);
      confirmPasswordIsTouched(true);
      return;
    }

    const regexSmallLater = /[a-z]/g;
    const regexCapitalLater = /[A-Z]/g;
    const regexSpecialChar = /[^a-zA-Z0-9]/g;

    if (
      !password.match(regexSmallLater) ||
      !password.match(regexCapitalLater) ||
      !password.match(regexSpecialChar)
    ) {
      setPasswordValidity(true);
      return;
    }
    if (password !== confirmPassword) {
      setToast({
        message: "Password doesn't match!",
        type: 'danger',
        status: true,
      });
      return;
    }

    const userData = {
      fullName: textFormatter(`${firstName} ${lastName}`),
      email,
      password,
    };

    const { data, error, status } = await sendData(
      `${process.env.REACT_APP_BACKEND_URL}/auth/signup`,
      'PUT',
      userData,
      false
    );

    if (error)
      return setToast({
        message: 'Something went wrong!',
        type: 'danger',
        status: true,
      });

    if (status === 409) {
      setToast({
        message: 'User is already registered!',
        type: 'danger',
        status: true,
      });

      return;
    }

    loginHandler({
      token: data.token,
      userId: data.userId,
      username: data.username,
    });

    getPlaylistsData(data.playlists);

    navigate(-1);
  };

  return (
    <form onSubmit={submitHandler} className="auth-form shadow">
      <div className="heading-5 text-center text-primary-dark">
        Create Your Account
      </div>
      <p className="instruction">
        Enter your credentials to access your account
      </p>
      <div className="username__wrapper">
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
              <i
                className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}
              ></i>
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
              <i
                className={
                  showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'
                }
              ></i>
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
        <p className="invalid__msg">
          Password should be at least 6 characters long, contains one capital
          letter, one small letter, one special character!
        </p>
      )}

      <button type="submit" className="btn primary">
        Signup
      </button>
      <p className="switch__msg">
        Already a member?{' '}
        <span onClick={props.onSwitch} className="switch__method">
          Login here
        </span>
      </p>

      {/* {toast && (
        <div class="toast danger">
          <span class="icon small white">
            <i class="fas fa-bell"></i>
          </span>
          {` ${toast}`}
        </div>
      )} */}
    </form>
  );
};
export { SignupForm };
