import { Fragment } from 'react';
import './Homepage.css';
import { Header } from '../components';
import landingPageImage from '../assets/landing-page-image.jpg';

const Homepage = props => {
  return (
    <Fragment>
      <Header />
      <main className="main-homepage">
        <div className="image-homepage">
          <img className="img-responsive" src={landingPageImage} alt="sample" />
        </div>
      </main>
    </Fragment>
  );
};
export { Homepage };
