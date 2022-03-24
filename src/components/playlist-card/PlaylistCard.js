import './PlaylistCard.css';

const PlaylistCard = props => {
  return (
    <div className="playlist-card shadow">
      <div>
        <p className="text-bold">Playlist 1</p>
        <p className="text-small text-grey">10 videos</p>
      </div>
      <button className="icon small btn primary">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  );
};
export { PlaylistCard };
