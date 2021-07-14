import {
  Card,
  CardMedia,
  Grid,
  Hidden,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  LOCALSTORAGE_KEY_CONSTANTS,
  contextParamsForREAnalytics,
  device_UUID,
  getLocalStorageData,
  getPreferredLanguages,
  getPreferredProviders,
  getUserType,
} from '../../utils/constants';
import React, { useContext, useEffect } from 'react';

import Intro from './IntroCarousel/introCarousel';
import { Theme } from '@material-ui/core/styles';
import { ViewportContext } from '../ViewportProvider';
import { WebfoxContext } from '../../services/webfox';
import cookie from 'react-cookies';
import { firebaseAnalytics } from '../firebaseConfig';

const windowAny: any = typeof window !== 'undefined' && window;
const _ht_clientid = cookie.load('_ht_clientid');
export function Onboarding() {
  const { webfox, webstore, actions, actionDispatch, setLoading } = useContext(
    WebfoxContext
  );
  const { languages, streamingServices } = webstore;

  const classes = useStyles();
  const { height, width } = React.useContext(ViewportContext);

  useEffect(() => {
    const languagesArr: any = getLocalStorageData(
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES)
      ) || [],
      languages.name || []
    );
    const providersArr: any = getLocalStorageData(
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_IDS)
      ) || [],
      streamingServices.selectedStreamingServices || []
    );
    const providersNameArr: any = getLocalStorageData(
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_NAMES)
      ) || [],
      streamingServices.name || []
    );
    firebaseAnalytics.logEvent('welcome', {
      screen_view:
        '/welcome' +
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
    windowAny.Moengage?.track_event('welcome', {
      screen_view: '/welcome',
      userType: getUserType(_ht_clientid ? true : false),
      preferredLanguages: getPreferredLanguages(languagesArr),
      preferredProviders: getPreferredProviders(providersArr),
      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
    });
    firebaseAnalytics.logEvent('splash', {
      screen_view:
        '/splash' +
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
    windowAny.Moengage?.track_event('splash', {
      screen_view: '/splash',
      userType: getUserType(_ht_clientid ? true : false),
      preferredLanguages: getPreferredLanguages(languagesArr),
      preferredProviders: getPreferredProviders(providersArr),
      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
    });
  }, []);

  const introCardDetails = [
    {
      label: 'intro1',
      title: (
        <span className={classes.textLite}>
          From <span className={classes.textLiteHighlighted}>Netflix</span> to
          whatever <br /> gives you the{' '}
          <span className={classes.textLiteHighlighted}>kicks.</span>
        </span>
      ),
      subTitle: (
        <span className={classes.descText}>
          Watch the very best <br />
          from{' '}
          <span className={classes.descTextHighlighter}>35+ OTT channels.</span>
        </span>
      ),
      imgPath: 'https://images.ottplay.com/static/intro1.png',
    },
    {
      label: 'intro2',
      title: (
        <span className={classes.textLite}>
          Tune into <span className={classes.textLiteHighlighted}>Anurag</span>{' '}
          or <span className={classes.textLiteHighlighted}>Zoya</span> <br />{' '}
          and everyone in between.
        </span>
      ),
      subTitle: (
        <span className={classes.descText}>
          {''}
          <span className={classes.descTextHighlighter}>
            1,50,000+ movies
          </span>{' '}
          from <br />
          the best of directors.
        </span>
      ),
      imgPath: 'https://images.ottplay.com/static/intro2.png',
    },
    {
      label: 'intro3',
      title: (
        <span className={classes.textLite}>
          Catch <span className={classes.textLiteHighlighted}>Paatal Lok</span>{' '}
          and <br />
          <span className={classes.textLiteHighlighted}> Stranger Things.</span>
        </span>
      ),
      subTitle: (
        <span className={classes.descText}>
          All the great shows in <br />
          <span className={classes.descTextHighlighter}>
            all the languages.
          </span>
        </span>
      ),
      imgPath: 'https://images.ottplay.com/static/intro3.svg',
    },
    {
      label: 'intro4',
      title: (
        <span className={classes.textLite}>
          Smart as <span className={classes.textLiteHighlighted}>Yoda,</span>{' '}
          <br /> awesome like{' '}
          <span className={classes.textLiteHighlighted}>X-Men.</span>
        </span>
      ),
      subTitle:
        width < 600 ? (
          <span className={classes.descText}>
            The OTT app with a <br />{' '}
            <span className={classes.descTextHighlighter}>
              smart recommendation engine.
            </span>
          </span>
        ) : (
          <span className={classes.descText}>
            The OTT app with a <br />{' '}
            <span className={classes.descTextHighlighter}>
              smart recommendation engine.
            </span>
          </span>
        ),
      imgPath: 'https://images.ottplay.com/static/intro4.svg',
    },
    {
      label: 'intro5',
      title: <span className={classes.textLiteHighlighted}>Salam Namaste</span>,
      subTitle: (
        <span className={classes.descText}>
          From the OTT app that <br />
          tells you{' '}
          <span className={classes.descTextHighlighter}>
            what to watch
          </span> and{' '}
          <span className={classes.descTextHighlighter}>where.</span>
        </span>
      ),
      desc: (
        <span className={classes.textDesc}>
          Just take a few seconds to help us get your movie tastes.
        </span>
      ),
      imgPath: 'https://images.ottplay.com/static/intro5.svg',
    },
  ];

  return (
    //style={{ minHeight: '82vh' }}
    <div className={classes.root}>
      <Intro introCardDetails={introCardDetails} />
    </div>
  );
}

const styles = {
  cardcontent: {
    padding: 0,
  },
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    //height: '85vh',
    marginBottom: 20,
    [theme.breakpoints.down('xs')]: {
      height: '100vh',
    },
  },

  flashScreen: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textLite: {
    color: '#ffffff',
    fontWeight: 500,
    fontSize: 'clamp(18px, 1.8vw, 14px)',
    fontFamily: 'Montserrat, Arial, sans-serif !important',
  },
  textDesc: {
    fontFamily: 'Montserrat, Arial, sans-serif !important',
  },
  textLiteHighlighted: {
    color: '#29F87E',
    fontWeight: 'bolder',
  },

  descText: {
    color: '#ffffff',
    fontSize: 'clamp(24px, 2vw, 18px)',
    fontFamily: 'Montserrat, Arial, sans-serif !important',
  },
  descTextHighlighter: {
    color: '#FD4275',
    fontWeight: 'bolder',
  },

  flashText: {
    color: '#9082AF',
    fontSize: '29px',
    paddingTop: '30px',
    font: 'normal normal 300 29px/35px Montserrat',
    letterSpacing: '12.18px',
    [theme.breakpoints.down('sm')]: {
      letterSpacing: '5.88px',
      fontSize: '14px',
      paddingTop: '20px',
      paddingBottom: '100px',
    },
  },
  htLogo: {
    position: 'absolute',
    bottom: 0,
    '& img': {
      height: '66px',
    },
    [theme.breakpoints.down('sm')]: {
      bottom: '30px',
      '& img': {
        height: '47px',
      },
    },
  },
}));
