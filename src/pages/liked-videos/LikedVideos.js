import './LikedVideos.css';
import { VideoCard } from '../../components';
import { useLikedVideos } from '../../hooks';
import { Link } from 'react-router-dom';

const LikedVideos = props => {
  const { likedVideos, clearLikedVideos, removeFromLikedVideos } = useLikedVideos();

  const deleteFromLikedVideosHandler = id => {
    removeFromLikedVideos(id);
  };
  return (
    <main className="main-liked-videos">
      <div className="flex space-between align-center">
        <h1>Liked Videos</h1>
        <button onClick={clearLikedVideos} className="btn error rounded-edge">
          Clear Videos
        </button>
      </div>
      <div className="hr-line fad"></div>
      {likedVideos.length !== 0 ? (
        <div className="videos-container">
          {likedVideos.map(video => (
            <VideoCard
              key={video._id}
              onDelete={deleteFromLikedVideosHandler}
              video={video}
            />
          ))}
        </div>
      ) : (
        <div className="empty-liked-videos-msg">
          <p>No videos!</p>
          <Link to="/watch">
            <button className="btn primary">Watch Now</button>
          </Link>
        </div>
      )}
    </main>
  );
};
export { LikedVideos };
