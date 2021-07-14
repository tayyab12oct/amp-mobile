import { Grid, Theme } from '@material-ui/core';

import ImageComponent from '../Images';
import Modal from 'react-modal';
import React from 'react';
import { ViewportContext } from '../ViewportProvider';
import { makeStyles } from '@material-ui/styles';

export function SynopsisModal({ ...props }) {
  const {
    synopsisTitle,
    description,
    faq,
    handleClose,
    isOpen,
    heading,
  } = props;
  const { width } = React.useContext(ViewportContext);
  const classes = useStyles();
  return (
    <Modal
      isOpen={isOpen}
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999,
          overflow: 'hidden',
          background: 'rgba(0,0,0,0.8)',
        },
        content: {
          position: 'fixed',
          top: width > 600 ? '0%' : '15%',
          left: width > 600 ? '50%' : '0%',
          right: '0%',
          bottom: '0%',
          border: '1px solid #ccc',
          background: '#fff',
          overflow: 'hidden',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '0px',
          outline: 'none',
          padding: '0px',
          zIndex: '999',
          overflowY: 'hidden',
        },
      }}
      onAfterOpen={() => {
        document.body.style.overflow = 'hidden';
      }}
      onAfterClose={() => {
        document.body.style.overflow = 'auto';
      }}
    >
      <Grid
        xs={12}
        item
        container
        className={classes.synopHeader}
        id="movieSynopHeader"
      >
        <Grid xs={11} item className={classes.synopHeading}>
          {heading ? heading : 'Synopsis'}
        </Grid>
        <Grid
          xs={1}
          className={classes.synopClose}
          item
          onClick={() => handleClose(false)}
        >
          <ImageComponent src="https://images.ottplay.com/static/close.svg" alt="close icon" />
        </Grid>
      </Grid>

      <Grid xs={12} className={classes.synopContentBox}>
        {/* ad codes
      <Grid xs={12} container className={classes.advert}>
        <ImageComponent src={ads} alt="ad" />
      </Grid> */}
        <div className={classes.synopContent}>
          <Grid xs={12} container>
            <p className={classes.synopContentTitle}>{synopsisTitle}</p>
            <p
              className={classes.synopContentDesc}
              dangerouslySetInnerHTML={{
                __html: decodeURIComponent(description),
              }}
            ></p>
            {faq ? (
              <>
                <p className={classes.faqDesc}>{faq}</p>
              </>
            ) : null}
          </Grid>
        </div>
      </Grid>
    </Modal>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  synopHeader: {
    backgroundColor: '#D6C6F490',
    boxShadow: '0px 3px 6px #00000029',
    textAlign: 'left',
    fontSize: '28px',
    letterSpacing: '0px',
    color: '#000000',
    padding: '10px 30px',
    cursor: 'pointer',
    marginBottom: 15,
  },
  synopHeading: {
    fontSize: 'clamp(14px, 1.8vw, 20px)',
    fontWeight: 500,
  },
  synopClose: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& img': {
      width: 'clamp(14px, 1.4vw, 23px)',
    },
  },
  synopContentBox: {
    overflowY: 'auto',
    height: 'calc(100% - 70px)',
    marginTop: 15,
    marginRight: 18,
    scrollbarWidth: 'thin',
    scrollbarColor: '#4A3FB3 #D9D9D9',
    '&::-webkit-scrollbar': {
      width: 12,
    },
    '&::-webkit-scrollbar-track': {
      background: '#D9D9D9',
      borderRadius: 20,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#4A3FB3',
      borderRadius: 20,
      border: '4px solid #D9D9D9',
    },
  },
  synopContentDesc: {
    fontSize: 'clamp(12px, 1.2vw, 16px)',
    color: '#565656',
    fontWeight: 400,
    margin: 0,
    marginTop: 4,
    textAlign: 'justify',
    whiteSpace: 'break-spaces',
  },
  faqDesc: {
    fontSize: 'clamp(12px, 1.2vw, 16px)',
    color: '#565656',
    fontWeight: 400,
    margin: 0,
    marginTop: 4,
    textAlign: 'justify',
    whiteSpace: 'break-spaces',
  },
  synopContent: {
    padding: '20px 45px 20px 30px',
    paddingTop: 0,
  },
  synopContentTitle: {
    fontSize: 'clamp(16px, 2.2vw, 28px)',
    color: '#000000',
    fontWeight: 600,
    margin: 0,
    width: '100%',
  },
  [theme.breakpoints.down('xs')]: {
    synopHeader: {
      padding: '12px 15px',
    },
    synopHeading: {
      lineHeight: '19px',
      fontWeight: 800,
    },
    synopContentBox: {
      marginRight: 10,
      marginTop: 13,
      height: '80%',
      overflowX: 'hidden',
      overflowY: 'auto',
    },
    synopContentDesc: {
      lineHeight: '16px',
      color: '#565656',
      marginTop: 8,
    },
    faqDesc: {
      lineHeight: '16px',
      color: '#565656',
    },
    synopContent: {
      padding: '0px 15px 20px 15px',
    },
    synopContentTitle: {
      lineHeight: '20px',
      marginTop: 0,
    },
  },
}));
