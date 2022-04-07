import './Navigation.css';
import { useAuth } from '../../hooks';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navigation = props => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'light');
  const { isAuth, logoutHandler } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    theme === 'dark'
      ? document.querySelector('body').classList.add('dark-theme')
      : document.querySelector('body').classList.remove('dark-theme');
  }, [theme]);

  const themeHandler = e => {
    if (e.target.checked) {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <nav>
      <ul className="list-items">
        <li title="Explore Videos" className=" list-item">
          <Link to="/watch">
            <button className="btn-login btn icon medium primary text-bold">
              <i class="fas fa-play-circle"></i>
            </button>
          </Link>
        </li>

        <li title="Watch Later" className=" list-item">
          <Link to={isAuth ? '/watch-later' : '/auth'}>
            <button className="btn-login btn icon medium primary text-bold">
              <i className="fas fa-clock"></i>
            </button>
          </Link>
        </li>

        <li title="Playlists" className="list-item">
          <Link to={isAuth ? '/playlists' : '/auth'}>
            <button className="btn-login btn icon medium primary text-bold">
              <i className="fas fa-list"></i>
            </button>
          </Link>
        </li>

        <li title="Liked Videos" className="list-item">
          <Link to={isAuth ? '/liked-videos' : '/auth'}>
            <button className="btn-login btn icon medium primary text-bold">
              <i className="fas fa-thumbs-up"></i>
            </button>
          </Link>
        </li>

        <li title="History" className="list-item">
          <Link to={isAuth ? '/history' : '/auth'}>
            <button className="btn-login btn icon medium primary text-bold">
              <i className="fas fa-history"></i>
            </button>
          </Link>
        </li>

        <li>
          <div className="theme-toggle">
            <input
              type="checkbox"
              className="theme-toggle__checkbox"
              id="theme-toggle"
              onChange={themeHandler}
              checked={'dark' === theme}
            />
            <label className="theme-toggle__label" htmlFor="theme-toggle">
              <span className="icon medium primary">
                <i
                  className={theme === 'light' ? 'fas fa-moon' : 'fas fa-sun'}
                ></i>
              </span>
            </label>
          </div>
        </li>

        <li title={isAuth ? 'Logout' : 'Login'} className="login-item">
          <button
            onClick={isAuth ? logoutHandler : navigate.bind(null, '/auth')}
            className="btn-login btn icon medium primary text-bold"
          >
            <i
              className={!isAuth ? 'fas fa-sign-in-alt' : 'fas fa-sign-out-alt'}
            ></i>
          </button>
        </li>
      </ul>
    </nav>
  );
};
export default Navigation;
