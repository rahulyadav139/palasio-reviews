import React from 'react';
import { useState, useRef } from 'react';
import './PlaylistModal.css';
import { usePlaylists, useToast } from '../../hooks';
import { textFormatter } from '../../utils';
import { v4 as uuid } from 'uuid';
import { Modal } from '../ui/modal/Modal';

const PlaylistModal = props => {
  const [wantNewPlaylist, setWantNewPlaylist] = useState(false);
  const { playlists, createNewPlaylist, addToPlaylist, removeFromPlaylist } =
    usePlaylists();
  const { setToast } = useToast();

  const newPlaylistRef = useRef();

  const createNewPlaylistHandler = async () => {
    const newPlaylist = newPlaylistRef.current.value.toLowerCase();

    if (!newPlaylist)
      return setToast({
        status: true,
        type: 'danger',
        message: 'Invalid playlist name!',
      });

    const error = await createNewPlaylist({
      title: newPlaylist,
      videos: [props.video],
    });

    if (!error) {
      setWantNewPlaylist(false);
      setToast({
        status: true,
        type: 'success',
        message: `New playlist "${textFormatter(newPlaylist)}" is created!`,
      });
    }
  };

  const playlistHandler = e => {
    e.target.checked
      ? addToPlaylist({ playlistTitle: e.target.value, video: props.video })
      : removeFromPlaylist({
          playlistTitle: e.target.value,
          videoId: props.video._id,
        });
  };

  return (
    <Modal onHide={props.onHide}>
      <div className="playlist-modal">
        <div className="flex align-center space-between">
          <h4>Save to...</h4>
          <button className="btn-modal-dismiss" onClick={props.onHide}>
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div className="hr-line solid thin"></div>
        <ul>
          {playlists.map(el => (
            <li key={uuid()}>
              <input
                onChange={playlistHandler}
                type="checkbox"
                value={el.title}
                id={el.title}
                checked={el.videos.some(video => video._id === props.video._id)}
              />
              <label htmlFor={el.title}>{textFormatter(el.title)}</label>
            </li>
          ))}
        </ul>
        <div className="hr-line solid thin"></div>
        {!wantNewPlaylist ? (
          <button
            className="btn-create-playlist"
            onClick={() => setWantNewPlaylist(true)}
          >
            + Create new playlist
          </button>
        ) : (
          <div className="create-new-playlist-actions">
            <input
              ref={newPlaylistRef}
              placeholder="New Playlist"
              type="text"
            />
            <button onClick={createNewPlaylistHandler}>Create</button>
          </div>
        )}
      </div>
    </Modal>
  );
};
export { PlaylistModal };
