import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
import { Grid, Theme, makeStyles } from '@material-ui/core';

import ImageComponent from './Images';
import React from 'react';

function ShareUs(props) {
  const classes = useStyles();
  const linkData =
    props.data && props.data.details && props.data.details.permalink
      ? props.data.details.permalink
      : props.data && props.data.permalink
      ? props.data.permalink
      : props.data.result.permalink;

  return (
    <div className={classes.root}>
      <Grid container xs={12} className={classes.shareHeader}>
        <Grid xs={10} sm={6} item>
          <div className={classes.pageHeader}>Share</div>
        </Grid>
        <Grid xs={2} sm={6} item className={classes.closeGrid}>
          <div className={classes.closeContainer} onClick={props.handleClose}>
            <ImageComponent
              src={'/static/newImages/cross-red.svg'}
              alt="close icon"
            />
          </div>
        </Grid>
      </Grid>
      <li className={classes.shareContainerItemsBox}>
        <TwitterShareButton
          className={classes.shareContainerItems}
          url={`${process.env.REACT_APP_FRONTEND_URL}${linkData}`}
        >
          <TwitterIcon size={30} round />
          <p>Share on Twitter</p>
        </TwitterShareButton>
      </li>
      <li className={classes.shareContainerItemsBox}>
        <FacebookShareButton
          className={classes.shareContainerItems}
          url={`${process.env.REACT_APP_FRONTEND_URL}${linkData}`}
        >
          <FacebookIcon size={30} round />
          <p>Share on Facebook</p>
        </FacebookShareButton>
      </li>
      <li className={classes.shareContainerItemsBox}>
        <WhatsappShareButton
          className={classes.shareContainerItems}
          url={`${process.env.REACT_APP_FRONTEND_URL}${linkData}`}
        >
          <WhatsappIcon size={30} round />
          <p>Share on Whatsapp</p>
        </WhatsappShareButton>
      </li>
      <li className={classes.shareContainerItemsBox}>
        <LinkedinShareButton
          className={classes.shareContainerItems}
          url={`${process.env.REACT_APP_FRONTEND_URL}${linkData}`}
        >
          <LinkedinIcon size={30} round />
          <p>Share on Linkdin</p>
        </LinkedinShareButton>
      </li>
      <li className={classes.shareContainerItemsBox}>
        <TelegramShareButton
          className={classes.shareContainerItems}
          url={`${process.env.REACT_APP_FRONTEND_URL}${linkData}`}
        >
          <TelegramIcon size={30} round />
          <p>Share on Telegram</p>
        </TelegramShareButton>
      </li>
    </div>
  );
}

export default ShareUs;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    margin: '5%',
  },
  //share modal
  shareHeader: {
    paddingBottom: 10,
    borderBottom: '1px solid rgb(14 14 14 / 30%)',
    [theme.breakpoints.down('xs')]: {
      padding: '5px 20px 10px 18px',
    },
  },
  pageHeader: {
    color: '#000000',
    textAlign: 'left',
    fontSize: 'clamp(12px, 1.8vw, 16px)',
    fontWeight: 500,
    letterSpacing: '0px',
    opacity: 1,
    [theme.breakpoints.down('xs')]: {
      fontWeight: 600,
      fontSize: 16,
    },
  },
  closeGrid: {
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  closeContainer: {
    display: 'flex',
    justifyContent: 'right',
    cursor: 'pointer',
    '& img': {
      width: 18,
    },
  },
  shareContainer: {
    background: '#ffffff',
    listStyleType: 'none',
    padding: '10px 15px',
    borderRadius: 5,
    '& svg': {
      top: '7% !important',
    },
  },
  shareContainerItemsBox: {
    background: '#ffffff',
    listStyleType: 'none',

    '& p': {
      marginLeft: 5,
      fontSize: 'clamp(10px, 1.5vw, 12px)',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '1%',
      '& p': {
        marginLeft: 10,
        fontSize: '0.8rem',
      },
    },
  },
  shareContainerItems: {
    display: 'flex',
    alignItems: 'center',
    '&:focus': {
      outline: 'none',
    },
  },
  shareBox: {
    overflowY: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    padding: '20px',
    paddingTop: '5px',
    // maxHeight: '30rem',
    '& svg': {
      marginRight: 10,
    },
    '& p': {
      fontSize: 'clamp(10px, 1.5vw, 12px)',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '5px 20px 15px 18px',
      flexDirection: 'column',
    },
  },
}));
