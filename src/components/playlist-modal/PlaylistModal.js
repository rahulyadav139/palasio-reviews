import React from 'react';
import { Fragment, useState, useRef } from 'react';
import ReactDom from 'react-dom';
import './PlaylistModal.css';
import { usePlaylists } from '../../hooks';
import { textFormatter } from '../../utils';
import { v4 as uuid } from 'uuid';

const Backdrop = props => {
  return <div onClick={() => props.onHide()} className="backdrop"></div>;
};

const overlay = document.getElementById('overlay');

const PlaylistModal = props => {
  const [wantNewPlaylist, setWantNewPlaylist] = useState(false);
  const { playlists, createNewPlaylist, addToPlaylist, removeFromPlaylist } =
    usePlaylists();

  const newPlaylistRef = useRef();

  const createNewPlaylistHandler = async () => {
    const newPlaylist = newPlaylistRef.current.value.toLowerCase();

    const error = await createNewPlaylist({
      title: newPlaylist,
      videos: [props.video],
    });

    if (!error) setWantNewPlaylist(false);
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
    <Fragment>
      {ReactDom.createPortal(<Backdrop onHide={props.onHide} />, overlay)}
      {ReactDom.createPortal(
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
                  checked={el.videos.some(
                    video => video._id === props.video._id
                  )}
                />
                <label htmlFor={el.title}>{textFormatter(el.title)}</label>
              </li>
            ))}
          </ul>
          <div className="hr-line solid thin"></div>
          {!wantNewPlaylist && (
            <button
              className="btn-create-playlist"
              onClick={() => setWantNewPlaylist(true)}
            >
              + Create new playlist
            </button>
          )}
          {wantNewPlaylist && (
            <div className="create-new-playlist-actions">
              <input
                ref={newPlaylistRef}
                placeholder="New Playlist"
                type="text"
              />
              <button onClick={createNewPlaylistHandler}>Create</button>
            </div>
          )}
        </div>,
        overlay
      )}
    </Fragment>
  );
};
export { PlaylistModal };
