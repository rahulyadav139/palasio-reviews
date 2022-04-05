import React, { useState } from 'react';
import { useFetch } from '../hooks';

const LikedVideosContext = React.createContext();

const LikedVideosProvider = props => {
  const [likedVideos, setLikedVideos] = useState([]);

  const { sendData } = useFetch();

  const addToLikedVideosHandler = async video => {
    const updatedLikedVideos = likedVideos.concat(video);

    const { error } = await sendData(
      `${process.env.REACT_APP_BACKEND_URL}/user/add-to-liked-videos`,
      'POST',
      { likedVideo: video },
      true
    );

    if (!error) {
      setLikedVideos(updatedLikedVideos);
    }
  };

  const removeFromLikedVideosHandler = async videoId => {
    const updatedLikedVideos = likedVideos.filter(el => el._id !== videoId);

    const { error } = await sendData(
      `${process.env.REACT_APP_BACKEND_URL}/user/remove-from-liked-videos`,
      'POST',
      { videoId },
      true
    );

    if (!error) {
      setLikedVideos(updatedLikedVideos);
    }
  };

  const clearLikedVideosHandler = async () => {
    const { error } = await sendData(
      `${process.env.REACT_APP_BACKEND_URL}/user/clear-liked-videos`,
      'POST',
      [],
      true
    );
    if (!error) setLikedVideos([]);
  };

  const getLikedVideosHandler = likedVideos => {
    setLikedVideos(likedVideos);
  };

  const defaultValues = {
    likedVideos,

    getLikedVideos: getLikedVideosHandler,
    clearLikedVideos: clearLikedVideosHandler,
    removeFromLikedVideos: removeFromLikedVideosHandler,
    addToLikedVideos: addToLikedVideosHandler,
  };

  return (
    <LikedVideosContext.Provider value={defaultValues}>
      {props.children}
    </LikedVideosContext.Provider>
  );
};

export { LikedVideosContext, LikedVideosProvider };
