import './WatchLater.css';
import { VideoCard } from '../../components';
import { usePlaylists } from '../../hooks';
import { Link } from 'react-router-dom';

const WatchLater = props => {
  const { removeFromPlaylist } = usePlaylists();
  const { playlists } = usePlaylists();

  const deleteFromPlaylistHandler = videoId => {
    removeFromPlaylist({
      playlistTitle: 'watch later',
      videoId,
    });
  };

  const watchLaterPlaylist = playlists.find(
    playlist => playlist.title === 'watch later'
  );

  return (
    <main className="main-watch-later">
      <h1>Watch Later</h1>
      <div className="hr-line fad"></div>
      {watchLaterPlaylist ? (
        <div className="videos-container">
          {watchLaterPlaylist.videos.map(video => (
            <VideoCard
              key={video._id}
              onDelete={deleteFromPlaylistHandler}
              video={video}
            />
          ))}
        </div>
      ) : (
        <div className="empty-watch-later-msg">
          <p>No videos!</p>
          <Link to="/watch">
            <button className="btn primary">Watch Now</button>
          </Link>
        </div>
      )}
    </main>
  );
};
export { WatchLater };
