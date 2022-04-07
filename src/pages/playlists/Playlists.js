import './Playlists.css';
import { PlaylistCard, CreatePlaylist } from '../../components';
import { usePlaylists } from '../../hooks';
import { Fragment, useState } from 'react';
import { v4 as uuid } from 'uuid';

const Playlists = props => {
  const [isModal, setIsModal] = useState(false);
  const { playlists } = usePlaylists();

  const showModalHandler = () => {
    setIsModal(true);
  };

  const hideModalHandler = () => {
    setIsModal(false);
  };

  const userPlaylists = playlists.filter(el => el.title !== 'watch later');
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
        <div className="hr-line fad"></div>
        {userPlaylists.length !== 0 ? (
          <div className="playlists-container">
            {userPlaylists.map(playlist => (
              <PlaylistCard
                key={uuid()}
                title={playlist.title}
                numOfVideos={playlist.videos.length}
              />
            ))}
          </div>
        ) : (
          <p className="empty-playlists-msg">There no playlists!</p>
        )}
      </main>
      {isModal && <CreatePlaylist onHide={hideModalHandler} />}
    </Fragment>
  );
};
export { Playlists };
