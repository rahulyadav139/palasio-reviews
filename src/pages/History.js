import { Fragment } from 'react';
import { Header, VideoCard } from '../components';
import './History.css';

const History = props => {
  return (
    <Fragment>
      <Header />
      <main className="main-history">
        <div className="flex space-between align-center">
          <h1>History</h1>
          <button className="btn error rounded-edge">Clear History</button>
        </div>
        <div className="videos-container">
          {Array.from({ length: 5 }).map(el => (
            <VideoCard dismissBtn={true} />
          ))}
        </div>
      </main>
    </Fragment>
  );
};
export { History };
