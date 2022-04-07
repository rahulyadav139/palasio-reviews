import './Playlists.css';
import { PlaylistCard } from '../../components';
import { usePlaylists } from '../../hooks';

const Playlists = props => {
  const { playlists } = usePlaylists();
  return (
    <main className="main-playlists">
      <div className="flex space-between align-center">
        <h1>My Playlists</h1>
        <button className="btn primary rounded-edge">
          Create New Playlists
        </button>
      </div>
      <div className="playlists-container">
        {playlists
          .filter(el => el.title !== 'watch later')
          .map(playlist => (
            <PlaylistCard
              title={playlist.title}
              numOfVideos={playlist.videos.length}
            />
          ))}
      </div>
    </main>
  );
};
export { Playlists };
