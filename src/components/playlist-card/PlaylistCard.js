import './PlaylistCard.css';
import { textFormatter } from '../../utils';
import { usePlaylists } from '../../hooks';
import { Link } from 'react-router-dom';

const PlaylistCard = ({ title, numOfVideos }) => {
  const { deletePlaylist } = usePlaylists();
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
        onClick={deletePlaylist.bind(null, title)}
        className="icon small btn primary"
      >
        <i class="fas fa-trash"></i>
      </button>
    </div>
  );
};
export { PlaylistCard };
