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
  
  import React from 'react';
import ImageComponent from '../Images';
  
  export function ReviewCard({ ...props }) {
    const { result } = props;
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
  
    const critics = {
      id: '01',
      img: "https://images.ottplay.com/static/Image 104.png",
      title: 'News India',
      description:
        'Much like that standalone, this direct to video gem is a triumph, and I hope it doesnt take Warner Bros this direct to video gem is a triumph, and I hope it doesnt take Warner Bros.',
      href: 'https://www.newsindiatimes.com/',
    };
  
    return (
      <Card className={classes.cardRoot}>
        <Box className={classes.leftBox}>
          <ImageComponent className={classes.media} src={critics.img} alt="news" />
          <div className={classes.ratingInnerBox}>
            <Typography className={classes.ratingTypo}>5.9</Typography>
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
              <span className={classes.description}>{critics.description}</span>
              <span className={classes.readMore}>Read More</span>
            </Typography>
          </CardContent>
        </Box>
      </Card>
    );
  }
  
  const useStyles = makeStyles((theme: Theme) => ({
    cardRoot: {
      display: 'flex',
      padding: '12px',
      margin: '12px 0px',
      backgroundColor: '#1E0B4060',
      borderRadius: '10px',
      fontSize: '20px',
      '&:hover': {
        backgroundColor: '#1E0B40',
        opacity: 1,
      },
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
    media: {
      width: 70,
      height: 70,
      borderRadius: '50%',
      objectFit: 'cover',
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
    content: {
      flex: '1 0 auto',
      borderRadius: '10px',
      opacity: 0.8,
      color: '#ffffff',
      padding: 0,
      paddingLeft: 8,
      paddingBottom: '0px !important',
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
      cursor: 'pointer',
    },
    description: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      display: '-webkit-box',
    },
    readMore: {
      fontSize: 12,
      color: '#FF4376',
      fontWeight: 500,
    },
    [theme.breakpoints.down('xs')]: {
      cardRoot: {
        margin: '0px 0px 12px 0px',
        backgroundColor: '#1E0B4080',
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
      leftBox: {
        width: '20%',
      },
      rightBox: {
        width: '80%',
      },
    },
  }));
  