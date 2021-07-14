import * as React from 'react';

import { Card, CardActionArea, CardMedia, Grid } from '@material-ui/core';

import { Theme } from '@material-ui/core/styles';

import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/styles';

export function MoodCards() {
  const router = useRouter();
  const classes = useStyles();
  const moodDetail = [
    { img: "https://images.ottplay.com/static/mood1.png", name: 'Road Trips' },
    { img: "https://images.ottplay.com/static/mood2.png", name: 'Zombies' },
    { img: "https://images.ottplay.com/static/mood3.png", name: 'Space' },
    { img: "https://images.ottplay.com/static/mood4.png", name: '80s' },
    { img: "https://images.ottplay.com/static/mood2.png", name: 'Road Trips' },
    { img: "https://images.ottplay.com/static/mood1.png", name: 'Zombies' },
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
        <Grid item xs={2}></Grid>
        <Grid item xs={8} container direction="row">
          <Grid xs={12} spacing={3} container>
            <Grid xs={9} item style={{ padding: '12px 12px 12px 0' }}>
              <Grid xs={12} container direction="column">
                <Grid container xs>
                  <Grid xs item className={classes.text}>
                    I am in the mood for…
                  </Grid>
                  <Grid xs={1} item>
                    <div style={{ marginLeft: '-30px' }}>
                      <div
                        className={classes.read}
                        onClick={() => router.push('./allmoods')}
                      >
                        See All{' '}
                      </div>
                    </div>
                  </Grid>
                </Grid>
                <Grid container xs>
                  <Grid container spacing={3} style={{ marginLeft: '3px' }}>
                    {moodDetail.map((mood, i) => {
                      return (
                        <>
                          <Grid item xs={2}>
                            <Card className={classes.cardRoot}>
                              <CardActionArea>
                                <CardMedia
                                  component="img"
                                  className={classes.media}
                                  image={mood.img}
                                />
                              </CardActionArea>
                            </Card>
                          </Grid>
                        </>
                      );
                    })}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={3} item>
              {/* ad codes
              <Card className={classes.ad}>
                <ImageComponent src={ads} alt={ads} width="100%" height="100%" />
              </Card> */}
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
    display: 'flex',
    flexGrow: 1,
  },
  cardRoot: {
    margin: '10px 0 35px 0',
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  media: {
    height: '100%',
    borderRadius: '10px',
    boxShadow: '0px 3px 6px #00000029',
  },
  name: {
    width: '100%',
    height: '27px',
    textAlign: 'left',
    fontSize: '20px',
    letterSpacing: '0px',
    color: '#FFFFFF',
    opacity: 1,
    overflow: 'hidden',
  },
  text: {
    color: '#ffffff',
    fontSize: '24px',
    marginLeft: '2.5%',
  },
  read: {
    color: '#D6C6F4',
    opacity: '0.7',
    fontSize: '16px',
    float: 'right',
    paddingRight: '8px',
    cursor: 'pointer',
  },
  ad: {
    marginLeft: '5%',
    marginTop: '2%',
  },
}));
