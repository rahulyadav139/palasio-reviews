import './SingleVideoPage.css';
import { VideoCard, PlaylistModal } from '../../components';
import { Fragment, useState, useEffect, useRef } from 'react';
import { useFetch, useAuth, useHistory } from '../../hooks';
import { useParams, useNavigate } from 'react-router-dom';
import { dateFormatter, numberFormatter, timeDifferenceFun } from '../../utils';

let isReadyToUpdate = true;
let isReadyToComment = true;

const SingleVideoPage = props => {
  const { userId, isAuth, username } = useAuth();
  const { addToHistory } = useHistory();
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState('');
  const [enableComment, setEnableComment] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const { getData, sendData } = useFetch();
  const params = useParams();
  const navigate = useNavigate();
  const commentInputRef = useRef();
  const id = params.videoId;

  useEffect(() => {
    if (currentVideo && isAuth) addToHistory(currentVideo);

    window.scrollTo(0, 0);
  }, [currentVideo, isAuth]);

  useEffect(() => {
    (async () => {
      const { data } = await getData(
        `${process.env.REACT_APP_BACKEND_URL}/videos`,
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

  const likedDislikedHandler = async (type, e) => {
    if (!isAuth) return navigate('/auth');

    if (isReadyToUpdate) {
      isReadyToUpdate = false;

      let updatedLiked = currentVideo.liked.slice();
      let updatedDisliked = currentVideo.disliked.slice();

      if (e.target.checked) {
        if (type === 'like') {
          updatedLiked.push(userId);
          updatedDisliked = updatedDisliked.filter(el => el !== userId);
        } else {
          updatedLiked = updatedLiked.filter(el => el !== userId);
          updatedDisliked.push(userId);
        }
      } else {
        type === 'like'
          ? (updatedLiked = updatedLiked.filter(el => el !== userId))
          : (updatedDisliked = updatedDisliked.filter(el => el !== userId));
      }

      const { error } = await sendData(
        `${process.env.REACT_APP_BACKEND_URL}/videos/liked-disliked`,
        'POST',
        { _id: id, updatedLiked, updatedDisliked },
        true
      );

      if (error) return;

      setCurrentVideo(prev => ({
        ...prev,
        liked: updatedLiked,
        disliked: updatedDisliked,
      }));

      isReadyToUpdate = true;
    }
  };

  const submitCommentHandler = async () => {
    if (!isAuth) return navigate('/auth');

    const comment = commentInputRef.current.value;

    if (!comment) return;

    const commentData = {
      user: username,
      comment: comment,
      time: new Date().toISOString(),
    };

    if (isReadyToComment) {
      isReadyToComment = false;
      const { error } = await sendData(
        `${process.env.REACT_APP_BACKEND_URL}/videos/new-comment`,
        'POST',
        { _id: id, commentData },
        true
      );

      if (!error)
        setCurrentVideo(prev => ({
          ...prev,
          comments: prev.comments.concat(commentData),
        }));
      isReadyToComment = true;
    }

    commentInputRef.current.value = '';

    setEnableComment(false);
  };

  return (
    <Fragment>
      <main className="main-single-video-page">
        {currentVideo && (
          <div>
            <div className="video-container">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${currentVideo.videoId}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
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
                    onChange={likedDislikedHandler.bind(null, 'like')}
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
                    onChange={likedDislikedHandler.bind(null, 'dislike')}
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
                  ref={commentInputRef}
                  onFocus={focusCommentHandler}
                  placeholder="Comment"
                  type="text"
                />
                {enableComment && (
                  <div className="video-comments__buttons">
                    <button onClick={cancelCommentHandler}>Cancel</button>
                    <button onClick={submitCommentHandler}>Comment</button>
                  </div>
                )}
                <ul className="flex col gap">
                  {currentVideo.comments?.map(el => (
                    <li className="flex gap">
                      <div className="avatar small">{el?.user[0]}</div>
                      <div>
                        <div className="flex gap">
                          <p className="text-small text-bold">{el.user}</p>
                          <p className="text-small">
                            {timeDifferenceFun(el.time)}
                          </p>
                        </div>
                        <p>{el.comment}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        <div className="suggestions-container">
          {videos.slice(0, 10).map(video => (
            <VideoCard
              key={video._id}
              video={video}
              wantWatchLaterButton={true}
            />
          ))}
        </div>
      </main>
      {isModal && (
        <PlaylistModal onHide={hidePlaylistModalHandler} video={currentVideo} />
      )}
    </Fragment>
  );
};
export { SingleVideoPage };
