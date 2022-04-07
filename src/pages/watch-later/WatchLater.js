import { VideoCard } from '../../components';
import './WatchLater.css';
import { usePlaylists } from '../../hooks';

const WatchLater = props => {
  const { removeFromPlaylist } = usePlaylists();
  const { playlists } = usePlaylists();

  const deleteFromPlaylistHandler = videoId => {
    removeFromPlaylist({
      playlistTitle: 'watch later',
      videoId,
    });
  };
  return (
    <main className="main-watch-later">
      <h1>Watch Later</h1>
      <div className="videos-container">
        {playlists
          .filter(el => el.title === 'watch later')[0]
          .videos.map(video => (
            <VideoCard onDelete={deleteFromPlaylistHandler} video={video} />
          ))}
      </div>
    </main>
  );
};
export { WatchLater };
