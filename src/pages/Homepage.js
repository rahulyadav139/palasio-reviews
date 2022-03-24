import { Fragment } from 'react';
import './Homepage.css';
import { Header, VideoCard } from '../components';
import landingPageImage from '../assets/landing-page-image.jpg';

const Homepage = props => {
  return (
    <Fragment>
      <Header />
      <main className="main-homepage">
        <div className="image-homepage">
          <img className="img-responsive" src={landingPageImage} alt="sample" />
        </div>
        <h1>Trending Videos</h1>
        <div className="video-cards-container">
          {Array.from({ length: 5 }).map(el => (
            <VideoCard dismissBtn={false}/>
          ))}
        </div>
      </main>
    </Fragment>
  );
};
export { Homepage };
