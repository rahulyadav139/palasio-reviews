import { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HamburgerNavigation.css';
import { useAuth } from '../../hooks';

const HamburgerNavigation = props => {
  const [isHamburgerNav, setIsHamburgerNav] = useState(false);
  const { isAuth, logoutHandler, username } = useAuth();
  const navigate = useNavigate();

  const backdropClasses = isHamburgerNav
    ? 'hamburger-menu__backdrop'
    : 'hamburger-menu__backdrop hidden';

  const hamburgerMenuClasses = isHamburgerNav
    ? 'hamburger-menu'
    : 'hamburger-menu hamburger-menu--hide';

  const userLogoutHandler = () => {
    logoutHandler();
    setIsHamburgerNav(false);
  };

  const userLoginHandler = () => {
    setIsHamburgerNav(false);
    navigate('/auth');
  };

  const navigateToPrivateRouteHandler = path => {
    setIsHamburgerNav(false);

    isAuth ? navigate(path) : navigate('/auth');
  };
  return (
    <Fragment>
      <div
        onClick={() => setIsHamburgerNav(prev => !prev)}
        className="hamburger-icon"
      >
        <i className="bi bi-list"></i>
      </div>
      <div
        onClick={() => setIsHamburgerNav(prev => !prev)}
        className={backdropClasses}
      ></div>
      <div className={hamburgerMenuClasses}>
        <Link to="/">
          <div className="brand">
            <span className="brand__logo">
              <i className="bi bi-hurricane"></i>
            </span>
            <span className="brand__text">PALASIO REVIEWS</span>
          </div>
        </Link>
        <div className="hr-line fad"></div>
        <h3 className="heading-5">
          {!isAuth ? 'Hello' : `Welcome, ${username}`}
        </h3>
        <div className="hr-line fad"></div>
        <ul className="hamburger-menu__items">
          <Link to="/">
            <li
              onClick={() => setIsHamburgerNav(false)}
              className="hamburger-menu__item"
            >
              Home
            </li>
          </Link>
          <Link to="/watch">
            <li
              onClick={() => setIsHamburgerNav(false)}
              className="hamburger-menu__item"
            >
              Explore
            </li>
          </Link>

          <li
            onClick={navigateToPrivateRouteHandler.bind(null, '/watch-later')}
            className="hamburger-menu__item"
          >
            Watch Later
          </li>

          <li
            onClick={navigateToPrivateRouteHandler.bind(null, '/playlists')}
            className="hamburger-menu__item"
          >
            Playlists
          </li>

          <li
            onClick={navigateToPrivateRouteHandler.bind(null, '/liked-videos')}
            className="hamburger-menu__item"
          >
            Liked
          </li>

          <li
            onClick={navigateToPrivateRouteHandler.bind(null, '/history')}
            className="hamburger-menu__item"
          >
            History
          </li>
        </ul>
        <div className="btn-container">
          {isAuth ? (
            <button onClick={userLogoutHandler} className="btn primary">
              Logout
            </button>
          ) : (
            <button onClick={userLoginHandler} className="btn primary">
              Login
            </button>
          )}
        </div>

        <div className="hr-line fad"></div>
      </div>
    </Fragment>
  );
};
export default HamburgerNavigation;
