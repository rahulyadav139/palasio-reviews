import './Loading.css';
import loadingGif from '../../assets/loading-image.gif';
import { Fragment, useEffect } from 'react';
import { useLoading } from '../../hooks';

const Loading = props => {
  const { loading } = useLoading;
  useEffect(() => {
    loading
      ? document.querySelector('body').classList.add('no-overflow')
      : document.querySelector('body').classList.remove('no-overflow');
  }, [loading]);

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
