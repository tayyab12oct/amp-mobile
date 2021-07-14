import { Grid, Hidden, Popover } from '@material-ui/core';
import { Theme, makeStyles } from '@material-ui/core';
import {
  getFormattedDateToDisplay,
  getNewsSourceLogo,
  getWebpUrl,
} from '../../utils/helper';

import { DATE_FORMATE } from '../../utils/constants';
import ImageComponent from '../Images';
import Modal from 'react-modal';
import React from 'react';
import ReactPlayer from 'react-player';
import ShareUs from '../ShareUs';
import { ViewportContext } from '../ViewportProvider';
import { useRouter } from 'next/router';

export function NewsDetailsCard({ ...props }) {
  const { width } = React.useContext(ViewportContext);
  const { result, video_url, contentType } = props;
  const classes = useStyles();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [shareModalOpen, setShareModalOpen] = React.useState(false);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMobShare = () => {
    setShareModalOpen(true);
  };

  const handleMobShareClose = () => {
    setShareModalOpen(false);
  };

  const getpubliserInShort = (sourceName) => {
    switch (sourceName) {
      case 'Desimartini':
        return 'DM';
      case 'LiveMint':
        return 'LM';
      case 'Hindustan Times':
        return 'HT';
      case 'Film Companion':
        return 'FC';
      default:
        return 'all';
    }
  };

  const handleLogoClick = (contentType, filter) => {
    if (contentType === 'news') {
      router.push({
        pathname: '/news',
        query: {
          contentType: contentType,
          filter: filter,
        },
      });
    }
  };

  const renderPublisherDetails = () => {
    return (
      <div className={classes.publisherdetailsWrap}>
        <div>
          {result.author && (
            <div className={classes.authorName}>{result.author}</div>
          )}
          {/* hide date */}
          {result.published_on && (
            <div className={classes.publishDate}>
              {getFormattedDateToDisplay(
                result.published_on,
                DATE_FORMATE.DATE_FORMATTED
              )}
            </div>
          )}
        </div>
        {result.source && result.source.name && (
          <div
            className={classes.logoWrap}
            // onClick={() => {
            //   handleLogoClick(
            //     result.content_type === 'all-news'
            //       ? 'news'
            //       : result.content_type,
            //     getpubliserInShort(result.source.name)
            //   );
            // }}
          >
            {/* <div className={classes.poweredBytext}>powered by</div> */}
            {result.source.name === 'OTTplay' ? null : (
              <ImageComponent
                src={getNewsSourceLogo(result.source.name)}
                alt="source_logo"
              />
            )}
          </div>
        )}
      </div>
    );
  };

  const renderPosterCard = () => {
    return (
      <div className={classes.posterCardWrap}>
        {video_url ? (
          <ReactPlayer
            className={props.className || 'react-player'}
            url={video_url}
            width="100%"
            controls={true}
          />
        ) : result.content_type === 'listicles' ? (
          <>
            {result.images && result.images.length > 0 && result.images[0].url && (
              <ImageComponent
                className={classes.poster}
                src={getWebpUrl(result.images[0].url, {
                  width: 600,
                  height: null,
                })}
                alt="link"
              />
            )}

            {result?.images &&
              result?.images?.length > 0 &&
              result?.images[0]?.caption && (
                <div
                  className={classes.posterCaption}
                  dangerouslySetInnerHTML={{
                    __html: result?.images[0]?.caption,
                  }}
                ></div>
              )}
          </>
        ) : (
          result.cover_image && (
            <>
              {' '}
              {result.cover_image.url && (
                <ImageComponent
                  className={classes.poster}
                  src={getWebpUrl(result.cover_image.url, {
                    width: 600,
                    height: null,
                  })}
                  alt="link"
                />
              )}
              {result.cover_image.caption && (
                <div
                  className={classes.posterCaption}
                  dangerouslySetInnerHTML={{
                    __html: result.cover_image.caption,
                  }}
                ></div>
              )}
            </>
          )
        )}
      </div>
    );
  };
  const renderDetails = () => {
    return (
      <div className={classes.newDetailsWrap}>
        <div>
          <div className={classes.newDetailsHeader}>
            <div className={classes.preview}>
              {contentType ? contentType : result.content_type}
            </div>
            {/* ---TODO---Share */}
            <div
              className={classes.shareIconWrap}
              onClick={(e) => shareOption(e)}
            >
              <ImageComponent
                src={'/static/follow_images/dark_share.svg'}
                alt="share icon"
              />
            </div>
            <Popover
              classes={{ paper: classes.shareWrap }}
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'center',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <ShareUs data={result} handleClose={() => handleClose()} />
            </Popover>
          </div>
          <div
            className={classes.title}
            dangerouslySetInnerHTML={{
              __html: result.headline
                ? result.headline
                : result.title
                ? result.name
                : result.name,
            }}
          />
          {(result.synopsis || result.byline) && (
            <div
              className={classes.synopsis}
              dangerouslySetInnerHTML={{
                __html: result.synopsis ? result.synopsis : result.byline,
              }}
            />
          )}
          {result?.rating ? (
            <div className={classes.ratingWrap}>
              <span className={classes.rating}>{result.rating.toFixed(1)}</span>
              <ImageComponent
                src="/static/newImages/Polygon_5.svg"
                alt="star"
              />
            </div>
          ) : (
            <div />
          )}
        </div>
        <div>
          <div className={classes.hr} />

          {renderPublisherDetails()}
        </div>
      </div>
    );
  };

  const shareOption = (e) => {
    if (width > 600) {
      handleClick(e);
    } else {
      handleMobShare();
    }
  };

  return (
    <div className={classes.detailsCardWrap}>
      {renderDetails()}
      {((result.cover_image && result.cover_image.url) || width > 600) &&
        renderPosterCard()}
      <Modal
        isOpen={shareModalOpen}
        style={{
          overlay: {
            position: 'fixed',
            display: 'flex',
            alignItems: 'flex-end',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            overflow: 'hidden',
            background: 'rgba(0,0,0,0.8)',
          },
          content: {
            position: 'unset',
            // position: 'fixed',
            left: 0,
            bottom: 0,
            border: '1px solid #2A1D3F',
            background: '#ffffff',
            overflow: 'hidden',
            WebkitOverflowScrolling: 'touch',
            borderRadius: width > 600 ? 4 : 5,
            outline: 'none',
            padding: '0px',
            zIndex: '999',
            margin: '0 5%',
            width: '100%',
            height: 'auto',
            display: 'table',
          },
        }}
        onAfterOpen={() => {
          document.body.style.overflow = 'hidden';
        }}
        onAfterClose={() => {
          document.body.style.overflow = 'auto';
        }}
      >
        <ShareUs data={props} handleClose={() => handleMobShareClose()} />
      </Modal>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  newDetailsWrap: {
    width: '40%',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  shareWrap: {
    minWidth: '12rem',
    // padding: '2%',
  },
  newDetailsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shareIconWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    //border: '1px solid #FFFFFF30',
    [theme.breakpoints.down('xs')]: {
      width: '22px',
    },
    cursor: 'pointer',
  },
  title: {
    paddingTop: '20px',
    fontSize: 'clamp(20px, 2vw, 28px)',
    fontWeight: 600,
    color: '#ffffff',
  },
  synopsis: {
    paddingTop: '14px',
    color: '#D6C6F4',
    opacity: 0.7,
    fontSize: 'clamp(12px, 1vw, 16px)',
  },
  hr: {
    margin: '20px 0px',
    borderBottom: '1px solid #D6C6F470',
    opacity: 0.5,
  },
  publisherdetailsWrap: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  authorName: {
    color: '#ffffff',
    fontSize: 'clamp(12px, 1vw, 14px)',
    paddingBottom: '6px',
  },
  publishDate: {
    color: '#A89ABF',
    fontSize: 'clamp(12px, 1vw, 14px)',
  },
  poweredBytext: {
    fontSize: 'clamp(10px, 0.8vw, 12px)',
    color: '#A89ABF',
    textTransform: 'capitalize',
    paddingBottom: '4px',
  },
  logoWrap: {
    display: 'flex',
    width: '40%',
    flexDirection: 'column',
    alignItems: 'flex-end',
    // cursor: 'pointer',
    '& img': {
      height: '24px',
      maxWidth: '100%',
      objectFit: 'scale-down',
    },
  },
  detailsCardWrap: {
    display: 'flex',
    width: '100%',
    minHeight: '300px',
    marginTop: '20px',
    marginBottom: '20px',
    backgroundColor: '#15012890',
  },
  posterCardWrap: {
    width: '60%',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    borderLeft: '1px solid #150128',
    backgroundImage: `url('https://images.ottplay.com/static/poster_default.png')`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  posterCaption: {
    width: '100%',
    backgroundColor: '#00000090',
    fontSize: 'clamp(12px, 1vw, 14px)',
    padding: '16px 26px',
    color: '#E6E6E6',
    position: 'absolute',
    bottom: 0,
    '& p': {
      margin: 0,
    },
  },
  poster: {
    width: '100%',
    height: 400,
    objectFit: 'contain',
    display: 'flex',
  },
  preview: {
    color: '#A28DC9',
    textTransform: 'uppercase',
  },
  ratingWrap: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '2px',
    backgroundColor: '#000000',
    borderRadius: '2px',
    position: 'relative',
    //left: '5px',
    //bottom: '6px',
    top: '6px',
    color: '#19FF8C',
    fontSize: '13px',
    //width: 'fit-content',
  },
  rating: {
    paddingRight: '3px',
  },
  [theme.breakpoints.down('xs')]: {
    detailsCardWrap: {
      display: 'block',
      backgroundColor: '#15012865',
      marginTop: 0,
      padding: '16px',
      marginBottom: '0px',
      minHeight: '0px',
    },
    newDetailsWrap: {
      width: '100%',
      padding: 0,
    },
    posterCardWrap: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: '12px',
      borderLeft: '0px',
      '& $posterCaption': {
        backgroundColor: 'transparent',
        fontSize: 'clamp(12px, 1vw, 14px)',
        padding: '16px 0px 0px 0px',
        color: '#A89ABF;',
        position: 'relative',
      },
    },
    poster: {
      minHeight: '46vw',
      height: 'auto',
    },
    title: {
      paddingTop: '12px',
    },
    hr: {
      margin: '12px 0px',
    },
  },
}));
