import {
  Theme,
  createStyles,
  makeStyles,
  withStyles,
} from '@material-ui/core/styles';

import React from 'react';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // width: 300 + theme.spacing(3) * 2,
    },
    lowerBox: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    text: {
      fontSize: '20px',
      color: '#ffffff',
      fontWeight: 500,
      marginBottom: 45,
    },
    [theme.breakpoints.down('xs')]: {
      text: {
        fontSize: 14,
      },
      lowerBox: {
        '& span': {
          fontSize: 14,
          color: '#8B7FA0',
        },
      },
    },
  })
);

const PrettoSlider = withStyles((theme: Theme) => ({
  root: {
    color: '#52af77',
    width: '100%',
  },
  thumb: {
    height: 16,
    width: 16,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -4,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: -10,
    fontSize: '25px',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      padding: '12px 0px',
    },
    track: {
      height: 12,
      borderRadius: 10,
    },
    rail: {
      height: 12,
      borderRadius: 10,
    },
  },
}))(Slider);

export function RateSlider() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography gutterBottom className={classes.text}>
        Rate this movie
      </Typography>
      <PrettoSlider
        valueLabelDisplay="on"
        aria-label="pretto slider"
        defaultValue={5}
        min={1}
        max={10}
      />
      <div className={classes.lowerBox}>
        <span>1</span>
        <span>10</span>
      </div>
    </div>
  );
}
