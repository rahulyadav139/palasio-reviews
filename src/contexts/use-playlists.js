import React, { useReducer } from 'react';
import { useFetch } from '../hooks';

const PlaylistsContext = React.createContext();

let isReadyToUpdatePlaylists = true;

const playlistsReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_NEW_PLAYLIST':
      return action.payload;

    case 'GET':
      return action.payload;

    case 'ADD':
      return action.payload;

    case 'REMOVE':
      return action.payload;

    case 'DELETE':
      return action.payload;
  }
};

const PlaylistsProvider = props => {
  const [state, dispatch] = useReducer(playlistsReducer, []);
  const { sendData } = useFetch();

  console.log(state);
  console.log(isReadyToUpdatePlaylists);

  const createNewPlaylistHandler = async playlistData => {
    if (isReadyToUpdatePlaylists) {
      isReadyToUpdatePlaylists = false;

      const { title } = playlistData;
      console.log(playlistData);
      const hasPlaylist = state.findIndex(el => el.title === title);

      if (hasPlaylist >= 0) {
        isReadyToUpdatePlaylists = true;
        return 'playlist exists with same name!';
      }

      const updatedPlaylists = [...state, playlistData];

      const { error } = await sendData(
        'http://localhost:8080/user/update-playlists',
        'POST',
        updatedPlaylists,
        true
      );

      if (!error) {
        dispatch({
          type: 'CREATE_NEW_PLAYLIST',
          payload: updatedPlaylists,
        });
      }
      isReadyToUpdatePlaylists = true;
    }
  };

  const addToPlaylistHandler = async ({ playlistTitle, video }) => {
    if (isReadyToUpdatePlaylists) {
      isReadyToUpdatePlaylists = false;
      const updatedPlaylists = state.map(el =>
        el.title === playlistTitle
          ? { ...el, videos: el.videos.concat(video) }
          : el
      );

      const { error } = await sendData(
        'http://localhost:8080/user/update-playlists',
        'POST',
        updatedPlaylists,
        true
      );

      if (!error) {
        dispatch({ type: 'ADD', payload: updatedPlaylists });
      }
      isReadyToUpdatePlaylists = true;
    }
  };

  const removeFromPlaylistHandler = async ({ playlistTitle, videoId }) => {
    if (isReadyToUpdatePlaylists) {
      isReadyToUpdatePlaylists = false;
      const updatedPlaylists = state.map(el =>
        el.title === playlistTitle
          ? { ...el, videos: el.videos.filter(el => el._id !== videoId) }
          : el
      );

      const { error } = await sendData(
        'http://localhost:8080/user/update-playlists',
        'POST',
        updatedPlaylists,
        true
      );

      if (!error) {
        dispatch({ type: 'REMOVE', payload: updatedPlaylists });
      }
      isReadyToUpdatePlaylists = true;
    }
  };

  const deletePlaylistHandler = async playlistTitle => {
    if (isReadyToUpdatePlaylists) {
      isReadyToUpdatePlaylists = false;
      const updatedPlaylists = state.filter(el => el.title !== playlistTitle);

      const { error } = await sendData(
        'http://localhost:8080/user/update-playlists',
        'POST',
        updatedPlaylists,
        true
      );

      if (!error) {
        dispatch({ type: 'DELETE', payload: updatedPlaylists });
      }
      isReadyToUpdatePlaylists = true;
    }
  };

  const getPlaylistsDataHandler = playlists => {
    dispatch({ type: 'GET', payload: playlists });
  };

  const defaultValues = {
    playlists: state,
    createNewPlaylist: createNewPlaylistHandler,
    getPlaylistsData: getPlaylistsDataHandler,
    addToPlaylist: addToPlaylistHandler,
    removeFromPlaylist: removeFromPlaylistHandler,
    deletePlaylist: deletePlaylistHandler,
  };

  return (
    <PlaylistsContext.Provider value={defaultValues}>
      {props.children}
    </PlaylistsContext.Provider>
  );
};

export { PlaylistsContext, PlaylistsProvider };
