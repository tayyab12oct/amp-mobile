// import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
// import PlayArrowIcon from '@material-ui/icons/PlayArrow';
// import SkipNextIcon from '@material-ui/icons/SkipNext';
import { Grid, Hidden } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import ImageComponent from '../Images';

export default function CriticsCard() {
  const classes = useStyles();
  // const theme = useTheme();

  return (
    <Grid
      xs={12}
      container
      // spacing={2}
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.main_container}
    >
      <Card className={classes.root}>
        <div className={classes.criticsDetails}>
          <CardContent className={classes.logo}>
            <ImageComponent src="https://images.ottplay.com/static/ht_logo.png" alt="logo" />
          </CardContent>

          <CardContent className={classes.cardContent}>
            <Typography className={classes.previewTypo}>
              Film Preview
            </Typography>
            <Typography className={classes.ratingTypo}>
              5.9
              <ImageComponent src="https://images.ottplay.com/static/rating_star.svg" alt="star icon" />
            </Typography>
          </CardContent>

          <CardContent className={classes.middlePortion}>
            <Typography className={classes.description}>
              Serious Men Movie Review: Nawazuddin Siddiqui’s New Netflix Film
              Is One Of The Finest Of 2020, Furious And Fabulous
            </Typography>
          </CardContent>

          <Hidden only={['xs']}>
            <ImageComponent src="https://images.ottplay.com/static/CriticsLinecard.svg" alt="line border" className={classes.lineBorder} />
          </Hidden>

          <CardContent className={classes.lastPortion}>
            <Grid xs={12} className={classes.descBox}>
              <Grid xs={9} item>
                <Grid xs className={classes.name}>
                  Rohan Naahar
                </Grid>
                <Grid xs className={classes.update}>
                  Hindustan Times . Oct 07, 2020, 12.15 PM,
                </Grid>
              </Grid>
              <Grid xs={3} item className={classes.share}>
                <Hidden only={['xs']}>Share</Hidden>
                <ImageComponent
                  src="https://images.ottplay.com/static/shareIcon.svg"
                  alt="share icon"
                  className={classes.shareImg}
                />
              </Grid>
            </Grid>
          </CardContent>
        </div>

        <CardMedia
          className={classes.cover}
          image="https://images.ottplay.com/static/criticscard.png"
          title="Live from space album cover"
        >
          <Hidden only={['xs']}>
            <div className={classes.playButton}>
              Serious Men Movie Review: Nawazuddin Siddiqui Completes A Hat
              Trick Hits For Netflix.
            </div>
          </Hidden>
        </CardMedia>
        <Hidden only={['sm', 'md', 'lg', 'xl']}>
          <div className={classes.playButton}>
            Serious Men Movie Review: Nawazuddin Siddiqui Completes A Hat Trick
            Hits For Netflix.
          </div>
          <ImageComponent src="https://images.ottplay.com/static/CriticsLinecard.svg" alt="line border" className={classes.lineBorder} />
        </Hidden>
      </Card>
    </Grid>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main_container: {
      margin: 0,
    },
    root: {
      display: 'flex',
      width: '100%',
      height: '100%',
      background: '#170732 0% 0% no-repeat padding-box',
      borderRadius: 12,
      //margin: '1% 0 1% 1%',
    },
    logo: {
      paddingBottom: 0,
      paddingLeft: 15,
    },
    criticsDetails: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(2),
      backgroundColor: '#170732',
      borderRadius: 12,
      overflow: 'hidden',
      width: '40%',
    },
    cardContent: {
      flex: '1 0 auto',
      display: 'flex',
      paddingTop: 12,
      paddingBottom: 0,
    },
    lineBorder: {
      paddingTop: 20,
    },
    descBox: {
      display: 'flex',
    },
    cover: {
      width: '60%',
      position: 'relative',
    },
    playButton: {
      position: 'absolute',
      color: '#fff',
      background: '#000000 0% 0% no-repeat padding-box',
      padding: '2%',
      bottom: 0,
      zIndex: 1,
      opacity: '0.7',
      width: '100%',
      // marginTop: '46.5%',
      //marginTop: '-3%',
      fontSize: '14px',
      //color: '#E6E6E6'
    },
    previewTypo: {
      background: '#331A5D 0% 0% no-repeat padding-box',
      borderRadius: 24,
      fontSize: 18,
      height: 48,
      color: '#FFFFFF',
      marginRight: '4%',
      padding: '0px 15px',
      opacity: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 500,
      textTransform: 'uppercase',
    },
    ratingTypo: {
      background: '#331A5D 0% 0% no-repeat padding-box',
      borderRadius: 24,
      height: 48,
      fontSize: 18,
      padding: '0px 22px',
      color: '#19FF8C',
      fontWeight: 400,
      opacity: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '& img': {
        width: 18,
        height: 17,
        marginLeft: 8,
      },
    },
    description: {
      color: '#FFFFFF',
      fontSize: 26,
      fontWeight: 600,
      lineHeight: '33px',
      marginTop: '3%',
      paddingBottom: 8,
    },
    lastPortion: {
      marginTop: '2%',
      display: 'flex',
      width: '100%',
    },
    name: {
      color: '#FFFFFF',
      fontSize: '16px',
      fontWeight: 500,
    },
    update: {
      color: '#A89ABF',
      fontSize: '14px',
      fontWeight: 500,
    },
    shareImg: {
      width: '40px',
      height: '40px',
      marginLeft: '15%',
    },
    share: {
      color: '#A89ABF',
      fontSize: '13px',
      fontWeight: 200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    overlay: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      color: 'black',
      backgroundColor: 'white',
    },
    middlePortion: {
      paddingBottom: 0,
      '& img': {
        width: '100%',
      },
    },
    [theme.breakpoints.down('xs')]: {
      root: {
        display: 'block',
        borderRadius: 0,
        background: 'transparent',
        boxShadow: 'none',
      },
      cover: {
        width: '91%',
        height: 166,
        margin: '0 auto',
      },
      logo: {
        padding: 0,
      },
      cardContent: {
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 8,
      },
      middlePortion: {
        padding: 0,
      },
      criticsDetails: {
        width: '100%',
        backgroundColor: 'transparent',
        paddingBottom: 8,
        paddingTop: 0,
      },
      previewTypo: {
        padding: '0px 15px',
        height: 28,
        fontSize: 12,
        textTransform: 'capitalize',
      },
      ratingTypo: {
        fontSize: 14,
        height: 28,
        padding: '0px 15px',
        '& img': {
          width: 16,
          height: 15,
        },
      },
      description: {
        fontSize: 16,
        lineHeight: '22px',
      },
      lastPortion: {
        padding: '8px 0 12px 0 !important',
        marginTop: 0,
      },
      update: {
        marginTop: 8,
        fontSize: 9,
      },
      share: {
        justifyContent: 'flex-end',
      },
      name: {
        fontSize: 13,
      },
      shareimg: {
        width: 38,
        height: 38,
      },
      playButton: {
        position: 'relative',
        background: 'transparent',
        fontSize: 10,
        color: '#A89ABF',
        padding: '8px 16px',
        paddingBottom: 0,
      },
      lineBorder: {
        margin: '0px 16px',
        width: '91%',
        height: 2,
        paddingTop: 0,
      },
    },
  })
);
