import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  CircularProgressProps,
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
} from '../../../utils/constants';
import { NavBar, TopHeader } from '../../../components';
import React, { Fragment } from 'react';

import Helmet from 'react-helmet';
import ImageComponent from '../../../components/Images';
import SEO from '../../../components/Seo';
import { Theme } from '@material-ui/core/styles';
import { ViewportContext } from '../../../components/ViewportProvider';
import { WebfoxContext } from '../../../services/webfox';
import cookie from 'react-cookies';
import { firebaseAnalytics } from '../../../components/firebaseConfig';
import { setAnalyticsUserProperties } from '../../../utils/analytics';
import { useRouter } from 'next/router';

const windowAny: any = typeof window !== 'undefined' && window;
function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  const { width } = React.useContext(ViewportContext);
  const classes = useStyles();
  const renderMobileCircular = () => {
    return (
      <Grid>
        <Box className={classes.loadingCircle}>
          <Box className={classes.loadingPercentageBox}>
            <Typography
              variant="caption"
              className={classes.loadingPercentage}
            >{`${Math.round(props.value)}%`}</Typography>
          </Box>
        </Box>
      </Grid>
    );
  };
  return (
    <>
      {width < 600 ? (
        renderMobileCircular()
      ) : (
        <Grid xs={12} item>
          <div className={classes.progressContainer}>
            <ImageComponent
              src="/static/newImages/loader_wheel.gif"
              alt="loading"
              style={{ width: '100%', height: '100%' }}
            />
            <div className={classes.percentageContainer}>
              <div className={classes.percentage}>{`${Math.round(
                props.value
              )}%`}</div>
            </div>
          </div>
        </Grid>
      )}
    </>
  );
}
const _ht_clientid = cookie.load('_ht_clientid');
let interval = undefined;

export default function Recommendations() {
  const router = useRouter();
  const classes = useStyles();
  const { height } = React.useContext(ViewportContext);
  const {
    webfox,
    webstore,
    actions,
    actionDispatch,
    loading,
    setLoading,
  } = React.useContext(WebfoxContext);
  const [running, setRunning] = React.useState(true);
  const [progress, setProgress] = React.useState<any>(20);
  const { languages, streamingServices } = webstore;
  const languagesArr: any = getLocalStorageData(
    JSON.parse(
      typeof window !== 'undefined' &&
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES)
    ) || [],
    languages.name || []
  );
  const providersArr: any = getLocalStorageData(
    JSON.parse(
      typeof window !== 'undefined' &&
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_NAMES)
    ) || [],
    streamingServices.name || []
  );
  const providersNameArr: any = getLocalStorageData(
    JSON.parse(
      typeof window !== 'undefined' &&
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_NAMES)
    ) || [],
    streamingServices.name || []
  );
  
  if (typeof window !== 'undefined') {
    document.cookie = `languagesArr=${languagesArr}`;
  }
  
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

      webfox.updateProfileSelectedData(params).then(({ data, error }) => {
        if (data) {
          //console.log('Updated');
        }
      });
    }
    typeof window !== 'undefined' &&
    localStorage.getItem('fromForYou') === 'true'
      ? router.push('/foryou')
      : router.push('/home');
  };
  React.useEffect(() => {
    const userData = {
      userType: getUserType(_ht_clientid ? true : false),
      preferredLanguages: getPreferredLanguages(languagesArr),
      preferredProviders: getPreferredProviders(providersArr),
      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
    };
    setAnalyticsUserProperties(userData);
    firebaseAnalytics.logEvent('screen_view', {
      page_title: '/loadingrecommendations',
    });
    windowAny.Moengage?.track_event('screen_view', {
      page_title: '/loadingrecommendations',
    });
    if (typeof window !== undefined) {
      localStorage.setItem(
        LOCALSTORAGE_KEY_CONSTANTS.ONBOARDING_DONE,
        progress
      );
    }
    if (process.env.REACT_APP_ENV === 'production') {
      windowAny.gtag_report_conversion('onboarding complete');
    }
    // const timer = setInterval(() => {
    //   setProgress((prevProgress) =>
    //     prevProgress >= 100 ? history.push('/home') : prevProgress + 20
    //   );
    // }, 800);
    // const timer = setInterval(() => {
    //   setProgress((prevProgress) =>
    //     prevProgress >= 100 ? optionSelected() : prevProgress + 20
    //   );
    // }, 800);
    // return () => {
    //   clearInterval(timer);
    // };
  }, []);

  React.useEffect(() => {
    if (running) {
      interval = setInterval(() => {
        setProgress((prev) => prev + 20);
      }, 800);
    } else {
      clearInterval(interval);
    }
  }, [running]);

  React.useEffect(() => {
    if (progress === 100) {
      setRunning(false);
      optionSelected();
      clearInterval(interval);
    }
  }, [progress]);

  return (
    <Fragment>
      <div className={classes.root}>
        <SEO>
          <meta name="robots" content="noindex,nofollow" />
          <meta name="googlebot" content="noindex,nofollow" />
        </SEO>
        <Grid xs={12} container>
          <Grid xs={12} sm={1} md={2} lg={3} item></Grid>
          <Hidden only={['sm', 'md', 'lg', 'xl']}>
            {typeof window !== 'undefined' &&
            localStorage.getItem('fromForYou') === 'true' ? (
              <Grid className={classes.ottWrap}>
                <ImageComponent
                  className={classes.cover}
                  src="https://images.ottplay.com/static/new_logo.svg"
                  alt="ott"
                />
              </Grid>
            ) : null}
          </Hidden>
          <Grid
            xs={12}
            sm={10}
            md={7}
            lg={6}
            container
            className={classes.outerContainer}
          >
            <Grid xs={12} sm={12} md={6} lg={6} item>
              <Card className={classes.cardRoot}>
                <CardContent style={{ paddingTop: 0 }}>
                  <Typography className={classes.name}>Now showing</Typography>
                  <Typography className={classes.details}>
                    Recommendations for you…
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={1} sm={1} md={1} lg={1} item></Grid>
            <Grid xs={12} sm={12} md={5} lg={5} item>
              <CircularProgressWithLabel value={progress} />
            </Grid>
          </Grid>
          <Grid xs={1} sm={1} md={1} lg={3} item></Grid>
        </Grid>
      </div>
    </Fragment>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    height: '85vh',
    // margin: '15% 0'
  },
  cardRoot: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: 'auto',
    boxShadow: 'none',
    textAlign: 'center',
  },
  cover: {
    width: '70%',
    margin: '0 auto',
    position: 'absolute',
    top: 30,
    [theme.breakpoints.down('sm')]: {
      width: '30%',
    },
  },
  ottWrap: {
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
  },
  name: {
    fontSize: 'clamp(20px, 2vw, 30px)',
    color: '#FFFFFF',
    fontWeight: 500,
  },
  details: {
    color: '#A89ABF',
    fontSize: 'clamp(16px, 1.6vw, 20px)',
  },
  boxBack: {
    // position: 'relative',
    backgroundImage: `url("/static/newImages/loader_wheel.gif")`,
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100%',
  },
  progressContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    maxHeight: '350px',
    maxWidth: '350px',
    margin: '0 auto',
  },
  percentageContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentage: {
    color: '#000000',
    position: 'absolute',
    fontSize: '35px',
    fontWeight: 'bold',
    textAlign: 'center',
    left: 'calc(50% - 35px)',

    [theme.breakpoints.down('sm')]: {
      fontSize: '30px',
      left: 'calc(50% - 30px)',
    },
  },
  outerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      flexGrow: 1,
      margin: 0,
      minHeight: '100vh',
    },
    cover: {
      margin: '0 auto',
      width: 139,
      height: 32,
    },
    name: {
      width: 154,
      margin: '0 auto',
    },
    loadingCircle: {
      height: 154,
      width: 154,
      backgroundImage: `url("/static/newImages/loader_wheel.gif")`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      margin: '0 auto',
    },
    loadingPercentageBox: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: 154,
    },
    loadingPercentage: {
      fontSize: 18,
    },
  },
}));
