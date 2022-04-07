import './Loading.css';
import loadingGif from '../../assets/loading-image.gif';
import { Fragment } from 'react';

const Loading = props => {
  return (
    <Fragment>
      <div className="loading-container">
        <img src={loadingGif} alt="loading" />
      </div>
      <div className="loading-backdrop"></div>
    </Fragment>
  );
};
export { Loading };
