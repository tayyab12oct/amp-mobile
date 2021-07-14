import * as React from 'react';

import { Card, Grid, Hidden, makeStyles } from '@material-ui/core';

// import { useState, useContext } from 'react';
import MovieTrailer from '../../components/MovieTrailer';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import ImageComponent from '../../components/Images';

export default function Reviews() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid xs={12} container className={classes.rootBox}>
        <Grid xs={12} sm={9} item className={classes.contentBox}>
          <div className={classes.title}>Serious Men</div>
          <div className={classes.title}>
            Director - <span style={{ fontWeight: 400 }}>Sudhir Mishra</span>
          </div>
          <div className={classes.title}>
            Cast -{' '}
            <span style={{ fontWeight: 400 }}>
              Nawazuddin Siddiqui, Aakshath Das, Shweta Basu Prasad, Nasser,
              Indira Tiwari
            </span>
          </div>
          <p className={classes.names}>
            While Netflix India has been busy projecting Radhika Apte as some
            sort of mascot, it should really have been paying attention to
            Nawazuddin Siddiqui, an actor who has consistently delivered
            top-tier content for the streamer. His latest, Serious Men,
            completes a hat-trick of Netflix hits for the actor, after Sacred
            Games and Raat Akeli Hai. More of this, please.
          </p>
          <p className={classes.names}>
            Based on a novel by Manu Joseph, the film tells the story of Ayyan
            Mani, a Dalit personal assistant to a Brahmin scientist. After a
            lifetime of being called names such as ‘moron’ and ‘imbecile’, he
            decides to channel his anger at the world by conning it. Ayyan
            begins a journey of upward social mobility by convincing everybody
            that his 10-year-old son is, in fact, a genius.
          </p>
          <Card className={classes.video}>
            <MovieTrailer
              className={classes.trailer}
              url={'https://www.youtube.com/watch?v=naXf8R1aOik'}
            />
          </Card>
          <p className={classes.desc}>
            “Like I Put A Camera In The Middle Of Piku And I Observed That
            World, We’ve Done The Same Here,” Sircar Said. “All I Can Say About
            The Film At This Point Is That This Is The First Time I Have Tried
            Satire.” Gulabo Sitabo Was Initially Set In Delhi, But Eventually
            Moved To Lucknow, Where Chaturvedi Was Raised. “Old Delhi Is Not
            That Different From Old Lucknow,” Sircar Observed. “The Old-World
            Charm Of Places Like Chandni Chowk, Delhi Gate, And The Jama Masjid
            Area Is Similar To, Say, Hazratganj And Chowk In Lucknow, Where The
            Film Is Set.” The Title Has Been Inspired By A Uttar Pradesh-Based
            Traditional Puppet Show, Whose Stories Revolve Around The Old And
            Worn-Out Sitabo And The Young And Energetic Gulabo. They Are Either
            Sisters- In-Law Or Rival Wives, Trading Barbs And Insults Laced With
            Local Humour. “We Came Across The Gulabo-Sitabo Form Of Puppetry
            While Making The Movie, And We Decided That It Could Be A Good
            Metaphor For The Story,” Sircar Said.
          </p>
          <div className={classes.imgBox}>
            <ImageComponent src="https://images.ottplay.com/static/critics2.png" className={classes.img} alt="" />
            <span className={classes.playButton}>
              Nawazuddin Siddiqui Is Flawless In Netflix’s Serious Men.
            </span>
            <Hidden only={['sm', 'md', 'lg', 'xl']}>
              <ImageComponent
                src="https://images.ottplay.com/static/CriticsLinecard.svg"
                alt="line border"
                className={classes.lineBorder}
              />
            </Hidden>
          </div>
          <p className={classes.desc}>
            As Wickedly Funny As The Film Is, And As Perversely Enjoyable
            Ayyan’s Schemes Are To Watch, Serious Men Would Not Have Worked If
            There Had Not Been A Collective Rage Directed At The Establishment.
            It’s A Movie That Captures What It Is Like To Live In India, Circa
            2020. It’s A Time Capsule That, Like So Many Satirical Movies That
            Were Released In The Post-Emergency Era, Captures The Mood Of The
            Nation.
          </p>

          <p className={classes.names}>
            This Is A Stunning Film, One Of Those Rare Experiences Where It
            Seems As If Every Department — Costumes, Sound, Lighting — Is In A
            Jazz-Like Groove. This Is Ironic, Considering How The Film Is Also
            About How Everybody These Days Seems To Exist In Echo-Chambers.
          </p>
          <div className={classes.updateTime}>
            Last Updated: , 12.15 PM, May 08, 2020
          </div>
        </Grid>
        {/* ad codes
        <Hidden only={['xs']}>
          <Grid xs={3} item>
            <ImageComponent src={ads} className={classes.adImg} />
            <CardMedia image={ads} />
          </Grid>
        </Hidden> */}
        <Hidden only={['sm', 'md', 'lg', 'xl']}>
          <ImageComponent src="https://images.ottplay.com/static/CriticsLinecard.svg" alt="line border" className={classes.lineBorder} />
        </Hidden>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  rootBox: {
    padding: '0 1.5%',
    marginTop: 37,
  },
  adImg: {
    width: '100%',
    //height: '100%',
  },
  title: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#FFFFFF',
  },
  imgBox: {
    position: 'relative',
  },
  img: {
    width: '100%',
    marginTop: '2%',
  },
  names: {
    fontSize: '20px',
    fontWeight: 400,
    color: '#FFFFFF',
    marginTop: '3.5%',
    marginBottom: 0,
    //lineHeight: '3vh',
  },
  desc: {
    fontSize: '20px',
    fontWeight: 400,
    color: '#FFFFFF',
    marginTop: '3.5%',
    marginBottom: 0,
    //lineHeight: '3vh',
  },
  trailer: {
    height: '452px !important',
    borderRadius: '30px',
  },
  contentBox: {
    paddingRight: '4%',
  },
  updateTime: {
    fontSize: '14px',
    color: '#A89ABF',
    marginTop: 38,
  },
  video: {
    borderRadius: '10px',
    overflow: 'hidden',
    width: '100%',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    cursor: 'pointer',
    marginTop: '2%',
  },
  playButton: {
    color: '#fff',
    width: '100%',
    opacity: '0.7',
    padding: '2.5%',
    zIndex: 1,
    position: 'absolute',
    fontSize: '14px',
    background: '#000000 0% 0% no-repeat padding-box',
    //marginTop: '43.5%',
    bottom: '4px',
    right: '0%',
    borderRadius: '0 0 10px 10px',
  },
  [theme.breakpoints.down('xs')]: {
    contentBox: {
      paddingRight: 0,
    },
    root: {
      paddingTop: 4,
      padding: '0px 15px',
    },
    rootBox: {
      marginTop: 0,
      padding: 0,
    },
    title: {
      fontSize: 13,
    },
    names: {
      fontSize: 13,
      marginTop: '3.5%',
    },
    desc: {
      fontSize: 13,
      marginTop: '4.5%',
    },
    video: {
      marginTop: 15,
    },
    trailer: {
      height: '166px !important',
    },
    img: {
      marginTop: 15,
    },
    playButton: {
      position: 'relative',
      background: 'transparent',
      fontSize: 10,
      color: '#A89ABF',
      padding: '8px 0px',
      paddingBottom: 0,
      display: 'flex',
    },
    lineBorder: {
      margin: 0,
      width: '100%',
      height: 2,
      paddingTop: 0,
    },
    updateTime: {
      fontSize: 13,
      marginTop: 15,
      marginBottom: 15,
    },
  },
}));
