import './Header.css';
import Navigation from './Navigation';
import SearchInput from './SearchInput';
import { Link } from 'react-router-dom';

const Header = props => {
  return (
    <header className="nav-bar shadow">
      <div className="hamburger-icon">
        <i className="bi bi-list"></i>
      </div>
      <div className="hamburger-menu__backdrop hidden"></div>
      <div className="hamburger-menu hamburger-menu--hide">
        <div className="brand">
          <span className="brand__logo">
            <i className="bi bi-hurricane"></i>
          </span>
          <span className="brand__text">PALASIO TALKIES</span>
        </div>
        <div className="hr-line fad"></div>
        <ul className="hamburger-menu__items">
          <li className="hamburger-menu__item">Home</li>
          <li className="hamburger-menu__item">My Profile</li>
          <li className="hamburger-menu__item">My Orders</li>
        </ul>
        <div className="btn-container">
          <button className="btn primary">Logout</button>
        </div>

        <div className="btn-container">
          <button className="btn primary">Login</button>
          <button className="btn primary outline">Signup</button>
        </div>
        <div className="hr-line fad"></div>
      </div>

      <Link to="/">
        <div className="brand">
          <span className="brand__logo">
            <i className="bi bi-hurricane"></i>
          </span>
          <span className="brand__text">
            PALASIO
            <br />
            REVIEWS
          </span>
        </div>
      </Link>

      <SearchInput />

      <Navigation />
    </header>
  );
};
export { Header };
