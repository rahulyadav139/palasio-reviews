import './SingleVideoPage.css';
import { VideoCard, PlaylistModal } from '../../components';
import { Fragment, useState, useEffect } from 'react';
import { useFetch, useAuth, useHistory } from '../../hooks';
import { useParams, useNavigate } from 'react-router-dom';
import { dateFormatter, numberFormatter } from '../../utils';

let isReadyToUpdate = true;

const SingleVideoPage = props => {
  const { userId, isAuth } = useAuth();
  const { addToHistory } = useHistory();
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState('');
  const [enableComment, setEnableComment] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const { getData, sendData } = useFetch();
  const params = useParams();
  const navigate = useNavigate();
  const id = params.videoId;

  useEffect(() => {
    if (currentVideo) return addToHistory(currentVideo);
  }, [currentVideo]);

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

      const { data, error, status } = await sendData(
        'http://localhost:8080/videos/liked-disliked',
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

  return (
    <Fragment>
      <main className="main-single-video-page">
        {currentVideo && (
          <div className="video-container">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${currentVideo.videoId}?autoplay=1`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        )}
        <div className="suggestions-container">
          {videos.map(video => (
            <VideoCard video={video} wantWatchLaterButton={true} />
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
