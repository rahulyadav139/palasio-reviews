import './Playlists.css';
import { PlaylistCard, CreatePlaylist } from '../../components';
import { usePlaylists } from '../../hooks';
import { Fragment, useState } from 'react';

const Playlists = props => {
  const [isModal, setIsModal] = useState(false);
  const { playlists } = usePlaylists();

  const showModalHandler = () => {
    setIsModal(true);
  };

  const hideModalHandler = () => {
    setIsModal(false);
  };
  return (
    <Fragment>
      <main className="main-playlists">
        <div className="flex space-between align-center">
          <h1>My Playlists</h1>
          <button
            onClick={showModalHandler}
            className="btn primary rounded-edge"
          >
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
      {isModal && <CreatePlaylist onHide={hideModalHandler} />}
    </Fragment>
  );
};
export { Playlists };
