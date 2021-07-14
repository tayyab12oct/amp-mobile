import * as React from 'react';

import { Grid, Hidden, Theme, Typography, makeStyles } from '@material-ui/core';

import { PillButton } from '../../PillButton';

import ImageComponent from '../../Images';

export function TopNews() {
  const classes = useStyles();

  const topNews = [
    {
      title: 'Extraction',
      time: '40 Mins',
      description:
        'Movie was on the fire one the first day, was it worth watching ?',
    },
    {
      title: 'Extraction',
      time: '40 Mins',
      description:
        'Wonder Woman 1984 sneak peek teases Kristen Wiig’s Cheetah transformation?',
    },
    {
      title: 'Bollywood',
      time: '40 Mins',
      description:
        'Movie was on the fire one the first day, was it worth watching ?',
    },
    {
      title: 'Hollywood',
      time: '40 Mins',
      description:
        'Movie was on the fire one the first day, was it worth watching ?',
    },
    {
      title: 'Hollywood',
      time: '40 Mins',
      description:
        'Movie was on the fire one the first day, was it worth watching ?',
    },
    {
      title: 'Bollywood',
      time: '40 Mins',
      description:
        'Movie was on the fire one the first day, was it worth watching. Know more about the in the news detail page?',
    },
  ];

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.rootBox}
      >
        <Grid item xs={12} container direction="row">
          <Grid container xs={12} className={classes.rightContainerBox}>
            <Grid xs={7} item className={classes.text}>
              Top News
            </Grid>
            <Grid xs={5} item>
              <Typography className={classes.read}>
                <Hidden only={['xs']}>
                  <span
                    style={{ marginRight: '30px' }}
                    onClick={() => console.log('news')}
                  >
                    See All News From{' '}
                  </span>
                </Hidden>
                <Hidden only={['sm', 'md', 'lg', 'xl']}>
                  <span
                    style={{
                      alignItems: 'center',
                      paddingBottom: 2,
                      fontSize: 9,
                      marginRight: '10px',
                    }}
                    onClick={() => console.log('news')}
                  >
                    More News From{' '}
                  </span>
                </Hidden>
                <ImageComponent src="https://images.ottplay.com/static/Group 8378.svg" alt="https://images.ottplay.com/static/Group 8378.svg" />
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            xs={12}
            spacing={2}
            className={classes.newsLeftContainerBox}
          >
            <Grid
              xs={12}
              md={4}
              container
              spacing={3}
              className={classes.newsLeftContainer}
            >
              <Grid item xs={12} className={classes.newsLeftContainerInnerBox}>
                <ImageComponent src="https://images.ottplay.com/static/photo3.png" alt="top news image" />
              </Grid>
              <Grid item xs={12} className={classes.pillBox}>
                <div className={classes.pillInnerBox}>
                  <div>
                    <PillButton
                      text={'Box Office'}
                      className={classes.boxOffice}
                    />{' '}
                  </div>
                  <div className={classes.minuteBox}>40 mins ago</div>
                </div>
              </Grid>
              <Grid item xs={12} className={classes.paddingBox}>
                <Typography className={classes.newsText}>
                  Thappad Day 1 Box Office: Taapsee's Hard Hitting Film
                  Registers Slow Start With Rs…
                </Typography>
              </Grid>
            </Grid>

            <Grid
              xs={12}
              md={8}
              container
              spacing={4}
              className={[classes.paper, classes.news_container_two].join(' ')}
            >
              {topNews.map((newsDetail, i) => {
                return (
                  <>
                    <Grid
                      xs={12}
                      sm={6}
                      item
                      key={i}
                      className={classes.newsCard}
                    >
                      <div className={classes.release}>
                        <Grid xs container>
                          <Grid xs={8} item>
                            {' '}
                            <span className={classes.newsHead}>
                              {newsDetail.title}
                            </span>
                          </Grid>
                          <Grid xs={4} item style={{ textAlign: 'right' }}>
                            <span className={classes.newsTime}>
                              {' '}
                              {newsDetail.time}
                            </span>
                          </Grid>
                        </Grid>
                        <div className={classes.newsDesc}>
                          {newsDetail.description}
                        </div>
                      </div>
                    </Grid>
                  </>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    margin: '25px 0 35px 0',
    color: '#ffffff',
  },
  rootBox: {
    paddingLeft: 8,
    paddingRight: 15,
  },
  text: {
    fontSize: 'clamp(16px, 1.6vw, 24px)',
    color: '#ffffff',
    width: '100%',
    fontWeight: 500,
  },
  newsText: {
    fontSize: '22px',
    color: '#ffffff',
    width: '100%',
    fontWeight: 500,
  },
  pillInnerBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  details: {
    width: '169px',
    height: '20px',
    letterSpacing: '0',
    color: '#D6C6F4',
    opacity: '0.7',
    fontSize: '16px',
  },
  rightContainerBox: {
    padding: '0px 10px',
  },
  newsLeftContainerBox: {
    paddingLeft: 10,
    margin: '0px !important',
  },
  media: {
    height: 140,
  },
  newsCard: {
    paddingBottom: '0px !important',
  },
  name: {
    width: '100%',
    height: '27px',
    textAlign: 'left',
    fontSize: '22px',
    fontWeight: 'bold',
    letterSpacing: '0px',
    color: '#FFFFFF',
    opacity: 1,
  },
  paper: {
    marginTop: '0px',
    // marginLeft: '0.5%'
  },
  newsLeftContainer: {
    marginTop: '0px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  release: {
    opacity: 0.8,
    color: '#D6C6F4',
    fontSize: '20px',
    padding: 15,
    width: '100%',
    overflow: 'hidden',
    background: '#1E0B40 0% 0% no-repeat padding-box',
    borderRadius: '10px',
    height: '100%',
  },
  read: {
    color: '#D6C6F4',
    opacity: '0.7',
    fontSize: '18px',
    float: 'right',
    paddingRight: '8px',
    cursor: 'pointer',
    display: 'flex',
  },
  boxOffice: {
    color: '#ffffff',
    //margin: "80px 0 0 0",
    padding: ' 2px 15px 2px 15px',
    fontSize: '14px',
    borderRadius: '50px',
    textTransform: 'none',
    backgroundColor: '#331A5D',
  },
  newsHead: {
    color: '#03F87E',
    fontSize: '14px',
  },
  newsTime: {
    color: '#A89ABF',
    fontSize: '14px',
  },
  newsDesc: {
    fontSize: '16px',
    marginTop: '10px',
    overflow: 'hidden',
    color: '#ffffff',
  },
  news_container_two: {
    marginLeft: '28px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0px',
    },
  },
  newsLeftContainerInnerBox: {
    '& img': {
      width: '100%',
      height: '242px',
    },
  },
  minuteBox: {
    fontSize: '14px',
    color: '#A89ABF',
  },
  [theme.breakpoints.down('xs')]: {
    rootBox: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    rightContainerBox: {
      padding: 0,
    },
    text: {
      display: 'flex',
      alignItems: 'flex-end',
    },
    newsText: {
      fontSize: 14,
    },
    read: {
      paddingRight: 0,
      textAlign: 'right',
      '& img': {
        width: 62,
        height: 26,
        marginBottom: 5,
      },
    },
    newsLeftContainerBox: {
      paddingLeft: 0,
    },
    newsLeftContainer: {
      margin: '0px !important',
    },
    newsLeftContainerInnerBox: {
      paddingLeft: '0px !important',
      paddingRight: '0px !important',
      '& img': {
        height: 166,
        borderRadius: 6,
      },
    },
    pillBox: {
      padding: '0px !important',
      paddingBottom: 12,
    },
    minuteBox: {
      fontSize: 9,
    },
    boxOffice: {
      height: 20,
      fontSize: 10,
    },
    pillInnerBox: {
      alignItems: 'center',
    },
    paddingBox: {
      paddingLeft: '0px !important',
      paddingRight: '0px !important',
    },
    newsCard: {
      padding: '0px !important',
      marginBottom: 16,
    },
    newsHead: {
      fontSize: 8,
    },
    newsTime: {
      fontSize: 8,
    },
    newsDesc: {
      fontSize: 12,
    },
    release: {
      paddingTop: 5,
    },
  },
}));
