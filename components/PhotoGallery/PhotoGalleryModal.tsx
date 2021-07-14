import {
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
  makeStyles,
  withStyles,
} from '@material-ui/core';
import React, { useState } from 'react';
import ImageComponent from '../Images';

const StyledLinearProgress = withStyles({
  root: {
    width: '100%',
    margin: '0 auto',
  },
  colorPrimary: {
    backgroundColor: '#130726',
  },
  barColorPrimary: {
    backgroundColor: '#FF4376',
  },
})(LinearProgress);

export default function PhotoGalleryModal(props) {
  const classes = useStyles();

  console.log('datad', props.photos);

  const handleClose = () => {
    props.handleClose(false);
  };

  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(1);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (endIndex < props.photos.length && oldProgress === 100) {
          clearInterval(timer);
          setStartIndex(startIndex + 1);
          setEndIndex(endIndex + 1);
          setProgress(0);
        }

        const diff = oldProgress + 25;
        return diff;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [endIndex]);

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ padding: '0 0 0 0.75%' }}
      >
        <Grid item xs={2}></Grid>
        <Grid item xs={8} container direction="row">
          <Grid xs={12} style={{ margin: '2%' }}>
            <Grid item xs={11}>
              <StyledLinearProgress variant="determinate" value={progress} />
            </Grid>
            <Grid
              xs={1}
              item
              style={{ float: 'right', marginTop: '-1%', cursor: 'pointer' }}
            >
              <ImageComponent src="https://images.ottplay.com/static/close.png" alt="close icon" 
              // onClick={handleClose}
              />
            </Grid>
          </Grid>
          <Grid 
          // xs={12} 
          container 
          spacing={2}
          >
            <Grid xs={9} item>
              <div
                className={classes.right}
                onClick={() => {
                  if (
                    props.photos.length > 1 &&
                    endIndex <= props.photos.length - 1
                  ) {
                    setStartIndex(startIndex + 1);
                    setEndIndex(endIndex + 1);
                  }
                }}
              >
                <ImageComponent src="https://images.ottplay.com/static/right_direc.svg" alt="righ icon" />
              </div>
              <div
                className={classes.left}
                onClick={() => {
                  if (startIndex > 0) {
                    setStartIndex(startIndex - 1);
                    setEndIndex(endIndex - 1);
                  }
                }}
              >
                <ImageComponent src="https://images.ottplay.com/static/right_direc.svg" alt="right icon" />
              </div>

              {props.photos.slice(startIndex, endIndex).map((photo, index) => (
                <Grid xs={12}>
                  <div style={{ height: '60vh' }}>
                    <ImageComponent
                      alt="photo"
                      className={classes.image}
                      // key={index}
                      src={photo.url || photo.img_url}
                    />
                  </div>

                  <Card className={classes.cardImage}>
                    <CardContent>
                      <Typography className={classes.photoTitle}>
                        {photo.caption}
                      </Typography>
                      <Typography className={classes.photoDesc}>
                        {photo.Caption}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Grid xs={3} item>
              {/* ad codes
              <Card className={classes.adsPostion}>
                <ImageComponent src={ads} alt="" width="100%" />
              </Card> */}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    margin: '2% 0',
  },
  adsPostion: {
    backgroundColor: 'transparent',
    marginTop: '4%',
    marginLeft: '6%',
    boxShadow: 'none',
  },
  image: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '100%',
    objectFit: 'fill',
    maxWidth: '100%',
  },
  cardImage: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
    position: 'relative',
    maxHeight: '89.56vh',
  },
  right: {
    position: 'absolute',
    color: '#fff',
    padding: '4px 5px',
    zIndex: 1,
    borderRadius: '4px',
    margin: '15% 0 0 47.5%',
    cursor: 'pointer',
  },
  left: {
    position: 'absolute',
    color: '#fff',
    padding: '4px 5px',
    zIndex: 1,
    borderRadius: '4px',
    marginTop: '15%',
    transform: 'rotate(180deg)',
    cursor: 'pointer',
  },
  photoTitle: {
    fontSize: '1.78vw',
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  photoDesc: {
    fontSize: '0.833vw',
    color: '#A89ABF',
  },
}));
