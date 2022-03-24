import { Fragment } from 'react';
import { Header, VideoCard } from '../../components';
import './WatchLater.css';

const WatchLater = props => {
  return (
    <main className="main-watch-later">
      <h1>Watch Later</h1>
      <div className="videos-container">
        {Array.from({ length: 5 }).map(el => (
          <VideoCard dismissBtn={true} />
        ))}
      </div>
    </main>
  );
};
export { WatchLater };
