import './LibraryPage.css';
import { VideoCard } from '../../components';
import { useState, useEffect } from 'react';
import { useFetch } from '../../hooks';

const LibraryPage = props => {
  const [videos, setVideos] = useState([]);
  const { getData } = useFetch();

  useEffect(() => {
    (async () => {
      const { data, error, status } = await getData(
        'http://localhost:8080/videos',
        false
      );
      setVideos(data);
    })();
  }, [getData]);
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
        </ul>
      </div>
      <div className="video-cards-wrapper">
        {videos.map(video => (
          <VideoCard dismissBtn={false} video={video} />
        ))}
      </div>
    </main>
  );
};
export { LibraryPage };
