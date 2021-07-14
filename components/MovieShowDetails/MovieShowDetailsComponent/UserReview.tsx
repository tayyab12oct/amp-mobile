import * as React from 'react';

import {
  Box,
  Card,
  CardContent,
  Grid,
  Hidden,
  TextareaAutosize,
  Theme,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { PillButton, RateSlider } from '../..';

import Modal from 'react-modal';

import UserReviewDetail from '../../UserReviewDetail';

import ImageComponent from '../../Images';

export function UserReview(this: any, { location }) {
  const classes = useStyles();

  const [review, setReview] = React.useState(false);
  const [character, setCharacter] = React.useState(10);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const reviews = [
    {
      img: "https://images.ottplay.com/static/Image 40.png",
      title: 'John Green',
      description:
        ' Movie was on the fire one the first day, was it worth watching. Know more about the in the news detail page',
    },
    {
      img: "https://images.ottplay.com/static/Image 40.png",
      title: 'Grant Hook',
      description:
        'Much like that standalone, this direct to video gem is a triumph, and I hope it doesnt take Warner Bros.',
    },
    {
      img: "https://images.ottplay.com/static/Image 40.png",
      title: 'Tom Baley',
      description:
        'Much like that standalone, this direct to video gem is a triumph, and I hope it doesnt take Warner Bros.',
    },
  ];

  const handleUserReviews = () => {
    setReview(!review);
    setModalIsOpen(true);
  };

  const handleChange = (e) => {
    setCharacter(10 - e.target.value.length);
  };

  const handleInput = (e) => {
    e.target.value.substring(0, 10);
  };

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
          <Hidden only={['xs']}>
            <Grid container xs={12}>
              <Grid xs={3} item className={classes.text}>
                User reviews
              </Grid>
              <Grid xs={7} item></Grid>
              <Grid xs={2} item>
                <Typography className={classes.read}>
                  Read All Reviews{' '}
                </Typography>
              </Grid>
            </Grid>
            <Grid container xs={12} style={{ marginBottom: 15 }}>
              <span
                style={{
                  width: '100%',
                  opacity: '0.2',
                  marginTop: '-8px',
                  paddingRight: 10,
                }}
              >
                <hr />
              </span>
            </Grid>
          </Hidden>
          <Grid container xs={12} spacing={3} className={classes.userBox}>
            <Grid xs={12} md={6} item className={classes.paper}>
              {reviews.map((review, i) => {
                return (
                  <Card
                    className={classes.cardRoot}
                    key={i}
                    onClick={() => handleUserReviews()}
                  >
                    <Grid xs={12} item style={{ display: 'flex' }}>
                      <Box className={classes.leftBox}>
                        <ImageComponent
                          className={classes.media}
                          src={review.img}
                          alt="rating icon"
                        />
                        <div className={classes.ratingInnerBox}>
                          <Typography className={classes.ratingTypo}>
                            5.9
                          </Typography>
                          <ImageComponent src="https://images.ottplay.com/static/rating_star.svg" alt="rating_icon" />
                        </div>
                      </Box>
                      <Box className={classes.rightBox}>
                        <CardContent className={classes.cardContent}>
                          <Typography
                            className={classes.channelName}
                            onClick={() => handleUserReviews()}
                          >
                            <a
                              href=""
                              rel="nofollow"
                              className={classes.channelName}
                            >
                              {review.title}
                            </a>
                          </Typography>
                          <Typography className={classes.channelDesc}>
                            {review.description}
                          </Typography>
                        </CardContent>
                      </Box>
                    </Grid>

                    <Grid xs={12} item>
                      <Box className={classes.iconBox}>
                        <Box className={classes.iconInnerBox}>
                          <div className={classes.icons}>
                            <ImageComponent src="https://images.ottplay.com/static/like-1.svg" alt="like" />
                          </div>
                          <Typography className={classes.iconTypo}>
                            50 likes
                          </Typography>
                        </Box>
                        <Box className={classes.iconInnerBox}>
                          <div className={classes.icons}>
                            <ImageComponent src="https://images.ottplay.com/static/like.svg" alt="dislike" />
                          </div>
                          <Typography className={classes.iconTypo}>
                            50 dislikes
                          </Typography>
                        </Box>
                        <Box className={classes.iconInnerBox}>
                          <div className={classes.icons}>
                            <ImageComponent src="https://images.ottplay.com/static/reply.svg" alt="reply" />
                          </div>
                          <Typography className={classes.iconTypo}>
                            Reply
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Card>
                );
              })}
            </Grid>
            <Grid xs={12} md={6} item className={classes.lower_container}>
              <RateSlider />
              <Grid xs={12} item style={{ width: '100%' }}>
                <TextareaAutosize
                  aria-label="User Review"
                  className={classes.textField}
                  rowsMin={8}
                  placeholder="Write a review…"
                  onChange={handleChange}
                  onInput={handleInput}
                />
              </Grid>
              <Grid xs={12} item>
                <Typography className={classes.charTypo}>
                  {character <= 0
                    ? `character count exceeded`
                    : `0/${character} characters`}
                </Typography>
              </Grid>
              <Grid
                xs={12}
                item
                style={{ display: 'flex', justifyContent: 'flex-end' }}
              >
                <Hidden only={['xs']}>
                  <PillButton
                    text={'Sign in'}
                    endIcon={<ImageComponent src="https://images.ottplay.com/static/rightArrow.svg" alt="end" />}
                    style={{
                      backgroundColor: '#695197',
                      margin: 0,
                      border: '0.5px solid #35147A',
                      font: 'normal normal normal 20px Montserrat',
                      fontWeight: '600',
                      textTransform: 'none',
                      color: '#A89ABF',
                      width: 185,
                      height: 55,
                      borderRadius: '28px',
                      marginRight: 10,
                    }}
                  />
                  <PillButton
                    text={'Submit'}
                    endIcon={<ImageComponent src="https://images.ottplay.com/static/rightArrow.svg" alt="end" />}
                    style={{
                      backgroundColor: '#FF4275',
                      margin: 0,
                      border: '0.5px solid #35147A',
                      font: 'normal normal normal 20px Montserrat',
                      fontWeight: '600',
                      textTransform: 'none',
                      color: 'white',
                      width: 185,
                      height: 55,
                      borderRadius: '28px',
                    }}
                  />
                </Hidden>
                <Hidden only={['sm', 'md', 'lg', 'xl']}>
                  <PillButton
                    text={'Submit'}
                    endIcon={<ImageComponent src="https://images.ottplay.com/static/rightArrow.svg" alt="end" />}
                    style={{
                      backgroundColor: '#FF4275',
                      margin: 0,
                      border: '0.5px solid #35147A',
                      font: 'normal normal normal 14px Montserrat',
                      fontWeight: '600',
                      textTransform: 'none',
                      color: 'white',
                      width: 116,
                      height: 35,
                      borderRadius: '28px',
                    }}
                  />
                </Hidden>
              </Grid>
            </Grid>
          </Grid>
          <div
            style={{
              width: '100%',
              opacity: '0.2',
              marginTop: '5%',
              paddingRight: 10,
            }}
          >
            <hr />
          </div>
        </Grid>
      </Grid>
      <Modal
        isOpen={modalIsOpen}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            overflow: 'hidden',
            background: 'rgba(0,0,0,0.8)',
          },
          content: {
            position: 'fixed',
            top: '0%',
            left: '55%',
            right: '0%',
            bottom: '0%',
            background: '#23104a',
            overflow: 'hidden',
            WebkitOverflowScrolling: 'touch',
            outline: 'none',
            zIndex: '999',
            border: 'none',
            padding: 0,
          },
        }}
        onAfterOpen={() => {
          document.body.style.overflow = 'hidden';
        }}
        onAfterClose={() => {
          document.body.style.overflow = 'auto';
        }}
      >
        <UserReviewDetail
          location={location}
          isOpen={modalIsOpen}
          setModal={setModalIsOpen}
        />
      </Modal>
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
    paddingLeft: 10,
  },
  text: {
    fontSize: 'clamp(16px, 1.6vw, 24px)',
    color: '#ffffff',
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 10,
    fontWeight: 500,
    borderBottom: '4px solid #FF4275',
  },
  charTypo: {
    color: '#A89ABF',
    fontSize: 14,
    margin: '15px 10px',
  },
  icons: {
    width: 39,
    height: 39,
    border: '1px solid #D6C6F4',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    marginBottom: 2,
  },
  iconInnerBox: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0px 5px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userBox: {
    margin: 0,
  },
  paper: {
    paddingLeft: '0px !important',
    paddingTop: '0px !important',
  },
  iconBox: {
    display: 'flex',
    float: 'right',
  },
  iconTypo: {
    fontSize: 11,
    color: '#D6C6F4',
  },
  details: {
    width: '169px',
    height: '20px',
    letterSpacing: '0',
    color: '#D6C6F4',
    opacity: '0.7',
    fontSize: '18px',
  },
  cardRoot: {
    color: '#D6C6F4',
    margin: '15px 10px',
    background: '#1E0B40 0% 0% no-repeat padding-box',
    opacity: 0.8,
    borderRadius: 10,
    padding: 20,
  },
  cover: {
    width: '70px',
    height: '70px',
    margin: '20px 0 0 20px',
    borderRadius: '50%',
  },
  textField: {
    width: '100%',
    background: '#351667',
    border: 'none',
    textAlign: 'left',
    fontSize: '14px',
    letterSpacing: '0px',
    color: '#A89ABF',
    opacity: 1,
    padding: '10px 15px',
    '&::placeholder': {
      color: '#A89ABF',
      textShadow: 'none',
      fontWeight: 500,
      fontFamily: 'Montserrat !important',
    },
  },
  back: {
    float: 'right',
    marginTop: '20px',
    height: '50px',
    borderRadius: '35px',
    width: '180px',
    fontSize: '18px',
    backgroundColor: '#FF4376',
    color: '#ffffff',
    marginRight: '15px',
  },
  read: {
    color: '#D6C6F4',
    opacity: '0.7',
    fontSize: '18px',
    float: 'right',
    paddingRight: '8px',
  },
  leftBox: {
    width: '20%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  rightBox: {
    width: '80%',
  },
  media: {
    width: 67,
    height: 67,
    borderRadius: '50%',
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
  cardContent: {
    flex: '1 0 auto',
    background: '#1E0B40 0% 0% no-repeat padding-box',
    borderRadius: '10px',
    opacity: 0.8,
    color: '#ffffff',
    padding: 0,
    paddingBottom: '0px !important',
  },
  channelName: {
    textAlign: 'left',
    fontSize: '18px',
    letterSpacing: '0px',
    color: '#FFFFFF',
    opacity: 1,
    marginBottom: 5,
    textDecoration: 'none',
    fontWeight: 600,
    marginTop: 0,
  },
  channelDesc: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 400,
    // letterSpacing: "0px",
    lineHeight: '20px',
    color: '#A89ABF',
    opacity: 1,
    overflow: 'hidden',
  },
  [theme.breakpoints.down('xs')]: {
    rootBox: {
      paddingLeft: 0,
    },
    paper: {
      padding: '0px !important',
    },
    cardRoot: {
      margin: 0,
      marginBottom: 16,
      padding: 15,
    },
    channelName: {
      fontSize: 14,
      marginBottom: 0,
    },
    channelDesc: {
      fontSize: 11,
    },
    media: {
      width: 44,
      height: 44,
    },
    ratingTypo: {
      fontSize: 14,
    },
    ratingInnerBox: {
      '& img': {
        width: 16,
        height: 15,
      },
    },
    leftBox: {
      width: '25%',
    },
    rightBox: {
      width: '75%',
    },
    icons: {
      width: 24,
      height: 24,
      '& img': {
        width: 12,
        height: 11,
      },
    },
    iconBox: {
      marginTop: 10,
    },
    iconTypo: {
      fontSize: 7,
      color: '#D6C6F4',
    },
    lower_container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '3px !important',
    },
    charTypo: {
      margin: 0,
      fontSize: 10,
      color: '#A89ABF',
    },
  },
}));
