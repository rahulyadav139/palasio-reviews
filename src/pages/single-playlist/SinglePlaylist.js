import './SinglePlaylist.css';
import { VideoCard } from '../../components';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { usePlaylists, useToast } from '../../hooks';
import { textFormatter } from '../../utils';

const SinglePlaylist = props => {
  const navigate = useNavigate();
  const params = useParams();
  const { setToast } = useToast();
  const playlistTitle = params.playlistName;
  const { playlists, removeFromPlaylist, deletePlaylist } = usePlaylists();

  const currentPlaylist = playlists.find(el => el.title === playlistTitle);

  const deleteFromPlaylistHandler = videoId => {
    removeFromPlaylist({
      playlistTitle,
      videoId,
    });
  };

  const deletePlaylistHandler = () => {
    deletePlaylist(playlistTitle);
    navigate('/playlists');
    setToast({
      status: true,
      type: 'success',
      message: `"${textFormatter(
        playlistTitle
      )}" playlist deleted successfully!`,
    });
  };

  return (
    <main className="main-single-playlist">
      <div className="flex space-between align-center">
        <h1>{textFormatter(currentPlaylist.title)}</h1>
        <button
          onClick={deletePlaylistHandler}
          className="btn error rounded-edge"
        >
          Delete Playlist
        </button>
      </div>
      <div className="hr-line fad"></div>
      {currentPlaylist.videos.length !== 0 ? (
        <div className="videos-container">
          {currentPlaylist.videos.map(video => (
            <VideoCard
              key={video._id}
              onDelete={deleteFromPlaylistHandler}
              video={video}
            />
          ))}
        </div>
      ) : (
        <div className="empty-playlist-msg">
          <p>Empty playlist!</p>
          <Link to="/watch">
            <button className="btn primary">Watch Now</button>
          </Link>
        </div>
      )}
    </main>
  );
};
export { SinglePlaylist };
