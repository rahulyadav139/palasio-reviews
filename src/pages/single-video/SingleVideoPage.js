import './SingleVideoPage.css';
import { VideoCard, PlaylistModal } from '../../components';
import { Fragment, useState, useEffect } from 'react';
import { useFetch, useAuth } from '../../hooks';
import { useParams, useNavigate } from 'react-router-dom';
import { dateFormatter, numberFormatter } from '../../utils';

const SingleVideoPage = props => {
  const { userId, isAuth } = useAuth();
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState('');
  const [enableComment, setEnableComment] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const { getData, sendData } = useFetch();
  const params = useParams();
  const navigate = useNavigate();
  const id = params.videoId;

  let isLikedReady = true;
  let isDislikedReady = true;

  useEffect(() => {
    (async () => {
      const { data, error, status } = await getData(
        'http://localhost:8080/videos',
        false
      );
      setVideos(data.filter(el => el._id !== id));
      setCurrentVideo(data.filter(el => el._id === id)[0]);
    })();
  }, [getData, id]);

  const focusCommentHandler = () => {
    setEnableComment(true);
  };

  const cancelCommentHandler = () => {
    setEnableComment(false);
  };

  const hidePlaylistModalHandler = () => {
    setIsModal(false);
  };

  const showPlaylistModalHandler = () => {
    if (!isAuth) return navigate('/auth');

    setIsModal(true);
  };

  const likedHandler = async e => {
    if (!isAuth) return navigate('/auth');

    if (isLikedReady) {
      isLikedReady = false;

      let likedArr = currentVideo.liked.slice();

      if (e.target.checked) {
        likedArr.push(userId);
      } else {
        likedArr = likedArr.filter(el => el !== userId);
      }

      const { data, error, status } = await sendData(
        'http://localhost:8080/videos/liked',
        'POST',
        { _id: id, likedArr },
        true
      );

      if (error) return;

      setCurrentVideo(prev => ({ ...prev, liked: likedArr }));

      isLikedReady = true;
    }
  };

  const dislikedHandler = async e => {
    if (!isAuth) return navigate('/auth');

    if (isDislikedReady) {
      isDislikedReady = false;

      let dislikedArr = currentVideo.disliked.slice();

      if (e.target.checked) {
        dislikedArr.push(userId);
      } else {
        dislikedArr = dislikedArr.filter(el => el !== userId);
      }

      const { data, error, status } = await sendData(
        'http://localhost:8080/videos/disliked',
        'POST',
        { _id: id, dislikedArr },
        true
      );

      if (error) return;

      setCurrentVideo(prev => ({ ...prev, disliked: dislikedArr }));

      isDislikedReady = true;
    }
  };

  return (
    <Fragment>
      <main className="main-single-video-page">
        {currentVideo && (
          <div className="video-container">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${currentVideo.videoId}`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        )}
        <div className="suggestions-container">
          {videos.map(video => (
            <VideoCard video={video} />
          ))}
        </div>
        <div className="video-details">
          <h3>{currentVideo?.title}</h3>
          <div className="flex space-between">
            <div className="flex gap text-small">
              <p>1,00,000 views</p>
              <p>{dateFormatter(currentVideo.publishedAt)}</p>
            </div>
            <div className="video-actions flex gap ">
              <input
                onChange={likedHandler}
                type="checkbox"
                id="liked"
                checked={currentVideo.liked?.includes(userId)}
              />
              <label htmlFor="liked">
                {currentVideo.liked?.includes(userId) ? (
                  <i className="fas fa-thumbs-up"></i>
                ) : (
                  <i className="far fa-thumbs-up"></i>
                )}
                {` ${numberFormatter(currentVideo.liked?.length)}`}
              </label>
              <input
                onChange={dislikedHandler}
                type="checkbox"
                id="disliked"
                checked={currentVideo.disliked?.includes(userId)}
              />
              <label htmlFor="disliked">
                {currentVideo.disliked?.includes(userId) ? (
                  <i className="fas fa-thumbs-down"></i>
                ) : (
                  <i className="far fa-thumbs-down"></i>
                )}
                {` ${numberFormatter(currentVideo.disliked?.length)}`}
              </label>
              <button>
                <i className="fas fa-share-alt"></i> Share
              </button>
              <button onClick={showPlaylistModalHandler}>
                <i className="far fa-bookmark"></i> Add to playlist
              </button>
            </div>
          </div>
          <div className="hr-line fad"></div>
          <div className="video-description">
            <h5>Description</h5>
            <p className="text-small">{currentVideo?.description}</p>
          </div>
          <div className="video-comments">
            <input
              onFocus={focusCommentHandler}
              placeholder="Comment"
              type="text"
            />
            {enableComment && (
              <div className="video-comments__buttons">
                <button onClick={cancelCommentHandler}>Cancel</button>
                <button>Comment</button>
              </div>
            )}
            <ul>
              {currentVideo.comments?.map(el => (
                <li className="flex gap">
                  <div className="avatar small">R</div>
                  <div>
                    <div className="flex gap">
                      <h6>Rahul Yadav</h6>
                      <p className="text-small">1hr ago</p>
                    </div>
                    <p>Nice Video</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      {isModal && (
        <PlaylistModal onHide={hidePlaylistModalHandler} video={currentVideo} />
      )}
    </Fragment>
  );
};
export { SingleVideoPage };
