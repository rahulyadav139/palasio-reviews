import { Fragment } from 'react';
import './Playlists.css';
import { Header, PlaylistCard } from '../components';

const Playlists = props => {
  return (
    <Fragment>
      <Header />
      <main className="main-playlists">
        <div className="flex space-between align-center">
          <h1>My Playlists</h1>
          <button className="btn primary rounded-edge">
            Create New Playlists
          </button>
        </div>
        <div className="playlists-container">
          {Array.from({ length: 5 }).map(el => (
            <PlaylistCard />
          ))}
        </div>
      </main>
    </Fragment>
  );
};
export { Playlists };
