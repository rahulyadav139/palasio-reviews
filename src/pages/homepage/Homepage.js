import { useState, useEffect } from 'react';
import './Homepage.css';
import { VideoCard } from '../../components';
import { useFetch } from '../../hooks';
import { Link } from 'react-router-dom';

const Homepage = props => {
  const [videos, setVideos] = useState([]);
  const { getData } = useFetch();

  useEffect(() => {
    (async () => {
      const { data } = await getData(
        `${process.env.REACT_APP_BACKEND_URL}/videos`,
        false
      );

      setVideos(data.slice(0, 5));
    })();
  }, [getData]);
  return (
    <main className="main-homepage">
      <div className="slide-container">
        <h1>India's Most Trusted Car Reviews</h1>
        <Link to="/watch">
          <button className="btn error">Watch</button>
        </Link>
      </div>
      <h1>Trending Videos</h1>
      <div className="video-cards-container">
        {videos.map(video => (
          <VideoCard
            key={video._id}
            video={video}
            wantWatchLaterButton={true}
          />
        ))}
      </div>
    </main>
  );
};
export { Homepage };
