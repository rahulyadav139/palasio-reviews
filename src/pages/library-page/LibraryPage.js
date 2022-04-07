import './LibraryPage.css';
import { VideoCard } from '../../components';
import { useState, useEffect } from 'react';
import { useFetch } from '../../hooks';

const LibraryPage = props => {
  const [videos, setVideos] = useState([]);
  const [category, setCategory] = useState('all');
  const { getData } = useFetch();

  useEffect(() => {
    (async () => {
      const { data, error, status } = await getData(
        'http://localhost:8080/videos',
        false
      );
      setVideos(data);
    })();
  }, [getData]);

  const filteredVideos = category => {
    return category === 'all'
      ? videos
      : videos.filter(el => el.category === category);
  };

  const selectCategoryHandler = e => {
    setCategory(e.target.value);
  };
  return (
    <main className="main-library-page">
      <div className="categories">
        <ul>
          <li className="category">
            <input
              onChange={selectCategoryHandler}
              id="all"
              type="radio"
              name="filter"
              value="all"
              checked={'all' === category}
            />
            <label htmlFor="all">All</label>
          </li>
          <li className="category">
            <input
              onChange={selectCategoryHandler}
              id="hatchback"
              type="radio"
              name="filter"
              value="hatchback"
              checked={'hatchback' === category}
            />
            <label htmlFor="hatchback">Hatchback</label>
          </li>
          <li className="category">
            <input
              onChange={selectCategoryHandler}
              id="sedan"
              type="radio"
              name="filter"
              value="sedan"
              checked={'sedan' === category}
            />
            <label htmlFor="sedan">Sedan</label>
          </li>
          <li className="category">
            <input
              onChange={selectCategoryHandler}
              id="luxury"
              type="radio"
              name="filter"
              value="luxury"
              checked={'luxury' === category}
            />
            <label htmlFor="luxury">Luxury</label>
          </li>
        </ul>
      </div>
      <div className="video-cards-wrapper">
        {filteredVideos(category).map(video => (
          <VideoCard dismissBtn={false} video={video} />
        ))}
      </div>
    </main>
  );
};
export { LibraryPage };
