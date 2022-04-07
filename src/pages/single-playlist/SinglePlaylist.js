import { useState, useEffect } from 'react';
import './SinglePlaylist.css';
import { VideoCard } from '../../components';
import { useFetch } from '../../hooks';
import { dateFormatter } from '../../utils';

const SinglePlaylist = props => {
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
    <main className="main-single-playlist">
      <div className="flex space-between align-center">
        <h1>My Playlist</h1>
        <button className="btn error rounded-edge">Delete Playlist</button>
      </div>
      <div className="videos-container">
        {videos.map(video => (
          <VideoCard dismissBtn={true} video={video} />
        ))}
      </div>
    </main>
  );
};
export { SinglePlaylist };
