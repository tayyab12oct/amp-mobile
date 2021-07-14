import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Theme,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  LOCALSTORAGE_KEY_CONSTANTS,
  VARIABLE,
  getLocalStorageData,
  getPreferredLanguages,
} from '../utils/constants';
import React, { useEffect } from 'react';

import { NewsBunch } from './news/NewsBunch';
import Router from 'next/router';
import { Spinner } from './Spinner';
import { WebfoxContext } from '../services/webfox';
import { firebaseAnalytics } from './firebaseConfig';

// import { history } from '../configureStore';

export function NewsWidget(props) {
  const { webfox, actionDispatch, actions, webstore } = React.useContext(
    WebfoxContext
  );
  const {
    title,
    newsResult,
    page,
    setActiveNewsUrl,
    activeNewsUrl,
    contentType,
  } = props;
  const classes = useStyles();
  const [result, setResult] = React.useState([]);
  const [loadingData, setLoadingData] = React.useState(true);
  const windowAny: any = typeof window !== 'undefined' && window;

  let languagesArr: any = [];
  useEffect(() => {
    languagesArr = getLocalStorageData(
      JSON.parse(
        typeof window !== 'undefined' &&
          localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES)
      ) || [],
      webstore.languages.name || []
    );
  }, []);

  if (newsResult)
    return (
      <div className={classes.root}>
        <Grid
          container
          // spacing={2}
        >
          <Grid xs={12} item style={{ padding: '12px 0px 12px 0' }}>
            <Grid xs={12} container direction="column">
              <Grid
                container
                xs
                className={[
                  classes.pageTitleWarp,
                  contentType === 'review' && classes.reviewPageWrap,
                ].join(' ')}
              >
                <Grid xs item className={classes.text}>
                  {title}
                </Grid>
                <Grid xs={1} item>
                  <div style={{ marginLeft: '-30px' }}>
                    <div
                      className={classes.read}
                      onClick={() => {
                        Router.push({
                          pathname:
                            contentType === 'news'
                              ? '/all-news'
                              : contentType === 'review'
                              ? '/reviews'
                              : contentType === 'interview'
                              ? '/interviews'
                              : contentType === 'listicle'
                              ? '/listicles'
                              : '',
                          query: {
                            contentType: contentType,
                          },
                        });
                        firebaseAnalytics.logEvent('screen_view', {
                          page_title:
                            '/seeall' + (contentType ? '/' + contentType : ''),
                        });
                        windowAny.Moengage?.track_event('screen_view', {
                          page_title:
                            '/seeall' + (contentType ? '/' + contentType : ''),
                        });
                      }}
                    >
                      {VARIABLE.SEE_All}{' '}
                    </div>
                  </div>
                </Grid>
              </Grid>
              <Grid container xs>
                {newsResult && newsResult.length > 0 ? (
                  <NewsBunch
                    result={newsResult}
                    setActiveNewsUrl={setActiveNewsUrl}
                    activeNewsUrl={activeNewsUrl}
                    contentType={contentType}
                  />
                ) : (
                  <Spinner styles={{ minHeight: '20vh' }} />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  else return null;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    margin: '15px 1% 0 1%',
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(7rem, 1fr))',
    gap: '1rem',
    padding: '0.5rem 0',
    width: '100%',
    color: '#ffffff',
  },
  pageTitleWarp: {
    paddingBottom: '15px',
    alignItems: 'center',
  },
  reviewPageWrap: {
    paddingBottom: '3px',
  },
  text: {
    color: '#ffffff',
    fontWeight: 600,
    fontSize: 'clamp(18px, 1.6vw, 24px)',
  },
  read: {
    color: '#D6C6F4',
    opacity: 1,
    fontSize: 'clamp(10px, 1vw, 16px)',
    float: 'right',
    cursor: 'pointer',
    '&:hover': {
      color: '#29F87E',
    },
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      margin: '15px 0 0 0',
      padding: '0px 8px',
    },
    pageTitleWarp: {
      paddingBottom: '10px',
    },
    reviewPageWrap: {
      paddingBottom: '0px',
    },
  },
}));
