import './VideoCard.css';
import { Link } from 'react-router-dom';
import { usePlaylists, useAuth } from '../../hooks';
import { useNavigate } from 'react-router-dom';

const VideoCard = props => {
  const deleteFun = props.onDelete;
  const { title, author, thumbnail, _id } = props.video;
  const wantWatchLaterButton = props.wantWatchLaterButton;
  const { playlists, addToPlaylist, removeFromPlaylist } = usePlaylists();
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  const inWatchLater =
    isAuth &&
    playlists
      .filter(el => el.title === 'watch later')[0]
      .videos?.some(video => video._id === _id);

  const watchLaterButtonHandler = () => {
    if (!isAuth) return navigate('/auth');

    inWatchLater
      ? removeFromPlaylist({
          playlistTitle: 'watch later',
          videoId: props.video._id,
        })
      : addToPlaylist({ playlistTitle: 'watch later', video: props.video });
  };

  return (
    <div className="video-card shadow">
      <Link to={`/watch/${_id}`}>
        <div className="video-card__image">
          <img className="img-responsive" src={thumbnail} alt={_id} />
        </div>
      </Link>
      <div className="video-card__details">
        <p className="heading-6 title">{title.substring(0, 22)}</p>
        <p className="text-small">{author}</p>
        <div className="video-card__views">
          <p className="text-small">6K Views</p>
          <span className="text-small">|</span>
          <p className="text-small">13 Hours ago</p>
        </div>
      </div>
      {deleteFun && (
        <button
          onClick={() => deleteFun(_id)}
          className="icon small btn-right-top btn-delete"
        >
          <i class="fas fa-trash"></i>
        </button>
      )}

      {wantWatchLaterButton && (
        <button
          title="Watch Later"
          onClick={watchLaterButtonHandler}
          className="icon small btn-right-top btn-watch-later"
        >
          <i className={inWatchLater ? 'fas fa-clock' : 'far fa-clock'}></i>
        </button>
      )}
    </div>
  );
};

export { VideoCard };
