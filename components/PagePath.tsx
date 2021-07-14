import { Grid, Theme, makeStyles } from '@material-ui/core';

import { Avatar } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';

export function PagePath({ ...props }) {
  const classes = useStyles();
  const { path } = props;
  // const urlHome =
  //   process.env.REACT_APP_ENV === 'production'
  //     ? 'https://www.ottplay.com/home'
  //     : 'https://stg.ottplay.com/home';

  return (
    <Grid xs={12} item>
      <p className={classes.root}>
        {path.map((item, index) => {
          return (
            <React.Fragment>
              {item.path !== null ? (
                // item.name === 'Home' ? (
                //   <a href={urlHome}>{item.name}</a>
                // ) : (
                //   <Link
                //     // className={
                //     //   index === path.length - 1
                //     //     ? classes.currenPath
                //     //     : classes.path
                //     // }
                //     href={item.path}
                //     // exact={true}
                //   >
                //     {item.name}
                //   </Link>
                // )
                <Link
                  // className={
                  //   index === path.length - 1
                  //     ? classes.currenPath
                  //     : classes.path
                  // }
                  href={item.path}
                  // exact={true}
                >
                  {item.name}
                </Link>
              ) : (
                <span
                  className={
                    index === path.length - 1
                      ? classes.currenPath
                      : classes.path
                  }
                >
                  {item.name}
                </span>
              )}
              <span className={classes.arrow}>{'»'}</span>
            </React.Fragment>
          );
        })}
      </p>
    </Grid>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    color: '#ffffff',
    margin: '15px 0px 4px 0px',
    fontSize: 'clamp(10px, 0.9vw, 14px)',
  },
  path: {
    opacity: 0.6,
    textTransform: 'capitalize',
    color: 'white',
    textDecoration: 'none',
  },

  currenPath: {
    color: 'white',
    textDecoration: 'none',
    opacity: 1,
    fontWeight: 500,
    textTransform: 'capitalize',
  },

  arrow: {
    opacity: 0.6,
    padding: '0px 4px',
    '&:last-child': {
      display: 'none',
    },
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      margin: '12px 0px 8px 16px',
    },
    path: {
      textTransform: 'uppercase',
    },
    currenPath: {
      textTransform: 'uppercase',
    },
  },
}));
