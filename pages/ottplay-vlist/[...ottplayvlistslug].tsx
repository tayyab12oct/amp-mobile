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

import { CastCrewListicleCard } from '../../components/listicle/CastCrewListicleCard';
import Helmet from 'react-helmet';
import { HtmlBody } from '../../components/news/HtmlBody';
import ImageComponent from '../../components/Images';
import { MovieShowListicleCard } from '../../components/listicle/MovieShowListicleCard';
import { NewsBunch } from '../../components/news/NewsBunch';
import { NewsDetailsCard } from '../../components/news/NewsDetailsCard';
import { PillButton } from '../../components/PillButton';
import React from 'react';
import { SEO } from '../../components/Seo/Seo';
import { SLURRP_URL } from '../../utils/constants';
import { SynopsisModal } from '../../components/Modals/SynopsisModal';
import { WebPageSchema } from '../../components/Seo/SeoSchema';
import { WebfoxContext } from '../../services/webfox';
import cookie from 'react-cookies';
import { firebaseAnalytics } from '../../components/firebaseConfig';
import { useRouter } from 'next/router';
import webfox from '../../services/webbase';

const VlpDetails = ({ staticListiclesProps }) => {
  const windowAny: any = typeof window !== 'undefined' && window;
  //console.log('staticListiclesProps', staticListiclesProps);
  const _ht_clientid = cookie.load('_ht_clientid');
  const router = useRouter();
  const initState = {
    result: null,
    loadingData: true,
    synopsisIsOpen: false,
    synopsis: '',
    synopsisTitle: '',
  };
  const { webstore } = React.useContext(WebfoxContext);
  const { languages, streamingServices } = webstore;

  const classes = useStyles();
  const seoUrl =
    typeof window !== 'undefined' && window.location.pathname.split('/');
  const [state, setState] = React.useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { ...JSON.parse(JSON.stringify(initState)) }
  );
  const { webfox } = React.useContext(WebfoxContext);

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
      seoUrl: seoUrl[3] + (seoUrl[4] ? `/${seoUrl[4]}` : ''),
    };
    webfox
      .getListicleDetails(params)
      .then((response) => {
        if (
          response.data &&
          response.data.result &&
          response.data.result.length > 0
        ) {
          // setState({ loadingData: false });
          firebaseAnalytics.logEvent('screen_view', {
            page_title:
              '/vlpDetail' +
              (response.data.result[0] && response.data.result[0]._id
                ? '/' + response.data.result[0]._id
                : '') +
              (response.data.result[0] && response.data.result[0].content_type
                ? '/' + response.data.result[0].content_type
                : ''),
            page_location:
              '/vlpDetail' + response.data.result[0] &&
              response.data.result[0].source &&
              response.data.result[0].source.name
                ? '/' + response.data.result[0].source.name
                : '' + `${sessionStorage.getItem('prevPath')}`,
          });
          windowAny.Moengage.track_event('screen_view', {
            page_title: '/vlpDetail',
            name:
              response.data.result[0] && response.data.result[0].headline
                ? response.data.result[0].headline
                : '',
            id:
              response.data.result[0] && response.data.result[0]._id
                ? response.data.result[0]._id
                : '',
            content_type:
              response.data.result[0] && response.data.result[0].content_type
                ? response.data.result[0].content_type
                : '',
            source:
              response.data.result[0] &&
              response.data.result[0].source &&
              response.data.result[0].source.name
                ? response.data.result[0].source.name
                : '',
          });
        }
        setState({ loadingData: false });
      })
      .catch(() => {
        setState({ loadingData: false });
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
                name: 'Listicles',
                url: 'http://www.ottplay.com/listicles',
              },
              {
                '@type': 'SiteNavigationElement',
                position: 3,
                name:
                  staticListiclesProps[0] && staticListiclesProps[0]?.name
                    ? staticListiclesProps[0].name
                    : 'Not available',
                url:
                  'http://www.ottplay.com' +
                  (staticListiclesProps[0] && staticListiclesProps[0]?.seo_url
                    ? '/listicle/' + staticListiclesProps[0].seo_url
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
                  '@id': 'https://www.ottplay.com/listicles',
                  name: 'Listicles',
                },
              },
              {
                '@type': 'ListItem',
                position: 3,
                item: {
                  '@id':
                    'https://www.ottplay.com' +
                    (staticListiclesProps && staticListiclesProps[0]?.seo_url
                      ? '/listicle/' + staticListiclesProps[0].seo_url
                      : ''),
                  name: staticListiclesProps[0]?.name
                    ? staticListiclesProps[0].name
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
            url:
              typeof window !== 'undefined' && window.location.href
                ? window.location.href
                : '/not_available',
            articleBody:
              staticListiclesProps && staticListiclesProps[0]?.description
                ? staticListiclesProps[0].description
                : 'Not available',
            articleSection: 'india',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id':
                typeof window !== 'undefined' && window.location.href
                  ? window.location.href
                  : 'Not available',
            },
            headline:
              staticListiclesProps && staticListiclesProps[0]?.name
                ? staticListiclesProps[0].name
                : 'Not available',
            description: staticListiclesProps[0]?.meta_description
              ? staticListiclesProps[0].meta_description
              : staticListiclesProps[0]?.description
              ? staticListiclesProps[0].description
              : 'Not available',
            datePublished:
              staticListiclesProps &&
              staticListiclesProps[0] &&
              staticListiclesProps[0]?.published_on
                ? staticListiclesProps[0].published_on
                : new Date().toDateString().slice(4),
            dateModified:
              staticListiclesProps &&
              staticListiclesProps[0] &&
              staticListiclesProps[0]?.modified_on
                ? staticListiclesProps[0].modified_on
                : new Date().toDateString().slice(4),
            publisher: {
              '@type': 'Organization',
              name:
                staticListiclesProps && staticListiclesProps[0]?.source?.name
                  ? staticListiclesProps[0].source.name
                  : 'Not available',
              logo: {
                '@type': 'ImageObject',
                url:
                  staticListiclesProps &&
                  staticListiclesProps[0]?.source?.logo_url
                    ? staticListiclesProps[0].source.logo_url
                    : '/not_available',
                width: '125',
                height: '26',
              },
            },
            author: {
              '@type': 'Person',
              name:
                staticListiclesProps && staticListiclesProps[0]?.author
                  ? staticListiclesProps[0].author
                  : 'Not available',
            },
            image: {
              '@type': 'ImageObject',
              url:
                staticListiclesProps && staticListiclesProps[0]?.images[0]?.url
                  ? staticListiclesProps[0].images[0].url
                  : '/not_available',
              width: '759',
              height: '422',
            },
          }),
        }}
      />
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

  const renderCardList = () => {
    return (
      <div
        className={classes.cardListWrap}
        style={{
          gridTemplateColumns:
            staticListiclesProps[0] &&
            staticListiclesProps[0].content &&
            staticListiclesProps[0].content.length < 3
              ? 'repeat(auto-fit, minmax(210px, 260))'
              : '',
        }}
      >
        {staticListiclesProps[0] &&
          staticListiclesProps[0].content &&
          staticListiclesProps[0].content.length > 0 &&
          staticListiclesProps[0].content
            .filter((item) => {
              return item[`${item.content_type}`];
            })
            .map((item, index) => {
              return item.content_type === 'movie' ||
                item.content_type === 'show' ? (
                <MovieShowListicleCard
                  order={index + 1}
                  data={item[`${item.content_type}`]}
                  //description={item.description}
                />
              ) : (
                <CastCrewListicleCard
                  order={index + 1}
                  data={item[`${item.content_type}`]}
                  readMoreHandler={(value, synopsis, synopsisTitle) => {
                    setState({
                      synopsisIsOpen: value,
                      synopsis: synopsis,
                      synopsisTitle: synopsisTitle,
                    });
                  }}
                />
              );
            })}
      </div>
    );
  };
  if (staticListiclesProps)
    return (
      <React.Fragment>
        <SEO
          exposeToGoogle={
            false
            // staticListiclesProps &&
            // staticListiclesProps[0] &&
            // staticListiclesProps[0]?.is_crawlable
          }
          title={
            staticListiclesProps[0]?.meta_title
              ? staticListiclesProps[0].meta_title
              : staticListiclesProps[0]?.name
              ? staticListiclesProps[0].name
              : 'Listicle Details Page'
          }
          ogData={{
            ogTitle: staticListiclesProps[0]?.meta_title
              ? staticListiclesProps[0].meta_title
              : staticListiclesProps[0]?.name
              ? staticListiclesProps[0].name
              : 'Top OTT Article',
            ogDescription: staticListiclesProps[0]?.meta_description
              ? staticListiclesProps[0].meta_description
              : staticListiclesProps[0]?.description
              ? staticListiclesProps[0].description
              : null,

            ogImage: staticListiclesProps[0]?.images[0]?.url
              ? staticListiclesProps[0].images[0].url
              : null,
          }}
          metaData={{
            metaTitle: staticListiclesProps[0]?.meta_title
              ? staticListiclesProps[0].meta_title
              : staticListiclesProps[0]?.name
              ? staticListiclesProps[0].name
              : null,
            metaDescription: staticListiclesProps[0]?.meta_description
              ? staticListiclesProps[0].meta_description
              : staticListiclesProps[0]?.description
              ? staticListiclesProps[0].description
              : null,
            metaKeywords:
              staticListiclesProps[0] &&
              staticListiclesProps[0]?.meta_keywords &&
              staticListiclesProps[0].meta_keywords?.length > 0
                ? staticListiclesProps[0].meta_keywords.join(' ')
                : null,
          }}
          microData={{
            name: staticListiclesProps[0]?.meta_title
              ? staticListiclesProps[0].meta_title
              : staticListiclesProps[0]?.name
              ? staticListiclesProps[0].name
              : null,
            description: staticListiclesProps[0]?.meta_description
              ? staticListiclesProps[0].meta_description
              : staticListiclesProps[0]?.description
              ? staticListiclesProps[0].description
              : null,
            image: staticListiclesProps[0]?.images[0]?.url
              ? staticListiclesProps[0].images[0].url
              : null,
            url:
              'https://www.ottplay.com' +
              (typeof window !== 'undefined' && window.location.pathname),
            editor: 'OTTPlay',
            headline: staticListiclesProps[0]?.meta_title
              ? staticListiclesProps[0].meta_title.slice(0, 108)
              : staticListiclesProps[0] && staticListiclesProps[0]?.name
              ? staticListiclesProps[0].name.slice(0, 108)
              : null,
            inLanguage: 'English',
            sourceOrganization: 'Hindhustan Times',
            keywords:
              staticListiclesProps[0] &&
              staticListiclesProps[0].meta_keywords &&
              staticListiclesProps[0]?.meta_keywords?.length > 0
                ? staticListiclesProps[0].meta_keywords.join(' ')
                : null,
            datePublished: staticListiclesProps[0]?.published_on
              ? staticListiclesProps[0].published_on
              : null,
            dateModified:
              staticListiclesProps[0] && staticListiclesProps[0]?.modified_on
                ? staticListiclesProps[0].modified_on
                : null,
          }}
          schema={[
            siteNavigationSchema(),
            breadcrumbSchema(),
            articleSchema(),
            WebPageSchema(
              staticListiclesProps[0] && staticListiclesProps[0]?.name
                ? staticListiclesProps[0].name
                : 'Listicle',
              staticListiclesProps[0]?.meta_description
                ? staticListiclesProps[0].meta_description
                : staticListiclesProps[0]?.description
                ? staticListiclesProps[0].description
                : 'Description not available'
            ),
          ]}
          extraTags={[
            staticListiclesProps[0]?.source?.name !== 'OTTplay' ? (
              <link
                rel="canonical"
                href={
                  staticListiclesProps[0]?.canonical_url
                    ? staticListiclesProps[0].canonical_url
                    : ''
                }
              />
            ) : (
              ''
            ),
          ]}
        />
        <div className={classes.root}>
          {state.loadingData ? (
            <Spinner styles={{ minHeight: '70vh' }} />
          ) : (
            <Grid container>
              <Grid sm={1} lg={2} item></Grid>
              <Grid xs={12} sm={10} lg={8} item>
                <PagePath
                  path={[
                    { name: 'Home', path: '/home' },
                    { name: 'Listicle', path: null },
                  ]}
                />
                {staticListiclesProps.length > 0 ? (
                  <>
                    <NewsDetailsCard
                      result={staticListiclesProps[0]}
                      // video_url="https://www.youtube.com/watch?v=ni8bN3zlpPA"
                    />
                    <div style={{ display: 'flex' }}>
                      <div className={classes.detailsWrap}>
                        <HtmlBody
                          description={staticListiclesProps[0].description}
                        />
                        {renderCardList()}
                      </div>
                      <Hidden only={['xs']}>
                        {' '}
                        <div style={{ width: '25%' }}>
                          <ImageComponent
                            className={classes.ad}
                            alt="ad"
                            src="/static/newImages/ads.webp"
                            onClick={() => window.open(SLURRP_URL)}
                          />
                        </div>
                      </Hidden>
                    </div>
                  </>
                ) : (
                  renderErrorMessage()
                )}

                <SynopsisModal
                  heading={'Biography'}
                  description={state.synopsis}
                  synopsisTitle={state.synopsisTitle}
                  isOpen={state.synopsisIsOpen}
                  handleClose={(value) => {
                    setState({
                      synopsisIsOpen: value,
                    });
                  }}
                />
              </Grid>
              <Grid sm={1} lg={2} item></Grid>
            </Grid>
          )}
        </div>
        <div></div>
      </React.Fragment>
    );
  else return false;
};

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
    width: '75%',
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
  cardListWrap: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
    gap: '36px',
    padding: '1rem 0 0.5rem 0',
    width: '100%',
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
  if (
    context &&
    context.params &&
    context.params.ottplayvlistslug[3] === 'preview'
  ) {
    typeData = 'preview';
  }
  const pagePath = `${context.params.ottplayvlistslug[1]}/${context.params.ottplayvlistslug[2]}`;
  const params = {
    seoUrl: pagePath,
    [typeData]: typeData ? true : null,
  };

  const res = await webfox.getListicleDetails(params);

  if (await !res.data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      staticListiclesProps: await res.data.result,
    },
    revalidate: 15,
  };
}

export async function getStaticPaths() {
  const params = {
    data: {
      content_type: 'listicle',
      lang: 'english',
      page: 1,
      limit: 16,
      source: 'All',
      responseType: 'full',
    },
  };
  const data = [];
  const getNews = await webfox.getNews(params);
  await getNews.response?.data.news.map((item) => {
    data.push([{ params: { ottplayvlistslug: item.seo_url } }]);
  });
  return {
    paths: data,
    fallback: 'blocking',
  };
}

export default VlpDetails;
