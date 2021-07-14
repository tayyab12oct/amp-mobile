import { Grid, Hidden } from '@material-ui/core';
import { NavBar, PagePath, Spinner, TopHeader } from '../../components';
import React, { Fragment, useEffect } from 'react';
import {
  getMoviesDetailsList,
  getMoviesList,
} from '../../services/webbase/queries';

import { MoviesList } from '../../components';
import SEO from '../../components/Seo';
import { WatchListHeader } from '../../components/watchlist/WatchListHeader';
import { WebfoxContext } from '../../services/webfox';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import webfox from '../../services/webbase';

export default function SimilarMoviesList({ location }) {
  const classes = useStyles();
  const [button, setButton] = React.useState([0]);
  const [sort, setSort] = React.useState('relevance');
  const [empty, setEmpty] = React.useState(true);
  const [similar, setSimilar] = React.useState<any[]>([]);
  const [unSortedSimilar, setUnSortedSimilar] = React.useState<any[]>([]);
  const [loadingData, setLoadingData] = React.useState(true);

  //const seoKey =
  typeof window !== 'undefined' && window.location?.pathname.split('/');
  const router = useRouter();
  const filterData = router.query.similarmovieshow;
  const seoKey = filterData && filterData[1] + '/' + filterData[2];
  const type = filterData && filterData[0];
  //const name = filterData && filterData[1];
  //console.log('Similar Movies' + JSON.stringify(router.query));

  const {
    webfox,
    actions,
    webstore,
    actionDispatch,
    setLoading,
  } = React.useContext(WebfoxContext);

  const apiSimilarData = () => {
    const pathName =
      typeof window !== 'undefined' && window.location.pathname.split('/')[2];
    const movies = {
      query: {
        seokey: seoKey,
        responseType: 'full',
        type: pathName === 'movie' ? 'movie' : 'show',
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

  useEffect(() => {
    window.scrollTo(0, 0);
    if (filterData) {
      apiSimilarData();
    }
  }, [filterData]);

  const handleClear = () => {
    if (button.length > 0 || sort) {
      setEmpty(true);
      setButton([]);
      setLoading(true);
      setSort('relevance');
      apiSimilarData();
    }
  };

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
    } else if (sort === 'relevance') {
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
        url:
          'http://www.ottplay.com/' +
          (typeof window !== 'undefined' && window.location?.pathname),
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
          '@id':
            'http://www.ottplay.com/' +
            (typeof window !== 'undefined' && window.location?.pathname),
          name: 'Similar Movie/Show',
        },
      },
    ],
  };
  return (
    <Fragment>
      <div className={classes.root}>
        <SEO>
          <script type="application/ld+json">
            {JSON.stringify(siteNavigationJSON)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(breadcrumbSchemaJSON)}
          </script>
        </SEO>
        <SEO>
          <meta name="robots" content="noindex,nofollow" />
          <meta name="googlebot" content="noindex,nofollow" />
        </SEO>
        <Grid xs={12} container>
          <Grid sm={1} lg={2} item></Grid>
          {loadingData ? (
            <Spinner styles={{ paddingBottom: '70px' }} />
          ) : (
            <Grid xs={12} sm={10} lg={8} className={classes.containerBox} item>
              <Grid xs={12} item>
                {/* <p className={classes.path}>
              {`Discover » ${location?.state.seoId[1]} » ${location?.state.name} » Similar ${location?.state.seoId[1]}s`}
            </p> */}
                <PagePath
                  path={[
                    { name: 'Home', path: '/home' },
                    {
                      name: `${type}`,
                      path: '/' + `${type}` + 's',
                    },
                    // {
                    //   name: `${name}`,
                    //   path: null,
                    // },
                    {
                      name:
                        type == 'web-series'
                          ? `Similar ${type}`
                          : type == 'tv-shows'
                          ? `Similar ${type}`
                          : type == 'shows'
                          ? `Similar ${type}`
                          : `Similar ${type}s`,
                      path: null,
                    },
                  ]}
                />
                {/* <p className={classes.path}>
              {'Home'} <span>{'>>'}</span> {`${location?.state.seoId[1]}`}{' '}
              <span>{'>>'}</span> {`${location?.state.name}`} <span>{'>>'}</span>{' '}
              {`Similar ${location?.state.seoId[1]}s`}
            </p> */}
              </Grid>
              <WatchListHeader
                sort={sort}
                setSort={setSort}
                data={
                  type == 'web-series'
                    ? `Similar ${type}`
                    : type == 'tv-shows'
                    ? `Similar ${type}`
                    : type == 'shows'
                    ? `Similar ${type}`
                    : `Similar ${type}s`
                }
                clear={handleClear}
                disabled={empty === true ? true : false}
                onSelect={handleSelected}
                results={similar}
              />
              {/* <FilterButton button={button} setButton={setButton} /> */}

              <MoviesList
                results={similar}
                tag={'similar'}
                screen={'see_all'}
                source={'Similar'}
              />
            </Grid>
          )}
          <Grid sm={1} lg={2} item></Grid>
        </Grid>
      </div>
    </Fragment>
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

export async function getStaticProps(props) {
  // let allShowsList = null;
  // let typeData = '';
  // if (props.location && props.location?.state && props.location?.state.forPage) {
  //   typeData = props.location?.state.forPage.slice(0, -1);
  // } else {
  //   typeData = 'language';
  // }
  // const params = {
  //   limit: 18,
  //   page: 1,
  //   [typeData]:
  //     props.location && props.location?.state && props.location?.state.data.name
  //       ? props.location?.state.data.name
  //       : props.languages
  //       ? props.languages.name
  //       : 'English',
  // };
  // const getData = await getMoviesList(params).then(({ data, error }) => {
  //   if (error) {
  //     return {
  //       paths: [{ params: { movieslug: [] } }],
  //       fallback: true,
  //     };
  //   }
  //   if (data) {
  //     allShowsList = data.data.movies;
  //     let pathData = [];
  //     let slugs = [];
  //     allShowsList.map((show) => {
  //       slugs.push(
  //         show.seo_url
  //           .split('/')
  //           .filter((slug) => slug)
  //           .join('/')
  //       );
  //     });
  //     pathData.push({ params: { movieslug: slugs } });

  //     return {
  //       props: {
  //         staticMovieProps: allShowsList,
  //       },
  //     };
  //   }
  // });

  // return getData;
  return {
    props: {
      staticMovieProps: 'allShowsList',
    },
  };
}
export async function getStaticPaths(props) {
  let allShowsList = null;
  let typeData = '';
  if (
    props.location &&
    props.location?.state &&
    props.location?.state.forPage
  ) {
    typeData = props.location?.state.forPage.slice(0, -1);
  } else {
    typeData = 'language';
  }
  const params = {
    limit: 18,
    page: 1,
    [typeData]:
      props.location && props.location?.state && props.location?.state.data.name
        ? props.location?.state.data.name
        : props.languages
        ? props.languages.name
        : 'English',
  };

  let data = [];
  const getMovies = await webfox.getAllMovies(params);
  await getMovies.response?.data.movies.map((item) => {
    data.push([{ params: { similarmovieshow: item.seo_url } }]);
  });
  const getShows = await webfox.getAllShows(params);
  await getShows.response?.data.shows.map((item) => {
    data.push([{ params: { similarmovieshow: item.seo_url } }]);
  });
  return {
    paths: data,
    fallback: true,
  };
}
