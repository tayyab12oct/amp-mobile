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

import { Grid } from '@material-ui/core';
import ImageComponent from '../Images';
import { Theme } from '@material-ui/core/styles';
import { ViewportContext } from '../ViewportProvider';
import { WebfoxContext } from '../../services/webfox';
import cookie from 'react-cookies';
import { firebaseAnalytics } from '../firebaseConfig';
import { makeStyles } from '@material-ui/core/styles';
import { url } from 'inspector';

const windowAny: any = typeof window !== 'undefined' && window;
function WatchNowCard(props) {
  const classes = useStyles();
  const _ht_clientid = cookie.load('_ht_clientid');
  const { width } = React.useContext(ViewportContext);
  const { card, index, handleWatchNow } = props;
  const { webfox, webstore, actions, actionDispatch, setLoading } = useContext(
    WebfoxContext
  );
  const { languages, streamingServices } = webstore;

  const selectedProvider = (value) => {
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
    firebaseAnalytics.logEvent('watchNow', {
      eventCategory: 'movie_watchnow',
      eventAction: value.provider.name,
      eventLabel: value.price,
      userType: getUserType(_ht_clientid ? true : false),
      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
      preferredLanguages: getPreferredLanguages(languagesArr),
      preferredProviders: getPreferredProviders(providersArr),
    });
    windowAny.Moengage?.track_event('watchNow', {
      eventCategory: 'movie_watchnow',
      eventAction: value.provider.name,
      eventLabel: value.price,
      userType: getUserType(_ht_clientid ? true : false),
      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
      preferredLanguages: getPreferredLanguages(languagesArr),
      preferredProviders: getPreferredProviders(providersArr),
    });
  };
  return (
    <Grid
      className={classes.watchNowCardWrap}
      key={index}
      style={{ width: width < 400 ? '40%' : '154px' }}
    >
      {card.provider.logo_url ? (
        <Grid item className={classes.logoBox}>
          <ImageComponent
            src={card.provider.logo_url}
            alt="streaming service logo"
          />
        </Grid>
      ) : null}
      {card.name ? (
        <Grid item>
          <div className={classes.cardTitle}>{card.name}</div>
        </Grid>
      ) : null}

      {card.price ? (
        <Grid
          item
          style={{
            width: '100%',
            borderTop: card.name ? '1px solid #2A1D3F' : 'none',
            minHeight: 30,
          }}
        >
          <div className={classes.quality}>{card.price}</div>
        </Grid>
      ) : (
        <Grid
          item
          style={{
            width: '100%',
            borderTop: card.name ? '1px solid #2A1D3F' : 'none',
            minHeight: 30,
          }}
        ></Grid>
      )}
      {card.movie_url || card.show_url ? (
        <Grid item>
          <div className={classes.watch} onClick={() => selectedProvider(card)}>
            <a
              // href={card.movie_url ? card.movie_url : card.show_url}
              onClick={() => {
                //handleWatchNow();
                window.open(card.movie_url ? card.movie_url : card.show_url);
              }}
            >
              Watch Now
            </a>
          </div>
        </Grid>
      ) : null}
    </Grid>
  );
}

export default function WatchNowModal(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
    props.handleClose(false);
  };

  return (
    <div className={classes.root}>
      <Grid xs={12} container>
        <Grid container xs={12} className={classes.header}>
          <Grid xs={10} sm={6} item>
            <div className={classes.pageHeader}>Where to Watch?</div>
          </Grid>
          <Grid xs={2} sm={6} item className={classes.closeGrid}>
            <div className={classes.closeContainer} onClick={handleClose}>
              <ImageComponent src="https://images.ottplay.com/static/close.png" alt="close icon" />
            </div>
          </Grid>
        </Grid>
        <Grid container xs={12} className={classes.watchBox}>
          {props.whereToWatch.map((card, index) => {
            return (
              <WatchNowCard
                card={card}
                index={index}
                handleWatchNow={props.handleWatchNow}
              />
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
}
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    padding: '30px 20px',
    background: `url(https://images.ottplay.com/static/where-to-watch-bg.svg) no-repeat`,
    backgroundSize: 'cover',
  },
  header: {
    padding: '10px 20px 15px 18px',
  },
  pageHeader: {
    color: '#ffffff',
    textAlign: 'left',
    fontSize: 'clamp(20px, 1.8vw, 30px)',
    fontWeight: 600,
    letterSpacing: '0px',
    opacity: 1,
  },
  closeGrid: {
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  closeContainer: {
    display: 'flex',
    justifyContent: 'right',
    '& span': {
      width: 15,
    },
  },
  watchNowCardWrap: {
    padding: '20px',
    color: theme.palette.text.secondary,
    backgroundColor: '#100721',
    borderRadius: '10px',
    alignItems: 'flex-start',
    border: '1px solid #2A1D3F',
    margin: '13px',
    width: '154px',
    // minHeight: '196px',
  },
  paper: {
    padding: '20px',
    color: theme.palette.text.secondary,
    backgroundColor: '#100721',
    borderRadius: '10px',
    alignItems: 'flex-start',
    border: '1px solid #2A1D3F',
    margin: '13px',
    maxWidth: '173px',
  },
  quality: {
    color: '#D6C6F4',
    fontSize: 'clamp(12px, 1.2vw, 16px)',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    minHeight: '22px',
  },
  desc: {
    color: '#D6C6F4',
    fontSize: 16,
    marginTop: 5,
  },
  watch: {
    color: '#03F87E',
    fontWeight: 700,
    textAlign: 'center',
    cursor: 'pointer',
    fontSize: 'clamp(13px, 1.2vw, 18px)',
    textDecoration: 'none',
  },
  logoBox: {
    textAlign: 'center',
    '& img': {
      width: '60px',
      height: 'auto',
    },
  },
  cardTitle: {
    color: '#D6C6F4',
    fontSize: 'clamp(12px, 1.2vw, 16px',
    marginTop: 8,
    marginBottom: 25,
  },
  watchBox: {
    overflowY: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    maxHeight: '30rem',
  },
  noProvider: {
    color: '#ffffff',
    fontSize: '1rem',
    marginLeft: '1rem',
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      padding: 0,
    },
    watchBox: {
      padding: '0 8px',
      paddingBottom: 30,
    },
    paper: {
      padding: '20px 15px',
      margin: 10,
    },
    logo: {
      height: 28,
    },
    logoBox: {
      '& img': {
        maxWidth: 90,
        maxHeight: 50,
      },
    },
    header: {
      padding: '15px 20px 5px 18px',
    },
    pageHeader: {
      fontWeight: 600,
    },
    closeContainer: {
      '& img': {
        width: 14,
      },
    },
    quality: {
      marginTop: 5,
      paddingBottom: 12,
      borderBottom: '1px solid #2a1d3f',
      marginBottom: 5,
      fontWeight: 300,
    },
    desc: {
      fontSize: 12,
      marginTop: 2,
      fontWeight: 300,
    },
    watch: {
      marginTop: 10,
    },
  },
}));
