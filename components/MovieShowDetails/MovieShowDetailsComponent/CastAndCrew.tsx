import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    Hidden,
    Theme,
    Typography,
    makeStyles,
} from '@material-ui/core';
import {
    LOCALSTORAGE_KEY_CONSTANTS,
    contextParamsForREAnalytics,
    getLocalStorageData,
    getPreferredLanguages,
    getPreferredProviders,
    getUserType,
} from '../../../utils/constants';
import React, { useContext } from 'react';
import { getCardSize, getWebpUrl } from '../../../utils/helper';

import ImageComponent from '../../Images';
import { ViewportContext } from '../../ViewportProvider';
import { WebfoxContext } from '../../../services/webfox';
import { useRouter } from 'next/router';
import { useState } from 'react';

export function CastAndCrew(props) {
      const router = useRouter();
    const classes = useStyles();
    const { width } = React.useContext(ViewportContext);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(6);
    const [leftArrowHover, setLeftArrowHover] = useState(false);
    const [rightArrowHover, setRightArrowHover] = useState(false);
    const { webfox, webstore } = useContext(WebfoxContext);
    const { languages, streamingServices } = webstore;
    const languagesArr: any = getLocalStorageData(
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES)
      ) || [],
      languages.name || []
    );
    const providersNameArr: any = getLocalStorageData(
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_NAMES)
      ) || [],
      streamingServices.name || []
    );
    const handleCastCrew = (crewObj, id, name, type, url) => {
      const currentPath = location.pathname;
      const params = {
        event: 'title_click',
        details: {
          // page_name: currentPath,
          // title_type: type,
          // title_name: name,
          // title_id: id,
          page_name: window.location.pathname,
          preferred_providers: getPreferredProviders(providersNameArr),
          preferred_languages: getPreferredLanguages(languagesArr),
          content_type: props && props.type ? props.type : '',
          name: crewObj && crewObj.name ? crewObj.name : '',
          formatted_id:
            crewObj &&
            crewObj.primary_language &&
            crewObj.primary_language.name + '_' + crewObj._id,
        },
        context: contextParamsForREAnalytics,
      };
      webfox.postREAnalytics(params).then(({ data, error }) => {});
      router.push({
        pathname: `/people/${url}`,
        //query: { id, name, type, url, sourcePage: props.sourcePage },
      });
    };
  
    return (
      <div className={classes.root}>
        <Grid
          container
          spacing={2}
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.rootBox}
        >
          <Grid item xs={12} container direction="row">
            {/* <Grid container xs={12}> */}
            <Grid container xs={12} justify="space-between" direction="row">
              <Grid xs={12} sm={8} item className={classes.text}>
                {props.title && props.title}
              </Grid>
  
              {props.crewDetail && props.crewDetail.length > 6 && (
                <Hidden only={['xs']}>
                  <Grid sm={4} item>
                    <div className={classes.arrowBox}>
                      {startIndex > 0 && (
                        <ImageComponent
                          onClick={() => {
                            if (startIndex > 0) {
                              setStartIndex(startIndex - 6);
                              setEndIndex(endIndex - 6);
                            }
                          }}
                          onMouseOver={() => setLeftArrowHover(true)}
                          onMouseLeave={() => setLeftArrowHover(false)}
                          src={leftArrowHover ? "https://images.ottplay.com/static/slide_left_hover_arrow.svg" : "https://images.ottplay.com/static/slide_left_arrow.svg"}
                          alt="left arrow"
                          style={{ marginRight: 8 }}
                        />
                      )}{' '}
                      {props.crewDetail.length > 6 &&
                        endIndex <= props.crewDetail.length - 1 && (
                          <ImageComponent
                            onClick={() => {
                              if (
                                props.crewDetail.length > 6 &&
                                endIndex <= props.crewDetail.length - 1
                              ) {
                                setStartIndex(startIndex + 6);
                                setEndIndex(endIndex + 6);
                              }
                            }}
                            onMouseOver={() => setRightArrowHover(true)}
                            onMouseLeave={() => setRightArrowHover(false)}
                            src={rightArrowHover ? "https://images.ottplay.com/static/slide_right_hover_arrow.svg" : "https://images.ottplay.com/static/slide_right_arrow.svg"}
                            alt="right arrow"
                          />
                        )}
                    </div>
                  </Grid>
                </Hidden>
              )}
            </Grid>
            {/* </Grid> */}
            <Grid
              container
              xs={12}
              className={[classes.cardBox, classes.gridContainer].join(' ')}
              style={{
                gridTemplateColumns:
                  width > 600
                    ? getCardSize(props.crewDetail, 'widget', 6)
                    : 'repeat(6, minmax(128px, 1fr))',
              }}
            >
              {props.crewDetail &&
                props.crewDetail.slice(startIndex, endIndex).map((crew, i) => {
                  return (
                    // <Grid item xs={12} sm={4} md={2} key={i}>
  
                    <Card
                      className={classes.cardRoot}
                      onClick={() => {
                        handleCastCrew(
                          crew,
                          crew.id,
                          crew.cast && crew.cast.name
                            ? crew.cast.name
                            : crew.crew && crew.crew.name
                            ? crew.crew.name
                            : null,
                          crew.cast
                            ? crew.cast.content_type
                            : crew.crew.content_type,
                          crew.cast ? crew.cast.seo_url : crew.crew.seo_url
                        );
                      }}
                    >
                      <CardActionArea>
                        <div className={classes.cardWrap}>
                          <div className={classes.cardMainContent}>
                            <CardMedia
                              component="img"
                              className={[classes.media, classes.center].join(
                                ' '
                              )}
                              image={
                                crew.cast && crew.cast.headshot
                                  ? getWebpUrl(crew.cast.headshot, { width: 200, height: "auto" })
                                  : crew.crew && crew.crew.headshot
                                  ? getWebpUrl(crew.crew.headshot, { width: 200, height: "auto" })
                                  : "https://images.ottplay.com/static/poster_default.png"
                              }
                            />
                          </div>
                        </div>
                        <CardContent className={classes.bottomBox}>
                          <Typography className={classes.name}>
                            {' '}
                            {crew.cast && crew.cast.name
                              ? crew.cast.name
                              : crew.crew && crew.crew.name
                              ? crew.crew.name
                              : null}
                          </Typography>
                          <Typography className={classes.details}>
                            {' '}
                            {crew.role_name
                              ? crew.role_name
                              : crew.character_name}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  );
                })}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
  
  const useStyles = makeStyles((theme: Theme) => ({
    root: {
      flexGrow: 1,
      // margin: '20px 0 20px 0',
      color: '#ffffff',
      backgroundColor: 'transparent',
    },
    rootBox: {
      // paddingLeft: 10,
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '1rem',
      padding: '0.5rem 0px',
      width: '100%',
      overflowX: 'auto',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        width: '0px',
        background: 'transparent',
        display: 'none',
      },
    },
    cardWrap: {
      display: 'block',
      content: '',
      position: 'relative',
      paddingBottom: '150%', // to maintain aspect ratio 2:3
      cursor: 'pointer',
      backgroundColor: '#1E0B40',
      borderRadius: '8px',
    },
    cardMainContent: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    center: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: '6px',
    },
    cardRoot: {
      margin: 0,
      color: '#ffffff',
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
    bottomBox: {
      padding: '8px 4px 8px 0px ',
    },
    text: {
      fontSize: 'clamp(16px, 1.6vw, 24px)',
      color: '#ffffff',
      fontWeight: 600,
      marginBottom: 12,
    },
    arrowBox: {
      float: 'right',
      // marginRight: '16px',
      cursor: 'pointer',
      '& img': {
        height: 'clamp(16px, 1.4vw, 22px)',
      },
    },
    details: {
      letterSpacing: '0',
      color: '#D6C6F4',
      opacity: '0.7',
      fontSize: 'clamp(10px, 1vw, 14px)',
      marginTop: 2,
      lineHeight: '16px',
    },
    media: {
      // border: '1px solid #3d2f58',
      borderRadius: 6,
    },
    name: {
      width: '100%',
      textAlign: 'left',
      fontSize: 'clamp(14px, 1.2vw, 24px)',
      letterSpacing: '0px',
      color: '#FFFFFF',
      opacity: 1,
      overflow: 'hidden',
      fontWeight: 700,
    },
    [theme.breakpoints.down('xs')]: {
      rootBox: {
        paddingLeft: 0,
      },
      seeAll: {
        fontSize: 10,
        color: '#FFFFFF',
        fontWeight: 600,
        marginTop: 6,
        marginRight: 0,
        paddingRight: 0,
        textAlign: 'right',
      },
      cardBox: {
        flexWrap: 'nowrap',
        overflow: 'scroll',
      },
      media: {
        borderRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
      },
      name: {
        height: '100%',
      },
      details: {
        height: '100%',
        width: '100%',
        marginTop: 0,
      },
      // bottomBox: {
      //   padding:
      // }
    },
  }));
  