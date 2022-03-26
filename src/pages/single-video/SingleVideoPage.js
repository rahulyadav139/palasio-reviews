import './SingleVideoPage.css';
import { VideoCard } from '../../components';
import { Fragment, useState, useEffect } from 'react';
import { useFetch } from '../../hooks';
import { useParams } from 'react-router-dom';
import { dateFormatter } from '../../utils';

const SingleVideoPage = props => {
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState('');
  const [enableComment, setEnableComment] = useState(false);
  const { getData } = useFetch();
  const params = useParams();
  const id = params.videoId;
  console.log(id);
  console.log(currentVideo);

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
            <VideoCard dismissBtn={false} video={video} />
          ))}
        </div>
        <div className="video-details">
          <h3>{currentVideo?.title}</h3>
          <div className="flex space-between">
            <div className="flex gap text-small">
              <p>1,00,000 views</p>
              <p>{dateFormatter(currentVideo.publishedAt)}</p>
            </div>
            <div className="flex gap ">
              <span>
                <i className="far fa-thumbs-up"></i> 1.1K
              </span>
              <span>
                <i className="far fa-thumbs-down"></i> 0.7K
              </span>
              <span>
                <i className="fas fa-share-alt"></i> Share
              </span>
              <span>
                <i className="far fa-bookmark"></i> Add to playlist
              </span>
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
    </Fragment>
  );
};
export { SingleVideoPage };
