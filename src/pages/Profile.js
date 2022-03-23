import { Fragment } from 'react';
import './Profile.css';
import { Header } from '../components';

const Profile = props => {
  return (
    <Fragment>
      <Header />
      <main className="main-profile-page">
        <div>
          <div className="avatar large">
            <img
              src="https://i.picsum.photos/id/317/536/354.jpg?hmac=M_fYXAj8A56pCXSeb2XGEDY3_oAS3wCt-snLGHWxKGc"
              alt="profile"
            />
          </div>
          <h1>Rahul Yadav</h1>
        </div>
        <div className="profile-items">
          <p>Watch Later</p>
          <p>My Playlists</p>
          <p>History</p>
          <button className="btn outline primary">Logout</button>
        </div>
      </main>
      <div className="hr-line fad"></div>
    </Fragment>
  );
};
export { Profile };
