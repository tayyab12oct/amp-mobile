import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import React from 'react';

export function Online(props) {
  return <span className={props.className}></span>;
}

export function RefinedItems(props) {
  return <span className={props.className}>{props.count || null}</span>;
}

export function PillButton(props) {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      color="secondary"
      className={props.className || classes.button}
      startIcon={props.startIcon || null}
      endIcon={props.endIcon || null}
      onClick={props.onClick}
      style={props.style}
    >
      {props.text || null}
    </Button>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      fontFamily: `"Montserrat", "Arial", "sans-serif" `,
      backgroundColor: 'transparent',
      color: 'white',
      whiteSpace: 'nowrap',
      // border: '1px solid #695197',
      boxShadow: 'none !important',
      padding: '4px 10px',
      margin: '0 2px',
      borderRadius: '50px',
      fontSize: 'clamp(12px, 1.1vw, 12px)',
      // fontWeight: 300,
      opacity: '1',
      // fontWeight: 'bold',
      transition: 'all .2s ease',
      textTransform: 'none',
      '&:hover': {
        // color: 'black !important',
        // fontWeight: 'bold',
        backgroundColor: '#29F87E',
      },
      '@media (max-width: 600px)': {
        fontWeight: '500 !important',
        '& img': {
          width: 12,
          height: 11,
        },
      },
    },
    notification: {
      height: '25px',
      width: '25px',
      backgroundColor: '#FF4376',
      borderRadius: '50%',
      color: ' #ffffff',
      fontSize: '14px !important',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    online: {
      height: '5px',
      width: '5px',
      backgroundColor: '#03F87E',
      borderRadius: '50%',
    },
  })
);
