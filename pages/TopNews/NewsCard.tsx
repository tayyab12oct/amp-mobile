import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Grid } from '@material-ui/core';
import { PillButton } from '../../components/PillButton';
import React from 'react';

export default function NewsCard(props) {
  const classes = useStyles();

  return (
    <Grid xs={12} container>
      <Grid xs={2} item></Grid>
      <Grid xs={8} item container>
        <Card className={classes.cardRoot}>
          <CardContent className={classes.content}>
            <PillButton text="FILM PREVIEW" />
            <div className={classes.newsTitle}>
              How A Pair Of Folk Puppets Inspired Shoojit Sircar’s Comedy
              ‘Gulabo Sitabo’
            </div>
            <div className={classes.newsDescription}>
              The Amitabh Bachchan-Ayushmann Khurrana Starrer Will Be Out On
              Amazon Prime Video On June 12.
            </div>
            <div className={classes.feature}>Featured</div>
            <div className={classes.titleTick}>
              <div className={classes.channelName}>{props.title}</div>
              {/* <ImageComponent src={tick} alt="add" /> */}
            </div>
            <div>
              {/* <ImageComponent style={{ padding: "10px" }} src={Line} alt="" /> */}
            </div>
            {/* <div className={classes.channelDesc}>
              <div className={classes.certificate}>
                <b>Movie</b> . Drama . Comedy
              </div>
              <div className={classes.certificate}>
                <b>On</b> . Netflix . Amazon . Hotstar
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className={classes.match}>
                  70% MATCH &nbsp;
                </span>
                &nbsp;&nbsp;
                <span className={classes.rating}>
                  5.7{" "}

                </span>
                &nbsp;&nbsp;
                <span className={classes.match} style={{ fontSize: "20px" }}>
                  {" "}
                  4.7{" "}
                </span>
                <span className={classes.critics}> Critics Score </span>
              </div>
            </div> */}
          </CardContent>
          <CardMedia className={classes.cover} image="https://images.ottplay.com/static/newsImg.png" />
        </Card>
      </Grid>
      <Grid xs={2} item></Grid>
    </Grid>
  );
}

const useStyles = makeStyles(
  createStyles({
    root: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
    },
    playIcon: {
      height: 38,
      width: 38,
    },

    cardRoot: {
      display: 'flex',
      height: '100%',
      background: '#170732 0% 0% no-repeat padding-box',
      borderRadius: '12px',
    },
    titleTick: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    content: {
      color: '#ffffff',
      width: '508px',
      marginTop: '25px',
      borderRadius: '0px 12px 12px 0px',
      display: 'flex',
      flexDirection: 'column',
      padding: '40px 50px 65px 30px',
    },
    cover: {
      width: '805px',
      height: '390px,',
    },

    newsTitle: {
      fontSize: '28px',
      color: '#FFFFFF',
      marginTop: '20px',
    },
    newsDescription: {
      fontSize: '18px',
      color: '#D6C6F4',
      marginTop: '20px',
    },

    channelName: {
      textAlign: 'left',
      letterSpacing: '0px',
      color: '#FFFFFF',
      opacity: 1,
      fontSize: '38px',
      height: '47px',
      marginBottom: '20px',
    },
    channelDesc: {
      textAlign: 'left',
      letterSpacing: '0px',
      color: '#FFFFFF',
      opacity: 1,
      fontSize: '16px',
      width: '100%',
    },
    read: {
      color: '#D6C6F4',
      opacity: '0.7',
      fontSize: '18px',
      fontFamily: 'Montserrat',
      float: 'right',
      paddingRight: '8px',
    },

    playButton: {
      display: 'flex',
      marginTop: '35px',
    },
    feature: {
      color: '#03F87E',
      opacity: 1,
      fontSize: '16px',
    },
    movieName: {
      color: '#ffffff',
      fontWeight: 800,
      fontSize: '35px',
    },
    match: {
      color: '#03F87E',
      display: 'flex',
      alignItems: 'center',
      fontWeight: 'bold',
      margin: '5px',
      fontSize: '21px',
    },
    critics: {
      letterSpacing: '0px',
      color: '#FFFFFF',
      opacity: 1,
      fontSize: '20px',
    },
    release: {
      backgroundColor: '#342c45',
      color: '#D6C6F4',
      fontSize: '16px',
      background: '#331A5D 0% 0% no-repeat padding-box',
      borderRadius: '4px',
      marginLeft: '10px',
      opacity: 0.7,
    },
    certificate: {
      color: '#FFFFFF',
      fontWeight: 'lighter',
      margin: '5px',
      fontSize: '23px',
    },
    desc: {
      color: '#ffffff',
      height: '60px',
      overflow: 'hidden',
      marginLeft: '4px',
    },
    rating: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#000000',
      color: '#D6C6F4',
      fontSize: '20px',
      borderRadius: '6px',
      padding: '4px',
    },
    tooltip: {
      textAlign: 'right',
      fontSize: '12px',
      color: '#FFFFFF',
      backgroundColor: '#170732',
      border: '1px solid #03F87E',
      height: '42px',
      padding: '7px',
    },
  })
);
