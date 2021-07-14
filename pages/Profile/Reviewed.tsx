import * as React from 'react';

import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Hidden,
  Theme,
  Typography,
  makeStyles,
} from '@material-ui/core';

import ImageComponent from '../../components/Images';
import { ViewportContext } from '../../components/ViewportProvider';

export default function Reviewed() {
  const classes = useStyles();
  const { width } = React.useContext(ViewportContext);
  const criticsReviews = [
    {
      img: "https://images.ottplay.com/static/demo.png",
      title: 'Insecure',
      rating: '4.9',
      likesCount: 45,
      dislikesCount: 45,
      replies: 4,
      description:
        'Much like that standalone, this direct to video gem is a triumph, and I hope it doesnt take Warner Bros.',
    },
    {
      img: "https://images.ottplay.com/static/card1.png",
      title: 'Body At Brighton Rok',
      rating: '4.9',
      likesCount: 45,
      dislikesCount: 45,
      replies: 4,
      description:
        'Much like that standalone, this direct to video gem is a triumph, and I hope it doesnt take Warner Bros. video gem is a triumph, Much like that standalone, this direct to video gem is a triumph, and I hope it doesnt take Warner Bros. video gem is a triumph, Much like that standalone, this direct to video gem is a triumph, and I hope it doesnt take Warner Bros. video gem is a triumph, triumph, Much like that standalone, this direct to video gem is a triumph, and I hope it doesnt take Warner Bros.',
    },
    {
      img: "https://images.ottplay.com/static/card4.png",
      title: 'Kingdom',
      rating: '4.9',
      likesCount: 45,
      dislikesCount: 45,
      replies: 4,
      description:
        'Much like that standalone, this direct to video gem is a triumph, and I hope it doesnt take Warner Bros.',
    },
    {
      img: "https://images.ottplay.com/static/card5.png",
      title: 'Ancient War',
      rating: '4.9',
      likesCount: 45,
      dislikesCount: 45,
      replies: 4,
      description:
        'Much like that standalone, this direct to video gem is a triumph, and I hope it doesnt take Warner Bros.',
    },
    {
      img: "https://images.ottplay.com/static/card6.png",
      title: 'Padmavati',
      rating: '4.9',
      likesCount: 45,
      dislikesCount: 45,
      replies: 4,
      description:
        'Much like that standalone, this direct to video gem is a triumph, and I hope it doesnt take Warner Bros.',
    },
  ];

  return (
    <div className={classes.root}>
      <Grid xs={12} container direction="column" alignItems="flex-start">
        <p className={classes.titleCount}> 126 Titles </p>
        <Grid xs={width > 600 ? 9 : 12} container>
          {criticsReviews.map((critics) => {
            return (
              <Grid xs={12} item className={classes.paper}>
                <Card className={classes.cardRoot}>
                  <div className={classes.contentOuterBox}>
                    <CardMedia className={classes.cover} image={critics.img} />
                    <div>
                      <CardContent className={classes.cardContent}>
                        <div className={classes.contentBox}>
                          <div className={classes.ratingBox}>
                            <Typography className={classes.rating}>
                              {critics.rating}
                            </Typography>
                            <ImageComponent src="https://images.ottplay.com/static/rating_star.svg" alt="rating star" />
                          </div>
                          <Typography className={classes.contentTitle}>
                            {critics.title}
                          </Typography>
                        </div>
                        <div className={classes.contentDesc}>
                          {critics.description}
                        </div>
                      </CardContent>
                      <Hidden only={['xs']}>
                        <div className={classes.socialOuterBox}>
                          <div className={classes.socialBox}>
                            <div className={classes.socialInnerBox}>
                              <CardMedia
                                image="https://images.ottplay.com/static/like-1.svg"
                                className={classes.socialIcons}
                              />
                              <CardContent className={classes.socialContent}>
                                <Typography className={classes.count}>
                                  {critics.likesCount}
                                </Typography>
                                <Typography className={classes.countTitle}>
                                  likes
                                </Typography>
                              </CardContent>
                            </div>
                            <div className={classes.socialInnerBox}>
                              <CardMedia
                                image="https://images.ottplay.com/static/like.svg"
                                className={classes.socialIcons1}
                              />
                              <CardContent className={classes.socialContent}>
                                <Typography className={classes.count}>
                                  {critics.dislikesCount}
                                </Typography>
                                <Typography className={classes.countTitle}>
                                  dislikes
                                </Typography>
                              </CardContent>
                            </div>
                            <div className={classes.socialInnerBox}>
                              <CardMedia
                                image="https://images.ottplay.com/static/share-white.svg"
                                className={classes.socialIcons1}
                              />
                              <CardContent className={classes.socialContent}>
                                <Typography className={classes.count}>
                                  {critics.replies}
                                </Typography>
                                <Typography className={classes.countTitle}>
                                  replies
                                </Typography>
                              </CardContent>
                            </div>
                          </div>
                          <div className={classes.dateBox}>
                            <Typography className={classes.date}>
                              May 08, 2020, 12.15 PM
                            </Typography>
                          </div>
                        </div>
                      </Hidden>
                    </div>
                  </div>
                  <Hidden only={['sm', 'md', 'lg', 'xl']}>
                    <div className={classes.socialOuterBox}>
                      <div className={classes.socialBox}>
                        <div className={classes.socialInnerBox}>
                          <CardMedia
                            image="https://images.ottplay.com/static/like-1.svg"
                            className={classes.socialIcons}
                          />
                          <CardContent className={classes.socialContent}>
                            <Typography className={classes.count}>
                              {critics.likesCount}
                            </Typography>
                            <Typography className={classes.countTitle}>
                              likes
                            </Typography>
                          </CardContent>
                        </div>
                        <div className={classes.socialInnerBox}>
                          <CardMedia
                            image="https://images.ottplay.com/static/like.svg"
                            className={classes.socialIcons1}
                          />
                          <CardContent className={classes.socialContent}>
                            <Typography className={classes.count}>
                              {critics.dislikesCount}
                            </Typography>
                            <Typography className={classes.countTitle}>
                              dislikes
                            </Typography>
                          </CardContent>
                        </div>
                        <div className={classes.socialInnerBox}>
                          <CardMedia
                            image="https://images.ottplay.com/static/share-white.svg"
                            className={classes.socialIcons1}
                          />
                          <CardContent className={classes.socialContent}>
                            <Typography className={classes.count}>
                              {critics.replies}
                            </Typography>
                            <Typography className={classes.countTitle}>
                              replies
                            </Typography>
                          </CardContent>
                        </div>
                      </div>
                      <div className={classes.dateBox}>
                        <Typography className={classes.date}>
                          May 08, 2020, 12.15 PM
                        </Typography>
                      </div>
                    </div>
                  </Hidden>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    margin: '5px 0 35px 0',
    color: '#ffffff',
  },
  titleCount: {
    color: '#A89ABF',
    fontSize: 20,
    marginTop: 0,
    marginBottom: 11,
  },
  text: {
    fontSize: '22px',
    color: '#ffffff',
    paddingLeft: '20px',
  },
  paper: {
    width: '100%',
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
    marginBottom: 15,
  },
  detailsData: {
    flexDirection: 'column',
  },
  socialBox: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardRoot: {
    display: 'flex',
    background: ' #1E0B40 0% 0% no-repeat padding-box',
    borderRadius: '10px',
    padding: '20px 25px',
    flexDirection: 'column',
  },
  socialOuterBox: {
    paddingLeft: 16,
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cardContent: {
    flex: '1',
    background: '#1E0B40 0% 0% no-repeat padding-box',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '20px',
    padding: '0px 0px 0px 16px',
  },
  contentBox: {
    display: 'flex',
    '& img': {
      width: 17,
      height: 16,
      marginLeft: 5,
      marginBottom: 4,
    },
  },
  ratingBox: {
    display: 'flex',
    alignItems: 'center',
  },
  cover: {
    minWidth: 104,
    height: 152,
    objectFit: 'cover',
    borderRadius: '8px',
  },
  socialIcons: {
    width: 15,
    height: 14,
    marginBottom: 2,
  },
  socialIcons1: {
    width: 15,
    height: 14,
    marginBottom: 2,
    marginLeft: 15,
  },
  socialInnerBox: {
    display: 'flex',
    alignItems: 'center',
  },
  date: {
    color: '#D6C6F4',
    opacity: '0.3',
  },
  rating: {
    textAlign: 'left',
    fontSize: 16,
    letterSpacing: '0px',
    color: '#19FF8C',
    opacity: 1,
  },
  contentTitle: {
    textAlign: 'left',
    fontSize: 18,
    letterSpacing: '0px',
    color: '#FFFFFF',
    opacity: 1,
    marginLeft: 8,
  },
  contentDesc: {
    textAlign: 'left',
    fontSize: '13px',
    letterSpacing: '0px',
    color: '#A89ABF',
    opacity: 1,
    overflow: 'hidden',
    wordWrap: 'break-word',
  },
  socialContent: {
    padding: '0px 0px 0px 4px !important',
    color: '#D6C6F4',
    opacity: '0.3',
    display: 'inline-flex',
  },
  count: {
    marginLeft: 4,
  },
  contentOuterBox: {
    display: 'flex',
  },
  countTitle: {
    marginLeft: 4,
  },
  read: {
    color: '#D6C6F4',
    opacity: '0.7',
    fontSize: '18px',
    float: 'right',
    paddingRight: '8px',
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      margin: 0,
    },
    titleCount: {
      marginTop: 11,
      fontSize: 12,
    },
    cardRoot: {
      padding: 15,
    },
    cover: {
      minWidth: 63,
      height: 85,
    },
    date: {
      fontSize: 10,
      marginTop: 8,
    },
    socialInnerBox: {
      display: 'inline-flex',
    },
    cardContent: {
      padding: '0px 16px !important',
    },
    ratingBox: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    contentOuterBox: {
      display: 'inline-flex',
    },
    socialOuterBox: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 10,
      paddingLeft: 0,
      flexDirection: 'column',
    },
    contentBox: {
      display: 'block',
      '& img': {
        width: 15,
        height: 14,
        marginLeft: 5,
      },
    },
    contentTitle: {
      fontSize: 13,
      fontWeight: 600,
      marginTop: 2,
      marginLeft: 0,
    },
    contentDesc: {
      fontSize: 10,
      marginTop: 2,
    },
    rating: {
      fontSize: 12,
    },
    count: {
      fontSize: 10,
    },
    countTitle: {
      fontSize: 10,
    },
  },
}));
