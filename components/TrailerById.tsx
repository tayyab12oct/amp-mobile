import * as React from 'react';

import { Grid, Hidden, Theme, makeStyles } from '@material-ui/core';

import Trailers from './MovieTrailer';
import { ViewportContext } from './ViewportProvider';

export function TrailerById(props) {
  const classes = useStyles();
  const { width } = React.useContext(ViewportContext);

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.rootBox}
      >
        <Grid item xs={12} container direction="row">
          <Grid container xs={12}>
            <Grid xs={10} item className={classes.text}>
              More Trailers and Videos
            </Grid>

            <Grid xs={2} item>
              {/* <div className={classes.details} onClick={props.seeAllTrailers}>
                See All{' '}
              </div> */}
            </Grid>
          </Grid>

          <Grid container xs={12}>
            <Grid
              xs={12}
              sm={4}
              container
              spacing={2}
              className={classes.paper}
              direction="column"
            >
              <Grid item xs className={classes.paperBox}>
                <div className={classes.video}>
                  <Trailers
                    height={width > 600 ? 188 : 172}
                    url={props.trailers[0] && props.trailers[0].video_url}
                  />
                </div>
              </Grid>
              <Grid item xs className={classes.trailerText}>
                {props.trailers[0].title}
              </Grid>
            </Grid>

            <Grid
              xs={12}
              sm={8}
              container
              spacing={2}
              className={classes.trailerLowerBox}
            >
              {props.trailers.length > 1 &&
                props.trailers
                  .slice(1, props.trailers.length)
                  .map((video, i) => {
                    return (
                      <React.Fragment>
                        <Grid xs={6} sm={4} item key={i}>
                          <div className={classes.video}>
                            <Hidden only={['xs']}>
                              <Trailers height="140px" url={video.video_url} />
                            </Hidden>
                            <Hidden only={['sm', 'md', 'lg', 'xl']}>
                              <Trailers height="89px" url={video.video_url} />
                            </Hidden>
                          </div>
                        </Grid>
                      </React.Fragment>
                    );
                  })}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    margin: '20px 0 20px 0',
    color: '#ffffff',
  },
  rootBox: {
    padding: '0 0 0 10px',
  },
  text: {
    fontSize: 'clamp(16px, 1.6vw, 24px)',
    fontWeight: 600,
  },
  trailerText: {
    fontSize: 'clamp(13px, 1.2vw, 20px)',
    fontWeight: 600,
  },
  paper: {
    marginTop: 5,
  },
  trailerLowerBox: {
    marginTop: 5,
    marginLeft: 18,
  },
  details: {
    fontSize: 'clamp(10px, 1vw, 16px)',
    letterSpacing: '0',
    color: '#D6C6F4',
    opacity: '0.8',
    float: 'right',
    cursor: 'pointer',
    paddingRight: '8px',
  },
  video: {
    borderRadius: '10px 15px 15px 10px',
    overflow: 'hidden',
    border: '1px solid #3d2f58',
  },
  [theme.breakpoints.down('xs')]: {
    rootBox: {
      padding: 0,
    },
    text: {
      marginBottom: 17,
    },
    details: {
      color: '#FFFFFF',
      fontWeight: 600,
      marginTop: 6,
      marginRight: 0,
      paddingRight: 0,
    },
    paper: {
      margin: 0,
    },
    paperBox: {
      padding: '0px !important',
    },
    trailerLowerBox: {
      margin: 0,
      padding: '0px !important',
    },
    video: {
      borderRadius: 6,
    },
    trailerText: {
      paddingLeft: '2px !important',
      paddingRight: '0px !important',
    },
  },
}));
