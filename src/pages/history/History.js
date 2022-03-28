import { VideoCard } from '../../components';
import { useHistory } from '../../hooks';
import './History.css';

const History = props => {
  const { history, clearHistory, removeFromHistory } = useHistory();

  const deleteFromHistoryHandler = id => {
    removeFromHistory(id);
  };
  return (
    <main className="main-history">
      <div className="flex space-between align-center">
        <h1>History</h1>
        <button onClick={clearHistory} className="btn error rounded-edge">
          Clear History
        </button>
      </div>
      <div className="videos-container">
        {history.map(video => (
          <VideoCard onDelete={deleteFromHistoryHandler} video={video} />
        ))}
      </div>
    </main>
  );
};
export { History };
