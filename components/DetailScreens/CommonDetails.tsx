import React, { useContext, useEffect, useState } from 'react';

import Helmet from 'react-helmet';
import { ListingHeader } from '../ListingHeader';

export default function CommonDetails(props) {
  console.log('common details:', props);
  const pillButtons = [
    {
      id: '1',
      name: 'All',
      value: 'all',
    },

    {
      id: '2',
      name: 'Movies',
      value: 'movies',
    },
    {
      id: '3',
      name: 'Shows',
      value: 'shows',
    },
    {
      id: '4',
      name: 'Documentary',
      value: 'Documentary',
    },
  ];
  const [totalData, setTotalData] = React.useState(12345);
  const [sort, setSort] = React.useState('relavence');
  const [button, setButton] = React.useState(['all']);
  const [results, setResults] = React.useState<any[]>([]);
  const [unSortedResults, setUnSortedResults] = React.useState<any[]>([]);

  const handleSort = (sort) => {
    let sortedData: any = [];
    if (sort === 'recentlyAdded') {
      sortedData = results.sort((a, b) => b.modified_on - a.modified_on);
      setResults(sortedData);
    } else if (sort === 'imdbScore') {
      sortedData = results.sort((a, b) => b.ottplay_rating - a.ottplay_rating);
      setResults(sortedData);
    } else if (sort === 'releaseYear') {
      sortedData = results.sort(function (a: any, b: any) {
        const date1 = new Date(b.release_date);
        const date2 = new Date(a.release_date);
        const diff = Math.abs(date1.getTime() - date2.getTime());
        const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
        return diffDays;
      });
      setResults(sortedData);
    } else if (sort === 'criticScore') {
      sortedData = results.sort((a, b) => b.tmdb_rating - a.tmdb_rating);
      setResults(sortedData);
    } else if (sort === 'relavence') {
      setResults([...unSortedResults]);
    }
  };

  const handleFilters = (button) => {
    console.log('button: ', button);
  };

  return (
    <React.Fragment>
      {/* <Helmet>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="googlebot" content="noindex,nofollow" />
        <a href="https://domain.xn--com-9o0a" rel="noindex,nofollow"></a>
      </Helmet>{' '} */}
      <ListingHeader
        count={totalData}
        icon={props.icon}
        headerText={props.headerText}
        pillButtons={pillButtons}
        sort={sort}
        setSort={setSort}
        // results={results}
        handleRefine={() => console.log()}
        onSort={handleSort}
        button={button}
        setButton={setButton}
        onSelect={handleFilters}
      />
    </React.Fragment>
  );
}
