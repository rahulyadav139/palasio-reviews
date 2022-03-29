import './Header.css';
import Navigation from './Navigation';
import SearchInput from './SearchInput';
import HamburgerNavigation from './HamburgerNavigation';
import { Link } from 'react-router-dom';

const Header = props => {
  return (
    <header className="nav-bar shadow">
      <HamburgerNavigation />

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
