import { Box, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { Theme, makeStyles } from '@material-ui/core/styles';

import { PillButton } from '../PillButton';
import React from 'react';
import ImageComponent from '../Images';

export default function ReviewSection({ location }) {
  const classes = useStyles();

  const [reviews, setReviews] = React.useState([
    {
      img: "https://images.ottplay.com/static/Image 40.png",
      title: 'John Green',
      description:
        'The French Revolution constituted for the conscience of the dominant aristocratic class a fall from innocence, and upturning',
      time: 'May 08, 2020, 12.15 PM',
    },
    // {
    //   img: sony,
    //   title: 'Grant Hook',
    //   description:
    //     'Much like that standalone, this direct to video gem is a triumph, and I hope it doesnt take Warner Bros.',
    // },
    // {
    //   img: sony,
    //   title: 'Tom Baley',
    //   description:
    //     'Much like that standalone, this direct to video gem is a triumph, and I hope it doesnt take Warner Bros.',
    // },
    // {
    //   img: sony,
    //   title: 'John Green',
    //   description:
    //     ' Movie was on the fire one the first day, was it worth watching. Know more about the in the news detail page',
    // },
    // {
    //   img: sony,
    //   title: 'Grant Hook',
    //   description:
    //     'Much like that standalone, this direct to video gem is a triumph, and I hope it doesnt take Warner Bros.',
    // },
    // {
    //   img: sony,
    //   title: 'Tom Baley',
    //   description:
    //     'Much like that standalone, this direct to video gem is a triumph, and I hope it doesnt take Warner Bros.',
    // },
    // {
    //   img: sony,
    //   title: 'John Green',
    //   description:
    //     ' Movie was on the fire one the first day, was it worth watching. Know more about the in the news detail page',
    // },
    // {
    //   img: sony,
    //   title: 'Grant Hook',
    //   description:
    //     'Much like that standalone, this direct to video gem is a triumph, and I hope it doesnt take Warner Bros.',
    // },
    // {
    //   img: sony,
    //   title: 'Tom Baley',
    //   description:
    //     'Much like that standalone, this direct to video gem is a triumph, and I hope it doesnt take Warner Bros.',
    // },
  ]);

  const [post, setPost] = React.useState(false);
  const [reply, setReply] = React.useState<any[]>([]);
  const [review, setReview] = React.useState('');
  const [like, setLike] = React.useState(0);
  const [likeComment, setLikeComment] = React.useState(0);
  const [dislike, setDislike] = React.useState(50);
  const [dislikeComment, setDislikeComment] = React.useState(50);
  const [select, setSelect] = React.useState('');
  const [likePopup, setLikePopup] = React.useState(false);
  const [dislikePopup, setDislikePopup] = React.useState(false);
  const [cardSection, setCardSection] = React.useState(true);

  const [count, setCount] = React.useState(0);

  const handleReply = () => {
    setPost(true);
    console.log('reply');
  };

  const handleLikeComment = (key) => {
    setLikeComment(likeComment + 1);
  };

  const handleDislikeComment = (key) => {
    if (dislikeComment === 0) {
      setDislikeComment(0);
    } else {
      setDislikeComment(dislikeComment - 1);
    }
  };

  const handleLike = (key) => {
    setLike(like + 1);
    console.log(key);
    //setSelect(key);
    // let timer = setTimeout(() => {
    //   setLikePopup(false);
    //   setCardSection(true);
    // }, 5000);
    // return () => {
    //   clearTimeout(timer);
    // };
  };

  const handleDislike = (key) => {
    setDislike(dislike - 1);
    console.log(key);
    //setSelect(key);
    // let timer = setTimeout(() => {
    //   setLikePopup(false);
    //   setCardSection(true);
    // }, 5000);
    // return () => {
    //   clearTimeout(timer);
    // };
  };

  console.log('name', location);

  const handleChange = (e) => {
    setReview(e.target.value.replace(/[^\w\s]/gi, ''));
  };

  const time = new Date();
  const currentTime = time.toLocaleString('en-US', {
    hour: 'numeric',
    hour12: true,
    minute: 'numeric',
  });

  const options = { year: 'string', month: 'string', day: 'string' };
  const today = new Date();
  const currentDate = today.toLocaleDateString('en-US');
console.log("currentDate", currentDate);
  const todayDate = currentDate + ', ' + currentTime;

  const handlePost = () => {
    console.log('posted');
    reply.push({
      img: "https://images.ottplay.com/static/Image 40.png",
      title: 'Sarah Green',
      description: review,
      time: todayDate,
    });
    setReview('');
    console.log('sayyy', reviews);
  };

  return (
    <div>
      <Grid xs={12} container className={classes.containerBox}>
        {reviews.map((review, i) => {
          return (
            <React.Fragment>
              <Card className={classes.cardRoot} key={i}>
                <Grid xs={12} item className={classes.wrapper}>
                  <Box className={classes.leftBox}>
                    <ImageComponent className={classes.media} src={review.img} />
                    <div className={classes.ratingInnerBox}>
                      <Typography className={classes.ratingTypo}>
                        5.9
                      </Typography>
                      <ImageComponent src="https://images.ottplay.com/static/rating_star.svg" alt="rating_icon" />
                    </div>
                  </Box>
                  <Box className={classes.rightBox}>
                    <CardContent className={classes.content}>
                      <Typography className={classes.channelName}>
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

                    <Grid xs={12} item className={classes.lowerBox}>
                      <Box>
                        <div className={classes.time}>{review.time}</div>
                      </Box>
                      <Box className={classes.iconBox}>
                        <Box
                          className={classes.iconInnerBox}
                          onClick={handleLikeComment}
                        >
                          <div className={classes.icons}>
                            <ImageComponent src="https://images.ottplay.com/static/like-1.svg" alt="like" />
                          </div>
                          <Typography className={classes.iconTypo}>
                            {likeComment} likes
                          </Typography>
                        </Box>
                        <Box className={classes.iconInnerBox}>
                          <div
                            className={classes.icons}
                            onClick={handleDislikeComment}
                          >
                            <ImageComponent src="https://images.ottplay.com/static/like.svg" alt="dislike" />
                          </div>
                          <Typography className={classes.iconTypo}>
                            {dislikeComment} dislikes
                          </Typography>
                        </Box>
                        <Box
                          className={classes.iconInnerBox}
                          onClick={handleReply}
                        >
                          <div className={classes.icons}>
                            <ImageComponent src="https://images.ottplay.com/static/reply.svg" alt="reply" />
                          </div>
                          <Typography className={classes.iconTypo}>
                            Reply
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Box>
                </Grid>
                <hr className={classes.hrLine1} />
              </Card>
            </React.Fragment>
          );
        })}
        {reply.map((review, i) => {
          return (
            <React.Fragment>
              <Card className={classes.commentcardRoot} key={i}>
                <Grid xs={12} item className={classes.wrapper}>
                  <Box className={classes.leftBox}>
                    <ImageComponent
                      className={classes.commentMedia}
                      alt="review icon"
                      src={review.img}
                    />
                  </Box>
                  <Box className={classes.rightBox}>
                    <CardContent className={classes.content}>
                      <Typography className={classes.channelName}>
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
                    <Grid xs={12} item className={classes.lowerBox}>
                      <Box>
                        <div className={classes.time}>{review.time}</div>
                      </Box>
                      <Box className={classes.iconBox}>
                        <Box
                          className={classes.iconInnerBox}
                          onClick={() => handleLike(i)}
                        >
                          <div className={classes.icons}>
                            <ImageComponent src="https://images.ottplay.com/static/like-1.svg" alt="like" />
                          </div>
                          <Typography className={classes.iconTypo}>
                            {like} likes
                          </Typography>
                        </Box>
                        <Box className={classes.iconInnerBox}>
                          <div
                            className={classes.icons}
                            onClick={() => handleDislike(i)}
                          >
                            <ImageComponent src="https://images.ottplay.com/static/like.svg" alt="dislike" />
                          </div>
                          <Typography className={classes.iconTypo}>
                            {dislike} dislikes
                          </Typography>
                        </Box>
                        {/* <Box
                          className={classes.iconInnerBox}
                          onClick={handleReply}
                        >
                          <div className={classes.icons}>
                            <ImageComponent src={replyImg} alt="reply" />
                          </div>
                          <Typography className={classes.iconTypo}>
                            Reply
                          </Typography>
                        </Box> */}
                      </Box>
                    </Grid>
                  </Box>
                </Grid>
              </Card>
              <hr className={classes.hrLine2} />
            </React.Fragment>
          );
        })}
        {post && (
          <span className={classes.playButton}>
            <input
              className={classes.input}
              placeholder="Write"
              onChange={handleChange}
              value={review}
              type="text"
              maxLength={500}
            />
            <PillButton
              text="Post"
              className={classes.button}
              onClick={handlePost}
            />
          </span>
        )}
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
  },
  containerBox: {
    // marginBottom: '11%',
    height: 'fit-content',
  },
  cardRoot: {
    color: '#D6C6F4',
    margin: 0,
    background: 'transparent',
    opacity: 0.8,
    width: '100%',
    padding: '20px 20px 0px 0px',
    boxShadow: 'none',
  },
  commentcardRoot: {
    color: '#D6C6F4',
    margin: '15px 10px 0px 15px',
    background: 'transparent',
    opacity: 0.8,
    width: '100%',
    padding: '20px 20px 0px 68px',
    boxShadow: 'none',
  },
  time: {
    fontSize: '10px',
    color: '#D6C6F4',
    opacity: 0.3,
  },
  hrLine1: {
    borderBottom: '1px solid #A89ABF',
    margin: '0px auto',
    opacity: 0.2,
    marginTop: 25,
    width: '100%',
  },
  hrLine2: {
    borderBottom: '1px solid #A89ABF',
    opacity: 0.2,
    marginTop: 25,
    width: '95%',
    marginRight: 20,
  },
  lowerBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '3%',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  leftBox: {
    width: '15%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  rightBox: {
    width: '85%',
    paddingLeft: 10,
  },
  media: {
    width: 67,
    height: 67,
    borderRadius: '50%',
  },
  commentMedia: {
    width: 53,
    height: 53,
    borderRadius: '50%',
  },
  ratingInnerBox: {
    display: 'flex',
    marginTop: 10,
    width: '100%',
    justifyContent: 'center',
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
  content: {
    flex: '1 0 auto',
    // background: '#1E0B40 0% 0% no-repeat padding-box',
    borderRadius: '10px',
    opacity: 0.8,
    color: '#ffffff',
    padding: 0,
    paddingBottom: '0px !important',
  },
  channelName: {
    textAlign: 'left',
    fontSize: '19px',
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
    // letterSpacing: '0px',
    lineHeight: '20px',
    color: '#A89ABF',
    opacity: 1,
    overflow: 'hidden',
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
    cursor: 'pointer',
  },
  iconInnerBox: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0px 5px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBox: {
    display: 'flex',
    float: 'right',
  },
  iconTypo: {
    fontSize: 11,
    color: '#D6C6F4',
  },
  // sideBar: {
  //   //backgroundColor: '#23104A',
  //   overflow: 'auto',
  //   overflowY: 'scroll',
  //   scrollbarWidth: 'none' /* Firefox */,
  //   '&::-webkit-scrollbar': {
  //     width: '15px',
  //     background: '#090411 0% 0% no-repeat padding-box'
  //   },
  //   '&::-webkit-scrollbar-track': {
  //     boxShadow: 'inset 0 0 5px #090411',
  //     borderRadius: '13px',
  //     width: '10px',
  //     background: '#090411 0% 0% no-repeat padding-box'
  //   },
  //   '&::-webkit-scrollbar-thumb': {
  //     background: '#03F87E',
  //     borderRadius: '10px',
  //   },
  // },
  playButton: {
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    opacity: 1,
    padding: '5px 2.5%',
    outline: 'none',
    zIndex: 1,
    position: 'absolute',
    fontSize: '20px',
    height: '10%',
    border: 'none',
    '&::placeholder': {
      color: '#FFFFFF',
      fontSize: '28px',
      fontWeight: 500,
    },
    background: '#100627 0% 0% no-repeat padding-box',
    boxShadow: '0px 3px 6px #00000029',
    bottom: '0',
    right: '0%',
  },
  input: {
    color: '#fff',
    width: '100%',
    opacity: 1,
    padding: '2.5% 2.5% 2.5% 12px',
    outline: 'none',
    zIndex: 1,
    fontSize: '28px',
    fontWeight: 500,
    border: 'none',
    '&::placeholder': {
      color: '#FFFFFF',
      fontSize: '28px',
      fontFamily: 'Montserrat',
    },
    background: '#100627 0% 0% no-repeat padding-box',
    boxShadow: '0px 3px 6px #00000029',
    bottom: '0',
    right: '0%',
  },
  button: {
    backgroundColor: '#03F87E',
    color: '#200C43',
    whiteSpace: 'nowrap',
    //border: '1px solid #695197',
    padding: '0px 30px',
    margin: '0 5px',
    borderRadius: '50px',
    fontSize: '26px',
    fontWeight: 700,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#03F87E',
    },
  },
}));
