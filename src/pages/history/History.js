import './History.css';
import { VideoCard } from '../../components';
import { useHistory, useToast } from '../../hooks';
import { Link } from 'react-router-dom';

const History = props => {
  const { history, clearHistory, removeFromHistory } = useHistory();
  const { setToast } = useToast();

  const deleteFromHistoryHandler = id => {
    removeFromHistory(id);
  };

  const clearHistoryHandler = () => {
    clearHistory();

    setToast({
      type: 'success',
      status: true,
      message: 'History cleared!',
    });
  };
  return (
    <main className="main-history">
      <div className="flex space-between align-center">
        <h1>History</h1>
        <button
          onClick={clearHistoryHandler}
          className="btn error rounded-edge"
        >
          Clear History
        </button>
      </div>
      <div className="hr-line fad"></div>
      {history.length !== 0 ? (
        <div className="videos-container">
          {history.map(video => (
            <VideoCard
              key={video._id}
              onDelete={deleteFromHistoryHandler}
              video={video}
            />
          ))}
        </div>
      ) : (
        <div className="empty-history-msg">
          <p>No videos!</p>
          <Link to="/watch">
            <button className="btn primary">Watch Now</button>
          </Link>
        </div>
      )}
    </main>
  );
};
export { History };
