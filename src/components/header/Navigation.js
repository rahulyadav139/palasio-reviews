import './Navigation.css';
import { useAuth } from '../../hooks';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navigation = props => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'light');
  const { isAuth, username } = useAuth();

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

        {isAuth && (
          <Link to="/profile">
            <li className="profile-item list-item">
              <div className="avatar small">{username[0]}</div>
            </li>
          </Link>
        )}

        {!isAuth && (
          <li className="login-item">
            <Link to="/auth">
              <button className="btn-login btn primary text-bold">Login</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
export default Navigation;
