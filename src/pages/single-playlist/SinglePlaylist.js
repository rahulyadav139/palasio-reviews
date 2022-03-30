import './SinglePlaylist.css';
import { VideoCard } from '../../components';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlaylists } from '../../hooks';
import { textFormatter } from '../../utils';

const SinglePlaylist = props => {
  const navigate = useNavigate();
  const params = useParams();
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
    navigate('/profile');
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
      <div className="videos-container">
        {currentPlaylist.videos.map(video => (
          <VideoCard onDelete={deleteFromPlaylistHandler} video={video} />
        ))}
      </div>
    </main>
  );
};
export { SinglePlaylist };
