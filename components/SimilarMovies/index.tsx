import { PagePath, Spinner } from '..';
import React, { useEffect } from 'react';

import { Grid } from '@material-ui/core';
import { MoviesList } from '..';
import { WatchListHeader } from '../watchlist/WatchListHeader';
import { WebfoxContext } from '../../services/webfox';
import { makeStyles } from '@material-ui/core/styles';

export default function SimilarMoviesList({ location }) {
  const classes = useStyles();
  const [button, setButton] = React.useState([0]);
  const [sort, setSort] = React.useState('relavence');
  const [empty, setEmpty] = React.useState(true);
  const [similar, setSimilar] = React.useState<any[]>([]);
  const [unSortedSimilar, setUnSortedSimilar] = React.useState<any[]>([]);
  const [loadingData, setLoadingData] = React.useState(true);

  const seoKey = window.location.pathname.split('/');

  const {
    webfox,
    actions,
    webstore,
    actionDispatch,
    setLoading,
  } = React.useContext(WebfoxContext);

  const apiSimilarData = () => {
    const movies = {
      query: {
        seokey: location.state.seoKey,
        responseType: 'full',
        type: location.state.seoId[1] === 'movie' ? 'movie' : 'show',
      },
    };

    webfox.getSimilarMovies(movies).then(({ data, error }) => {
      if (error) {
        actionDispatch(actions.FETCH_SIMILAR_MOVIES_FAILURE, []);
      }
      actionDispatch(actions.FETCH_SIMILAR_MOVIES_SUCCESS, data || []);
      if (data && data.result) {
        const resultData = data.result.map((v) =>
          Object.assign(v, { img_url: v.posters && v.posters[0] })
        );
        setSimilar(resultData);
        setUnSortedSimilar([...resultData]);
      }
      setLoadingData(false);
    });
  };

  const handleClear = () => {
    if (button.length > 0 || sort) {
      setEmpty(true);
      setButton([]);
      setLoading(true);
      setSort('relavence');
      apiSimilarData();
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    apiSimilarData();
  }, []);

  const handleSelected = (sort) => {
    setEmpty(false);
    if (sort === 'recentlyAdded') {
      setSimilar(similar.sort((a, b) => b.modified_on - a.modified_on));
    } else if (sort === 'imdbScore') {
      setSimilar(similar.sort((a, b) => b.ottplay_rating - a.ottplay_rating));
    } else if (sort === 'releaseYear') {
      // setSimilar(similar.sort((a, b) => b.release_date - a.release_date));
      setSimilar(
        similar.sort(function (a: any, b: any) {
          const date1 = new Date(b.release_date);
          const date2 = new Date(a.release_date);
          const diff = Math.abs(date1.getTime() - date2.getTime());
          const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
          return diffDays;
        })
      );
    } else if (sort === 'criticScore') {
      setSimilar(similar.sort((a, b) => b.tmdb_rating - a.tmdb_rating));
    } else if (sort === 'relavence') {
      setSimilar([...unSortedSimilar]);
    }
  };
  const siteNavigationJSON = {
    '@context': 'http://schema.org',
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'SiteNavigationElement',
        position: 1,
        name: 'Home',
        url: 'http://www.ottplay.com/home',
      },
      {
        '@type': 'SiteNavigationElement',
        position: 2,
        name: 'Similar Movie/Show',
        url: 'http://www.ottplay.com/' + window.location.pathname,
      },
    ],
  };
  const breadcrumbSchemaJSON = {
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: { '@id': 'http://www.ottplay.com/home', name: 'Home' },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@id': 'http://www.ottplay.com/' + window.location.pathname,
          name: 'Similar Movie/Show',
        },
      },
    ],
  };
  return (
    <div className={classes.root}>
      {/* <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(siteNavigationJSON)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchemaJSON)}
        </script>
      </Helmet>
      <Helmet>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="googlebot" content="noindex,nofollow" />
        <a href="https://domain.xn--com-9o0a" rel="noindex,nofollow"></a>
      </Helmet> */}
      <Grid xs={12} container>
        <Grid sm={1} lg={2} item></Grid>
        <Grid xs={12} sm={10} lg={8} className={classes.containerBox} item>
          <Grid xs={12} item>
            {/* <p className={classes.path}>
              {`Discover » ${location.state.seoId[1]} » ${location.state.name} » Similar ${location.state.seoId[1]}s`}
            </p> */}
            <PagePath
              path={[
                { name: 'Home', path: '/home' },
                {
                  name: `${location.state.seoId[1]}`,
                  path: '/' + `${location.state.seoId[1]}` + 's',
                },
                {
                  name: `${location.state.name}`,
                  path: null,
                },
                {
                  name: `Similar ${location.state.seoId[1]}s`,
                  path: null,
                },
              ]}
            />
            {/* <p className={classes.path}>
              {'Home'} <span>{'>>'}</span> {`${location.state.seoId[1]}`}{' '}
              <span>{'>>'}</span> {`${location.state.name}`} <span>{'>>'}</span>{' '}
              {`Similar ${location.state.seoId[1]}s`}
            </p> */}
          </Grid>
          <WatchListHeader
            sort={sort}
            setSort={setSort}
            data={`Similar ${location.state.seoId[1]}s`}
            clear={handleClear}
            disabled={empty === true ? true : false}
            onSelect={handleSelected}
            results={similar}
          />
          {/* <FilterButton button={button} setButton={setButton} /> */}
          {loadingData ? (
            <Spinner styles={{ paddingBottom: '70px' }} />
          ) : (
            <MoviesList
              results={similar}
              tag={'similar'}
              screen={'see_all'}
              source={'Similar'}
            />
          )}
        </Grid>
        <Grid sm={1} lg={2} item></Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    minHeight: '75vh',
  },
  containerBox: {
    padding: '0 20px',
  },
  path: {
    color: '#ffffff',
    opacity: 0.6,
    fontSize: 'clamp(10px, 0.9vw, 14px)',
    margin: '20px 0px 4px 0px',
    textTransform: 'capitalize',
    '& span': {
      fontSize: 10,
      letterSpacing: -1,
      margin: '0px 4px',
    },
  },
  [theme.breakpoints.down('xs')]: {
    path: {
      fontSize: 10,
      textTransform: 'uppercase',
      marginLeft: 16,
      marginTop: 16,
      '& span': {
        fontSize: 8,
      },
    },
    containerBox: {
      padding: '0',
    },
  },
}));
