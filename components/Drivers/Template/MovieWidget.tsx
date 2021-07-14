import React from 'react';
import { SimilarMovies } from '../../MovieShowDetails/MovieShowDetailsComponent/SimilarMovies';

export function MovieWidget({ ...props }) {
  const { title, data, seeAll, referance, section } = props;

  if(data.length >0)
  return (
    <SimilarMovies
      title={title}
      data={[...data].slice(0, 10)}
      fullResults={[...data]}
      screen={'home'}
      section={section}
      seeAll={seeAll}
      referance={referance}
    />
  );
  else return null
}
