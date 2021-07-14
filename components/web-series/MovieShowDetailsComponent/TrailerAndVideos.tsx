import * as React from 'react';

import { Grid, Theme, makeStyles } from '@material-ui/core';

import Trailers from '../../MovieTrailer';

export default function TrailerAndVideos() {
  const classes = useStyles();

  const videos = [
    { height: '190px', trailer: 'https://www.youtube.com/watch?v=sOPUe6-qjoc' },
    { height: '190px', trailer: 'https://www.youtube.com/watch?v=sfM7_JLk-84' },
    { height: '190px', trailer: 'https://www.youtube.com/watch?v=yGY484EPe5U' },
    { height: '190px', trailer: 'https://www.youtube.com/watch?v=pJCgeOAKXyg' },
    { height: '190px', trailer: 'https://www.youtube.com/watch?v=vNUcjqP11OY' },
    { height: '190px', trailer: 'https://www.youtube.com/watch?v=qeZ8X5FKl78' },
  ];

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={12} md={12} lg={12} container direction="row">
          <Grid container xs={12}>
            <Grid xs={11} item className={classes.text}>
              More Trailers and Videos
            </Grid>

            <Grid xs={1} item>
              <div className={classes.details}>See All </div>
            </Grid>
          </Grid>

          <Grid container 
          // xs={12} 
          spacing={2}
          >
            <Grid
              // xs={4}
              container
              spacing={2}
              className={classes.paper}
              direction="column"
            >
              <Grid item xs>
                <div className={classes.video}>
                  <Trailers
                    height="280px"
                    url="https://www.youtube.com/watch?v=1Q8fG0TtVAY&t=8s"
                  />
                </div>
              </Grid>
              <Grid item xs className={classes.text}>
                Trailer 1 : Lorem Ipsum Is Place holder Text
              </Grid>
            </Grid>

            <Grid
              // xs={8}
              container
              spacing={2}
              className={classes.paper}
              style={{ marginLeft: '18px' }}
            >
              {videos.map((video, i) => {
                return (
                  <React.Fragment>
                    <Grid xs={4} item key={i}>
                      <div className={classes.video}>
                        <Trailers height={video.height} url={video.trailer} />
                      </div>
                    </Grid>
                  </React.Fragment>
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
  text: {
    fontSize: 'clamp(16px, 1.6vw, 24px)',
  },
  paper: {
    marginTop: '25px',
  },
  details: {
    fontSize: '18px',
    letterSpacing: '0',
    color: '#D6C6F4',
    opacity: '0.7',
    float: 'right',
    paddingRight: '8px',
  },
  video: {
    borderRadius: '10px 15px 15px 10px',
    overflow: 'hidden',
  },
}));
