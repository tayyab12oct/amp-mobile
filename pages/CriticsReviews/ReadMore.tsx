import * as React from 'react';

import {
  Box,
  Card,
  CardContent,
  Grid,
  Hidden,
  Theme,
  Typography,
  makeStyles,
} from '@material-ui/core';

import { PillButton } from '../../components/PillButton';
import ImageComponent from '../../components/Images';

export default function ReadMore() {
  const classes = useStyles();

  const criticsReviews = [
    {
      id: '01',
      img: "https://images.ottplay.com/static/Image 104.png",
      title: 'News India',
      description:
        'Much like that standalone, this direct to video gem is a triumph, and I hope it doesnt take Warner Bros.',
      href: 'https://www.newsindiatimes.com/',
    },
    {
      id: '02',
      img: "https://images.ottplay.com/static/Image 104-1.png",
      title: 'Youtube',
      description:
        'Much like that standalone, this direct to video gem is a triumph, and I hope it doesnt take Warner Bros.',
      href: 'https://www.youtube.com/',
    },
    {
      id: '03',
      img: "https://images.ottplay.com/static/Image 104-2.png",
      title: 'Youtube',
      description:
        'Much like that standalone, this direct to video gem is a triumph, and I hope it doesnt take Warner Bros.',
      href: 'https://www.youtube.com/',
    },
    {
      id: '04',
      img: "https://images.ottplay.com/static/Image 104-3.png",
      title: 'Vulture',
      description:
        'Much like that standalone, this direct to video gem is a triumph, and I hope it doesnt take Warner Bros.',
      href: 'https://www.newsindiatimes.com/',
    },
    {
      id: '05',
      img: "https://images.ottplay.com/static/Image 104-2.png",
      title: 'IGN',
      description:
        'Much like that standalone, this direct to video gem is a triumph, and I hope it doesnt take Warner Bros.',
      href: 'https://in.ign.com/',
    },
    {
      id: '06',
      img: "https://images.ottplay.com/static/Image 40.png",
      title: 'IGN',
      description:
        'Much like that standalone, this direct to video gem is a triumph, and I hope it doesnt take Warner Bros.',
      href: 'https://in.ign.com/',
    },
  ];

  return (
    <div className={classes.root}>
      <Grid
        container
        // spacing={2}
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.rootBox}
      >
        <Grid
          item
          xs={12}
          container
          className={classes.contentBox}
          direction="row"
        >
          <Grid xs={12} sm={2} item className={classes.titleText}>
            Also Read
          </Grid>
          <Grid container xs={12} 
          // spacing={2} 
          className={classes.imgListBox}>
            <Hidden only={['xs']}>
              <Grid
                xs={12}
                md={4}
                container
                // spacing={2}
                className={classes.newsLeftContainer}
              >
                <Grid item xs={6} md={12}>
                  <ImageComponent
                    // style={{
                    //   width: '100%',
                    //   height: '242px',
                    //   borderRadius: '0.8vw',
                    // }}
                    src="https://images.ottplay.com/static/criticsReadmore.png"
                    alt="news"
                  />
                </Grid>
                <Grid item xs={6} md={12}>
                  <div className={classes.boxOfficeBox}>
                    <div>
                      <PillButton
                        text={'BoxOffice'}
                        className={classes.boxOffice}
                      />{' '}
                    </div>
                    <div
                      style={{
                        fontSize: '14px',
                        color: '#A89ABF',
                      }}
                    >
                      40 Mins Ago
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} style={{ width: '100%' }}>
                  <Typography className={classes.text}>
                    More than anything else, Gunjan Saxena: The Kargil Girl is a
                    deeply moving tale of a feminist father and his feisty
                    daughter.
                  </Typography>
                </Grid>
              </Grid>
            </Hidden>

            <Grid
              xs={12}
              md={8}
              container
              spacing={3}
              className={[classes.paper, classes.news_container_two].join(' ')}
            >
              {criticsReviews.map((critics, i) => {
                return (
                  <React.Fragment>
                    <Grid xs={12} sm={6} item className={classes.paper}>
                      <Card className={classes.cardRoot}>
                        <Box className={classes.leftBox}>
                          <ImageComponent
                            className={classes.media}
                            src={critics.img}
                            alt="news"
                          />
                          <div className={classes.ratingInnerBox}>
                            <Typography className={classes.ratingTypo}>
                              5.9
                            </Typography>
                            <ImageComponent src="https://images.ottplay.com/static/rating_star.svg" alt="rating_icon" />
                          </div>
                        </Box>
                        <Box className={classes.rightBox}>
                          <CardContent className={classes.content}>
                            <Typography
                              className={classes.channelName}
                              onClick={() => console.log('id')}
                            >
                              <a
                                href={critics.href}
                                rel="nofollow"
                                className={classes.channelName}
                              >
                                {critics.title}
                              </a>
                            </Typography>
                            <Typography className={classes.channelDesc}>
                              {critics.description.substring(0, 85)}...
                              <span>Read More</span>
                            </Typography>
                          </CardContent>
                        </Box>
                      </Card>
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
    margin: '4% 0 35px 0',
    color: '#ffffff',
    padding: '0 1.5%',
  },
  rootBox: {
    margin: 0,
  },
  contentBox: {
    padding: '0px !important',
  },
  details: {
    width: '169px',
    height: '20px',
    letterSpacing: '0',
    color: '#D6C6F4',
    opacity: '0.7',
    fontSize: '16px',
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
  newsLeftContainer: {
    //marginTop: '25px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
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
  imgListBox: {
    margin: 0,
    marginTop: 15,
  },
  boxOfficeBox: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  boxOffice: {
    color: '#ffffff',
    padding: ' 2px 15px 2px 15px',
    fontSize: '14px',
    borderRadius: '50px',
    textTransform: 'none',
    backgroundColor: '#331A5D',
  },
  leftBox: {
    width: '30%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  rightBox: {
    width: '70%',
  },
  titleText: {
    fontSize: '24px',
    color: '#ffffff',
    fontWeight: 600,
  },
  text: {
    fontSize: '20px',
    color: '#ffffff',
    paddingBottom: 5,
    fontWeight: 500,
  },
  criticsBox: {
    margin: 0,
  },
  ratingInnerBox: {
    display: 'flex',
    marginTop: 10,
    '& img': {
      width: 21,
      height: 20,
      marginTop: 2,
    },
  },
  ratingTypo: {
    fontSize: 18,
    color: '#19FF8C',
    marginRight: 5,
    fontWeight: 500,
  },
  paper: {
    //marginBottom: 10,
  },
  detailsData: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardRoot: {
    display: 'flex',
    padding: 20,
    background: '#1E0B40 0% 0% no-repeat padding-box',
    borderRadius: '10px',
    opacity: 0.8,
    fontSize: '20px',
    '&:hover': {
      backgroundColor: '#1E0B40',
      opacity: 1,
    },
  },
  content: {
    flex: '1 0 auto',
    background: '#1E0B40 0% 0% no-repeat padding-box',
    borderRadius: '10px',
    opacity: 0.8,
    color: '#ffffff',
    padding: 0,
    paddingLeft: 8,
    paddingBottom: '0px !important',
  },
  media: {
    width: 70,
    height: 70,
    borderRadius: '50%',
  },
  channelName: {
    textAlign: 'left',
    fontSize: '18px',
    letterSpacing: '0px',
    color: '#FFFFFF',
    opacity: 1,
    marginBottom: 8,
    textDecoration: 'none',
    fontWeight: 600,
    marginTop: 0,
  },
  channelDesc: {
    textAlign: 'left',
    fontSize: 12,
    letterSpacing: '0px',
    color: '#A89ABF',
    opacity: 1,
    overflow: 'hidden',
    '& span': {
      fontSize: 12,
      color: '#FF4376',
      fontWeight: 500,
      marginLeft: 4,
    },
  },
  news_container_two: {
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0px',
    },
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      padding: 0,
    },
    rootBox: {
      padding: '0px 16px',
      width: '100%',
    },
    titleText: {
      fontSize: 16,
      marginTop: 10,
    },
    media: {
      width: 44,
      height: 44,
    },
    ratingInnerBox: {
      '& img': {
        width: 16,
        height: 15,
      },
    },
    ratingTypo: {
      fontSize: 14,
    },
    channelName: {
      fontSize: 14,
      marginBottom: 2,
    },
    channelDesc: {
      fontSize: 11,
    },
    paper: {
      paddingTop: '16px !important',
      paddingBottom: '5px !important',
      padding: '0px !important',
    },
    leftBox: {
      width: '25%',
    },
    rightBox: {
      width: '75%',
    },
    imgListBox: {
      marginTop: 0,
    },
  },
}));
