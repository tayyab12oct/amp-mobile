import {
  AirDate,
  ContentRatings,
  ContentType,
  FreePaid,
  Genres,
  Languages,
  NewsSource,
  Price,
  Quality,
  Rating,
  ReleaseYear,
  RunTime,
  StreamingService,
} from './Refine';
import { Grid, Hidden } from '@material-ui/core';
import {
  LOCALSTORAGE_KEY_CONSTANTS,
  contextParamsForREAnalytics,
  device_UUID,
  getLocalStorageData,
  getPreferredLanguages,
  getPreferredProviders,
  getUserType,
} from '../utils/constants';
import React, { useContext, useEffect, useState } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';

import ImageComponent from './Images';
import { PillButton } from './PillButton';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import { WebfoxContext } from '../services/webfox';
import cookie from 'react-cookies';
import { firebaseAnalytics } from './firebaseConfig';

const windowAny: any = typeof window !== 'undefined' && window;
interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
  item: any;
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, item, ...other } = props;
  const classes = useStyles();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      className={classes.tabContent}
      {...other}
    >
      {value === index && (
        <Grid xs={12} lg={12} item container>
          {item.component}
        </Grid>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default React.memo(function VerticalTabs(props: any) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [clear, setClear] = useState({
    language: false,
    provider: false,
    genre: false,
    freePaid: false,
    content: false,
    runtime: false,
    quality: false,
    source: false,
    rating: false,
  } as any);
  useEffect(() => {}, [clear]);
  useEffect(() => {
    if (props.toggle[props.tab]) {
      if (props.tab === 0) {
        setClear({
          ...clear,
          language: false,
        });
      } else if (props.tab === 1) {
        setClear({
          ...clear,
          provider: false,
        });
      } else if (props.tab === 2) {
        setClear({
          ...clear,
          genre: false,
        });
      } else if (props.tab === 3) {
        setClear({
          ...clear,
          freePaid: false,
        });
      } else if (props.tab === 4) {
        setClear({
          ...clear,
          runtime: false,
        });
      } else if (props.tab === 5) {
        setClear({
          ...clear,
          quality: false,
        });
      } else if (props.tab === 6) {
        setClear({
          ...clear,
          rating: false,
        });
      } else if (props.tab === 7) {
        setClear({
          ...clear,
          content: false,
        });
      } else if (props.tab === 11) {
        setClear({
          ...clear,
          source: false,
        });
      }
    }
  }, [props.toggle, props.tab]);
  const setSelectAllClear = (val, data) => {
    setClear({ ...clear, [val]: data });
    if (val === 'provider') {
      props.setToggle(0, data);
    } else if (val === 'language') {
      props.setToggle(1, data);
    } else if (val === 'genre') {
      props.setToggle(2, data);
    } else if (val === 'freePaid') {
      props.setToggle(3, data);
    } else if (val === 'runtime') {
      props.setToggle(4, data);
    } else if (val === 'quality') {
      props.setToggle(5, data);
    } else if (val === 'content') {
      props.setToggle(7, data);
    } else if (val === 'source') {
      props.setToggle(11, data);
    } else if (val === 'rating') {
      props.setToggle(6, data);
    }
    // if (val === 'language') {
    //   props.setToggle(0, data);
    // }
  };
  const refine = [
    {
      name: 'Streaming Service',
      unselected_image:
        'https://images.ottplay.com/static/streaming_unselected.svg',
      selected_image:
        'https://images.ottplay.com/static/Streaming_selected.svg',
      component: (
        <StreamingService
          forPage="refine"
          clear={clear.provider}
          selectAll={value === 0 ? props.toggle : false}
          setSelectAllClear={setSelectAllClear}
        />
      ),
    },
    {
      name: 'Languages',
      unselected_image:
        'https://images.ottplay.com/static/language_unselected.svg',
      selected_image:
        'https://images.ottplay.com/static/languages_selected.svg',
      component: (
        <Languages
          forPage="refine"
          clear={clear.language}
          selectAll={value === 1 ? props.toggle : false}
          setSelectAllClear={setSelectAllClear}
        />
      ),
    },
    {
      name: 'Genres',
      unselected_image:
        'https://images.ottplay.com/static/Genres_unselected.svg',
      selected_image: 'https://images.ottplay.com/static/genres_selected.svg',
      component: (
        <Genres
          forPage="refine"
          clear={clear.genre}
          selectAll={value === 2 ? props.toggle : false}
          setSelectAllClear={setSelectAllClear}
        />
      ),
    },

    {
      name: 'Free/Paid',
      unselected_image:
        'https://images.ottplay.com/static/free_paid_unselected.svg',
      selected_image:
        'https://images.ottplay.com/static/free_paid_selected.svg',
      component: (
        <FreePaid
          forPage="refine"
          clear={clear.freePaid}
          selectAll={value === 3 ? props.toggle : false}
          setSelectAllClear={setSelectAllClear}
        />
      ),
    },
    {
      name: 'Runtime Minutes',
      unselected_image:
        'https://images.ottplay.com/static/runtime_minutes_unselected.svg',
      selected_image:
        'https://images.ottplay.com/static/runtime_min_selected.svg',
      component: (
        <RunTime
          forPage="refine"
          clear={clear.runtime}
          selectAll={value === 4 ? props.toggle : false}
          setSelectAllClear={setSelectAllClear}
        />
      ),
    },
    {
      name: 'Quality',
      unselected_image: 'https://images.ottplay.com/static/hq_unselected.svg',
      selected_image: 'https://images.ottplay.com/static/quality_selected.svg',
      component: (
        <Quality
          forPage="refine"
          clear={clear.quality}
          selectAll={value === 5 ? props.toggle : false}
          setSelectAllClear={setSelectAllClear}
        />
      ),
    },
    {
      name: 'Content Ratings',
      unselected_image:
        'https://images.ottplay.com/static/content_ratings_unselected.svg',
      selected_image:
        'https://images.ottplay.com/static/content_ratings_selected.svg',
      component: (
        <ContentRatings
          forPage="refine"
          clear={clear.rating}
          selectAll={value === 6 ? props.toggle : false}
          setSelectAllClear={setSelectAllClear}
        />
      ),
    },
    // Pls always put content type at the end.
    // props.from === 'foryou'
    //   ? {
    //       name: 'Content Type',
    //       unselected_image: Content_type_unselected,
    //       selected_image: content_type_selected,
    //       component: (
    //         <ContentType
    //           forPage="refine"
    //           clear={clear.content}
    //           selectAll={value === 7 ? props.toggle : false}
    //           setSelectAllClear={setSelectAllClear}
    //         />
    //       ),
    //     }
    //   : {},

    // {
    //   name: 'Rating',
    //   unselected_image: rating_unselected,
    //   selected_image: rating_selected,
    //   component: <Rating />,
    // },
    // {
    //   name: 'Air Date',
    //   unselected_image: airdate,
    //   selected_image: air_date_selected,
    //   component: <AirDate />,
    // },
    // {
    //   name: 'Price',
    //   unselected_image: price_unselected,
    //   selected_image: price_selected,
    //   component: <Price />,
    // },
    // {
    // {
    //   name: 'Release Year',
    //   unselected_image: release_year_unselected,
    //   selected_image: release_year_selected,
    //   component: <ReleaseYear />,
    // },
  ];
  const newsRefine = [
    {
      name: 'Source',
      unselected_image:
        'https://images.ottplay.com/static/streaming_unselected.svg',
      selected_image:
        'https://images.ottplay.com/static/Streaming_selected.svg',
      component: (
        <NewsSource
          forPage="refine"
          clear={clear.newsSource}
          selectAll={value === 11 ? props.toggle : false}
          setSelectAllClear={setSelectAllClear}
        />
      ),
    },
  ];
  const _ht_clientid = cookie.load('_ht_clientid');
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    // if (props.toggle) {
    //   props.setToggle(true);
    // } else {
    //   props.setToggle(false);
    // }
    props.handleChange(newValue);
  };
  const { webfox, webstore, actions, actionDispatch } = useContext(
    WebfoxContext
  );
  const { languages, streamingServices } = webstore;
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
  const getLabel = (item, event: Boolean) => {
    return (
      <>
        <Grid container spacing={1} className={classes.tabsHeader}>
          <Grid
            xs={2}
            item
            md={3}
            sm={3}
            lg={2}
            xl={2}
            className={classes.tab_icon}
          >
            <ImageComponent
              src={event ? item.selected_image : item.unselected_image}
              alt="label image"
              width="25"
              height="25"
              className={classes.tabImages}
            />
          </Grid>
          <Grid
            xs={8}
            item
            md={8}
            sm={7}
            lg={9}
            xl={9}
            className={classes.tabNames}
          >
            <Typography
              className={event ? classes.active_tab_text : classes.typo}
            >
              {item.name}
            </Typography>
          </Grid>
          <Grid xs={2} item md={1} sm={2} lg={1} xl={1}>
            <ImageComponent
              src={
                event
                  ? 'https://images.ottplay.com/static/green_right_arrow.svg'
                  : 'https://images.ottplay.com/static/grey_right_arrow.svg'
              }
              alt="rigth arrow"
            />{' '}
          </Grid>
        </Grid>
      </>
    );
  };

  const isTabActive = (tabId: number, value: number) => {
    return tabId === value;
  };

  const clearData = () => {
    firebaseAnalytics.logEvent('refineClear', {
      eventCategory: 'refine_clear',
      eventAction:
        value === 1
          ? 'language'
          : value === 0
          ? 'provider'
          : value === 2
          ? 'genre'
          : '',
      userType: getUserType(_ht_clientid ? true : false),
      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
      preferredLanguages: getPreferredLanguages(languagesArr),
      preferredProviders: getPreferredProviders(providersArr),
    });
    windowAny.Moengage?.track_event('refineClear', {
      eventCategory: 'refine_clear',
      eventAction:
        value === 1
          ? 'language'
          : value === 0
          ? 'provider'
          : value === 2
          ? 'genre'
          : '',
      userType: getUserType(_ht_clientid ? true : false),
      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
      preferredLanguages: getPreferredLanguages(languagesArr),
      preferredProviders: getPreferredProviders(providersArr),
    });
    if (value === 1) {
      setClear({ ...clear, language: true });
      props.setToggle(value, false);
    } else if (value === 0) {
      setClear({ ...clear, provider: true });
      props.setToggle(value, false);
    } else if (value === 2) {
      setClear({ ...clear, genre: true });
      props.setToggle(value, false);
    } else if (value === 3) {
      setClear({ ...clear, freePaid: true });
      props.setToggle(value, false);
    } else if (value === 4) {
      setClear({ ...clear, runtime: true });
      props.setToggle(value, false);
    } else if (value === 5) {
      setClear({ ...clear, quality: true });
      props.setToggle(value, false);
    } else if (value === 7) {
      setClear({ ...clear, content: true });
      props.setToggle(value, false);
    } else if (value === 11) {
      setClear({ ...clear, source: true });
      props.setToggle(value, false);
    } else if (value === 6) {
      setClear({ ...clear, rating: true });
      props.setToggle(value, false);
    }
  };

  const refineData = () => {
    if (props.from !== 'news') {
      actionDispatch(actions.REFINE_FOR_YOU_PAGE, {
        page: 'forYou',
      });
    } else {
      actionDispatch(actions.REFINE_NEWS_PAGE, {
        page: 'news',
      });
    }

    props.refineClick();
    firebaseAnalytics.logEvent('refineApply', {
      eventCategory: 'refine_apply',
      eventAction: 'category',
      userType: getUserType(_ht_clientid ? true : false),
      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
      preferredLanguages: getPreferredLanguages(languagesArr),
      preferredProviders: getPreferredProviders(providersArr),
    });
    windowAny.Moengage?.track_event('refineApply', {
      eventCategory: 'refine_apply',
      eventAction: 'category',
      userType: getUserType(_ht_clientid ? true : false),
      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
      preferredLanguages: getPreferredLanguages(languagesArr),
      preferredProviders: getPreferredProviders(providersArr),
    });
  };

  const refineTab = props.from === 'news' ? newsRefine : refine;
  return (
    <div className={classes.root}>
      <Grid xs={6} sm={5} md={4} item className={classes.sideBar}>
        <Tabs
          orientation="vertical"
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
          TabIndicatorProps={{
            style: {
              height: '0px',
            },
          }}
        >
          {refineTab.map((item, index) => {
            if (item.name != undefined) {
              return (
                <Tab
                  className={value === index ? classes.activeTab : classes.tab}
                  label={
                    <React.Fragment>
                      {getLabel(item, isTabActive(index, value))}
                    </React.Fragment>
                  }
                  {...a11yProps(index)}
                />
              );
            }
          })}

          <Hidden only={['xs']}>
            <div className={classes.refine_button_container}>
              <PillButton
                className={classes.refine}
                style={{
                  backgroundColor: 'transparent',
                  fontSize: 'clamp(10px, 1vw, 14px)',
                  marginLeft: '0px',
                  marginTop: '10px',
                  border: '1px solid #735C98',
                  textTransform: 'none',
                }}
                onClick={clearData}
                text="Clear"
              />

              <PillButton
                className={classes.refine}
                style={{
                  backgroundColor: '#FF4275',
                  fontSize: 'clamp(10px, 1vw, 14px)',
                  marginLeft: '20px',
                  marginTop: '10px',
                  textTransform: 'none',
                }}
                onClick={refineData}
                text="Refine"
              />
            </div>
          </Hidden>
        </Tabs>
      </Grid>
      <Grid
        xs={6}
        sm={7}
        md={8}
        item
        container
        className={classes.sidebarResults}
      >
        {refineTab.map((item, index) => {
          if (item.name != undefined) {
            return (
              <TabPanel value={value} index={index} item={item}>
                {item.name}
              </TabPanel>
            );
          }
        })}
      </Grid>
      <Hidden only={['sm', 'md', 'lg', 'xl']}>
        <div className={classes.mobileRefineButtonContainer}>
          <PillButton
            className={classes.refine}
            style={{
              backgroundColor: 'transparent',
              fontSize: '14px',
              marginLeft: '0px',
              marginTop: '20px',
              border: '1px solid #735C98',
              font: 'normal normal medium 14px Montserrat',
              textTransform: 'none',
            }}
            onClick={clearData}
            text="Clear"
          />

          <PillButton
            className={classes.refine}
            style={{
              backgroundColor: '#FF4275',
              fontSize: '14px',
              marginLeft: '20px',
              marginTop: '20px',
              font: 'normal normal bold 14px Montserrat',
              textTransform: 'none',
            }}
            onClick={refineData}
            text="Refine"
          />
        </div>
      </Hidden>
    </div>
  );
});

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    color: '#A89ABF',
    overflow: 'auto',
    opacity: 1,
    height: '100%',
  },
  tabs: {
    // borderRight: `0.5px solid ${theme.palette.divider}`,
    // indicatorColor: 'white'
    paddingLeft: 8,
  },
  tab: {
    borderBottom: '1px solid rgb(41, 31, 85)',
    paddingLeft: 8,
  },
  activeTab: {
    color: '#03F87E',
    backgroundColor: '#1C0B3E',
    borderBottom: '1px solid rgb(41, 31, 85)',
    paddingLeft: 8,
  },
  tabContainer: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'left',
  },
  typo: {
    fontSize: 'clamp(13px, 1.2vw, 16px)',
    fontWeight: 700,
    lineHeight: 1.2,
  },
  active_tab_text: {
    fontSize: 'clamp(13px, 1.2vw, 16px)',
    color: '#03F87E',
    fontWeight: 700,
    lineHeight: 1.2,
  },
  tabContent: {
    backgroundColor: ' #1C0B3E',
    width: '100%',
    padding: '6px 0px 10px 0px',
    overflow: 'auto',
    height: '100%',
  },
  refine: {
    color: 'white',
    borderRadius: '33px',
  },
  sideBar: {
    padding: '10px 0px 10px 5px',
    backgroundColor: '#23104A',
    overflow: 'auto',
    scrollbarWidth: 'none' /* Firefox */,

    '&::-webkit-scrollbar': {
      width: '0px',
      background: 'transparent' /* Chrome/Safari/Webkit */,
    },
  },
  tabsHeader: {
    padding: '0px',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
  },
  tab_icon: {
    alignSelf: 'center',
    display: 'flex',
  },
  tabNames: {
    textAlign: 'left',
    letterSpacing: '0px',
    color: '#A89ABF',
    textTransform: 'capitalize',
    opacity: 1,
  },
  refine_button_container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      position: 'relative',
      marginBottom: 50,
    },
    sideBar: {
      padding: 0,
      paddingBottom: '6.5rem',
    },
    tabContent: {
      padding: '5px 5px 10px 5px',
    },
    tab_icon: {
      '& img': {
        width: 19,
        height: 16,
      },
    },
    mobileRefineButtonContainer: {
      backgroundImage:
        'linear-gradient(to bottom, rgb(19,7,38,0), rgba(19,7,38,1))',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto',
      position: 'fixed',
      width: '100%',
      bottom: 0,
      paddingBottom: 30,
    },
    sidebarResults: {
      paddingBottom: '5.5rem',
    },
    tabImages: {
      width: '100%',
      height: 'auto',
    },
  },
}));
