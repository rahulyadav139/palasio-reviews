import './LibraryPage.css';
import { Header, VideoCard } from '../../components';
import { Fragment } from 'react';

const LibraryPage = props => {
  return (
    <main className="main-library-page">
      <div className="categories">
        <ul>
          <li className="category">All</li>
          <li className="category">Hatchback</li>
          <li className="category">Sedan</li>
          <li className="category">SUV</li>
          <li className="category">MUV</li>
          <li className="category">Luxury</li>
          <li className="category">More</li>
        </ul>
      </div>
      <div className="video-cards-wrapper">
        {Array.from({ length: 10 }).map(el => (
          <VideoCard dismissBtn={false} />
        ))}
      </div>
    </main>
  );
};
export { LibraryPage };
