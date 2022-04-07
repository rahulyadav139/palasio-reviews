import { Fragment } from 'react';
import './SinglePlaylist.css';
import { Header, VideoCard } from '../../components';

const SinglePlaylist = props => {
  return (
    <main className="main-single-playlist">
      <div className="flex space-between align-center">
        <h1>My Playlist</h1>
        <button className="btn error rounded-edge">Delete Playlist</button>
      </div>
      <div className="videos-container">
        {Array.from({ length: 4 }).map(el => (
          <VideoCard dismissBtn={true} />
        ))}
      </div>
    </main>
  );
};
export { SinglePlaylist };
