import './PlaylistCard.css';
import { textFormatter } from '../../utils';
import { usePlaylists, useToast } from '../../hooks';
import { Link } from 'react-router-dom';

const PlaylistCard = ({ title, numOfVideos }) => {
  const { deletePlaylist } = usePlaylists();
  const { setToast } = useToast();

  const deletePlaylistHandler = title => {
    deletePlaylist(title);

    setToast({
      status: true,
      type: 'loading',
      message: `"${textFormatter(title)} playlist deleted!"`,
    });
  };
  return (
    <div className="playlist-card shadow">
      <Link to={`/playlist/${title}`}>
        <div className="playlist-details">
          <p className="text-bold">{textFormatter(title)}</p>
          <p className="text-small text-grey">
            {numOfVideos > 1 ? `${numOfVideos} videos` : `${numOfVideos} video`}
          </p>
        </div>
      </Link>
      <button
        onClick={deletePlaylistHandler.bind(null, title)}
        className="icon small btn primary"
      >
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};
export { PlaylistCard };
