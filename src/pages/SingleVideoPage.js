import './SingleVideoPage.css';
import { Header, VideoCard } from '../components';
import { Fragment } from 'react';

const SingleVideoPage = props => {
  return (
    <Fragment>
      <Header />

      <main className="main-single-video-page">
        <div className="video-container">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/ekgUjyWe1Yc"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div className="suggestions-container">
          {Array.from({ length: 5 }).map(el => (
            <VideoCard dismissBtn={false} />
          ))}
        </div>
        <div className="video-details">
          <h3>
            In publishing and graphic design, Lorem ipsum is a placeholder text
          </h3>
          <div className="flex space-between">
            <div className="flex gap text-small">
              <p>1,00,000 views</p>
              <p>21 Apr 2019</p>
            </div>
            <div className="flex gap text-small">
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
            <p className="text-small">
              In publishing and graphic design, Lorem ipsum is a placeholder
              text commonly used to demonstrate the visual form of a document or
              a typeface without relying on meaningful content. Lorem ipsum may
              be used as a placeholder before the final copy is available.
            </p>
          </div>
          <div className="video-comments">
            <input placeholder="Comment" type="text" />
            <div className="video-comments__buttons">
              <button>Cancel</button>
              <button>Comment</button>
            </div>
            <ul>
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
            </ul>
          </div>
        </div>
      </main>
    </Fragment>
  );
};
export { SingleVideoPage };
