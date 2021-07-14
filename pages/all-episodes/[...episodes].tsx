import * as React from 'react';

import { Grid, Hidden, Select, Theme, makeStyles } from '@material-ui/core';
import {
  HOME_SCREEN_SECTIONS,
  LOCALSTORAGE_KEY_CONSTANTS,
  contextParamsForREAnalytics,
  device_UUID,
  getLocalStorageData,
  getPreferredLanguages,
  getPreferredProviders,
  getUserType,
} from '../../utils/constants';
import {
  NavBar,
  PagePath,
  RefineDetailCard,
  Spinner,
  TopHeader,
} from '../../components';

import EpisodeCard from '../../components/EpisodeList/episodeCard';
import HeaderCard from '../../components/EpisodeList/headerCard';
import Helmet from 'react-helmet';
import ImageComponent from '../../components/Images';
import Paper from '@material-ui/core/Paper';
import SEO from '../../components/Seo';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { WebfoxContext } from '../../services/webfox';
import { actions } from '../../services/webstore';
import cookie from 'react-cookies';
import { firebaseAnalytics } from '../../components/firebaseConfig';
import { getCardSize } from '../../utils/helper';

const windowAny: any = typeof window !== 'undefined' && window;
const _ht_clientid = cookie.load('_ht_clientid');
const EpisodeList = ({ location }) => {
  const classes = useStyles();
  const {
    webfox,
    webstore,
    actions,
    actionDispatch,
    loading,
    setLoading,
  } = React.useContext(WebfoxContext);
  const { seeAllEpisodesParams } = webstore;
  const [results, setResults] = React.useState<any[]>([]);
  const [loadingData, setLoadingData] = React.useState(true);
  //   const seeAllEpisodesParams =
  //     typeof window !== 'undefined' &&
  //     JSON.parse(
  //       localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.SEEALL_EPISODE_OBJ)
  //     );
  const [selectedView, setSelectedView] = React.useState(
    seeAllEpisodesParams && seeAllEpisodesParams.view
  );
  const [sortList, setSortList] = React.useState(false);
  const [filteredResult, setFilteredResult] = React.useState(results);
  const [filterYear, setFilterYear] = React.useState(results);
  const [selectYear, setSelectedYear] = React.useState<any>('');
  const [year, setYear] = React.useState(false);
  const [season, setSeason] = React.useState(false);
  const isMountedRef = React.useRef(null);

  const seoKey =
    typeof window !== 'undefined' && window.location.pathname.slice(14);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { languages, streamingServices } = webstore;
  let languagesArr: any = [];
  let providersArr: any = [];

  React.useEffect(() => {
    firebaseAnalytics.logEvent('seeall/episodes', {
      screen_view:
        '/seeall/episodes' +
        (seeAllEpisodesParams &&
        seeAllEpisodesParams.resObj &&
        seeAllEpisodesParams.name
          ? '/' + seeAllEpisodesParams.name
          : '') +
        (seeAllEpisodesParams &&
        seeAllEpisodesParams.resObj &&
        seeAllEpisodesParams.resObj.languages
          ? '/' + seeAllEpisodesParams.resObj.languages.toString()
          : '') +
        (seeAllEpisodesParams && seeAllEpisodesParams.genres
          ? '/' + seeAllEpisodesParams.genres.toString()
          : '') +
        (seeAllEpisodesParams &&
        seeAllEpisodesParams.resObj &&
        seeAllEpisodesParams.resObj._id
          ? '/' + seeAllEpisodesParams.resObj._id
          : '') +
        '/' +
        getUserType(_ht_clientid ? true : false) +
        '/' +
        getPreferredLanguages(languagesArr) +
        '/' +
        getPreferredProviders(providersArr) +
        '/' +
        _ht_clientid
          ? _ht_clientid
          : device_UUID,
    });
    windowAny.Moengage?.track_event('seeall/episodes', {
      screen_view: '/seeall/episodes',
      name:
        seeAllEpisodesParams &&
        seeAllEpisodesParams.resObj &&
        seeAllEpisodesParams.resObj.name
          ? seeAllEpisodesParams.resObj.name
          : '',
      language:
        seeAllEpisodesParams &&
        seeAllEpisodesParams.resObj &&
        seeAllEpisodesParams.resObj.languages
          ? seeAllEpisodesParams.resObj.languages.toString()
          : '',
      genre:
        seeAllEpisodesParams && seeAllEpisodesParams.genres
          ? seeAllEpisodesParams.genres.toString()
          : '',
      id:
        seeAllEpisodesParams &&
        seeAllEpisodesParams.resObj &&
        seeAllEpisodesParams.resObj._id
          ? seeAllEpisodesParams.resObj._id
          : '',
      userType: getUserType(_ht_clientid ? true : false),
      preferredLanguages: getPreferredLanguages(languagesArr),
      preferredProviders: getPreferredProviders(providersArr),
      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
    });
    languagesArr = getLocalStorageData(
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES)
      ) || [],
      languages.name || []
    );
    providersArr = getLocalStorageData(
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_IDS)
      ) || [],
      streamingServices.selectedStreamingServices || []
    );

    const params = {
      seoUrl: seoKey,
    };

    setLoading(true);
    isMountedRef.current = true;

    webfox.episodeList(params).then(({ data, error }) => {
      if (error) {
        actionDispatch(actions.FETCH_EPISODE_LIST_FAILURE, []);
      }
      if (isMountedRef.current) {
        if (data && data.episodes) {
          actionDispatch(actions.FETCH_EPISODE_LIST_SUCCESS, data || []);
          const newResult = data.episodes.map((v) =>
            Object.assign(v, {
              air_date: v.air_date && new Date(v.air_date).toDateString(),
            })
          );
          setResults(newResult);
          setFilteredResult(
            newResult
              .filter((data) => data.season_number == selectedView)
              .sort((a, b) => a.episode_number - b.episode_number)
          );
          setFilterYear(
            data.episodes
              .filter((ye) => new Date(ye.air_date).getFullYear() == selectYear)
              .sort((a, b) => a.episode_number - b.episode_number)
          );
        }
      }
    });
    setLoading(false);
    return () => (isMountedRef.current = false);
  }, [selectedView, selectYear]);

  const handleDropdown = (e) => {
    setSelectedView(Number(e.target.value));
    setSeason(true);
    setYear(false);
  };

  const handleYear = (e) => {
    setSelectedYear(e.target.value);
    setYear(true);
    setSeason(false);
  };

  const handleSort = () => {
    let sortedEpisode: any = [];
    firebaseAnalytics.logEvent('sort_episodes', {
      eventCategory: 'sort_episodes',
      eventAction: sortList ? 'asc' : 'desc' + '/' + selectYear,
      userType: getUserType(_ht_clientid ? true : false),
      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
      preferredLanguages: getPreferredLanguages(languagesArr),
      preferredProviders: getPreferredProviders(providersArr),
    });
    windowAny.Moengage?.track_event('sort_episodes', {
      eventCategory: 'sort_episodes',
      eventAction: sortList ? 'asc' : 'desc' + '/' + selectYear,
      userType: getUserType(_ht_clientid ? true : false),
      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
      preferredLanguages: getPreferredLanguages(languagesArr),
      preferredProviders: getPreferredProviders(providersArr),
    });
    if (sortList === true && season === true) {
      sortedEpisode = filteredResult.sort(
        (a, b) => a.episode_number - b.episode_number
      );
      setFilteredResult(sortedEpisode);
      setSortList(!sortList);
    } else if (sortList === true && year === true) {
      sortedEpisode = filterYear.sort(
        (a, b) => a.episode_number - b.episode_number
      );
      setFilterYear(sortedEpisode);
      setSortList(!sortList);
    } else if (sortList === true && season === false) {
      sortedEpisode = filteredResult.sort(
        (a, b) => a.episode_number - b.episode_number
      );
      setFilteredResult(sortedEpisode);
      setSortList(!sortList);
    } else if (sortList === false && season === true) {
      sortedEpisode = filteredResult.sort(
        (a, b) => b.episode_number - a.episode_number
      );
      setFilteredResult(sortedEpisode);
      setSortList(!sortList);
    } else if (sortList === false && year === true) {
      sortedEpisode = filterYear.sort(
        (a, b) => b.episode_number - a.episode_number
      );
      setFilterYear(sortedEpisode);
      setSortList(!sortList);
    } else if (sortList === false && season === false) {
      sortedEpisode = filteredResult.sort(
        (a, b) => b.episode_number - a.episode_number
      );
      setFilteredResult(sortedEpisode);
      setSortList(!sortList);
    }
  };

  const seasons = results.reduce((unique, o) => {
    if (!unique.some((obj) => obj.season_number === o.season_number)) {
      unique.push(o);
    }
    return unique.sort((a, b) => a.season_number - b.season_number);
  }, []);

  const releaseYear = results.map((n) => new Date(n.air_date).getFullYear());

  const Year = releaseYear
    .filter(function (value, index, array) {
      return array.indexOf(value) == index;
    })
    .sort((a, b) => a - b);

  let siteNavigationJSON = {};
  let breadcrumbSchemaJSON = {};
  React.useEffect(() => {
    siteNavigationJSON = {
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
          name: 'Shows',
          url: 'http://www.ottplay.com/shows',
        },
        {
          '@type': 'SiteNavigationElement',
          position: 3,
          name: 'All Episode',
          url: 'http://www.ottplay.com/shows/' + window.location.pathname,
        },
      ],
    };
    breadcrumbSchemaJSON = {
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
            name: 'Shows',
          },
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: {
            '@id': 'http://www.ottplay.com/' + window.location.pathname,
            name: 'All Episode',
          },
        },
      ],
    };
  }, []);

  return (
    <div className={classes.root}>
      <SEO>
        <title>All Episodes</title>
        <meta name="description" content="" />
        <script type="application/ld+json">
          {JSON.stringify(siteNavigationJSON)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchemaJSON)}
        </script>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="googlebot" content="noindex,nofollow" />
      </SEO>
      <Grid xs={12}>
        <Grid xs={12} container item>
          <Grid sm={1} lg={2} item></Grid>
          <Grid xs={12} sm={10} lg={8} item className={classes.mainBox}>
            <PagePath
              path={[
                { name: 'Home', path: '/home' },
                { name: 'Shows', path: '/shows' },
                {
                  name: `${
                    (seeAllEpisodesParams && seeAllEpisodesParams.name) ||
                    'The Money Heist'
                  }`,
                  path: null,
                },
              ]}
            />
            {/* <p className={classes.path}>
              {'Home'} <span>{'>>'}</span> {`Show`} <span>{'>>'}</span>{' '}
              {`${location.state.name || 'The Money Heist'}`}
            </p> */}
            <Grid item container xs={12}>
              <Grid item xs={12} sm={8}>
                <Grid xs={12} item>
                  <HeaderCard
                    name={seeAllEpisodesParams && seeAllEpisodesParams.name}
                    image={results && results[0] && results[0].poster_url}
                    seasons={seasons.length}
                    episodes={results.length}
                    year={Year}
                    genres={
                      seeAllEpisodesParams &&
                      seeAllEpisodesParams.genres &&
                      seeAllEpisodesParams.genres.slice(0, 2).map((n) => {
                        return (
                          <>
                            {n.name}
                            <span style={{ margin: '0 1%' }}>.</span>
                          </>
                        );
                      })
                    }
                    providers={
                      seeAllEpisodesParams &&
                      seeAllEpisodesParams.providers &&
                      seeAllEpisodesParams.providers.map(
                        (n) => n.provider && n.provider.name
                      )
                    }
                  />
                </Grid>
                <Grid xs={12} item className={classes.episodeListBox}>
                  <Grid xs={12} sm={3} lg={2} item className={classes.text}>
                    <div style={{ display: 'flex' }}>
                      <div
                        className={classes.notIE}
                        style={{ marginRight: '5%' }}
                      >
                        <span className={classes.fancyArrow}></span>
                        <select
                          className={classes.selection}
                          onChange={handleDropdown}
                        >
                          {year === true && season === false ? (
                            <option selected></option>
                          ) : null}
                          {seasons &&
                            seasons.map((n) => (
                              <option
                                className={classes.selection}
                                value={n.season_number}
                                selected={
                                  n.season_number == location &&
                                  location.state.view
                                }
                              >
                                Season {n.season_number}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className={classes.or}> Or </div>
                      <div className={classes.notIE}>
                        <span className={classes.fancyArrow}></span>
                        <select
                          className={classes.selection}
                          onChange={handleYear}
                        >
                          {year === false && season === true ? (
                            <option selected></option>
                          ) : null}
                          {Year.map((n) => (
                            <option selected={n == 0}>{n}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className={classes.sort} onClick={handleSort}>
                      <ImageComponent
                        src="https://images.ottplay.com/static/sort.svg"
                        alt="sort icon"
                      />
                    </div>
                  </Grid>
                  <Grid
                    xs={12}
                    item
                    container
                    spacing={2}
                    //style={{maxHeight: '900px'}}
                    // className={classes.cardBox}
                    className={classes.gridContainer}
                    style={{
                      gridTemplateColumns: getCardSize(
                        year === true && season === false
                          ? filterYear
                          : filteredResult
                      ),
                    }}
                  >
                    {year === true && season === false
                      ? filterYear &&
                        filterYear.map((list) => {
                          return (
                            <EpisodeCard
                              season={list.season_number}
                              img_url={list.poster_url}
                              episode={list.episode_number}
                              description={list.name}
                              date={list.air_date}
                            />
                          );
                        })
                      : filteredResult &&
                        filteredResult.map((list) => {
                          return (
                            <EpisodeCard
                              season={list.season_number}
                              img_url={list.poster_url}
                              episode={list.episode_number}
                              description={list.name}
                              date={list.air_date}
                            />
                          );
                        })}
                  </Grid>
                </Grid>
              </Grid>
              <Hidden only={['xs']}>
                <Grid item sm={4}></Grid>
              </Hidden>
            </Grid>
          </Grid>
          <Grid item sm={1} lg={2}></Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default EpisodeList;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    minHeight: '50vh',
  },
  mainBox: {
    padding: '0 1% 0 1%',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
    padding: '0.5rem 0px',
    width: '100%',
    overflowX: 'auto',
    scrollbarWidth: 'none',
    margin: 0,
    paddingRight: 12,
    '&::-webkit-scrollbar': {
      width: '0px',
      background: 'transparent',
    },
  },
  path: {
    color: '#ffffff',
    opacity: 0.6,
    fontSize: 'clamp(10px, 0.9vw, 14px)',
    margin: '8px 0px 8px 8px',
    textTransform: 'capitalize',
    '& span': {
      fontSize: 10,
      letterSpacing: -1,
      margin: '0px 4px',
    },
  },
  ad: {
    width: '100%',
    height: '600px',
    borderRadius: 6,
  },
  or: {
    fontSize: 'clamp(10px, 1vw, 18px)',
    margin: '0.7rem 1rem 0 0',
    opacity: '0.6',
  },
  cardWrapper: {
    maxWidth: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  dropDown: {
    color: '#FFFFFF',
    border: '1px solid #D6C6F433',
    width: '100%',
    fontWeight: 100,
    fontSize: '20px',
    padding: '4% 19%',
    outline: 'none',
    borderRadius: '30px',
    backgroundColor: '#0E0624',
  },
  selection: {
    width: 150,
    height: 38,
    outline: 'none',
    background: '#190547',
    color: '#D6C6F4',
    border: '1px solid #695197',
    borderRadius: '30px',
    padding: '3% 12%',
    fontSize: 'clamp(16px, 1.2vw, 20px)',
    appearance: 'none',
    '& option': {
      background: 'rgba(0, 0, 0, 0.3)',
      color: '#D6C6F4',
      border: '1px solid rgba(0, 0, 0, 0.3)',
      fontSize: 'clamp(16px, 1.2vw, 20px)',
    },
  },
  option: {
    outline: 'none',
    border: '1px solid #D6C6F433 !important',
    marginTop: '1%',
    borderRadius: '25px',
  },
  outlined: {
    padding: 0,
  },
  text: {
    color: '#ffffff',
    display: 'flex',
    maxWidth: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '2% 0 1% 0',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  tabll: {
    fontSize: '16px',
    color: '#A89ABF',
    textAlign: 'left',
    margin: '1% 1%',
  },
  tabs: {
    borderBottom: '4px solid transparent',
    width: '96px',
    padding: '6px 0px',
  },
  tab: {
    textTransform: 'none',
    width: 96,
    minWidth: 96,
    margin: 0,
    fontSize: '16px',
    color: '#A89ABF',
    '&$selected': {
      width: 98,
      minWidth: 98,
      margin: 0,
      color: '#FFFFFF',
    },
  },
  sort: {
    width: 'clamp(36px, 1vw, 44px)',
    height: 'clamp(36px, 1vw, 44px)',
    border: '1px solid rgb(89 80 107)',
    opacity: '0.8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    marginRight: '2.5%',
    cursor: 'pointer',
    background: '#190547',
    '& img': {
      width: 'clamp(16px, 1.2vw, 20px)',
    },
  },
  notIE: {
    position: 'relative',
    display: 'inline-block',
  },
  select: {
    display: 'inline-block',
    height: '30px',
    width: '150px',
    outline: 'none',
    color: '#74646E',
    border: '1px solid #C8BFC4',
    borderRadius: '4px',
    boxShadow: 'inset 1px 1px 2px #DDD8DC',
    background: '#FFF',
    appearance: 'none',
    WebkitAppearance: 'none',
    // webkit-appearance: 'none',
    // -moz-appearance: 'none',
    padding: '2px 30px 2px 2px',
    '&:-ms-expand': {
      display: 'none !important',
    },
  },
  fancyArrow: {
    width: '14px',
    height: '24px',
    position: 'absolute',
    display: 'inline-block',
    top: '20%',
    right: '3px',
    background: `url(https://images.ottplay.com/static/dropDown.svg) right / 100% no-repeat`,
    pointerEvents: 'none',
    marginRight: '8%',
  },
  [theme.breakpoints.down('xs')]: {
    mainBox: {
      padding: 0,
    },
    gridContainer: {
      paddingRight: 0,
    },
    path: {
      fontSize: 10,
      textTransform: 'uppercase',
      marginLeft: 16,
      marginTop: 16,
      '& span': {
        fontSize: 8,
      },
    },
    or: {
      margin: '0.7rem 0.7rem 0 0',
    },
    text: {
      margin: 0,
      marginBottom: 7,
    },
    selection: {
      width: 103,
      height: 30,
      fontSize: 12,
    },
    fancyArrow: {
      width: 11,
      height: 6,
      top: 13,
      right: 5,
    },
    episodeListBox: {
      paddingLeft: 15,
      paddingRight: 15,
    },
    sort: {
      marginRight: 0,
    },
  },
}));

// EpisodeList.getInitialProps = async (context) => {
//   // get query string
//   const postQuery = context.query;

//   // returned as prop
//   return { postQuery };
// };
