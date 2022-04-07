import  './VideoCard.css';

const VideoCard = props => {
  return (
    <div className='video-card'>
      <div className='video-card__image'>
        <img
          className="img-responsive"
          src="https://i.picsum.photos/id/68/536/354.jpg?hmac=1HfgJb31lF-wUi81l2uZsAMfntViiCV9z5_ntQvW3Ks"
        />
      </div>
      <div className='video-card__details'>
        <p className="heading-6">SEN Sintara Leaks his Team</p>
        <p className="text-small">Sintara</p>
        <div className='video-card__views'>
          <p className="text-small">6K Views</p>
          <span className="text-small">|</span>
          <p className="text-small">13 Hours ago</p>
        </div>
      </div>
    </div>
  );
};

export { VideoCard };
