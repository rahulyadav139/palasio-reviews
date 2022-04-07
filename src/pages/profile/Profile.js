import { Fragment } from 'react';
import './Profile.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks';

const Profile = props => {
  const navigate = useNavigate();
  const { logoutHandler } = useAuth();

  const userLogoutHandler = () => {
    logoutHandler();
    navigate('/watch');
  };
  return (
    <Fragment>
      <main className="main-profile-page">
        <div className="flex col center">
          <div className="avatar large">
            <img
              src="https://i.picsum.photos/id/317/536/354.jpg?hmac=M_fYXAj8A56pCXSeb2XGEDY3_oAS3wCt-snLGHWxKGc"
              alt="profile"
            />
          </div>
          <h1>Rahul Yadav</h1>
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
