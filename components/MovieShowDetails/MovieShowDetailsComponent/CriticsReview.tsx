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

import ImageComponent from '../../Images';
import { ViewportContext } from '../../ViewportProvider';

export function CriticsReview(props) {
  const classes = useStyles();
  const { width } = React.useContext(ViewportContext);
  const { handleClick } = props;

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
                Critics reviews
              </Grid>
              <Grid xs={7} item></Grid>
              {/* ---TODO---critics review listing page */}
              {/* <Grid xs={2} item>
                <div className={classes.read}>Read All Reviews</div>
              </Grid> */}
            </Grid>
            <Grid container xs={12} style={{ marginBottom: 15 }}>
              <span
                style={{
                  width: '100%',
                  opacity: '0.2',
                  marginTop: '-8px',
                  marginRight: 10,
                }}
              >
                <hr />
              </span>
            </Grid>
          </Hidden>

          <Grid
            container
            xs={12}
            className={classes.criticsBox}
            style={{
              gridTemplateColumns:
                props.criticsReviews &&
                props.criticsReviews.length < 3 &&
                width > 600
                  ? 'repeat(auto-fit, minmax(270px, 320px))'
                  : '',
            }}
          >
            {props.criticsReviews &&
              props.criticsReviews.map((critics) => {
                return (
                  <Grid
                    item
                    className={classes.cardBox}
                    onClick={() =>
                      handleClick(
                        critics.content_type,
                        critics.source.url,
                        critics.critic_review.seo_url
                      )
                    }
                  >
                    <Card className={classes.cardRoot}>
                      <Box className={classes.leftBox}>
                        <ImageComponent
                          className={classes.media}
                          src={critics.source && critics.source.logo_url}
                          alt="percentage icon"
                        />
                        {critics.rating && (
                          <div className={classes.ratingInnerBox}>
                            <Typography className={classes.ratingTypo}>
                              {critics.rating}
                            </Typography>
                            <ImageComponent src="https://images.ottplay.com/static/rating_star.svg" alt="rating_icon" />
                          </div>
                        )}
                      </Box>
                      <Box className={classes.rightBox}>
                        <CardContent className={classes.cardContent}>
                          <Typography className={classes.channelName}>
                            <a
                              href={critics.url}
                              rel="nofollow"
                              className={classes.channelName}
                            >
                              {critics.source && critics.source.name}
                            </a>
                          </Typography>
                          <Typography className={classes.channelDesc}>
                            {/* {critics.source.summary && critics.source.summary}||  */}
                            {critics.headline}
                            {/* <span>
                            Read More
                            </span> */}
                          </Typography>
                        </CardContent>
                      </Box>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    margin: '25px 0 35px 0',
    color: '#ffffff',
    cursor: 'pointer',
  },
  rootBox: {
    paddingLeft: 10,
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
  text: {
    fontSize: 'clamp(16px, 1.6vw, 24px)',
    color: '#ffffff',
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 10,
    fontWeight: 500,
    borderBottom: '4px solid #FF4275',
  },
  criticsBox: {
    margin: 0,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
    gap: '1rem',
  },
  cardBox: {
    paddingBottom: '0px !important',
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
    height: '100%',
    '&:hover': {
      backgroundColor: '#1E0B40',
      opacity: 1,
    },
  },
  cardContent: {
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
    textTransform: 'capitalize',
  },
  channelDesc: {
    textAlign: 'left',
    fontSize: 12,
    letterSpacing: '0px',
    color: '#A89ABF',
    opacity: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    display: '-webkit-box',
    '& span': {
      fontSize: 12,
      color: '#FF4376',
      fontWeight: 500,
      marginLeft: 4,
    },
  },
  read: {
    color: '#D6C6F4',
    opacity: '0.7',
    fontSize: '18px',
    float: 'right',
    paddingRight: '8px',
  },
  [theme.breakpoints.down('xs')]: {
    rootBox: {
      paddingLeft: 0,
    },
    cardBox: {
      padding: '0px !important',
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
    cardRoot: {
      padding: '20px 10px',
    },
    leftBox: {
      width: '25%',
    },
    rightBox: {
      width: '75%',
    },
    cardContent: {
      paddingLeft: 0,
    },
  },
}));
