import * as React from 'react';

import { Theme, makeStyles } from '@material-ui/core';

import ReactPlayer from 'react-player';
import { useState } from 'react';

import ImageComponent from './Images'

export default function MovieTrailer(props) {
  const classes = useStyles();

  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div style={{ position: 'relative', background: '#000000' }}>
      <div className={classes.overlay}>
        {!isLoaded && (
          <ImageComponent src="https://images.ottplay.com/static/35.gif" alt="loader" className={classes.overlayImg} />
        )}
      </div>
      <ReactPlayer
        className={props.className || 'react-player'}
        url={props.url}
        width="100%"
        height={props.height}
        controls={true}
        style={{ borderRadius: '20px' }}
        onReady={() => setIsLoaded(true)}
        onEnded={props.updateTitle}
        playing={props.data}
      />
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  overlay: {
    position: 'absolute',
    zIndex: 2,
    top: '45%',
    left: '45%',
  },
  overlayImg: {
    width: 30,
    height: 30,
  },
  [theme.breakpoints.down('xs')]: {
    overlayImg: {
      width: 15,
      height: 15,
    },
  },
}));
