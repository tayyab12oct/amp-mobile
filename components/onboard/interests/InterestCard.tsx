import { Theme, makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ImageComponent from '../../Images';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { ViewportContext } from '../../ViewportProvider';

export default function InterestCard({
  data,
  handleClose,
  handleSkip,
  // selectedCards,
  handleSelection,
  isSelected,
}) {
  const classes = useStyles();
  const { width } = React.useContext(ViewportContext);
  const [loaded, setLoaded] = React.useState(false);

  const moreProvider = (provider) => {
    if (provider && provider.length > 2) {
      return ' . +' + (provider.length - 2).toString();
    }
    return '';
  };

  return (
    <React.Fragment>
      <Grid xs={12} container>
        <Card className={classes.root}>
          {/* <CardActionArea disableRipple> */}
          <div className={classes.cardWrap}>
            <div className={classes.cardMainContent}>
              <Grid
                xs={12}
                container
                className={[classes.interestCard, classes.center].join(' ')}
              >
                <CardMedia
                  className={classes.mediaCard}
                  component="img"
                  style={{ height: 'calc(100% - clamp(30px, 1.5vw, 40px))' }}
                  alt="card Image"
                  image={loaded ? data.posters[0] || "https://images.ottplay.com/static/poster_default.png" : "https://images.ottplay.com/static/poster_default.png"}
                  onClick={() =>
                    handleSelection(
                      data,
                      data._id,
                      data.name,
                      data.primary_language.name
                    )
                  }
                  onLoad={() => setLoaded(true)}
                />
                {isSelected ? (
                  <div
                    className={classes.mediaCard}
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.79)',
                      position: 'absolute',
                      borderRadius: '6px',
                      top: 0,
                      bottom: 0,
                      left: 0,
                      right: 0,
                      // maxHeight: width > 1300 ? '240px' : '210px',
                      // height: width > 1300 ? '240px' : '210px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onClick={() =>
                      handleSelection(
                        data,
                        data._id,
                        data.name,
                        data.primary_language.name
                      )
                    }
                  >
                    <ImageComponent
                      src="https://images.ottplay.com/static/interestHeart.svg"
                      alt="like"
                      // style={{
                      //   width: '50px',
                      //   height: '45px',
                      //   margin: '0 auto',
                      // }}
                    />
                  </div>
                ) : null}

                <Grid xs={12} container className={classes.buttonContainer}>
                  <CardActions
                    disableSpacing
                    className={classes.innerContainer}
                  >
                    <IconButton
                      className={classes.cardButton}
                      onClick={() =>
                        handleClose(
                          data,
                          data._id,
                          data.name,
                          data.primary_language.name
                        )
                      }
                    >
                      <ImageComponent src="https://images.ottplay.com/static/close_red.svg" alt="close" />
                    </IconButton>
                    <IconButton
                      className={classes.cardButton}
                      onClick={() =>
                        handleSkip(
                          data,
                          data._id,
                          data.name,
                          data.primary_language.name
                        )
                      }
                    >
                      <ImageComponent src="https://images.ottplay.com/static/skip.svg" alt="skip" />
                    </IconButton>
                    <IconButton
                      className={classes.cardButton}
                      onClick={() =>
                        handleSelection(
                          data,
                          data._id,
                          data.name,
                          data.primary_language.name
                        )
                      }
                    >
                      <ImageComponent src="https://images.ottplay.com/static/likeIcon.svg" alt="like" />
                    </IconButton>
                  </CardActions>
                </Grid>
              </Grid>
            </div>
          </div>
          <CardContent className={classes.content}>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.title}
              //   onClick={props.onCardClick}
            >
              {data.name}
            </Typography>
          </CardContent>
          {/* </CardActionArea> */}
          <CardActions className={classes.lowerContainer}>
            <span>
              <span>
                <b>{data.content_type}</b>
              </span>
              {data.where_to_watch && data.where_to_watch.length > 0 && (
                <span>
                  {data.content_type && <span> . </span>}
                  <span>
                    {data.where_to_watch
                      .slice(0, 2)
                      .map(
                        (provider) =>
                          provider.provider && provider.provider.name
                      )
                      .join(' . ') + moreProvider(data.where_to_watch)}{' '}
                  </span>
                </span>
              )}
            </span>
          </CardActions>
        </Card>
      </Grid>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  hoverRoot: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
  },
  root: {
    flexGrow: 1,
    borderRadius: '6px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    outline: 'none',
    boxShadow: 'none',
    margin: '10px 0 0 0 ',
    '&:hover': {
      backgroundColor: 'transparent',
      opacity: 1,
    },
  },
  cardWrap: {
    display: 'block',
    content: '',
    position: 'relative',
    paddingBottom: '150%', // to maintain aspect ratio 2:3
    cursor: 'pointer',
    backgroundColor: '#1E0B40',
    borderRadius: '6px',
  },
  cardMainContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  center: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '6px',
  },
  content: {
    padding: '4px 0px 0px',
    marginLeft: 2,
  },
  match: {
    letterSpacing: '0.84px',
    fontSize: '12px',
    color: '#03F87E',
    textTransform: 'uppercase',
    opacity: 1,
  },
  mediaCard: {
    position: 'relative',
    borderRadius: '6px',
    width: '100%',
    // border: '1px solid #3d2f58',
    borderBottom: 'none',
    cursor: 'pointer',
    background: 'rgb(25, 5, 71)',
  },
  providers: {
    fontSize: 'clamp(10px, 1vw, 14px)',
  },
  title: {
    textAlign: 'left',
    letterSpacing: '0px',
    color: ' #FFFFFF',
    textTransform: 'capitalize',
    opacity: 1,
    lineHeight: 'clamp(20px, 1vw, 24px)',
    fontSize: 'clamp(16px, 1vw, 24px)',
    // minHeight: '51px',
    overflow: 'hidden',
    fontWeight: 700,
  },
  lowerContainer: {
    display: 'block',
    textAlign: 'left',
    opacity: '0.6',
    letterSpacing: '0px',
    color: '#D6C6F4',
    padding: '0px',
    marginLeft: '2px !important',
    marginTop: '2px',
    fontSize: 'clamp(12px, 1vw, 14px)',
    textTransform: 'capitalize',
    textOverflow: 'ellipsis',
  },
  type: {
    fontWeight: 700,
  },
  buttonContainer: {
    height: 'clamp(30px, 1.5vw, 40px)',
    // position: 'absolute',
    // bottom: 0,
  },
  innerContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#160731',
    justifyContent: 'space-between',
    padding: '5px',
    borderRadius: '6px',
  },
  cardButton: {
    width: '30%',
    height: '100%',
    padding: 0,
    '& img': {
      height: '14px',
    },
  },
  interestCard: {
    backgroundColor: '#160731',
    borderRadius: '6px',
    position: 'relative',
    // width: 180,
    display: 'block',
  },
}));
