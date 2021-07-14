import { AD_CODES, SLURRP_URL } from '../../utils/constants';
import { Grid, Hidden, Theme, makeStyles } from '@material-ui/core';
import {
  LOCALSTORAGE_KEY_CONSTANTS,
  contextParamsForREAnalytics,
  device_UUID,
  getLocalStorageData,
  getPreferredLanguages,
  getPreferredProviders,
  getUserType,
  sortProvidersByUserPreference,
} from '../../utils/constants';
import { NavBar, PagePath, Spinner, TopHeader } from '../../components';
import React, { useEffect } from 'react';
import {
  getFormattedDateToDisplay,
  getNewsSourceLogo,
  removeAllHTMLTags,
} from '../../utils/helper';
import { getWebpUrl, removeHTMLTags } from '../../utils/helper';

import Axios from 'axios';
import { DATE_FORMATE } from '../../utils/constants';
import FollowUs from '../../components/FollowUs';
import GoogleAdOttPlay from '../../components/GoogleAds';
import Helmet from 'react-helmet';
import { HtmlBody } from '../../components/news/HtmlBody';
import ImageComponent from '../../components/Images';
import { NewsBunch } from '../../components/news/NewsBunch';
import { NewsDetailsCard } from '../../components/news/NewsDetailsCard';
import { PillButton } from '../../components/PillButton';
import ReactPlayer from 'react-player';
import { SEO } from '../../components/Seo/Seo';
import { ViewportContext } from '../../components/ViewportProvider';
import { WebPageSchema } from '../../components/Seo/SeoSchema';
import { WebfoxContext } from '../../services/webfox';
import cookie from 'react-cookies';
import { firebaseAnalytics } from '../../components/firebaseConfig';
// import { getNewsDetails } from '../../services/webbase/routes';
import { useRouter } from 'next/router';
import webfox from '../../services/webbase';
import webfox2 from '../../services/webbase/queries';

const windowAny: any = typeof window !== 'undefined' && window;
const _ht_clientid = cookie.load('_ht_clientid');

export default function InterviewDetails({ staticInterviewProps, ...props }) {
  //console.log('staticInterviewProps', staticInterviewProps);
  const router = useRouter();
  const classes = useStyles();
  const { webstore, webfox } = React.useContext(WebfoxContext);
  const seoUrl =
    typeof window !== 'undefined' && window.location.pathname.split('/');
  const { languages, streamingServices } = webstore;
  const { width } = React.useContext(ViewportContext);

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
    if (contentType === 'interviews') {
      router.push({
        pathname: '/interview',
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
          {staticInterviewProps[0]?.author && (
            <div className={classes.authorName}>
              {staticInterviewProps[0]?.author}
            </div>
          )}
          {/* hide date */}
          {staticInterviewProps[0]?.published_on && (
            <div className={classes.publishDate}>
              {getFormattedDateToDisplay(
                staticInterviewProps[0]?.published_on,
                DATE_FORMATE.DATE_FORMATTED
              )}
            </div>
          )}
        </div>
        {staticInterviewProps[0]?.source &&
          staticInterviewProps[0]?.source?.name && (
            <div
              className={classes.logoWrap}
              onClick={() => {
                handleLogoClick(
                  staticInterviewProps[0]?.content_type === 'all-news'
                    ? 'news'
                    : staticInterviewProps[0]?.content_type,
                  getpubliserInShort(staticInterviewProps[0]?.source?.name)
                );
              }}
            >
              {/* <div className={classes.poweredBytext}>powered by</div> */}
              {staticInterviewProps[0]?.source?.name === 'OTTplay' ? null : (
                <ImageComponent
                  src={getNewsSourceLogo(staticInterviewProps[0]?.source?.name)}
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
        ) : staticInterviewProps[0]?.content_type === 'listicles' ? (
          staticInterviewProps[0]?.images &&
          staticInterviewProps[0]?.images.length > 0 &&
          staticInterviewProps[0]?.images[0].url && (
            <ImageComponent
              className={classes.poster}
              src={staticInterviewProps[0]?.images[0].url}
              alt="link"
            />
          )
        ) : ( */}
        {staticInterviewProps[0]?.cover_image && (
          <>
            {' '}
            {staticInterviewProps[0]?.cover_image?.url && (
              <ImageComponent
                className={classes.poster}
                src={staticInterviewProps[0]?.cover_image?.url}
                alt="link"
              />
            )}
            {staticInterviewProps[0]?.cover_image?.caption && (
              <div
                className={classes.posterCaption}
                dangerouslySetInnerHTML={{
                  __html: staticInterviewProps[0]?.cover_image?.caption,
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
              {staticInterviewProps[0]?.content_type}
            </div>
            {/* ---TODO---Share
          <div className={classes.shareIconWrap}> 
            <ImageComponent src={IMAGES.share_icon} />
          </div> */}
          </div>
          <div
            className={classes.title}
            dangerouslySetInnerHTML={{
              __html: staticInterviewProps[0]?.headline
                ? staticInterviewProps[0]?.headline
                : staticInterviewProps[0]?.title
                ? staticInterviewProps[0]?.name
                : staticInterviewProps[0]?.name,
            }}
          />
          {(staticInterviewProps[0]?.synopsis ||
            staticInterviewProps[0]?.byline) && (
            <div
              className={classes.synopsis}
              dangerouslySetInnerHTML={{
                __html: staticInterviewProps[0]?.synopsis
                  ? staticInterviewProps[0]?.synopsis
                  : staticInterviewProps[0]?.byline,
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

  let languagesArr: any = [];
  let providersArr: any = [];

  React.useEffect(() => {
    languagesArr = getLocalStorageData(
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES)
      ) || [],
      languages.name || []
    );
    providersArr = getLocalStorageData(
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_IDS)
      ) || [],
      streamingServices.selectedStreamingServices || []
    );
    window.scrollTo(0, 0);
  }, []);
  React.useEffect(() => {
    const params = {
      seoUrl: seoUrl[2] + (seoUrl[3] ? `/${seoUrl[3]}` : ''),
    };

    webfox
      .getNewsDetails(params)
      .then((response) => {
        if (
          response.data &&
          response.data.results &&
          response.data.results.length > 0
        ) {
          // setResult(response.data.staticInterviewProps[0]);
          firebaseAnalytics.logEvent('screen_view', {
            page_title:
              '/interviewsDetail' +
              (response.data?.results[0]?._id && response.data?.results[0]?._id
                ? '/' + response.data?.results[0]?._id
                : '') +
              (response.data.results[0] &&
              response.data?.results[0]?.content_type
                ? '/' + response.data?.results[0]?.content_type
                : ''),
            page_location:
              '/interviewsDetail' + response.data.results[0] &&
              response.data?.results[0]?.source &&
              response.data?.results[0]?.source.name
                ? '/' + response.data?.results[0]?.source.name
                : '' + `${sessionStorage.getItem('prevPath')}`,
          });
          windowAny.Moengage.track_event('screen_view', {
            page_title: '/interviewDetail',
            headline:
              response.data.results.results[0] &&
              response.data.results.results[0].headline
                ? response.data.results.results[0].headline
                : '',
            id:
              response.data.results.results[0] &&
              response.data.results.results[0]._id
                ? response.data.results.results[0]._id
                : '',
            content_type:
              response.data.results[0] &&
              response.data?.results[0]?.content_type
                ? response.data?.results[0]?.content_type
                : '',
            source:
              response.data.results[0] &&
              response.data?.results[0]?.source &&
              response.data?.results[0]?.source.name
                ? response.data?.results[0]?.source.name
                : '',
          });
        }
        // setLoadingData(false);
      })
      .catch(() => {
        // setLoadingData(false);
      });
  }, []);

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
                url: 'http://www.ottplay.com',
              },
              {
                '@type': 'SiteNavigationElement',
                position: 2,
                name: 'Interviews',
                url: 'http://www.ottplay.com/interviews',
              },
              {
                '@type': 'SiteNavigationElement',
                position: 3,
                name:
                  staticInterviewProps[0] && staticInterviewProps[0]?.headline
                    ? staticInterviewProps[0].headline
                    : 'Not available',
                url:
                  'http://www.ottplay.com' +
                  (staticInterviewProps[0] && staticInterviewProps[0]?.seo_url
                    ? '/interview/' + staticInterviewProps[0].seo_url
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
                  '@id': 'https://www.ottplay.com',
                  name: 'Home',
                },
              },
              {
                '@type': 'ListItem',
                position: 2,
                item: {
                  '@id': 'https://www.ottplay.com/interviews',
                  name: 'Interviews',
                },
              },
              {
                '@type': 'ListItem',
                position: 3,
                item: {
                  '@id':
                    'https://www.ottplay.com' +
                    (staticInterviewProps && staticInterviewProps[0]?.seo_url
                      ? '/interview/' + staticInterviewProps[0].seo_url
                      : ''),
                  name: staticInterviewProps[0]?.headline
                    ? staticInterviewProps[0].headline
                    : 'Not available',
                },
              },
            ],
          }),
        }}
      />
    );
  };

  const articleSchema = () => {
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'newsarticle',
            url: `${
              process.env.REACT_APP_FRONTEND_URL + router?.asPath?.slice(1)
            }`,
            articleBody:
              staticInterviewProps[0]?.body?.length > 0
                ? staticInterviewProps[0].body
                    .map((item) => {
                      return item.type === 'paragraph' && item.content
                        ? removeAllHTMLTags(item.content)
                        : false;
                    })
                    .join(' ')
                : 'Interview',
            articleSection: 'india',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `${
                process.env.REACT_APP_FRONTEND_URL + router?.asPath?.slice(1)
              }`,
            },
            headline:
              staticInterviewProps && staticInterviewProps[0]?.headline
                ? staticInterviewProps[0].headline
                : 'Not available',
            description: staticInterviewProps[0]?.meta_description
              ? removeAllHTMLTags(staticInterviewProps[0].meta_description)
              : staticInterviewProps[0]?.synopsis
              ? removeAllHTMLTags(staticInterviewProps[0].synopsis)
              : 'Not available',
            datePublished:
              staticInterviewProps &&
              staticInterviewProps[0] &&
              staticInterviewProps[0]?.published_on
                ? staticInterviewProps[0].published_on
                : new Date().toDateString().slice(4),
            dateModified:
              staticInterviewProps &&
              staticInterviewProps[0] &&
              staticInterviewProps[0]?.modified_on
                ? staticInterviewProps[0].modified_on
                : new Date().toDateString().slice(4),
            publisher: {
              '@type': 'Organization',
              name:
                staticInterviewProps && staticInterviewProps[0]?.source?.name
                  ? staticInterviewProps[0].source.name
                  : 'Not available',
              logo: {
                '@type': 'ImageObject',
                url:
                  staticInterviewProps &&
                  staticInterviewProps[0]?.source?.logo_url
                    ? staticInterviewProps[0].source.logo_url
                    : '/not_available',
                width: '125',
                height: '26',
              },
            },
            author: {
              '@type': 'Person',
              name:
                staticInterviewProps && staticInterviewProps[0]?.author
                  ? staticInterviewProps[0].author
                  : 'Not available',
            },
            image: {
              '@type': 'ImageObject',
              url:
                staticInterviewProps &&
                staticInterviewProps[0]?.cover_image?.url
                  ? staticInterviewProps[0].cover_image.url
                  : '/not_available',
              width: '759',
              height: '422',
            },
          }),
        }}
      />
    );
  };

  const getImageUrl = (details) => {
    return details.posters && details.posters[0]
      ? getWebpUrl(details.posters[0])
      : details.tmdb_posters
      ? details.tmdb_posters[0]
      : null;
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

  if (staticInterviewProps) {
    return (
      <div className={classes.root}>
        <Grid container>
          <Grid sm={1} lg={2} item></Grid>
          <Grid xs={12} sm={10} lg={8} item>
            <PagePath
              path={[
                { name: 'Home', path: '/home' },
                // { name: 'News', path: '/news' },
                { name: seoUrl[1], path: null },
              ]}
            />
            {staticInterviewProps?.length > 0 ? (
              <>
                <NewsDetailsCard result={staticInterviewProps[0]} />
                <SEO
                  exposeToGoogle={
                    staticInterviewProps &&
                    staticInterviewProps[0] &&
                    staticInterviewProps[0]?.is_crawlable
                  }
                  title={
                    staticInterviewProps[0]?.meta_title
                      ? staticInterviewProps[0].meta_title
                      : staticInterviewProps[0]?.headline
                      ? staticInterviewProps[0].headline
                      : 'Interview Details Page'
                  }
                  ogData={{
                    ogTitle: staticInterviewProps[0]?.headline
                      ? staticInterviewProps[0].headline
                      : staticInterviewProps[0]?.meta_title
                      ? staticInterviewProps[0].meta_title
                      : 'Top OTT Article',
                    ogDescription: staticInterviewProps[0]?.synopsis
                      ? staticInterviewProps[0].synopsis
                      : staticInterviewProps[0]?.meta_description
                      ? staticInterviewProps[0].meta_description
                      : null,
                    ogImage: staticInterviewProps[0]?.cover_image?.url
                      ? staticInterviewProps[0].cover_image.url
                      : null,
                  }}
                  metaData={{
                    metaTitle: staticInterviewProps[0]?.meta_title
                      ? staticInterviewProps[0].meta_title
                      : staticInterviewProps[0]?.headline
                      ? staticInterviewProps[0].headline
                      : null,
                    metaDescription: staticInterviewProps[0]?.meta_description
                      ? removeAllHTMLTags(
                          staticInterviewProps[0].meta_description
                        )
                      : staticInterviewProps[0]?.synopsis
                      ? removeAllHTMLTags(staticInterviewProps[0].synopsis)
                      : null,
                    metaKeywords:
                      staticInterviewProps[0] &&
                      staticInterviewProps[0].meta_keywords &&
                      staticInterviewProps[0].meta_keywords?.length > 0
                        ? staticInterviewProps[0].meta_keywords.join(',')
                        : null,
                  }}
                  microData={{
                    name: staticInterviewProps[0]?.meta_title
                      ? staticInterviewProps[0].meta_title
                      : staticInterviewProps[0]?.headline
                      ? staticInterviewProps[0].headline
                      : null,
                    description: staticInterviewProps[0]?.meta_description
                      ? removeAllHTMLTags(
                          staticInterviewProps[0].meta_description
                        )
                      : staticInterviewProps[0]?.synopsis
                      ? removeAllHTMLTags(staticInterviewProps[0].synopsis)
                      : null,
                    image: staticInterviewProps[0]?.cover_image?.url
                      ? staticInterviewProps[0].cover_image.url
                      : null,
                    url: `${
                      process.env.REACT_APP_FRONTEND_URL +
                      router?.asPath?.slice(1)
                    }`,
                    editor: 'OTTPlay',
                    headline: staticInterviewProps[0]?.meta_title
                      ? staticInterviewProps[0].meta_title.slice(0, 108)
                      : staticInterviewProps[0]?.headline
                      ? staticInterviewProps[0].headline.slice(0, 108)
                      : null,
                    inLanguage: 'English',
                    sourceOrganization: 'OTTplay',
                    keywords:
                      staticInterviewProps[0] &&
                      staticInterviewProps[0]?.meta_keywords &&
                      staticInterviewProps[0].meta_keywords?.length > 0
                        ? staticInterviewProps[0].meta_keywords.join(',')
                        : null,
                    datePublished: staticInterviewProps[0]?.published_on
                      ? staticInterviewProps[0].published_on
                      : null,
                    dateModified:
                      staticInterviewProps[0] &&
                      staticInterviewProps[0]?.modified_on
                        ? staticInterviewProps[0].modified_on
                        : null,
                  }}
                  schema={[
                    siteNavigationSchema(),
                    breadcrumbSchema(),
                    articleSchema(),
                    WebPageSchema(
                      staticInterviewProps[0] &&
                        staticInterviewProps[0]?.headline
                        ? staticInterviewProps[0].headline
                        : 'Interview',
                      staticInterviewProps[0]?.meta_description
                        ? removeAllHTMLTags(
                            staticInterviewProps[0].meta_description
                          )
                        : staticInterviewProps[0]?.synopsis
                        ? removeAllHTMLTags(staticInterviewProps[0].synopsis)
                        : 'Description not available'
                    ),
                  ]}
                  extraTags={[
                    <link
                      rel="canonical"
                      href={
                        staticInterviewProps[0]?.source?.name !== 'OTTplay' &&
                        staticInterviewProps[0]?.canonical_url
                          ? staticInterviewProps[0].canonical_url
                          : `${
                              process.env.REACT_APP_FRONTEND_URL +
                              router?.asPath?.slice(1)
                            }`
                      }
                    />,
                  ]}
                />
                {/* <div className={classes.detailsCardWrap}>
                  {renderDetails()}
                  {((staticInterviewProps[0]?.cover_image &&
                    staticInterviewProps[0]?.cover_image?.url) ||
                    width > 600) &&
                    renderPosterCard()}
                </div>{' '} */}

                <div style={{ display: 'flex' }}>
                  <div
                    className={
                      width > 600 ? classes.detailsWrap : classes.mwebWrap
                    }
                  >
                    <HtmlBody
                      htmlContent={
                        staticInterviewProps[0]?.body
                          ? staticInterviewProps[0].body
                          : []
                      }
                    />
                  </div>
                  <Hidden only={['xs']}>
                    {' '}
                    <div style={{ width: '300px' }}>
                      <div className={classes.ad}>
                        <GoogleAdOttPlay adInfo={AD_CODES.news_details.ad_1} />
                      </div>
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
        {/* )} */}
      </div>
    );
  } else {
    return false;
  }
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
    fontSize: 'clamp(14px, 1.2vw, 18px)',
    color: '#ffffff',
    whiteSpace: 'pre-wrap',
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
  mwebWrap: {
    width: '100%',
    backgroundColor: '#15012865',
    padding: '10px 16px 16px 16px',
  },
  [theme.breakpoints.down('xs')]: {
    description: {
      textAlign: 'justify',
    },
    similarNewsTitleWrap: {
      width: '100%',
    },
  },

  newDetailsWrap: {
    width: '40%',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  newDetailsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  shareIconWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    border: '1px solid #FFFFFF30',
    '& img': {
      width: '22px',
    },
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
    cursor: 'pointer',
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
    objectFit: 'cover',
    display: 'flex',
  },
  preview: {
    color: '#A28DC9',
    textTransform: 'uppercase',
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
      height: '46vw',
    },
    title: {
      paddingTop: '12px',
    },
    hr: {
      margin: '12px 0px',
    },
  },
}));

export async function getStaticProps(context) {
  let typeData;
  if (
    context &&
    context.params &&
    context.params.interviewslug[2] === 'preview'
  ) {
    typeData = 'preview';
  }
  const pagePath = `${context.params.interviewslug[0]}/${context.params.interviewslug[1]}`;
  const params = {
    seoUrl: pagePath,
    [typeData]: typeData ? true : null,
  };

  const res = await webfox.getNewsDetails(params);

  if (await !res.data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      staticInterviewProps: await res.data.results,
    },
    revalidate: 15,
  };
}

export async function getStaticPaths() {
  const params = {
    data: {
      content_type: 'interviews',
      lang: 'english',
      page: 1,
      limit: 16,
      source: 'All',
      responseType: 'full',
    },
  };
  let data = [];
  const getNews = await webfox.getNews(params);
  await getNews.response?.data.news.map((item) => {
    data.push([{ params: { newsslug: item.seo_url } }]);
  });
  return {
    paths: data,
    fallback: 'blocking',
  };
}
