import { Theme, makeStyles } from '@material-ui/core';

import ImageComponent from '../Images';
import React from 'react';
import ReactPlayer from 'react-player';

const windowAny: any = typeof window !== 'undefined' && window;

export function HtmlBody({ ...props }) {
  const { htmlContent, description } = props;
  const classes = useStyles();

  const renderParagraph = (item) => {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: item.content,
        }}
      ></div>
    );
  };

  const renderEmbed = (item) => {
    return (
      <>
        <div
          //className={classes.embedCode}
          dangerouslySetInnerHTML={{
            __html: item.content,
          }}
        ></div>
      </>
    );
  };

  const renderVideo = (item) => {
    return (
      <ReactPlayer
        className={classes.reactPlayer}
        url={item.content}
        width="100%"
        height="100%"
        controls={true}
      />
    );
  };

  const renderImage = (item) => {
    return (
      <div
        className={[
          classes.imageWrap,
          item.caption && classes.posterWithCaption,
        ].join(' ')}
      >
        {item.content && (
          <>
            <ImageComponent
              className={classes.poster}
              src={item.content}
              alt="link"
            />

            {item.caption && (
              <div className={classes.posterCaption}>{item.caption}</div>
            )}
          </>
        )}
      </div>
    );
  };

  const renderDescription = () => {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      ></div>
    );
  };

  return (
    <div className={classes.description}>
      {(htmlContent ? htmlContent : []).map((item) => {
        switch (item.type) {
          case 'paragraph':
            return renderParagraph(item);
          case 'video':
            return (
              <div className={classes.bodyIframe}>{renderVideo(item)}</div>
            );
          case 'image':
            return (
              <div className={classes.bodyIframe}>{renderImage(item)}</div>
            );
          case 'embedded':
            return (
              <div className={classes.embedIframe}>{renderEmbed(item)}</div>
            );
          default:
            return renderParagraph(item);
        }
      })}
      {description && renderDescription()}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  description: {
    '& img': {
      maxWidth: '100%',
      height: 'auto',
    },
    '& a': {
      color: '#FF4376',
    },
    fontSize: 'clamp(14px, 1.2vw, 18px)',
    color: '#ffffff',
  },
  reactPlayer: {
    width: '100%',
    height: '100%',
  },
  bodyIframe: {
    '& iframe': {
      width: '100% !important',
      height: '30vw !important',
    },
  },
  embedIframe: {
    '& iframe': {
      width: '100% !important',
    },
  },
  imageWrap: {
    width: '100%',
    position: 'relative',
    borderLeft: '1px solid #150128',
    backgroundPosition: 'center',
    marginBottom: '16px',
  },
  posterCaption: {
    width: '100%',
    backgroundColor: '#00000090',
    fontSize: 'clamp(12px, 1vw, 14px)',
    padding: '16px 26px',
    color: '#E6E6E6',
    position: 'absolute',
    bottom: 0,
  },
  poster: {
    height: '100%',
    objectFit: 'cover',
    display: 'flex',
  },
  posterWithCaption: {
    '& img': {
      width: '100% !important',
    },
  },
  [theme.breakpoints.down('xs')]: {
    description: {
      textAlign: 'justify',
    },
    bodyIframe: {
      '& iframe': {
        height: '46vw !important',
      },
    },
    embedIframe: {
      '& iframe': {
        width: '100% !important',
        minWidth: 'fit-content !important',
      },
    },
  },
}));
