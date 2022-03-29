import { Fragment } from 'react';
import './Profile.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks';

const Profile = props => {
  const navigate = useNavigate();
  const { logoutHandler, username } = useAuth();

  const userLogoutHandler = () => {
    logoutHandler();
    navigate('/watch');
  };
  return (
    <Fragment>
      <main className="main-profile-page">
        <div className="flex col center">
          <div className="avatar large">{username[0]}</div>
          <h1>{username}</h1>
        </div>
        <div className="profile-items">
          <Link to="/watch-later">
            <p>Watch Later</p>
          </Link>
          <Link to="/playlists">
            <p>My Playlists</p>
          </Link>
          <Link to="/history">
            <p>History</p>
          </Link>
          <button onClick={userLogoutHandler} className="btn outline primary">
            Logout
          </button>
        </div>
      </main>
      <div className="hr-line fad"></div>
    </Fragment>
  );
};
export { Profile };
