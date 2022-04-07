import './VideoCard.css';
import { Link } from 'react-router-dom';

const VideoCard = props => {
  const deleteFun = props.onDelete;
  const { title, author, thumbnail, _id } = props.video;

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
          className="icon small btn-dismiss"
        >
          <i class="fas fa-trash"></i>
        </button>
      )}
    </div>
  );
};

export { VideoCard };
