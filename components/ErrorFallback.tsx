import { Grid } from '@material-ui/core';
import { PillButton } from './PillButton';
import React from 'react';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

import Router from 'next/router';
import ImageComponent from './Images';
import { IMAGE_BASE_URL } from '../utils/constants';

export function ErrorFallback(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid xs={12} container>
        <Grid xs sm={1} md={2} item></Grid>
        <Grid
          xs={12}
          sm={10}
          md={8}
          container
          justify="center"
          className={classes.imgBox}
        >
          <Grid xs={12} sm={3} item className={classes.text}>
            <ImageComponent src={`/static/images/wrong.svg`} alt={'error image'} className={classes.img} />
          </Grid>
          <Grid
            xs={12}
            sm={5}
            item
            direction="row"
            alignItems="center"
            className={classes.text}
          >
            <Grid xs className={classes.firstLetter}>
              OOPS !
            </Grid>
            <Grid xs className={classes.secondLetter}>
              Something went wrong
            </Grid>
            <Grid xs>
              <PillButton
                text={'Try Again'}
                endIcon={<ImageComponent src={`/static/images/rightArrow.svg`} alt="Right" />}
                className={classes.button}
                onClick={() =>
                  props.path === undefined
                    ? Router.push('/foryou')
                    : Router.push(props.path)
                }
              />
            </Grid>
            <Grid xs className={classes.smallText}>
              Back to{' '}
              <span
                style={{ color: '#03F87E', cursor: 'pointer' }}
                onClick={() =>
                  props.path === undefined
                    ? Router.push('/foryou')
                    : Router.push(props.path)
                }
              >
                Home
              </span>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs sm={1} md={2} item></Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    minHeight: '50vh',
  },
  imgBox: {
    marginTop: '5%',
    marginBottom: '5%',
  },
  button: {
    color: '#FFFFFF',
    backgroundColor: '#FF4376',
    whiteSpace: 'nowrap',
    border: '1px solid #FF4376',
    margin: '10px 5px',
    borderRadius: 28,
    fontSize: 'clamp(14px, 1.6vw, 20px)',
    fontWeight: 500,
    textTransform: 'none',
    '&:hover': {
      background: '#FF4376',
    },
    '& svg': {
      width: 20,
      height: 14,
      '&$a': {
        color: 'black',
      },
    },
  },
  img: {
    width: '275px',
    height: '275px',
  },
  firstLetter: {
    fontSize: 'clamp(38px, 2vw, 48px)',
    color: '#FFFFFF',
    fontWeight: 600,
    marginBottom: '2%',
  },
  secondLetter: {
    fontSize: 'clamp(18px, 2vw, 22px)',
    color: '#FFFFFF',
    fontWeight: 500,
    marginBottom: '6%',
  },
  smallText: {
    fontSize: 'clamp(12px, 2vw, 18px)',
    color: '#FFFFFF',
    fontWeight: 500,
    marginTop: '5%',
  },
  text: {
    textAlign: 'center',
  },
  // [theme.breakpoints.down('xs')]: {
  //   firstLetter: {
  //     marginBottom: '1%',
  //   },
  //   secondLetter: {
  //     marginBottom: '2%',
  //   },
  //   button: {
  //     '& svg': {
  //       width: 12,
  //     },
  //   },
  //   smallText: {
  //     marginTop: '1%',
  //   },
  //   img: {
  //     width: '150px',
  //     height: '150px',
  //   },
  //   imgBox: {
  //     marginTop: '35%',
  //   },
  // },
}));
