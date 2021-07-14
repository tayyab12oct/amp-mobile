import { Box, Card, Grid, Typography } from '@material-ui/core';
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

import Helmet from 'react-helmet';
import ImageComponent from '../Images';
import ReviewSection from './reviewSection';
import { Theme } from '@material-ui/core/styles';
import { ViewportContext } from '../ViewportProvider';
import { WebfoxContext } from '../../services/webfox';
import cookie from 'react-cookies';
import { firebaseAnalytics } from '../firebaseConfig';
import { makeStyles } from '@material-ui/core/styles';

const windowAny: any = typeof window !== "undefined" && window;
const _ht_clientid = cookie.load('_ht_clientid');
export default function UserReviewDetail({ location, ...props }) {
  const classes = useStyles();
  // const [value, setValue] = React.useState(1);
  const { height } = React.useContext(ViewportContext);
  const {
    webfox,
    webstore,
    actions,
    actionDispatch,
    loading,
    setLoading,
  } = React.useContext(WebfoxContext);
  const { languages, streamingServices } = webstore;
  const languagesArr: any = getLocalStorageData(
    JSON.parse(
      localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES)
    ) || [],
    languages.name || []
  );
  
  let providersArr: any = [];
  useEffect(() => {
    providersArr = getLocalStorageData(
      JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_IDS)) ||
        [],
      streamingServices.selectedStreamingServices || []
    );
    firebaseAnalytics.logEvent('setting', {
      screen_view:
        '/setting' +
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
    windowAny.Moengage.track_event('setting', {
      screen_view: '/setting',
      userType: getUserType(_ht_clientid ? true : false),
      preferredLanguages: getPreferredLanguages(languagesArr),
      preferredProviders: getPreferredProviders(providersArr),
      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
    });
  });

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  // const handleClose = () => {
  //     props.handleClose(false);
  // };

  return (
    <div className={classes.root}>
      {/* <Helmet>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="googlebot" content="noindex,nofollow" />
        <a href="https://domain.xn--com-9o0a" rel="noindex,nofollow"></a>
      </Helmet> */}
      <Grid container spacing={0} xs={12} className={classes.header}>
        <Grid xs={6} item sm={9} lg={10}>
          <div className={classes.movieName}>User reviews-{location}</div>
        </Grid>
        <Grid xs={6} item sm={3} lg={2} className={classes.closeGrid}>
          <div className={classes.closeContainer}>
            <ImageComponent
              src="https://images.ottplay.com/static/userClose.svg"
              alt="close icon"
              // onClick={() => props.setModal(false)}
            />
          </div>
        </Grid>
      </Grid>
      <div className={classes.tabsContainer}>
        <Grid
          xs={12}
          item
          container
          className={classes.sideBar}
          style={{ height: height > 900 ? 700 : 380 }}
        >
          <ReviewSection location={location} />
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
    cursor: 'pointer',
  },
  tabSubHeader: {
    padding: '10px 0',
    fontVariant: 'bold',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
  },
  sideBar: {
    overflow: 'auto',
    overflowY: 'visible',
    margin: '3%',
    scrollbarWidth: 'none' /* Firefox */,
    '&::-webkit-scrollbar': {
      margin: '10px 20px',
      width: '6px',
      background: '#090411 0% 0% no-repeat padding-box',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 5px #090411',
      borderRadius: '13px',
      //width: '10px',
      background: '#090411 0% 0% no-repeat padding-box',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#03F87E',
      borderRadius: '10px',
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
    font: 'normal normal bold 17px Montserrat',
  },
  closeContainer: {
    display: 'flex',
    justifyContent: 'right',
  },
  header: {
    backgroundColor: '#23104a',
    boxShadow: '-2px 20px 30px -30px rgba(0,0,0,0.75)',
    padding: '15px 44px 15px 33px',
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
    marginLeft: 33,
    marginRight: 26,
    marginTop: 22,
    marginBottom: 22,
    background: '#1E0B40 0% 0% no-repeat padding-box',
    borderRadius: 10,
  },
  movieName: {
    color: '#ffffff',
    fontWeight: 600,
    fontSize: '28px',
    textAlign: 'left',
    letterSpacing: '0px',
    opacity: 1,
  },
}));
