import * as React from 'react';

import { Card, Grid, Hidden } from '@material-ui/core';

import ImageComponent from '../../Images';
import { SLURRP_URL } from '../../../utils/constants';
import { Theme } from '@material-ui/core/styles';
import { ViewportContext } from '../../ViewportProvider';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';

const windowAny: any = typeof window !== 'undefined' && window;
export function WhereToWatch(props) {
  const classes = useStyles();

  const { width } = React.useContext(ViewportContext);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(4);
  const [leftArrowHover, setLeftArrowHover] = useState(false);
  const [rightArrowHover, setRightArrowHover] = useState(false);

  return (
    <div className={classes.root}>
      <Grid
        xs={12}
        container
        spacing={2}
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.rootBox}
        style={{ margin: 0 }}
      >
        <Grid
          item
          xs={12}
          container
          direction="row"
          style={{
            padding: width > 600 ? '0px 10px !important' : 0,
          }}
        >
          <Grid xs={12} container>
            <div className={classes.whereToWatchOuterBox}>
              <Grid xs={12} container direction="column">
                <Grid container xs>
                  <Grid xs item className={classes.text}>
                    {props.title && props.title}
                  </Grid>
                  <Hidden only={['xs']}>
                    {props.whereToWatch.length > 4 ? (
                      <>
                        {' '}
                        <Grid xs={1} item>
                          <div className={classes.chevronBox}>
                            <ImageComponent
                              onClick={() => {
                                if (startIndex > 0) {
                                  setStartIndex(startIndex - 4);
                                  setEndIndex(endIndex - 4);
                                }
                              }}
                              onMouseOver={() => setLeftArrowHover(true)}
                              onMouseLeave={() => setLeftArrowHover(false)}
                              src={leftArrowHover ? "https://images.ottplay.com/static/slide_left_hover_arrow.svg" : "https://images.ottplay.com/static/slide_left_arrow.svg"}
                              alt="left_arrow"
                              style={{ marginRight: 8 }}
                            />{' '}
                            <ImageComponent
                              onClick={() => {
                                if (
                                  props.whereToWatch.length > 4 &&
                                  endIndex < props.whereToWatch.length
                                ) {
                                  setStartIndex(startIndex + 4);
                                  setEndIndex(endIndex + 4);
                                }
                              }}
                              onMouseOver={() => setRightArrowHover(true)}
                              onMouseLeave={() => setRightArrowHover(false)}
                              src={rightArrowHover ? "https://images.ottplay.com/static/slide_right_hover_arrow.svg" : "https://images.ottplay.com/static/slide_right_arrow.svg"}
                              alt="right_arrow"
                            />
                          </div>
                        </Grid>
                      </>
                    ) : null}
                  </Hidden>
                </Grid>
                <Grid
                  xs={12}
                  item
                  container
                  spacing={2}
                  className={classes.whereToWatchBox}
                >
                  {props.whereToWatch
                    .slice(startIndex, endIndex)
                    .map((card, index) => {
                      return (
                        <Grid
                          item
                          xs={4}
                          sm={3}
                          className={classes.cardBox}
                          container
                          direction="column"
                          key={index}
                          justify="center"
                        >
                          <a
                            style={{ textDecoration: 'none', width: '100%' }}
                            onClick={() => {
                              props.handleWhereToWatchClick();
                              if (process.env.REACT_APP_ENV === 'production') {
                                windowAny.gtag_report_conversion(
                                  card.movie_url
                                    ? card.movie_url
                                    : card.show_url
                                );
                              }
                              window.open(
                                card.movie_url ? card.movie_url : card.show_url
                              );
                            }}
                          >
                            {card.provider.logo_url ? (
                              <Grid item className={classes.media}>
                                <ImageComponent
                                  src={card.provider.logo_url}
                                  alt="logo"
                                />
                              </Grid>
                            ) : null}
                            {card.name ? (
                              <Grid item>
                                <div
                                  className={classes.cardTitle}
                                  style={{ color: '#D6C6F4', marginTop: 5 }}
                                >
                                  {card.name}
                                </div>
                              </Grid>
                            ) : null}
                            <Grid
                              item
                              style={{
                                width: '100%',
                                marginTop: 5,
                                borderTop: card.name
                                  ? '1px solid #2A1D3F'
                                  : 'none',
                              }}
                            >
                              {card.price ? (
                                <div
                                  className={classes.quality}
                                  style={{
                                    color: '#D6C6F4',
                                    minHeight: 20,
                                    marginTop: 5,
                                  }}
                                >
                                  {card.price}
                                </div>
                              ) : (
                                <div
                                  className={classes.quality}
                                  style={{ color: '#D6C6F4', minHeight: 20 }}
                                ></div>
                              )}
                            </Grid>
                            {card.movie_url || card.show_url ? (
                              <Grid item>
                                <div
                                  className={classes.watch}
                                  style={{
                                    color: '#33d671',
                                    marginTop: 5,
                                    cursor: 'pointer',
                                  }}
                                >
                                  <b>Watch Now</b>
                                </div>
                              </Grid>
                            ) : null}
                          </a>
                        </Grid>
                      );
                    })}
                </Grid>
              </Grid>
            </div>
            <Hidden only={['xs']}>
              <div className={classes.adBox}>
                {/* ad codes */}
                <div className={classes.ad}>
                  {props.googleAd ? (
                    props.googleAd
                  ) : (
                    <ImageComponent
                      src="/static/newImages/ads.webp"
                      alt="/static/newImages/ads.webp"
                      width="100%"
                      height="100%"
                      onClick={() => window.open(SLURRP_URL)}
                    />
                  )}
                </div>
              </div>
            </Hidden>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: '20px 0 20px 0',
    flexGrow: 1,
  },
  text: {
    fontSize: 'clamp(16px, 1.6vw, 24px)',
    color: '#ffffff',
    fontWeight: 600,
  },
  chevronBox: {
    cursor: 'pointer',
    '& img': {
      height: 'clamp(16px, 1.4vw, 22px)',
    },
  },
  whereToWatchOuterBox: {
    width: 'calc(100% - 320px)',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  whereToWatchBox: {
    flexWrap: 'nowrap',
    marginTop: 'auto',
    overflowX: 'auto',
    margin: 0,
  },
  media: {
    textAlign: 'center',
    '& img': {
      width: '60px',
      height: 'auto',
    },
  },
  adBox: {
    width: 320,
    height: 250,
    padding: '10px 0px 10px 0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      marginTop: '16px',
    },
  },
  cardBox: {
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.54)',
    backgroundColor: '#100721',
    width: '100%',
    margin: '10px 20px 0 0',
    borderRadius: 8,
    alignItems: 'flex-start',
    border: '1px solid #2A1D3F',
    padding: '15px 20px !important',
  },
  cardTitle: {
    color: '#D6C6F4',
    fontSize: 'clamp(12px, 1.2vw, 16px',
    marginTop: 8,
    marginBottom: 25,
  },
  quality: {
    color: '#D6C6F4',
    fontSize: 'clamp(12px, 1.2vw, 16px)',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    minHeight: '22px',
  },
  watch: {
    color: '#03F87E',
    fontWeight: 700,
    textAlign: 'center',
    cursor: 'pointer',
    fontSize: 'clamp(13px, 1.2vw, 18px)',
    textDecoration: 'none',
  },
  ad: {
    marginLeft: '5%',
    height: '100%',
    marginTop: 4,
    borderRadius: 0,
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0',
      marginTop: '10%',
    },
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      margin: 0,
    },
    rootBox: {
      padding: '8px 0px !important',
    },
    text: {
      fontWeight: 600,
      marginTop: 10,
    },
    cardBox: {
      margin: '10px 15px 0 0',
      padding: '15px 30px !important',
      borderRadius: 8,
    },
    ad: {
      marginTop: 30,
      marginBottom: 24,
      height: 250,
    },
    whereToWatchBox: {
      overflowX: 'scroll',
      marginLeft: 0,
    },
    media: {
      '& img': {
        maxWidth: 90,
        maxHeight: 50,
      },
    },
  },
}));
