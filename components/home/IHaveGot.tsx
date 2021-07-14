import { Grid, Theme, makeStyles } from '@material-ui/core';
import {
  LOCALSTORAGE_KEY_CONSTANTS,
  device_UUID,
  getLocalStorageData,
  getPreferredLanguages,
  getPreferredProviders,
  getUserType,
  pushDataLocalStorage,
  sortProvidersByUserPreference,
} from '../../utils/constants';
import React, { useContext, useEffect, useState } from 'react';

import Box from '@material-ui/core/Box';

import InfiniteScroll from 'react-infinite-scroll-component';
import { MoviesList } from '../MoviesList';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';

import { WebfoxContext } from '../../services/webfox';
import cookie from 'react-cookies';
import { firebaseAnalytics } from '../firebaseConfig';
import ImageComponent from '../Images';

const windowAny: any = window;
const _ht_clientid = cookie.load('_ht_clientid');
interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

interface GotMiniType {
  name: string;
  selected_image: string;
  unselected_image: string;
}

const gotMinOptions = [
  {
    name: '15 Mins',
    selected_image: "https://images.ottplay.com/static/got_15min_selected.svg",
    unselected_image: "https://images.ottplay.com/static/got_15min_unselected.svg",
  },
  {
    name: '30 Mins',
    selected_image: "https://images.ottplay.com/static/got_30min_selected.svg",
    unselected_image: "https://images.ottplay.com/static/got_30min_unselected.svg",
  },
  {
    name: '45 Mins',
    selected_image: "https://images.ottplay.com/static/got_45min_selected.svg",
    unselected_image: "https://images.ottplay.com/static/got_45min_unselected.svg",
  },
  {
    name: '60 Mins',
    selected_image: "https://images.ottplay.com/static/got_60min_selected.svg",
    unselected_image: "https://images.ottplay.com/static/got_60min_unselected.svg",
  },
];

export default function IHaveGot({ location }) {
  const classes = useStyles();
  const {
    webfox,
    webstore,
    actions,
    actionDispatch,
    setLoading,
  } = React.useContext(WebfoxContext);
  const { languages, likedMovieCard } = webstore;
  const [loadingData, setLoadingData] = React.useState(true);
  const { timeToKillMovies } = webstore.home;
  const initialTab = location.state.tab ? location.state.tab : 0;
  const [page, setPage] = React.useState(0);
  let r = [];
  let hasData = false;
  if (timeToKillMovies && timeToKillMovies.data === undefined) {
    r = timeToKillMovies.data;
    if (timeToKillMovies.lastPage !== 0 && timeToKillMovies.lastPage !== page) {
      hasData = true;
    }
  }
  const [results, setResults] = React.useState(r);
  const [value, setValue] = React.useState(initialTab);
  const [button, setButton] = React.useState([0]);
  const [hasMore, setHasMore] = React.useState(hasData);
  const { streamingServices } = webstore;
  const languagesArr: any = getLocalStorageData(
    JSON.parse(
      localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES)
    ) || [],
    languages.name || []
  );
  const providersArr: any = getLocalStorageData(
    JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_IDS)) ||
      [],
    streamingServices.selectedStreamingServices || []
  );
  const providersNameArr: any = getLocalStorageData(
    JSON.parse(
      localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_NAMES)
    ) || [],
    streamingServices.name || []
  );
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const getTabHeaders = (item: GotMiniType, value: boolean) => {
    return (
      <div className={classes.time}>
        <ImageComponent
          className={classes.timeIcon}
          src={value ? item.selected_image : item.unselected_image}
          alt="time icon"
        />
      </div>
    );
  };
  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      setLoadingData(true);
      setPage((prev) => prev + 1);
    }
  };
  React.useEffect(() => {
    //let temp = button.join(', ');
    const value = location.state.tab;
    let time = 15;
    if (value === 0) {
      time = 15;
    } else if (value === 1) {
      time = 30;
    } else if (value === 2) {
      time = 45;
    } else if (value === 3) {
      time = 60;
    }
    firebaseAnalytics.logEvent('seeall', {
      screen_view:
        '/seeall/timetokill' + time
          ? '/' + time
          : '' +
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
    windowAny.Moengage.track_event('seeall', {
      screen_view: '/seeall/timetokill',
      time: time ? time : '',
      userType: getUserType(_ht_clientid ? true : false),
      preferredLanguages: getPreferredLanguages(languagesArr),
      preferredProviders: getPreferredProviders(providersArr),
      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
    });
  }, [page]);
  React.useEffect(() => {
    if (timeToKillMovies === undefined) {
      fetchTimeToKillData();
    }
  }, [timeToKillMovies]);
  React.useEffect(() => {
    fetchTimeToKillData();
  }, [value]);
  React.useEffect(() => {
    if (hasMore) {
      fetchTimeToKillData();
    }
  }, [page]);
  const fetchTimeToKillData = () => {
    let time = 15;
    if (value === 0) {
      time = 15;
    } else if (value === 1) {
      time = 30;
    } else if (value === 2) {
      time = 45;
    } else if (value === 3) {
      time = 60;
    }
    const languagesArr: any = getLocalStorageData(
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES)
      ) || [],
      languages.name || []
    );
    const likedArr: any = getLocalStorageData(
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LIKED_DATA_IDS)
      ) || [],
      likedMovieCard.liked || []
    );
    const params = {
      limit: 20,
      responseType: 'full',
      liked_ids: likedArr.length > 0 ? likedArr.toString() : '',
      lang: languagesArr.length > 0 ? languagesArr.toString() : '',
      time,
      page,
    };
    setLoading(true);
    setLoadingData(true);
    webfox
      .getTimetokillMovies(params)
      .then((resp) => {
        const response = { ...resp.data };
        const payload = {
          data: response.result,
          lastPage: response.lastPage,
        };
        if (payload.data.length > 0) {
          const data = [...results, payload.data];
          if (payload.lastPage !== 0 && payload.lastPage !== page) {
            setHasMore(true);
          } else {
            setHasMore(false);
          }
          setResults(payload.data);
        }
        actionDispatch(actions.FETCH_TIME_TO_KILL_MOVIES_SUCCESS, payload);
        // setResults(timeToKillMovies.data);
        setLoadingData(false);
      })
      .catch(() => {
        actionDispatch(actions.FETCH_TIME_TO_KILL_MOVIES_FAILURE, []);
        setLoadingData(false);
      });
    setLoading(false);
  };
  React.useEffect(() => {
    if (timeToKillMovies !== undefined) {
      if (timeToKillMovies.data !== undefined) {
        setResults(timeToKillMovies.data);
      }
    }
  }, [timeToKillMovies, page]);
  const fetchData = () => {
    if (timeToKillMovies.lastPage !== 0) {
      setPage(page + 1);
    }
  };
  const refresh = () => {};
  return (
    <div className={classes.root}>
      <Grid
        xs={12}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid
          item
          xs={10}
          sm={10}
          md={10}
          lg={8}
          xl={8}
          container
          direction="row"
        >
          <Grid item xs={12} className={classes.gotItContainer}>
            <Grid item xs={3} sm={3} md={3} lg={2}>
              <div
                style={{
                  font: 'normal normal bold 30px Montserrat',
                  color: 'white',
                }}
              >
                I've Got....
              </div>
            </Grid>

            <Grid item xs={9} sm={9} md={9} lg={10}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="off"
                aria-label="scrollable prevent tabs example"
                TabIndicatorProps={{
                  style: {
                    height: '4px',
                    backgroundColor: '#FF4376',
                    zIndex: 10,
                    width: '90px',
                  },
                }}
              >
                {gotMinOptions.map((item, index) => {
                  return (
                    <Tab
                      classes={{ root: classes.tab }}
                      label={<>{getTabHeaders(item, index === value)}</>}
                      {...a11yProps(index)}
                    />
                  );
                })}
              </Tabs>
            </Grid>
          </Grid>
          <div className={classes.trailContainer}>
            <div className={classes.trail}></div>
            <div className={classes.clearContainer}>
              {/* <ImageComponent src={refresh_icon} alt="clear" /> */}
              {/* <span className={classes.clear}>Clear</span> */}
            </div>
          </div>
        </Grid>
        <Grid
          xs={12}
          sm={12}
          md={12}
          lg={12}
          container
          justify="center"
          alignItems="center"
          item
        >
          <Grid xs={1} sm={1} md={2} lg={2} item></Grid>
          <Grid
            xs={10}
            sm={10}
            md={8}
            lg={8}
            container
            justify="center"
            alignItems="center"
            item
          >
            {gotMinOptions.map((item, index) => {
              return (
                <TabPanel value={value} index={index}>
                  <InfiniteScroll
                    dataLength={results.length}
                    next={fetchData}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                    refreshFunction={refresh}
                    pullDownToRefresh
                    pullDownToRefreshThreshold={50}
                  >
                    <MoviesList
                      results={results}
                      tag={'movies'}
                      source={'I have got'}
                    />
                  </InfiniteScroll>
                </TabPanel>
              );
            })}
          </Grid>
          <Grid xs={1} sm={1} md={2} lg={2} item></Grid>
        </Grid>
      </Grid>
    </div>
  );
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    margin: '2% 0 0 1%',
  },
  gotItContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabs: {
    borderBottom: '4px solid rgba(0,0,0,0.7)',
    width: '96px',
    padding: '6px 0px',
  },
  tab: {
    textTransform: 'none',
    width: 96,
    minWidth: 96,
    margin: 0,
    '&$selected': {
      width: 98,
      minWidth: 98,
      margin: 0,
    },
  },
  time: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '6px 0px',
  },
  timeIcon: {
    width: '96px',
    height: '96px',
  },
  trailContainer: {
    position: 'relative',
    top: '-3px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  trail: {
    backgroundColor: 'black',
    height: '4px',
    zIndex: 2,
    opacity: '0.2',
    width: '92%',
  },
  clearContainer: {
    display: 'flex',
    cursor: 'pointer',
  },
  clear: {
    color: '#03F87E',
    font: 'normal normal normal 16px/19px Montserrat',
  },
  loading: {
    height: '64rem',
    overflow: 'auto',
    scrollbarWidth: 'none' /* Firefox */,
    '&::-webkit-scrollbar': {
      width: '0px',
      background: 'transparent' /* Chrome/Safari/Webkit */,
    },
  },
  overlayImg: {
    width: 30,
    height: 30,
  },
  [theme.breakpoints.down('xs')]: {
    overlayImg: {
      width: 15,
      height: 15,
    },
  },
}));
