import { useState, useEffect } from 'react';
import './Homepage.css';
import { VideoCard } from '../../components';
import { useFetch } from '../../hooks';
import landingPageImage from '../../assets/landing-page-image.jpg';

const Homepage = props => {
  const [videos, setVideos] = useState([]);
  const { getData } = useFetch();

  useEffect(() => {
    (async () => {
      const { data, error, status } = await getData(
        'http://localhost:8080/videos',
        false
      );

      setVideos(data.slice(0, 5));
    })();
  }, [getData]);
  return (
    <main className="main-homepage">
      <div className="image-homepage">
        <img className="img-responsive" src={landingPageImage} alt="sample" />
      </div>
      <h1>Trending Videos</h1>
      <div className="video-cards-container">
        {videos.map(video => (
          <VideoCard video={video} wantWatchLaterButton={true} />
        ))}
      </div>
    </main>
  );
};
export { Homepage };
