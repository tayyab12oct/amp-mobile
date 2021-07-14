import * as React from 'react';

import { Button, Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';

import { Theme } from '@material-ui/core/styles';

export default function ForYouHeader(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container xs={12}>
        <Grid xs={12} item className={classes.header_container}>
          <Grid xs={12} sm={5} item container>
            <Typography className={classes.heading}>{props.data}</Typography>
          </Grid>
          <Grid sm={4} className={classes.searchBox} item container></Grid>
          {/* <Grid xs={4} sm={3} container>
            <div className={classes.subWrapper}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={
                  props.disabled ? classes.disabledClear : classes.clear
                }
                onClick={() => props.clear()}
                startIcon={<Clear />}
              >
                Clear
              </Button>
            </div>
          </Grid> */}
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexGrow: 1,
      width: '100%',
    },
    subWrapper: {
      display: 'flex',
      position: 'relative',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '100%',
    },
    clear: {
      color: '#03F87E',
      fontSize: '16px',
      backgroundColor: 'transparent',
      outline: 'none',
      boxShadow: 'none',
      textTransform: 'none',
      // marginLeft: '8px',
      // marginRight: '5%',
      '&:hover': {
        backgroundColor: 'transparent',
        boxShadow: 'none',
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
      },
    },
    heading: {
      color: '#ffffff',
      fontWeight: 'bold',
      fontSize: '30px',
      marginRight: '5%',
      marginBottom: '0px',
      '@media (max-width: 1440px)': {
        fontSize: '30px',
      },
      '@media (max-width: 1024px)': {
        fontSize: '30px',
      },
      '@media (max-width: 768px)': {
        fontSize: '25px',
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: 16,
        marginBottom: 2,
      },
    },
    header_container: {
      display: 'flex',
      [theme.breakpoints.down('xs')]: {
        margin: '0 16px',
        width: '100%',
      },
    },
    disabledClear: {
      color: '#A89ABF',
      fontSize: '16px',
      backgroundColor: 'transparent',
      outline: 'none',
      boxShadow: 'none',
      textTransform: 'none',
      marginLeft: '8px',
      '&:hover': {
        backgroundColor: 'transparent',
        boxShadow: 'none',
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
        '& $MuiButton-iconSizeSmall-': {
          width: 14,
          marginRight: 4,
          marginLeft: 0,
        },
      },
    },
    [theme.breakpoints.down('xs')]: {
      searchBox: {
        display: 'none',
      },
    },
  })
);
