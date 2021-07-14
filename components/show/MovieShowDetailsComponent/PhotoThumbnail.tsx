import * as React from 'react';

import { CardMedia, Grid, Theme, makeStyles } from '@material-ui/core';

import Modal from 'react-modal';
import PhotoGalleryModal from '../../PhotoGallery/PhotoGalleryModal';

export default function PhotoThumbnail(props) {
  const classes = useStyles();

  const [show, setShow] = React.useState('');

  const handleExpand = (f) => {
    setShow(f.id);
  };

  const [modalOpen, setmodalOpen] = React.useState(false);

  const handleCloseModal = () => {
    setmodalOpen(false);
  };

  const handlePhotoModal = () => {
    setmodalOpen(true);
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
        <Grid
          item
          xs={12}
          container
          className={classes.photoBox}
          direction="row"
        >
          <Grid container xs={12} className={classes.textBox}>
            <Grid xs={10} item>
              <div className={classes.text}>Photos</div>
            </Grid>
            <Grid xs={2} item>
              <div className={classes.read} onClick={props.allPhotos}>
                See All{' '}
              </div>
            </Grid>
          </Grid>

          <Grid container 
          // xs={12} 
          spacing={2} 
          className={classes.photoListBox}>
            {props.photos && props.photos[0] && props.photos[0].url ? (
              <Grid
                xs={12}
                sm={4}
                className={classes.cardBox1}
                item
                onClick={handlePhotoModal}
              >
                <CardMedia
                  component="img"
                  image={
                    (props.photos && props.photos[0] && props.photos[0].url) ||
                    "https://images.ottplay.com/static/default-image.jpg"
                  }
                />
              </Grid>
            ) : null}
            <Grid
              xs
              container
              item
              className={classes.cardOuterBox2}
              direction="column"
            >
              {props.photos && props.photos[1] && props.photos[1].url ? (
                <Grid
                  xs
                  className={classes.cardBox2a}
                  style={{ marginBottom: 15 }}
                  item
                  onClick={handlePhotoModal}
                >
                  <CardMedia
                    component="img"
                    image={
                      (props.photos &&
                        props.photos[1] &&
                        props.photos[1].url) ||
                      "https://images.ottplay.com/static/default-image.jpg"
                    }
                  />
                </Grid>
              ) : null}
              {props.photos && props.photos[2] && props.photos[2].url ? (
                <Grid
                  xs
                  className={classes.cardBox2b}
                  item
                  onClick={handlePhotoModal}
                >
                  <CardMedia
                    component="img"
                    image={
                      (props.photos &&
                        props.photos[2] &&
                        props.photos[2].url) ||
                      "https://images.ottplay.com/static/default-image.jpg"
                    }
                  />
                </Grid>
              ) : null}
            </Grid>
            {props.photos && props.photos[3] && props.photos[3].url ? (
              <Grid
                xs
                className={classes.cardBox3}
                item
                onClick={handlePhotoModal}
              >
                <CardMedia
                  component="img"
                  image={
                    (props.photos && props.photos[3] && props.photos[3].url) ||
                    "https://images.ottplay.com/static/default-image.jpg"
                  }
                />
              </Grid>
            ) : null}

            <Grid
              xs
              container
              item
              className={classes.cardOuterBox}
              direction="column"
            >
              {props.photos && props.photos[4] && props.photos[4].url ? (
                <Grid
                  xs
                  className={classes.cardBox4}
                  style={{ marginBottom: 15 }}
                  item
                  onClick={handlePhotoModal}
                >
                  <CardMedia
                    component="img"
                    image={
                      (props.photos &&
                        props.photos[4] &&
                        props.photos[4].url) ||
                      "https://images.ottplay.com/static/default-image.jpg"
                    }
                  />
                </Grid>
              ) : null}
              {props.photos && props.photos[5] && props.photos[5].url ? (
                <Grid
                  xs
                  className={classes.cardBox4}
                  item
                  onClick={handlePhotoModal}
                >
                  <CardMedia
                    component="img"
                    image={
                      (props.photos &&
                        props.photos[5] &&
                        props.photos[5].url) ||
                      "https://images.ottplay.com/static/default-image.jpg"
                    }
                  />
                </Grid>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
        <Modal
          isOpen={modalOpen}
          style={{
            overlay: {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 99,
              overflow: 'hidden',
              background: 'rgba(0,0,0,0.8)',
            },
            content: {
              position: 'fixed',
              top: '0%',
              left: '0%',
              right: '0%',
              bottom: '0%',
              border: '1px solid #000',
              background: 'rgba(0,0,0,0.8)',
              overflow: 'hidden',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '4px',
              outline: 'none',
              padding: '0px',
              zIndex: 999,
              margin: 'auto',
              width: '100%',
              height: '100%',
              display: 'table',
            },
          }}
          onAfterOpen={() => {
            document.body.style.overflow = 'hidden';
          }}
          onAfterClose={() => {
            document.body.style.overflow = 'auto';
          }}
        >
          <PhotoGalleryModal
            handleClose={handleCloseModal}
            photos={props.photos}
          />
        </Modal>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    margin: '20px 0 20px 0',
  },
  rootBox: {
    paddingLeft: 10,
  },
  photoBox: {
    paddingTop: 0,
  },
  photoListBox: {
    marginTop: 20,
    height: '100%',
  },
  text: {
    fontSize: 'clamp(16px, 1.6vw, 24px)',
    color: '#ffffff',
    width: '100%',
    fontWeight: 500,
  },
  textBox: {
    display: 'flex',
    alignItems: 'center',
  },
  read: {
    color: '#D6C6F4',
    opacity: '0.7',
    fontSize: 'clamp(10px, 1.1vw, 16px)',
    float: 'right',
    paddingRight: '16px',
    cursor: 'pointer',
  },
  cardBox1: {
    paddingTop: '0px !important',
    paddingBottom: '0px !important',
    maxHeight: 405,
    '& img': {
      height: '100%',
      borderRadius: 8,
    },
  },
  cardBox2a: {
    paddingTop: '0px !important',
    paddingBottom: '0px !important',
    maxHeight: 197,
    '& img': {
      height: '100%',
      borderRadius: 8,
    },
  },
  cardBox2b: {
    paddingTop: '0px !important',
    paddingBottom: '0px !important',
    maxHeight: 197,
    '& img': {
      height: '100%',
      borderRadius: 8,
    },
  },
  cardBox3: {
    paddingTop: '0px !important',
    paddingBottom: '0px !important',
    maxHeight: 405,
    '& img': {
      height: '100%',
      borderRadius: 8,
    },
  },
  cardBox4: {
    paddingTop: '0px !important',
    paddingBottom: '0px !important',
    maxHeight: 197,
    '& img': {
      height: '100%',
      borderRadius: 8,
    },
  },
  cardOuterBox2: {
    paddingTop: '0px !important',
    paddingBottom: '0px !important',
  },
  cardOuterBox: {
    paddingTop: '0px !important',
    paddingBottom: '0px !important',
  },
  [theme.breakpoints.down('xs')]: {
    rootBox: {
      paddingLeft: 0,
    },
    cardBox1: {
      marginBottom: 15,
      paddingRight: '0px !important',
      '& img': {
        height: 172,
        borderRadius: 8,
      },
    },
    cardBox2a: {
      marginBottom: '0px !important',
      paddingBottom: '6px !important',
    },
    cardBox2b: {
      marginBottom: '0px !important',
      paddingTop: '6px !important',
    },
    cardBox3: {
      minHeight: 191,
      '& img': {
        height: '100%',
        borderRadius: 8,
      },
    },
    cardOuterBox2: {
      order: 1,
      paddingRight: '0px !important',
    },
    cardOuterBox: {
      display: 'none',
    },
  },
}));
