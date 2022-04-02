import './AuthForm.css';
import {
  useInput,
  useFetch,
  useAuth,
  usePlaylists,
  useHistory,
} from '../../hooks';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = props => {
  const { sendData } = useFetch();
  const { loginHandler } = useAuth();
  const { getHistory } = useHistory();
  const navigate = useNavigate();
  const { getPlaylistsData } = usePlaylists();
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    let timer;

    if (toast) {
      timer = setTimeout(() => setToast(null), 2000);
    }

    return () => clearTimeout(timer);
  }, [toast]);

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
    ? 'input-field-icon responsive error'
    : 'input-field-icon responsive';

  const showPasswordHandler = () => {
    setShowPassword(prev => !prev);
  };

  const submitHandler = async e => {
    e.preventDefault();
    if (!emailIsValid || !passwordIsValid) {
      emailIsTouched(true);
      passwordIsTouched(true);
      return;
    }

    const { data, status, error } = await sendData(
      `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
      'POST',
      { email, password },
      false
    );

    if (error) return;

    if (status === 404) {
      return setToast('User not found!');
    }

    if (status === 401) {
      return setToast('incorrect password!');
    }

    loginHandler({
      token: data.token,
      userId: data.userId,
      username: data.username,
    });
    getPlaylistsData(data.playlists);
    getHistory(data.history);

    navigate(-1);
  };

  const guestLoginHandler = async () => {
    const { data, error } = await sendData(
      `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
      'POST',
      {
        email: process.env.REACT_APP_GUEST_LOGIN_USERNAME,
        password: process.env.REACT_APP_GUEST_LOGIN_PASSWORD,
      },
      false
    );

    if (error) return setToast('Something went wrong!');

    loginHandler({
      token: data.token,
      userId: data.userId,
      username: data.username,
    });
    getPlaylistsData(data.playlists);
    getHistory(data.history);

    navigate(-1);
  };

  return (
    <form onSubmit={submitHandler} className="auth-form shadow">
      <div className="heading-5 text-center text-primary-dark">
        Welcome Back
      </div>
      <p className="instruction">
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

      <button type="submit" className="btn primary">
        Login
      </button>
      <button
        onClick={guestLoginHandler}
        type="button"
        className="btn outline primary btn-guest-login"
      >
        Guest Login
      </button>
      <p className="switch__msg">
        Already a member?{' '}
        <span onClick={props.onSwitch} className="switch__method">
          Signup here
        </span>
      </p>

      {toast && (
        <div class="toast danger">
          <span class="icon small white">
            <i class="fas fa-bell"></i>
          </span>
          {` ${toast}`}
        </div>
      )}
    </form>
  );
};
export { LoginForm };
