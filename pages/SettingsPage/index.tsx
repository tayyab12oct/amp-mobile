import {
  Cast,
  Crew,
  Genres,
  StreamingService,
} from '../../components/Refine';
import { Grid, Typography } from '@material-ui/core';
import {
  LOCALSTORAGE_KEY_CONSTANTS,
  contextParamsForREAnalytics,
  device_UUID,
  getLocalStorageData,
  getPreferredLanguages,
  getPreferredProviders,
  getUserType,
} from '../../utils/constants';
import React, { useEffect } from 'react';

import ImageComponent from '../../components/Images';
import { Languages } from '../../components/Refine/Languages';
import PropTypes from 'prop-types';
import SEO from '../../components/Seo';
import SignIn from './SignIn';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { Theme } from '@material-ui/core/styles';
import { VARIABLE } from '../../utils/constants';
import { WebfoxContext } from '../../services/webfox';
import cookie from 'react-cookies';
import { firebaseAnalytics } from '../../components/firebaseConfig';
import { makeStyles } from '@material-ui/core/styles';
import { setAnalyticsUserProperties } from '../../utils/analytics';

const windowAny: any = typeof window !== 'undefined' && window;

const _ht_clientid = cookie.load('_ht_clientid');
function TabPanel(props) {
  const classes = useStyles();
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      className={classes.tabPage}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
function Label(props) {
  const { children, value, title, index, ...other } = props;
  let greyIcon = 'https://images.ottplay.com/static/greyConnectTV.svg';
  let greenIcon = 'https://images.ottplay.com/static/greenConnectTV.svg';

  if (index === 1) {
    greyIcon = 'https://images.ottplay.com/static/greySignIn.svg';
    greenIcon = 'https://images.ottplay.com/static/greenSignIn.svg';
    // } else if (index === 2) {
    //   greyIcon = greyRate;
    //   greenIcon = greenRate;
  } else if (index === 2) {
    greyIcon = 'https://images.ottplay.com/static/greyLanguage.svg';
    greenIcon = 'https://images.ottplay.com/static/greenLanguage.svg';
  } else if (index === 3) {
    greyIcon = 'https://images.ottplay.com/static/greyProvider.svg';
    greenIcon = 'https://images.ottplay.com/static/greenProvider.svg';
  } else if (index === 4) {
    greyIcon = 'https://images.ottplay.com/static/Genres_unselected.svg';
    greenIcon = 'https://images.ottplay.com/static/genres_selected.svg';
  } else if (index === 5) {
    greyIcon = 'https://images.ottplay.com/static/greyCast.svg';
    greenIcon = 'https://images.ottplay.com/static/greenCast.svg';
  } else if (index === 6) {
    greyIcon = 'https://images.ottplay.com/static/greyCrew.svg';
    greenIcon = 'https://images.ottplay.com/static/greenCrew.svg';
  }
  // } else if (index === 5) {
  //   greyIcon = greyNotification;
  //   greenIcon = greenNotification;
  // } else if (index === 6) {
  //   greyIcon = greyConnectTV;
  //   greenIcon = greenConnectTV;
  // } else if (index === 8) {
  //   greyIcon = greyTips;
  //   greenIcon = greenTips;
  // } else if (index === 9) {
  //   greyIcon = greyReport;
  //   greenIcon = greenReport;
  // } else if (index === 10) {
  //   greyIcon = greyAbout;
  //   greenIcon = greenAbout;
  // } else if (index === 11) {
  //   greyIcon = greyFAQ;
  //   greenIcon = greenFAQ;
  // } else if (index === 12) {
  //   greyIcon = greyFeedback;
  //   greenIcon = greenFeedback;
  // } else if (index === 13) {
  //   greyIcon = greyPrivacy;
  //   greenIcon = greenPrivacy;
  // } else if (index === 14) {
  //   greyIcon = greyLogout;
  //   greenIcon = greenLogout;
  // }
  const classes = useStyles();
  return (
    <Grid container spacing={1} className={classes.tabsHeader}>
      <SEO>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="googlebot" content="noindex,nofollow" />
      </SEO>
      <Grid
        xs={2}
        item
        md={3}
        sm={3}
        lg={2}
        className={classes.tabs_icon_container}
      >
        {value === index ? (
          <ImageComponent
            className={
              value === index ? classes.active_tab_icon : classes.tab_icon_main
            }
            src={greenIcon}
            alt="icon"
          />
        ) : (
          <ImageComponent
            className={value === index ? classes.active_tab : classes.tab_icon}
            src={greyIcon}
            alt="icon"
          />
        )}
      </Grid>
      <Grid xs={8} item md={8} sm={7} lg={9} className={classes.tabNames}>
        <Typography
          variant="caption"
          className={value === index ? classes.active_tab_text : classes.typo}
        >
          {title}
        </Typography>
      </Grid>
      <Grid xs={2} item md={1} sm={2} lg={1}>
        {value === index ? (
          <ImageComponent
            className={value === index ? classes.active_tab_arrow : ''}
            src="https://images.ottplay.com/static/green_right_arrow.svg"
            alt="right arrow"
          />
        ) : (
          <ImageComponent
            className={value === index ? classes.active_tab : ''}
            src="https://images.ottplay.com/static/grey_right_arrow.svg"
            alt="right arrow"
          />
        )}
      </Grid>
    </Grid>
  );
}

export default function SettingsPage(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(1);
  const {
    webfox,
    webstore,
    actions,
    actionDispatch,
    loading,
    setLoading,
  } = React.useContext(WebfoxContext);
  const { languages, streamingServices } = webstore;

  let languagesArr: any = [];
  let providersArr: any = [];
  useEffect(() => {
    languagesArr = getLocalStorageData(
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES)
      ) || [],
      languages.name || []
    );
    providersArr = getLocalStorageData(
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_NAMES)
      ) || [],
      streamingServices.name || []
    );
    firebaseAnalytics.logEvent('settings', {
      screen_view:
        '/settings' +
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
    windowAny.Moengage &&
      windowAny.Moengage.track_event('settings', {
        screen_view: '/settings',
        userType: getUserType(_ht_clientid ? true : false),
        preferredLanguages: getPreferredLanguages(languagesArr),
        preferredProviders: getPreferredProviders(providersArr),
        user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
      });
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
    props.handleClose(false);
  };

  const optionSelected = () => {
    const token = cookie.load('token');
    const _ht_clientid = cookie.load('_ht_clientid');
    if (token && _ht_clientid) {
      const params = {
        data: {
          language_pref:
            webstore.languages.selectedLanguages.length > 0
              ? webstore.languages.selectedLanguages.toString()
              : '',
          genre_pref:
            webstore.genres.selectedGenres.length > 0
              ? webstore.genres.selectedGenres.toString()
              : '',
          provider_pref:
            webstore.streamingServices.selectedStreamingServices.length > 0
              ? webstore.streamingServices.selectedStreamingServices.toString()
              : '',
          cast_pref:
            webstore.cast.selectedCast.length > 0
              ? webstore.cast.selectedCast.toString()
              : '',
          crew_pref:
            webstore.crew.selectedCrew.length > 0
              ? webstore.crew.selectedCrew.toString()
              : '',
          movie: {
            movie_likes:
              webstore.likedMovieCard.liked.length > 0
                ? webstore.likedMovieCard.liked.toString()
                : '',
            movie_dislikes:
              webstore.likedMovieCard.disliked.length > 0
                ? webstore.likedMovieCard.disliked.toString()
                : '',
          },
          show: {
            show_likes: '',
            show_dislikes: '',
          },
        },
      };
      const userData = {
        userType: getUserType(_ht_clientid ? true : false),
        preferredLanguages: getPreferredLanguages(languagesArr),
        preferredProviders: getPreferredProviders(providersArr),
        user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
      };
      setAnalyticsUserProperties(userData);
      webfox.updateProfileSelectedData(params).then(({ data, error }) => {
        if (data) {
          window.location.reload(false);
        }
      });
    } else {
      window.location.reload(false);
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={0} xs={12} className={classes.header}>
        <Grid xs={6} item>
          <div className={classes.movieName}>Settings</div>
        </Grid>
        <Grid xs={6} item className={classes.closeGrid}>
          <div className={classes.closeContainer}>
            <ImageComponent
              src="https://images.ottplay.com/static/close.png"
              className="cursor-pointer"
              alt="close icon"
              onClick={handleClose}
            />
          </div>
        </Grid>
      </Grid>
      <div className={classes.tabsContainer}>
        <Grid xs={5} sm={4} item className={classes.sideBar}>
          <Tabs
            orientation="vertical"
            scrollButtons="off"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
            TabIndicatorProps={{
              style: {
                backgroundColor: 'transparent',
              },
            }}
          >
            <div className={classes.tabSubHeader}>Account </div>

            <Tab
              className={value === 1 ? classes.active_tab : classes.tabsItem}
              label={
                <Label
                  title={cookie.load('token') ? 'Sign Out' : 'Sign In'}
                  value={value}
                  index={1}
                />
              }
              {...a11yProps(1)}
            />
            <Tab
              className={value === 2 ? classes.active_tab : classes.tabsItem}
              label={<Label title={'My Languages'} value={value} index={2} />}
              {...a11yProps(2)}
            />
            <Tab
              className={value === 3 ? classes.active_tab : classes.tabsItem}
              label={<Label title={'My Providers'} value={value} index={3} />}
              {...a11yProps(3)}
            />
            <Tab
              className={value === 4 ? classes.active_tab : classes.tabsItem}
              label={<Label title={'My Genres'} value={value} index={4} />}
              {...a11yProps(4)}
            />
            <Tab
              className={value === 5 ? classes.active_tab : classes.tabsItem}
              label={<Label title={'My Actors'} value={value} index={5} />}
              {...a11yProps(5)}
            />
            <Tab
              className={value === 6 ? classes.active_tab : classes.tabsItem}
              label={<Label title={'My Filmmakers'} value={value} index={6} />}
              {...a11yProps(6)}
            />

            {/* <Tab
              className={value === 2 ? classes.active_tab : classes.tabsItem}
              label={<Label title={'Rate More'} value={value} index={2} />}
              {...a11yProps(1)}
            /> */}

            {/* <Tab
              className={value === 5 ? classes.active_tab : classes.tabsItem}
              label={<Label title={'Notifications'} value={value} index={5} />}
              {...a11yProps(4)}
            /> */}
            {/* <Tab
              className={value === 6 ? classes.active_tab : classes.tabsItem}
              label={
                <Label title={'Connect your TV'} value={value} index={6} />
              }
              {...a11yProps(5)}
            /> */}

            {/* <div className={classes.tabSubHeader}> Support </div> */}

            {/* <Tab
              className={value === 8 ? classes.active_tab : classes.tabsItem}
              label={<Label title={'Onboard Tips'} value={value} index={8} />}
              {...a11yProps(7)}
            /> */}
            {/* <Tab
              className={value === 9 ? classes.active_tab : classes.tabsItem}
              label={
                <Label title={'Report A Problem'} value={value} index={9} />
              }
              {...a11yProps(8)}
            /> */}
            {/* <Tab
              className={value === 10 ? classes.active_tab : classes.tabsItem}
              label={<Label title={'About Us'} value={value} index={10} />}
              {...a11yProps(9)}
            /> */}
            {/* <Tab
              className={value === 11 ? classes.active_tab : classes.tabsItem}
              label={<Label title={"FAQ's"} value={value} index={11} />}
              {...a11yProps(10)}
            /> */}
            {/* <Tab
              className={value === 12 ? classes.active_tab : classes.tabsItem}
              label={
                <Label title={'Share Feedback'} value={value} index={12} />
              }
              {...a11yProps(11)}
            /> */}
            {/* <Tab
              className={value === 13 ? classes.active_tab : classes.tabsItem}
              label={
                <Label title={'Privacy Policy'} value={value} index={13} />
              }
              {...a11yProps(12)}
            /> */}
            {/* <Tab
              className={value === 14 ? classes.active_tab : classes.tabsItem}
              label={<Label title={'Logout'} value={value} index={14} />}
              {...a11yProps(13)}
            /> */}
            <div className={classes.versionNumber}>{VARIABLE.BUILD_NUMBER}</div>
          </Tabs>
        </Grid>
        <Grid xs={7} sm={8} item container>
          <TabPanel value={value} index={1}>
            <SignIn />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Languages buttonClicked={() => optionSelected()} />
          </TabPanel>
          {/* <div style={{ overflow: 'hidden' }}> */}
          <TabPanel value={value} index={3}>
            <StreamingService buttonClicked={() => optionSelected()} />
          </TabPanel>
          {/* </div> */}
          <TabPanel value={value} index={4}>
            <Genres buttonClicked={() => optionSelected()} />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <Cast buttonClicked={() => optionSelected()} />
          </TabPanel>
          <TabPanel value={value} index={6}>
            <Crew buttonClicked={() => optionSelected()} />
          </TabPanel>

          {/* <TabPanel value={value} index={4}>
            Item Four
          </TabPanel>
          <TabPanel value={value} index={5}>
            <Notification />
          </TabPanel>
          <TabPanel value={value} index={6}>
            <ConnectTV />
          </TabPanel>
          <TabPanel value={value} index={7}>
            Item Seven
          </TabPanel> */}
        </Grid>
      </div>
    </div>
  );
}
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
  },
  tabs_icon_container: {
    alignSelf: 'center',
    display: 'flex',
  },
  closeGrid: {
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  tabSubHeader: {
    padding: '10px 0',
    fontSize: 'clamp(14px, 1.2vw, 16px)',
    fontWeight: 500,
    color: '#fff',
  },
  sideBar: {
    // padding: '20px 0px 10px 10px',
    backgroundColor: '#23104A',
    overflow: 'auto',
    scrollbarWidth: 'none' /* Firefox */,

    '&::-webkit-scrollbar': {
      width: '0px',
      background: 'transparent' /* Chrome/Safari/Webkit */,
    },
  },
  tabNames: {
    textAlign: 'left',
    // fontSize: '24px',
    fontFamily: 'Montserrat',
    letterSpacing: '0px',
    color: '#A89ABF',
    textTransform: 'capitalize',
    opacity: 1,
  },
  typo: {
    fontSize: 'clamp(13px, 1.2vw, 16px)',
    fontWeight: 500,
  },
  closeContainer: {
    display: 'flex',
    justifyContent: 'right',
    '& img': {
      width: 'clamp(18px, 1.4vw, 25px)',
      height: 'clamp(18px, 1.4vw, 25px)',
    },
  },
  header: {
    backgroundColor: '#23104a',
    boxShadow: '-2px 20px 30px -30px rgba(0,0,0,0.75)',
    padding: '10px 20px 10px 20px',
    justifyContent: 'space-between',
  },
  tabsHeader: {
    padding: '0px',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
  },
  tabsContainer: {
    height: '100%',
    flexGrow: 1,
    display: 'flex',
    color: '#A89ABF',
    overflow: 'auto',
    opacity: 1,
    backgroundColor: '#1c0b3e',
  },
  tabsItem: {
    borderBottom: '0.5px solid #80808047',
    borderTop: '0.5px solid #80808047',
    fontWeight: 500,
    opacity: 1,
    padding: '6px 12px 6px 2px',
    maxWidth: '100%',
  },
  tabs: {
    paddingLeft: '18px',
    backgroundColor: '#23104a',
    color: '#a89abf',
  },
  active_tab_text: {
    color: '#03f87e',
    fontWeight: 500,
    fontSize: 'clamp(13px, 1.2vw, 16px)',
  },
  active_tab_icon: {
    width: 'clamp(13px, 2vw, 20px)',
  },
  tab_icon_main: {
    width: 'clamp(13px, 1.5vw, 18px)',
  },
  active_tab_arrow: {
    color: '#03f87e',
    fontWeight: 500,
    fontSize: 'clamp(4px, 0.5vw, 8px)',
  },
  active_tab: {
    backgroundColor: '#1c0b3e',
    color: '#03f87e',
    borderBottom: '0.5px solid #80808047',
    borderTop: '0.5px solid #80808047',
    opacity: 1,
    maxWidth: '100%',
    padding: '6px 12px 6px 2px',
  },
  tab_icon: {
    color: '#03f87e',
    opacity: 1,
    width: 'clamp(13px, 2vw, 20px)',
  },
  tabPage: {
    width: '100%',
    color: 'white',
    backgroundColor: '#1c0b3e',
    flex: '1 1 70%',
    //   display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // padding: '150px 0px',
  },
  text: {
    fontSize: '22px',
    color: '#ffffff',
    paddingLeft: '20px',
  },
  paper: {
    padding: theme.spacing(2),
    backgroundColor: '#170732',
    height: '528px',
    width: '100%',
    borderRadius: '8px 0px 0px 8px',
  },
  movieName: {
    color: '#ffffff',
    fontWeight: 500,
    fontSize: 'clamp(18px, 2vw, 35px)',
    textAlign: 'left',
    letterSpacing: '0px',
    opacity: 1,
  },
  signinContainer: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButton: {
    color: '#ffffff',
    marginTop: '50px',
    //margin: "80px 0 0 0",
    padding: ' 2px 15px 2px 15px',
    fontSize: '17px',
    borderRadius: '50px',
    textTransform: 'none',
    fontWeight: 500,
    backgroundColor: '#ff4275',
    width: 273,
  },
  versionNumber: {
    paddingTop: '10px',
  },
  [theme.breakpoints.down('xs')]: {
    header: {
      padding: '10px 18px 10px 18px',
    },
    tabsItem: {
      padding: '6px',
    },
    active_tab: {
      padding: '6px',
    },
  },
}));
