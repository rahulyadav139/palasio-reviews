import './CreatePlaylist.css';
import { Modal } from '../ui/modal/Modal';
import { useRef } from 'react';
import { usePlaylists } from '../../hooks';

const CreatePlaylist = props => {
  const { createNewPlaylist } = usePlaylists();
  const newPlaylistRef = useRef();
  const createNewPlaylistHandler = async () => {
    const newPlaylist = newPlaylistRef.current.value.toLowerCase();

    if (!newPlaylist) return;

    const error = await createNewPlaylist({
      title: newPlaylist,
      videos: [],
    });

    if (!error) props.onHide();
  };
  return (
    <Modal onHide={props.onHide}>
      <div className="create-new-playlist-modal">
        <h1>New Playlist</h1>
        <input ref={newPlaylistRef} placeholder="Playlist" />
        <div className="flex end">
          <button onClick={createNewPlaylistHandler} className="btn primary">
            Create
          </button>
        </div>
      </div>
    </Modal>
  );
};
export { CreatePlaylist };
