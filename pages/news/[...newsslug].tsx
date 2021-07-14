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

const windowAny: any = typeof window !== 'undefined' && window;
const _ht_clientid = cookie.load('_ht_clientid');
let propsRender = true;

export default function InterviewDetails({ staticNewsProps, ...props }) {
  //console.log('staticNewsProps', staticNewsProps);
  const router = useRouter();
  const classes = useStyles();
  const [result, setResult] = React.useState<any>(null);
  const [loadingData, setLoadingData] = React.useState(true);
  const { webstore, webfox } = React.useContext(WebfoxContext);
  const seoUrl =
    typeof window !== 'undefined' && window.location.pathname.split('/');
  const { languages, streamingServices } = webstore;
  // windowAny.twttr && windowAny?.twttr?.widgets?.load();
  // windowAny.instgrm && windowAny?.instgrm?.Embeds?.process();
  // if (typeof window !== 'undefined' && typeof window.instgrm !== 'undefined') {
  //   window.instgrm.Embeds.process();
  // }
  // let pageData = props.staticNewsProps[0]
  // if(propsRender && props.staticNewsProps){

  //   setResult(props.staticNewsProps[0]);
  //   console.log()
  //   propsRender = false
  // }
  const { width } = React.useContext(ViewportContext);

  useEffect(() => {
    if (windowAny?.instgrm) {
      windowAny?.instgrm?.Embeds?.process();
    }
    if (windowAny?.twttr) {
      windowAny?.twttr?.widgets?.load();
    }
  }, []);

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
          {staticNewsProps[0]?.author && (
            <div className={classes.authorName}>
              {staticNewsProps[0]?.author}
            </div>
          )}
          {/* hide date */}
          {staticNewsProps[0]?.published_on && (
            <div className={classes.publishDate}>
              {getFormattedDateToDisplay(
                staticNewsProps[0]?.published_on,
                DATE_FORMATE.DATE_FORMATTED
              )}
            </div>
          )}
        </div>
        {staticNewsProps[0]?.source && staticNewsProps[0]?.source?.name && (
          <div
            className={classes.logoWrap}
            onClick={() => {
              handleLogoClick(
                staticNewsProps[0]?.content_type === 'all-news'
                  ? 'news'
                  : staticNewsProps[0]?.content_type,
                getpubliserInShort(staticNewsProps[0]?.source?.name)
              );
            }}
          >
            {/* <div className={classes.poweredBytext}>powered by</div> */}
            {staticNewsProps[0]?.source?.name === 'OTTplay' ? null : (
              <ImageComponent
                src={getNewsSourceLogo(staticNewsProps[0]?.source?.name)}
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
        ) : staticNewsProps[0]?.content_type === 'listicles' ? (
          staticNewsProps[0]?.images &&
          staticNewsProps[0]?.images.length > 0 &&
          staticNewsProps[0]?.images[0].url && (
            <ImageComponent
              className={classes.poster}
              src={staticNewsProps[0]?.images[0].url}
              alt="link"
            />
          )
        ) : ( */}
        {staticNewsProps[0]?.cover_image && (
          <>
            {' '}
            {staticNewsProps[0]?.cover_image?.url && (
              <ImageComponent
                className={classes.poster}
                src={staticNewsProps[0]?.cover_image?.url}
                alt="link"
              />
            )}
            {staticNewsProps[0]?.cover_image?.caption && (
              <div
                className={classes.posterCaption}
                dangerouslySetInnerHTML={{
                  __html: staticNewsProps[0]?.cover_image?.caption,
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
              {staticNewsProps[0]?.content_type}
            </div>
            {/* ---TODO---Share
          <div className={classes.shareIconWrap}> 
            <ImageComponent src={IMAGES.share_icon} />
          </div> */}
          </div>
          <div
            className={classes.title}
            dangerouslySetInnerHTML={{
              __html: staticNewsProps[0]?.headline
                ? staticNewsProps[0]?.headline
                : staticNewsProps[0]?.title
                ? staticNewsProps[0]?.name
                : staticNewsProps[0]?.name,
            }}
          />
          {(staticNewsProps[0]?.synopsis || staticNewsProps[0]?.byline) && (
            <div
              className={classes.synopsis}
              dangerouslySetInnerHTML={{
                __html: staticNewsProps[0]?.synopsis
                  ? staticNewsProps[0]?.synopsis
                  : staticNewsProps[0]?.byline,
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
          // setResult(response.data.staticNewsProps[0]);
          firebaseAnalytics.logEvent('screen_view', {
            page_title:
              '/newsDetail' +
              (response.data?.results[0]?._id && response.data?.results[0]?._id
                ? '/' + response.data?.results[0]?._id
                : '') +
              (response.data.results[0] &&
              response.data?.results[0]?.content_type
                ? '/' + response.data?.results[0]?.content_type
                : ''),
            page_location:
              '/newsDetail' +
              (response.data.results[0] &&
              response.data?.results[0]?.source &&
              response.data?.results[0]?.source?.name
                ? '/' + response.data?.results[0]?.source?.name
                : '') +
              `${sessionStorage.getItem('prevPath')}`,
          });
          windowAny.Moengage.track_event('screen_view', {
            screen_view: '/newsDetail',
            headline:
              response.data?.results?.results[0] &&
              response.data?.results?.results[0]?.headline
                ? response.data?.results?.results[0]?.headline
                : '',
            id:
              response.data?.results?.results[0] &&
              response.data?.results?.results[0]?._id
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
                name: 'News',
                url: 'http://www.ottplay.com/all-news',
              },
              {
                '@type': 'SiteNavigationElement',
                position: 3,
                name:
                  staticNewsProps &&
                  staticNewsProps[0] &&
                  staticNewsProps[0]?.headline
                    ? staticNewsProps[0].headline
                    : 'Not available',
                url:
                  'http://www.ottplay.com' +
                  (staticNewsProps &&
                  staticNewsProps[0] &&
                  staticNewsProps[0]?.seo_url
                    ? '/news/' + staticNewsProps[0].seo_url
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
                  '@id': 'https://www.ottplay.com/all-news',
                  name: 'News',
                },
              },
              {
                '@type': 'ListItem',
                position: 3,
                item: {
                  '@id':
                    'https://www.ottplay.com' +
                    (staticNewsProps && staticNewsProps[0]?.seo_url
                      ? '/news/' + staticNewsProps[0].seo_url
                      : ''),
                  name:
                    staticNewsProps && staticNewsProps[0]?.headline
                      ? staticNewsProps[0].headline
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
              staticNewsProps &&
              staticNewsProps[0]?.body &&
              staticNewsProps[0]?.body.length > 0
                ? staticNewsProps[0].body
                    .map((item) => {
                      return item.type === 'paragraph' && item.content
                        ? removeAllHTMLTags(item.content)
                        : '';
                    })
                    .join(' ')
                : 'news',
            articleSection: 'india',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `${
                process.env.REACT_APP_FRONTEND_URL + router?.asPath?.slice(1)
              }`,
            },
            headline:
              staticNewsProps && staticNewsProps[0]?.headline
                ? staticNewsProps[0].headline
                : 'Not available',
            description: staticNewsProps[0]?.meta_description
              ? removeAllHTMLTags(staticNewsProps[0].meta_description)
              : staticNewsProps[0]?.synopsis
              ? removeAllHTMLTags(staticNewsProps[0].synopsis)
              : 'Not available',
            datePublished:
              staticNewsProps &&
              staticNewsProps[0] &&
              staticNewsProps[0]?.published_on
                ? staticNewsProps[0].published_on
                : new Date().toDateString().slice(4),
            dateModified:
              staticNewsProps &&
              staticNewsProps[0] &&
              staticNewsProps[0]?.modified_on
                ? staticNewsProps[0].modified_on
                : new Date().toDateString().slice(4),
            publisher: {
              '@type': 'Organization',
              name:
                staticNewsProps && staticNewsProps[0]?.source?.name
                  ? staticNewsProps[0].source.name
                  : 'Not available',
              logo: {
                '@type': 'ImageObject',
                url:
                  staticNewsProps && staticNewsProps[0]?.source?.logo_url
                    ? staticNewsProps[0].source.logo_url
                    : '/not_available',
                width: '125',
                height: '26',
              },
            },
            author: {
              '@type': 'Person',
              name:
                staticNewsProps && staticNewsProps[0]?.author
                  ? staticNewsProps[0].author
                  : 'Not available',
            },
            image: {
              '@type': 'ImageObject',
              url:
                staticNewsProps && staticNewsProps[0]?.cover_image?.url
                  ? staticNewsProps[0].cover_image.url
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

  if (staticNewsProps) {
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
            {staticNewsProps?.length > 0 ? (
              <>
                <NewsDetailsCard
                  result={staticNewsProps[0]}
                  // video_url="https://www.youtube.com/watch?v=ni8bN3zlpPA"
                />

                <SEO
                  exposeToGoogle={
                    staticNewsProps &&
                    staticNewsProps[0] &&
                    staticNewsProps[0]?.is_crawlable
                  }
                  title={
                    staticNewsProps[0]?.meta_title
                      ? staticNewsProps[0].meta_title
                      : staticNewsProps[0]?.headline
                      ? staticNewsProps[0].headline
                      : 'News Details Page'
                  }
                  ogData={{
                    ogTitle: staticNewsProps[0]?.headline
                      ? staticNewsProps[0].headline
                      : staticNewsProps[0]?.meta_title
                      ? staticNewsProps[0].meta_title
                      : 'Top OTT news',
                    ogDescription: staticNewsProps[0]?.synopsis
                      ? staticNewsProps[0].synopsis
                      : staticNewsProps[0]?.meta_description
                      ? staticNewsProps[0].meta_description
                      : null,

                    ogImage: staticNewsProps[0]?.cover_image?.url
                      ? staticNewsProps[0].cover_image.url
                      : null,
                  }}
                  metaData={{
                    metaTitle: staticNewsProps[0]?.meta_title
                      ? staticNewsProps[0].meta_title
                      : staticNewsProps[0]?.headline
                      ? staticNewsProps[0].headline
                      : null,
                    metaDescription: staticNewsProps[0]?.meta_description
                      ? removeAllHTMLTags(staticNewsProps[0].meta_description)
                      : staticNewsProps[0]?.synopsis
                      ? removeAllHTMLTags(staticNewsProps[0].synopsis)
                      : null,
                    metaKeywords:
                      staticNewsProps[0] &&
                      staticNewsProps[0]?.meta_keywords &&
                      staticNewsProps[0].meta_keywords?.length > 0
                        ? staticNewsProps[0].meta_keywords.join(',')
                        : null,
                  }}
                  microData={{
                    name: staticNewsProps[0]?.meta_title
                      ? staticNewsProps[0].meta_title
                      : staticNewsProps[0]?.headline
                      ? staticNewsProps[0].headline
                      : null,
                    description: staticNewsProps[0]?.meta_description
                      ? removeAllHTMLTags(staticNewsProps[0].meta_description)
                      : staticNewsProps[0]?.synopsis
                      ? removeAllHTMLTags(staticNewsProps[0].synopsis)
                      : null,
                    image: staticNewsProps[0]?.cover_image?.url
                      ? staticNewsProps[0].cover_image.url
                      : null,
                    url: `${
                      process.env.REACT_APP_FRONTEND_URL +
                      router?.asPath?.slice(1)
                    }`,
                    editor: 'OTTPlay',
                    headline: staticNewsProps[0]?.meta_title
                      ? staticNewsProps[0].meta_title.slice(0, 108)
                      : staticNewsProps[0]?.headline
                      ? staticNewsProps[0].headline.slice(0, 108)
                      : null,
                    inLanguage: 'English',
                    sourceOrganization: 'OTTplay',
                    keywords:
                      staticNewsProps[0] &&
                      staticNewsProps[0].meta_keywords &&
                      staticNewsProps[0]?.meta_keywords?.length > 0
                        ? staticNewsProps[0].meta_keywords.join(',')
                        : null,
                    datePublished: staticNewsProps[0]?.published_on
                      ? staticNewsProps[0].published_on
                      : null,
                    dateModified:
                      staticNewsProps[0] && staticNewsProps[0]?.modified_on
                        ? staticNewsProps[0].modified_on
                        : null,
                  }}
                  schema={[
                    siteNavigationSchema(),
                    breadcrumbSchema(),
                    articleSchema(),
                    WebPageSchema(
                      staticNewsProps[0] && staticNewsProps[0]?.headline
                        ? staticNewsProps[0].headline
                        : 'News',
                      staticNewsProps[0]?.meta_description
                        ? removeAllHTMLTags(staticNewsProps[0].meta_description)
                        : staticNewsProps[0]?.synopsis
                        ? removeAllHTMLTags(staticNewsProps[0].synopsis)
                        : 'Description not available'
                    ),
                  ]}
                  extraTags={[
                    <link
                      rel="canonical"
                      href={
                        staticNewsProps[0]?.source?.name !== 'OTTplay' &&
                        staticNewsProps[0]?.canonical_url
                          ? staticNewsProps[0].canonical_url
                          : `${
                              process.env.REACT_APP_FRONTEND_URL +
                              router?.asPath?.slice(1)
                            }`
                      }
                    />,
                  ]}
                />

                <div style={{ display: 'flex' }}>
                  <div className={classes.detailsWrap}>
                    <HtmlBody
                      htmlContent={
                        staticNewsProps[0]?.body ? staticNewsProps[0].body : []
                      }
                    />
                  </div>
                  <Hidden only={['xs']}>
                    {' '}
                    <div style={{ width: '300px' }} className={classes.ad}>
                      <GoogleAdOttPlay adInfo={AD_CODES.news_details.ad_1} />
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
  [theme.breakpoints.down('xs')]: {
    detailsWrap: {
      width: '100%',
      backgroundColor: '#15012865',
      padding: '10px 16px 16px 16px',
    },
    description: {
      textAlign: 'justify',
    },
    similarNewsTitleWrap: {
      width: '100%',
    },
  },
}));

export async function getStaticProps(context) {
  let typeData;
  if (context && context.params && context.params.newsslug[2] === 'preview') {
    typeData = 'preview';
  }
  const pagePath = `${context.params.newsslug[0]}/${context.params.newsslug[1]}`;
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
      staticNewsProps: await res.data.results,
    },
    revalidate: 15,
  };
}

export async function getStaticPaths() {
  const params = {
    data: {
      content_type: 'news',
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
    data.push([{ params: { newsslug: item.seo_url } }]);
  });
  return {
    paths: data,
    fallback: 'blocking',
  };
}
