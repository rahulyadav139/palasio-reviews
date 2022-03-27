import './Navigation.css';
import { useAuth } from '../../hooks';
import { Link } from 'react-router-dom';

const Navigation = props => {
  const { isAuth } = useAuth();
  return (
    <nav>
      <ul className="list-items">
        <li>
          <div className="theme-toggle">
            <input
              type="checkbox"
              className="theme-toggle__checkbox"
              id="theme-toggle"
            />
            <label className="theme-toggle__label" htmlFor="theme-toggle">
              <span className="icon medium primary">
                <i className="fas fa-moon"></i>{' '}
                <i className="fas fa-sun hidden"></i>
              </span>
            </label>
          </div>
        </li>

        {isAuth && (
          <Link to="/profile">
            <li className="profile-item list-item">
              <div className="avatar small">
                <img
                  src="https://i.picsum.photos/id/704/536/354.jpg?hmac=k_PDx86tD-ILOtsUOKY9t5LAL5ycKiQ4ryVdlxhWoek"
                  alt="sample"
                />
              </div>
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
