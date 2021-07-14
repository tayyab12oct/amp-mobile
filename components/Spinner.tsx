import React from 'react';
import { makeStyles } from '@material-ui/core';
import ImageComponent from './Images';

export function Spinner(props) {
  const classes = useStyles();

  return (
    <div className={classes.root} style={props.styles}>
      <ImageComponent src="/static/newImages/new_spinner_mini.svg" alt="Loading gif" className={classes.spinner} />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  spinner: {
    width: '8vw',
    minWidth: '24px',
    maxWidth: '40px',
  },
}));
