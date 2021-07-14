import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

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
  SSO_LOGIN_URL,
  contextParamsForREAnalytics,
  device_UUID,
  getLocalStorageData,
  getPreferredLanguages,
  getPreferredProviders,
  getUserType,
} from '../../../utils/constants';
import React, { useEffect } from 'react';

import { Carousel } from 'react-responsive-carousel';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import ImageComponent from '../../Images';
import { PillButton } from '../..';
import Router from 'next/router';
import { Theme } from '@material-ui/core/styles';
import { WebfoxContext } from '../../../services/webfox';
import cookie from 'react-cookies';
import { firebaseAnalytics } from '../../firebaseConfig';

const windowAny: any = typeof window !== 'undefined' && window;
const _ht_clientid = cookie.load('_ht_clientid');
export default function Intro(props) {
  const { introCardDetails } = props;
  const classes = useStyles();

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [proceedButton, setProceedButton] = React.useState(true);
  const {
    webfox,
    webstore,
    actions,
    actionDispatch,
    setLoading,
  } = React.useContext(WebfoxContext);
  const { languages, streamingServices } = webstore;

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
    windowAny.Moengage &&
      windowAny.Moengage.track_event('welcome', {
        screen_view: '/welcome',
        userType: getUserType(_ht_clientid ? true : false),
        preferredLanguages: getPreferredLanguages(languagesArr),
        preferredProviders: getPreferredProviders(providersArr),
        user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
      });
  });

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return setProceedButton(false);
    }
    return (
      <div className="timer">
        <div className={classes.timer}>{remainingTime}</div>
      </div>
    );
  };

  const proceedFromWelcome = () => {
    firebaseAnalytics.logEvent('welcome', {
      eventCategory: 'onboarding_welcome',
      eventAction: 'proceed',
      eventValue: 5,
    });
    windowAny.Moengage &&
      windowAny.Moengage.track_event('welcome', {
        eventCategory: 'onboarding_welcome',
        eventAction: 'proceed',
        eventValue: 5,
      });
    Router.push('/onboard/language');
  };

  const onComplete = () => {
    Router.push('/onboard/language'), [true, 1000];
  };

  const handleCarouselChange = (index: number, item: object) => {
    setCurrentSlide(index);
  };

  const handleClose = () => {
    typeof window !== 'undefined' &&
      sessionStorage.setItem('non-onboard', 'true');
    Router.push('/');
  };

  const renderstepper = () => {
    return (
      <div className={classes.carousel_dots_wrap}>
        {introCardDetails.map((item, index) => {
          return (
            <div
              onClick={() => handleCarouselChange(index, item)}
              className={[
                classes.carousel_dots,
                index === currentSlide && classes.active_dot,
              ].join(' ')}
            ></div>
          );
        })}
      </div>
    );
  };

  const updateCurrentSlide = (index) => {
    if (currentSlide !== index) {
      setCurrentSlide(index);
    }
  };

  const TimerCircle = () => {
    return (
      <div className={classes.time_wrapper}>
        <CountdownCircleTimer
          isPlaying={proceedButton}
          duration={10}
          colors={'#ffffff'}
          size={32}
          strokeWidth={3}
          onComplete={onComplete}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>
    );
  };

  const IntroCard = (props) => {
    const { item } = props;
    return (
      <Grid xs={12} sm={10} lg={8} container className={classes.introCardWrap}>
        <Grid
          xs={12}
          sm={6}
          item
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Card
            className={[classes.classRoot, classes.popcorn_image].join(' ')}
          >
            <img alt="intro" className={classes.leftImg2} src={item.imgPath} />
          </Card>
        </Grid>
        <Grid xs={12} sm={6} item>
          <Card className={classes.classRoot}>
            <Typography className={classes.name}> {item.title}</Typography>
            {/* <ImageComponent alt="separator" className={classes.wiggly} src='https://images.ottplay.com/static/wiggly-line.svg' /> */}
            <Typography className={classes.details}>{item.subTitle}</Typography>
          </Card>
          <div className={classes.buttonWrap}>
            {renderstepper()}
            {proceedButton ? (
              <PillButton
                className={classes.button}
                text={'Proceed'}
                endIcon={
                  <img
                    //src="https://images.ottplay.com/static/black-arrow.svg"
                    src="/static/newImages/black-arrow.svg"
                    alt=""
                    width="12"
                    height="12"
                  />
                }
                onClick={proceedFromWelcome}
                // startIcon={currentSlide === 4 && <TimerCircle />}
              />
            ) : (
              <PillButton
                text={'Proceed'}
                endIcon={
                  <img
                    //src="https://images.ottplay.com/static/black-arrow.svg"
                    src="/static/newImages/black-arrow.svg"
                    alt=""
                    width="12"
                    height="12"
                  />
                }
                className={classes.proceedButton}
              />
            )}
            {item.desc && (
              <Typography className={classes.specialDesc}>
                {item.desc}
              </Typography>
            )}
            {cookie.load('token') ? (
              ''
            ) : (
              <div>
                <p className={classes.imgSignIn}>
                  Already have an Account?{' '}
                  <span
                    onClick={() => {
                      windowAny.open(SSO_LOGIN_URL, '_self');
                      firebaseAnalytics.logEvent('ssoSignIn', {
                        eventCategory: 'sso_signin_cta',
                        eventAction: 'create account',
                      });
                      if (process.env.REACT_APP_ENV === 'production') {
                        windowAny.gtag_report_conversion(
                          SSO_LOGIN_URL,
                          '_self'
                        );
                      }
                    }}
                  >
                    Sign in
                  </span>
                </p>
              </div>
            )}
          </div>
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid xs={12} container className={classes.mainBox}>
      {localStorage.getItem('fromForYou') === 'true' ? (
        <Hidden only={['sm', 'md', 'lg', 'xl']}>
          <ImageComponent
            alt="left icon"
            className={classes.leftImg1}
            src="https://images.ottplay.com/static/new_logo.svg"
          />
        </Hidden>
      ) : null}
      {localStorage.getItem('fromForYou') === 'true' ? null : (
        <Grid xs={12} sm={10} md={8} className={classes.closeBox}>
          <ImageComponent
            alt="close"
            className={classes.close}
            onClick={handleClose}
            src="/static/images/green-close.svg"
          />
        </Grid>
      )}
      <Carousel
        autoPlay
        className="carousel_root"
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        interval={4000}
        emulateTouch={true}
        selectedItem={currentSlide}
        onChange={updateCurrentSlide}
        showIndicators={false}
      >
        {introCardDetails.map((item, index) => {
          return (
            <div className={classes.carousel_wrap}>
              {<IntroCard item={item} />}
            </div>
          );
        })}
      </Carousel>

      <Grid sm={1} md={2} item></Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    margin: '2% 0 6% 0',
    height: '85vh',
  },
  classRoot: {
    backgroundColor: 'transparent',
    height: 'auto',
    textAlign: 'left',
    boxShadow: 'none',
  },
  wiggly: {
    width: 'fit-content !important',
    padding: '0px 15px',
  },
  mainBox: {
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: '0px 20px',
    },
  },
  closeBox: {
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      marginTop: '3rem',
    },
  },
  specialDesc: {
    color: '#7C7098',
  },
  close: {
    width: 26,
    height: 26,
    cursor: 'pointer',
    marginTop: 10,
    marginBottom: '-15px',
    [theme.breakpoints.down('sm')]: {
      width: 20,
      height: 20,
      marginTop: 10,
      marginBottom: '-5px',
    },
  },
  leftImg2: {
    height: '60vh',
    objectFit: 'contain',
  },
  imgSignIn: {
    color: 'white',
    fontWeight: 500,
    fontSize: 13,
    cursor: 'pointer',
    '& span': {
      color: '#03F87E',
      textDecoration: 'underline',
    },
  },
  carousel_wrap: {
    display: 'flex',
    justifyContent: 'center',
  },
  introCardWrap: {
    display: 'flex',
    alignItems: 'center',
  },
  carousel_dots_wrap: {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px 0px 20px',
  },
  carousel_dots: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    backgroundColor: '#392A52',
    marginRight: '6px',
  },
  active_dot: {
    backgroundColor: '#FF4376',
  },
  popcorn_image: {
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto !important',
      width: '62vw',
    },
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  cover: {
    width: '50%',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      width: '38%',
      marginTop: '30px',
    },
  },
  name: {
    letterSpacing: '0px',
    fontSize: 'clamp(18px, 1vw, 24px)',
    fontWeight: 500,
    color: '#FFFFFF',
    width: 'fit-content',
    textAlign: 'left',
    marginBottom: '4%',
    lineHeight: '20px',
    padding: '0 10px',
    whiteSpace: 'pre-wrap',
  },
  timer: {
    fontSize: '14px',
    letterSpacing: '0px',
    color: '#FFFFFF',
  },
  content: {
    padding: 16,
  },
  details: {
    color: '#FFFFFF',
    width: 'fit-content',
    letterSpacing: '0',
    fontSize: 'clamp(24px, 1.2vw, 30px)',
    lineHeight: '28px',
    padding: '0px 14px',
    whiteSpace: 'pre-wrap',
    fontWeight: 600,
    textAlign: 'left',
    [theme.breakpoints.down('xs')]: {
      padding: '0px 50px',
    },
  },
  terms: {
    color: '#9080AD',
    fontSize: '16px',
    marginTop: '2%',
    padding: '0 16%',
  },
  purpButton: {
    color: '#BBB6D1',
    backgroundColor: '#100627',
    whiteSpace: 'nowrap',
    border: '1px solid #35147A',
    margin: '10px 5px',
    width: 206,
    height: 55,
    borderRadius: 28,
    fontWeight: 500,
    textTransform: 'none',
    '& svg': {
      width: 20,
      height: 14,
      '&$a': {
        color: '#BBB6D1',
      },
    },
  },
  buttonWrap: {
    display: 'flex',
    flexDirection: 'column',
    // width: '100vw',
    alignItems: 'flex-start',
    padding: '0px 20px',
  },
  proceedButton: {
    display: 'none',
  },
  button: {
    color: '#000000',
    backgroundColor: '#29F87E',
    whiteSpace: 'nowrap',
    border: '1px solid #29F87E',
    margin: '10px 0px',
    borderRadius: 28,
    fontSize: 'clamp(13px, 1.2vw, 18px)',
    fontWeight: 600,
    height: '42px',
    minWidth: '140px',
    textTransform: 'none',
    '& svg': {
      minWidth: 20,
      minHeight: 14,
      '&$a': {
        color: 'black',
      },
    },
    '&:hover': {
      color: '#000000',
      backgroundColor: '#29F87E',
      border: '1px solid #29F87E',
    },
  },
  timerClock: {
    display: 'flex',
    justifyContent: 'center',
    margin: '5% 0 5% 0',
  },
  [theme.breakpoints.down('xs')]: {
    classRoot: {
      marginLeft: '0',
      paddingTop: 0,
    },
    wiggly: {
      padding: '0px',
    },
    popcorn_image: {
      width: '100%',
    },
    buttonWrap: {
      padding: '0px 4px',
    },
    leftImg1: {
      width: 139,
      height: 33,
      margin: '0 auto',
      objectFit: 'contain',
    },
    name: {
      lineHeight: '18px',
      marginTop: 20,
      marginBottom: 15,
      padding: 0,
    },
    details: {
      lineHeight: '28px',
      padding: '0px 4px',
    },
    timerClock: {
      margin: '20px 0 25px 0',
    },
    timer: {
      fontSize: '14px',
    },
    purpButton: {
      marginTop: 0,
      width: 162,
      height: 40,
      '& svg': {
        width: 12,
        height: 9,
      },
    },
    button: {
      marginTop: 0,
      '& svg': {
        minWidth: 12,
        maxHeight: 38,
      },
    },
    terms: {
      fontSize: 10,
      fontWeight: 500,
      margin: '0 auto',
      maxWidth: 210,
      marginTop: 20,
      padding: 0,
    },
  },
}));
