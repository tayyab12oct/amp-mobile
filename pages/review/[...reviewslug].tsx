import { AD_CODES, SLURRP_URL } from '../../utils/constants';
import { Grid, Hidden, Theme, makeStyles } from '@material-ui/core';
import {
  LOCALSTORAGE_KEY_CONSTANTS,
  device_UUID,
  getLocalStorageData,
  getPreferredLanguages,
  getPreferredProviders,
  getUserType,
} from '../../utils/constants';
import { MetaData, SEO } from '../../components/Seo/Seo';
import { NavBar, PagePath, Spinner, TopHeader } from '../../components';
import React, { useEffect } from 'react';
import { Schema, WebPageSchema } from '../../components/Seo/SeoSchema';
import {
  getFormattedDateToDisplay,
  getNewsSourceLogo,
  handleStringlength,
  removeAllHTMLTags,
} from '../../utils/helper';

import { DATE_FORMATE } from '../../utils/constants';
import FollowUs from '../../components/FollowUs';
import GoogleAdOttPlay from '../../components/GoogleAds';
import { HtmlBody } from '../../components/news/HtmlBody';
import ImageComponent from '../../components/Images';
import { NewsDetailsCard } from '../../components/news/NewsDetailsCard';
import { OpenGraph } from '../../components/Seo/OpenGraph';
import { PillButton } from '../../components/PillButton';
import { ReviewCard } from '../../components/review/ReviewCard';
import { ViewportContext } from '../../components/ViewportProvider';
import { WatchNowCard } from '../../components/review/WatchNowCard';
import { WebfoxContext } from '../../services/webfox';
import cookie from 'react-cookies';
import { firebaseAnalytics } from '../../components/firebaseConfig';
import { useRouter } from 'next/router';
import webfox from '../../services/webbase';

function useQuery() {
  return new URLSearchParams(
    typeof window !== 'undefined' && window.location.search
  );
}
const windowAny: any = typeof window !== 'undefined' && window;
const _ht_clientid = cookie.load('_ht_clientid');
export default function NewsDetails({ staticReviewProps, ...props }) {
  //console.log('staticReviewProps', staticReviewProps);
  const { width } = React.useContext(ViewportContext);
  const router = useRouter();
  const { webstore } = React.useContext(WebfoxContext);
  const classes = useStyles();
  const [result, setResult] = React.useState<any>(null);
  const [newsId, setNewsId] = React.useState(
    props.location?.state && props.location.state.newsId
      ? props.location.state.newsId
      : null
  );
  let languages;
  let streamingServices;
  if (webstore) {
    const { languages, streamingServices } = webstore;
  }

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
          {staticReviewProps[0]?.author && (
            <div className={classes.authorName}>
              {staticReviewProps[0]?.author}
            </div>
          )}
          {/* hide date */}
          {staticReviewProps[0]?.published_on && (
            <div className={classes.publishDate}>
              {getFormattedDateToDisplay(
                staticReviewProps[0]?.published_on,
                DATE_FORMATE.DATE_FORMATTED
              )}
            </div>
          )}
        </div>
        {staticReviewProps[0]?.source && staticReviewProps[0]?.source?.name && (
          <div
            className={classes.logoWrap}
            onClick={() => {
              handleLogoClick(
                staticReviewProps[0]?.content_type === 'all-news'
                  ? 'news'
                  : staticReviewProps[0]?.content_type,
                getpubliserInShort(staticReviewProps[0]?.source?.name)
              );
            }}
          >
            {/* <div className={classes.poweredBytext}>powered by</div> */}
            {staticReviewProps[0]?.source.name === 'OTTplay' ? null : (
              <ImageComponent
                src={getNewsSourceLogo(staticReviewProps[0]?.source?.name)}
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
        {/* {video_url ? (
          <ReactPlayer
            className={props.className || 'react-player'}
            url={video_url}
            width="100%"
            controls={true}
          />
        ) : staticReviewProps[0]?.content_type === 'listicles' ? (
          staticReviewProps[0]?.images &&
          staticReviewProps[0]?.images.length > 0 &&
          staticReviewProps[0]?.images[0].url && (
            <ImageComponent
              className={classes.poster}
              src={staticReviewProps[0]?.images[0].url}
              alt="link"
            />
          )
        ) : ( */}
        {staticReviewProps[0]?.cover_image && (
          <>
            {' '}
            {staticReviewProps[0]?.cover_image?.url && (
              <ImageComponent
                className={classes.poster}
                src={staticReviewProps[0]?.cover_image?.url}
                alt="link"
              />
            )}
            {staticReviewProps[0]?.cover_image?.caption && (
              <div
                className={classes.posterCaption}
                dangerouslySetInnerHTML={{
                  __html: staticReviewProps[0]?.cover_image?.caption,
                }}
              ></div>
            )}
          </>
        )}
        {/* )} */}
      </div>
    );
  };
  const renderDetails = () => {
    return (
      <div className={classes.newDetailsWrap}>
        <div>
          <div className={classes.newDetailsHeader}>
            <div className={classes.preview}>
              {staticReviewProps[0]?.content_type}
            </div>
            {/* ---TODO---Share
          <div className={classes.shareIconWrap}> 
            <ImageComponent src={IMAGES.share_icon} />
          </div> */}
          </div>
          <div
            className={classes.title}
            dangerouslySetInnerHTML={{
              __html: staticReviewProps[0]?.headline
                ? staticReviewProps[0]?.headline
                : staticReviewProps[0]?.title
                ? staticReviewProps[0]?.name
                : staticReviewProps[0]?.name,
            }}
          />
          {(staticReviewProps[0]?.synopsis || staticReviewProps[0]?.byline) && (
            <div
              className={classes.synopsis}
              dangerouslySetInnerHTML={{
                __html: staticReviewProps[0]?.synopsis
                  ? staticReviewProps[0]?.synopsis
                  : staticReviewProps[0]?.byline,
              }}
            />
          )}
        </div>
        <div>
          <div className={classes.hr} />

          {renderPublisherDetails()}
        </div>
      </div>
    );
  };
  let languagesArr = [];
  let providersArr = [];
  const [similarNews, setSimilarNews] = React.useState<any>([]);
  const [loadingData, setLoadingData] = React.useState(true);
  const { webfox } = React.useContext(WebfoxContext);

  const getMovieShowDetails = (staticReviewProps) => {
    return staticReviewProps?.movies && staticReviewProps?.movies?.length > 0
      ? staticReviewProps.movies[0]
      : staticReviewProps?.shows && staticReviewProps?.shows?.length > 0
      ? staticReviewProps.shows[0]
      : null;
  };

  const query = useQuery();
  const getFilteredDataByParams = (param) => {
    const movieShowDetails =
      staticReviewProps[0]?.movies && staticReviewProps[0]?.movies?.length > 0
        ? staticReviewProps[0].movies[0]
        : staticReviewProps[0]?.shows && staticReviewProps[0]?.shows?.length > 0
        ? staticReviewProps[0].shows[0]
        : [];
    if (param === 'where_to_watch') {
      return movieShowDetails && movieShowDetails?.where_to_watch
        ? movieShowDetails.where_to_watch
        : [];
    } else if (param === 'cast_and_crew') {
      const casts =
        movieShowDetails &&
        movieShowDetails?.casts &&
        movieShowDetails?.casts?.length > 0
          ? movieShowDetails.casts.filter((item, index) => {
              return item.cast;
            })
          : [];
      const crews =
        movieShowDetails &&
        movieShowDetails?.crews &&
        movieShowDetails?.crews?.length > 0
          ? movieShowDetails.crews.filter((item, index) => {
              return item.crews;
            })
          : [];
      return casts.concat(crews);
    } else return [];
  };
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  React.useEffect(() => {
    languagesArr = getLocalStorageData(
      JSON.parse(
        typeof window !== 'undefined' &&
          localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES)
      ) || [],
      languages?.name || []
    );
    providersArr = getLocalStorageData(
      JSON.parse(
        typeof window !== 'undefined' &&
          localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_IDS)
      ) || [],
      streamingServices?.selectedStreamingServices || []
    );
    const seoUrl = window.location.pathname.split('/');
    // code check
    const params = {
      // seoUrl: query.get('seoUrl'),
      seoUrl: seoUrl[2] + (seoUrl[3] ? `/${seoUrl[3]}` : ''),
    };

    webfox
      .getCriticsReviewDetails(params)
      .then((response) => {
        if (
          response.data &&
          response.data.result &&
          response.data.staticReviewProps.length > 0
        ) {
          // setResult(response.data.result[0]);
          firebaseAnalytics.logEvent('screen_view', {
            page_title:
              '/reviewsDetail' +
              (response.data.result[0] && response.data?.result[0]?._id
                ? '/' + response.data.result[0]._id
                : '') +
              (response.data.result[0] && response.data?.result[0]?.content_type
                ? '/' + response.data.result[0].content_type
                : ''),
            page_location:
              '/reviewsDetail' + response.data.result[0] &&
              response.data.result[0]?.source &&
              response.data.result[0]?.source?.name
                ? '/' + response.data.result[0].source.name
                : '' + `${sessionStorage.getItem('prevPath')}`,
          });
          windowAny.Moengage.track_event('screen_view', {
            page_title: '/reviewDetail',
            name:
              response.data?.result[0] && response.data?.result[0]?.headline
                ? response.data.result[0].headline
                : '',
            id:
              response.data?.result[0] && response.data?.result[0]?._id
                ? response.data.result[0]._id
                : '',
            content_type:
              response.data?.result[0] && response.data?.result[0]?.content_type
                ? response.data.result[0].content_type
                : '',
            source:
              response.data?.result[0] &&
              response.data?.result[0]?.source &&
              response.data?.result[0]?.source.name
                ? response.data.result[0].source.name
                : '',
          });
        }
        // setSimilarNews(response.data.newsSimilar);
        setLoadingData(false);
      })
      .catch(() => {
        setLoadingData(false);
      });
  }, []);

  const renderSimilarNewsTitle = () => {
    return (
      <Grid xs={12} item className={classes.similarNewsTitleWrap}>
        <div className={classes.similarNewsTitle}>{'Also Read'}</div>
        <div className={classes.similarNewsSeeAll}>{'See All News'}</div>
      </Grid>
    );
  };

  const handleSimilarNewsClick = (newsId) => {
    setLoadingData(true);
    setNewsId(newsId);
  };

  const handleWatchNowClick = (url) => {
    window.open(url, '_blank');
  };

  const renderWhereToWatchWidget = () => {
    return (
      getFilteredDataByParams('where_to_watch').length > 0 && (
        <div>
          <div className={classes.providerWidgetTitle}>Where to watch?</div>
          <div className={classes.providerWrap}>
            {getFilteredDataByParams('where_to_watch').map((item, index) => {
              return (
                <WatchNowCard
                  logoUrl={
                    item?.provider && item?.provider?.logo_url
                      ? item.provider.logo_url
                      : null
                  }
                  rate={item.price ? item.price : null}
                  watchNowLink={item.movie_url}
                  handleWatchNowClick={handleWatchNowClick}
                />
              );
            })}
          </div>
        </div>
      )
    );
  };

  const renderErrorMessage = () => {
    return (
      <div className={classes.errorBlock}>
        <p className={classes.textLook}>
          No data found. <br /> Please try after some time.{' '}
        </p>
        <PillButton
          text={'Go to home'}
          endIcon={
            <ImageComponent
              src="https://images.ottplay.com/static/rightArrow.svg"
              alt=""
            />
          }
          className={classes.button}
          onClick={() => router.push('/home')}
        />
      </div>
    );
  };

  const siteNavigationSchema = () => {
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'ItemList',
            itemListElement: [
              {
                '@type': 'SiteNavigationElement',
                position: 1,
                name: 'Home',
                url: 'http://www.ottplay.com/home',
              },
              {
                '@type': 'SiteNavigationElement',
                position: 2,
                name: 'Review',
                url: 'https://www.ottplay.com/reviews',
              },
              {
                '@type': 'SiteNavigationElement',
                position: 3,
                name:
                  staticReviewProps[0] && staticReviewProps[0]?.headline
                    ? staticReviewProps[0].headline
                    : 'Not available',
                url:
                  'http://www.ottplay.com' +
                  (staticReviewProps[0] && staticReviewProps[0]?.seo_url
                    ? '/review/' + staticReviewProps[0].seo_url
                    : ''),
              },
            ],
          }),
        }}
      />
    );
  };

  const breadcrumbSchema = () => {
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                item: {
                  '@id': 'https://www.ottplay.com/home',
                  name: 'Home',
                },
              },
              {
                '@type': 'ListItem',
                position: 2,
                item: {
                  '@id': 'https://www.ottplay.com/reviews',
                  name: 'Reviews',
                },
              },
              {
                '@type': 'ListItem',
                position: 3,
                item: {
                  '@id':
                    'https://www.ottplay.com' +
                    (staticReviewProps && staticReviewProps[0]?.seo_url
                      ? '/review/' + staticReviewProps[0].seo_url
                      : 'Not available'),
                  name: staticReviewProps[0]?.headline
                    ? staticReviewProps[0].headline
                    : 'Not available',
                },
              },
            ],
          }),
        }}
      />
    );
  };

  const reviewSchema = () => {
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Review',
            author: {
              '@type': 'Person',
              name: staticReviewProps[0]?.author
                ? staticReviewProps[0].author
                : 'Not available',
            },
            datePublished: staticReviewProps[0]?.published_on
              ? staticReviewProps[0].published_on
              : new Date().toDateString().slice(4),
            dateModified: staticReviewProps[0]?.modified_on
              ? staticReviewProps[0].modified_on
              : new Date().toDateString().slice(4),
            headline: staticReviewProps[0]?.headline
              ? staticReviewProps[0].headline
              : 'Not available',
            description: staticReviewProps[0]?.meta_description
              ? handleStringlength(
                  removeAllHTMLTags(staticReviewProps[0].meta_description)
                )
              : staticReviewProps[0]?.synopsis
              ? handleStringlength(
                  removeAllHTMLTags(staticReviewProps[0].synopsis)
                )
              : 'Not available',
            inLanguage: 'English',
            itemReviewed: {
              '@type': 'Movie',
              name:
                staticReviewProps[0] &&
                getMovieShowDetails(staticReviewProps[0])?.name
                  ? getMovieShowDetails(staticReviewProps[0])?.name
                  : 'Not available',
              dateCreated:
                staticReviewProps[0] &&
                getMovieShowDetails(staticReviewProps[0])?.release_date
                  ? getMovieShowDetails(staticReviewProps[0]).release_date
                  : new Date().toDateString().slice(4),
              sameAs:
                staticReviewProps[0] &&
                getMovieShowDetails(staticReviewProps[0])?.permalink
                  ? process.env.REACT_APP_FRONTEND_URL +
                    getMovieShowDetails(staticReviewProps[0]).permalink
                  : '/movie',
              image:
                staticReviewProps[0] &&
                getMovieShowDetails(staticReviewProps[0])?.posters?.length > 0
                  ? getMovieShowDetails(staticReviewProps[0]).posters[0]
                  : '/url_not_available',
              director: {
                '@type': 'Person',
                name:
                  staticReviewProps[0] &&
                  getMovieShowDetails(staticReviewProps[0])?.crews[0]?.crew
                    ?.name
                    ? getMovieShowDetails(staticReviewProps[0]).crews[0].crew
                        .name
                    : 'Not available',
              },
              actor:
                staticReviewProps[0] &&
                getMovieShowDetails(staticReviewProps[0])?.casts
                  ? getMovieShowDetails(staticReviewProps[0]).casts?.map(
                      (item) => {
                        return {
                          '@type': 'Person',
                          name: item?.cast?.name
                            ? item.cast.name
                            : 'Not avilable',
                          sameAs: item?.cast?.seo_url
                            ? `${process.env.REACT_APP_FRONTEND_URL}people/${item.cast.seo_url}`
                            : 'Not avilable',
                        };
                      }
                    )
                  : 'Not available',
            },
            publisher: {
              '@type': 'Organization',
              name: staticReviewProps[0]?.source?.name
                ? staticReviewProps[0].source.name
                : 'Not available',
              sameAs: 'https://www.ottplay.com/',
            },
            reviewRating: {
              '@type': 'Rating',
              worstRating: 0,
              bestRating: 5,
              ratingValue: staticReviewProps[0]?.rating
                ? staticReviewProps[0].rating
                : 0,
            },
          }),
        }}
      />
    );
  };

  if (staticReviewProps)
    return (
      <div className={classes.root}>
        <>
          <Grid container>
            <Grid sm={1} lg={2} item></Grid>
            <Grid xs={12} sm={10} lg={8} item>
              <PagePath
                path={[
                  { name: 'Home', path: '/home' },
                  // {
                  //   name: `${navParams.type === 'movie' ? 'Movies' : 'Shows'}`,
                  //   path: `${navParams === 'movie' ? '/movies' : '/shows'}`,
                  // },
                  // {
                  //   name: `${navParams.name.split('-').join(' ')}`,
                  //   path: null,
                  // },
                  { name: 'Critics Review', path: null },
                ]}
              />
              {staticReviewProps.length > 0 ? (
                <>
                  <OpenGraph
                    ogTitle={
                      staticReviewProps[0]?.headline
                        ? staticReviewProps[0].headline
                        : ''
                    }
                    ogDescription={
                      staticReviewProps[0]?.synopsis
                        ? staticReviewProps[0]?.synopsis
                        : staticReviewProps[0]?.meta_description
                        ? staticReviewProps[0].meta_description
                        : ''
                    }
                    ogImage={
                      staticReviewProps[0]?.cover_image?.url
                        ? staticReviewProps[0].cover_image.url
                        : null
                    }
                  />
                  <MetaData
                    exposeToGoogle={
                      staticReviewProps &&
                      staticReviewProps[0] &&
                      staticReviewProps[0]?.is_crawlable
                    }
                    title={
                      staticReviewProps[0]?.meta_title
                        ? staticReviewProps[0].meta_title
                        : staticReviewProps[0]?.headline
                        ? staticReviewProps[0].headline
                        : 'Review Details Page'
                    }
                    metaData={{
                      metaTitle: staticReviewProps[0]?.meta_title
                        ? staticReviewProps[0].meta_title
                        : staticReviewProps[0]?.headline
                        ? staticReviewProps[0].headline
                        : null,
                      metaDescription: staticReviewProps[0]?.meta_description
                        ? removeAllHTMLTags(
                            staticReviewProps[0].meta_description
                          )
                        : staticReviewProps[0]?.synopsis
                        ? removeAllHTMLTags(staticReviewProps[0].synopsis)
                        : null,
                      metaKeywords:
                        staticReviewProps[0]?.meta_keywords?.length > 0
                          ? staticReviewProps[0].meta_keywords.join()
                          : '',
                    }}
                    microData={{
                      name: staticReviewProps[0]?.meta_title
                        ? staticReviewProps[0].meta_title
                        : staticReviewProps[0]?.headline
                        ? staticReviewProps[0].headline
                        : null,
                      description: staticReviewProps[0]?.meta_description
                        ? removeAllHTMLTags(
                            staticReviewProps[0].meta_description
                          )
                        : staticReviewProps[0]?.synopsis
                        ? removeAllHTMLTags(staticReviewProps[0].synopsis)
                        : null,
                      image: staticReviewProps[0]?.cover_image?.url
                        ? staticReviewProps[0].cover_image.url
                        : null,
                      url: `${
                        process.env.REACT_APP_FRONTEND_URL +
                        router?.asPath?.slice(1)
                      }`,
                      editor: 'OTTPlay',
                      headline: staticReviewProps[0]?.meta_title
                        ? staticReviewProps[0].meta_title.slice(0, 108)
                        : staticReviewProps[0]?.headline
                        ? staticReviewProps[0].headline.slice(0, 108)
                        : null,
                      inLanguage: 'English',
                      sourceOrganization: 'OTTplay',
                      keywords:
                        staticReviewProps[0] &&
                        staticReviewProps[0]?.meta_keywords &&
                        staticReviewProps[0].meta_keywords?.length > 0
                          ? staticReviewProps[0].meta_keywords.join(',')
                          : null,
                      datePublished: staticReviewProps[0]?.published_on
                        ? staticReviewProps[0].published_on
                        : null,
                      dateModified:
                        staticReviewProps[0] &&
                        staticReviewProps[0]?.modified_on
                          ? staticReviewProps[0].modified_on
                          : null,
                    }}
                    extraTags={[
                      <link
                        rel="canonical"
                        href={
                          staticReviewProps[0]?.source?.name !== 'OTTplay' &&
                          staticReviewProps[0]?.canonical_url
                            ? staticReviewProps[0].canonical_url
                            : `${
                                process.env.REACT_APP_FRONTEND_URL +
                                router?.asPath?.slice(1)
                              }`
                        }
                      />,
                    ]}
                  />
                  <Schema
                    schema={[
                      breadcrumbSchema(),
                      siteNavigationSchema(),
                      reviewSchema(),
                      WebPageSchema(
                        staticReviewProps[0] && staticReviewProps[0]?.headline
                          ? staticReviewProps[0].headline
                          : 'Review',
                        staticReviewProps[0]?.meta_description
                          ? removeAllHTMLTags(
                              staticReviewProps[0].meta_description
                            )
                          : staticReviewProps[0]?.synopsis
                          ? removeAllHTMLTags(staticReviewProps[0].synopsis)
                          : 'Description not available'
                      ),
                    ]}
                  />
                  <NewsDetailsCard
                    result={staticReviewProps[0]}
                    contentType="Critics Review"
                  />
                  <div style={{ display: 'flex' }}>
                    <div className={classes.detailsWrap}>
                      <HtmlBody
                        htmlContent={
                          staticReviewProps[0]?.body
                            ? staticReviewProps[0].body
                            : []
                        }
                      />
                      {/* <div className={classes.hr} /> */}
                      {/* {getFilteredDataByParams('cast_and_crew').length > 0 ? (
                        <CastAndCrew
                          crewDetail={getFilteredDataByParams('cast_and_crew')}
                          title={'Cast and Crew'}
                          sourcePage={'MovieDetail'}
                        />
                      ) : null} */}
                      {/* ----TODO----also-read-widget */}
                      {/* <div>
                    {renderSimilarNewsTitle()}
                    <NewsBunch
                      result={staticReviewProps.related_reviews}
                      handleClick={handleSimilarNewsClick}
                      type="similar"
                      component={renderReviewCard}
                    />
                  </div> */}
                      <Hidden only={['sm', 'md', 'lg', 'xl']}>
                        <div>{renderWhereToWatchWidget()}</div>
                      </Hidden>
                    </div>
                    <Hidden only={['xs']}>
                      {' '}
                      <div style={{ width: '300px' }}>
                        <div className={classes.ad}>
                          <GoogleAdOttPlay
                            adInfo={AD_CODES.news_details.ad_1}
                          />
                        </div>

                        {renderWhereToWatchWidget()}
                      </div>
                    </Hidden>
                  </div>
                  <FollowUs />
                </>
              ) : (
                renderErrorMessage()
              )}
            </Grid>
            <Grid sm={1} lg={2} item></Grid>
          </Grid>
        </>
      </div>
    );
  else return false;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: '70vh',
  },
  ad: {
    margin: '20px 0px',
    width: '100%',
    cursor: 'pointer',
  },
  button: {
    color: '#FFFFFF',
    backgroundColor: '#FF4376',
    whiteSpace: 'nowrap',
    border: '1px solid #FF4376',
    margin: '0px 5px',
    width: 206,
    height: 40,
    borderRadius: 28,
    fontSize: 16,
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
  textLook: {
    color: ' #03F87E',
    opacity: 1,
    fontWeight: 600,
    fontSize: 'clamp(24px, 1vw, 30px)',
  },
  detailsWrap: {
    width: 'calc(100% - 300px)',
    padding: '10px 16px 0px 0px',
  },
  description: {
    '& iframe': {
      width: '100% !important',
      height: '30vw !important',
    },
    fontSize: 'clamp(14px, 1.2vw, 18px)',
    color: '#ffffff',
  },
  hr: {
    paddingTop: '20px',
    borderBottom: '1px solid #D6C6F470',
    opacity: 0.5,
  },
  lastUpdatedDate: {
    padding: '12px 0px 20px 0px',
    color: '#A89ABF',
    fontSize: 'clamp(12px, 1vw, 16px)',
    opacity: 0.67,
  },
  similarNewsTitleWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#ffffff',
    padding: '20px 0px 20px 0px',
  },
  similarNewsTitle: {
    fontWeight: 500,
    fontSize: 'clamp(14px, 1.2vw, 18px)',
  },
  similarNewsSeeAll: {
    fontSize: 'clamp(12px, 1vw, 14px)',
    color: '#9C8DC0',
  },
  providerWidgetTitle: {
    color: 'white',
    fontWeight: 600,
    fontSize: 'clamp(20px, 1.8vw, 24px)',
  },
  providerWrap: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '1rem',
    padding: '12px 0px',
  },
  errorBlock: {
    flexDirection: 'column',
    minHeight: '76vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 'clamp(14px, 1.6vw, 22px)',
    color: '#FFFFFF',
    fontWeight: 500,
    textAlign: 'center',
    padding: '0px 20px',
  },
  [theme.breakpoints.down('xs')]: {
    detailsWrap: {
      width: '100%',
      backgroundColor: '#15012865',
      padding: '10px 16px 16px 16px',
    },
    description: {
      textAlign: 'justify',
      '& iframe': {
        height: '46vw !important',
      },
    },
    similarNewsTitleWrap: {
      width: '100%',
    },
    providerWrap: {
      display: 'flex',
      overflowX: 'auto',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        width: '0px',
        background: 'transparent',
      },
    },
    providerWidgetTitle: {
      fontSize: 'clamp(16px, 1.6vw, 24px)',
    },
  },
}));

export async function getStaticProps(context) {
  let typeData;
  if (context && context.params && context.params.reviewslug[2] === 'preview') {
    typeData = 'preview';
  }
  const pagePath = `${context.params.reviewslug[0]}/${context.params.reviewslug[1]}`;
  const params = {
    seoUrl: pagePath,
    [typeData]: typeData ? true : null,
  };

  const res = await webfox.getCriticsReviewDetails(params);

  if (await !res.data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      staticReviewProps: await res.data.result,
    },
    revalidate: 15,
  };
}

export async function getStaticPaths() {
  const params = {
    data: {
      content_type: 'review',
      lang: 'english',
      page: 1,
      limit: 16,
      source: 'news',
      responseType: 'full',
    },
  };
  let data = [];
  const getNews = await webfox.getNews(params);
  await getNews.response?.data.news.map((item) => {
    data.push([{ params: { reviewslug: item.seo_url } }]);
  });
  return {
    paths: data,
    fallback: 'blocking',
  };
}
