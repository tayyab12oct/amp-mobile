import { Grid, Theme, makeStyles } from '@material-ui/core';
import {
  HOME_SCREEN_SECTIONS,
  LOCALSTORAGE_KEY_CONSTANTS,
  contextParamsForREAnalytics,
  device_UUID,
  getLocalStorageData,
  getPreferredLanguages,
  getPreferredProviders,
  getUserType,
} from '../../utils/constants';
import { PagePath, Spinner } from '..';
import React, { useContext, useEffect } from 'react';
import { getWebpUrl, removeHTMLTags } from '../../utils/helper';

import CastCrewDescription from './CastCrewDescription';
import Helmet from 'react-helmet';
import { PhotoThumbnail } from '../MovieShowDetails/MovieShowDetailsComponent';
import SEO from '../Seo';
import { SimilarMovie } from '../SimilarMovie';
import { ViewportContext } from '../ViewportProvider';
import { WebfoxContext } from '../../services/webfox';
import cookie from 'react-cookies';
import { firebaseAnalytics } from '../firebaseConfig';

const windowAny: any = typeof window !=="undefined" && window;
const _ht_clientid = cookie.load('_ht_clientid');
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    minHeight: '50vh',
  },
  pagePathBox: {
    paddingLeft: 16,
    paddingBottom: 5,
  },
  path: {
    color: '#ffffff',
    opacity: 0.6,
    fontSize: 'clamp(10px, 0.9vw, 14px)',
    margin: '8px 0px 8px 16px',
    textTransform: 'capitalize',
    '& span': {
      fontSize: 10,
      letterSpacing: -1,
      margin: '0px 4px',
    },
  },
  advert: {
    margin: '10px 0px',
    width: '100%',
  },
  text: {
    margin: '40x 0 25px 0',
    fontSize: '24px',
    color: '#ffffff',
  },
  movieListBox: {
    padding: '0px 16px',
  },
  [theme.breakpoints.down('xs')]: {
    path: {
      fontSize: 10,
      textTransform: 'uppercase',
      marginLeft: 16,
      marginTop: 16,
      '& span': {
        fontSize: 8,
      },
    },
    pagePathBox: {
      paddingLeft: 0,
      paddingBottom: 0,
    },
    movieListBox: {
      padding: '0px 15px',
      marginTop: 20,
    },
  },
}));

export default function CastCrewDetails({ location }) {
  const classes = useStyles();

  const [results, setResults] = React.useState<any[]>([]);
  const [loadingData, setLoadingData] = React.useState(true);
  const { width } = React.useContext(ViewportContext);
  const seoId = window.location.pathname;
  const seoKey = seoId.slice(1);
  const {
    webfox,
    webstore,
    actions,
    actionDispatch,
    loading,
    setLoading,
  } = useContext(WebfoxContext);
  const { languages, streamingServices } = webstore;
  
  let languagesArr: any = [];
  let providersArr: any = [];

  useEffect(()=>{
    languagesArr = getLocalStorageData(
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES)
      ) || [],
      languages.name || []
    );
    providersArr = getLocalStorageData(
      JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_IDS)) ||
        [],
      streamingServices.selectedStreamingServices || []
    );
  },[])

  useEffect(() => {
    if (results.length > 0) {
      if (location && location.state && location.state.type === 'cast') {
        firebaseAnalytics.logEvent('actordetails', {
          screen_view:
            '/actordetails' +
            (results && results[0] && results[0].name
              ? '/' + results[0].name
              : '') +
            (results && results[0] && results[0].gender
              ? '/' + results[0].gender
              : '') +
            (results && results[0] && results[0]._id
              ? '/' + results[0]._id
              : '') +
            (location && location.state && location.state.sourcePage
              ? '/' + location.state.sourcePage
              : '') +
            '/' +
            getUserType(_ht_clientid ? true : false) +
            '/' +
            getPreferredLanguages(languagesArr) +
            '/' +
            getPreferredProviders(providersArr) +
            '/' +
            _ht_clientid
              ? _ht_clientid
              : device_UUID,
        });
        windowAny.Moengage.track_event('actordetails', {
          screen_view: '/actordetails',
          name: results && results[0].name ? results[0].name : '',
          gender: results && results[0].gender ? results[0].gender : '',
          id: results && results[0]._id ? results[0]._id : '',
          userType: getUserType(_ht_clientid ? true : false),
          preferredLanguages: getPreferredLanguages(languagesArr),
          preferredProviders: getPreferredProviders(providersArr),
          user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
        });
      } else {
        firebaseAnalytics.logEvent('crewdetails', {
          screen_view:
            '/crewdetails/' +
            (results && results[0] && results[0].name
              ? '/' + results[0].name
              : '') +
            '/' +
            (results && results[0] && results[0].gender
              ? '/' + results[0].gender
              : '') +
            (results && results[0] && results[0]._id
              ? '/' + results[0]._id
              : '') +
            (location && location.state && location.state.sourcePage
              ? '/' + location.state.sourcePage
              : '') +
            '/' +
            getUserType(_ht_clientid ? true : false) +
            '/' +
            getPreferredLanguages(languagesArr) +
            '/' +
            getPreferredProviders(providersArr) +
            '/' +
            _ht_clientid
              ? _ht_clientid
              : device_UUID,
        });
        windowAny.Moengage.track_event('crewdetails', {
          screen_view: '/crewdetails/',
          name: results && results[0].name ? results[0].name : '',
          gender: results && results[0].gender ? results[0].gender : '',
          id: results && results[0]._id ? results[0]._id : '',
          userType: getUserType(_ht_clientid ? true : false),
          preferredLanguages: getPreferredLanguages(languagesArr),
          preferredProviders: getPreferredProviders(providersArr),
          user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
        });
      }
    }
  }, [results]);
  useEffect(() => {
    window.scrollTo(0, 0);

    const query = {
      seoUrl: seoKey,
    };

    {
      webfox.getCrewDetail(query).then(({ data, error }) => {
        if (error) {
          actionDispatch(actions.FETCH_CREW_DETAIL_FAILURE, []);
        }
        actionDispatch(actions.FETCH_CREW_DETAIL_SUCCESS, data || []);
        if (data && data.results) {
          const crew = Object.keys(data).map((key) => {
            return data[key];
          });
          const res = data.results.filter((item) => {
            return seoKey === item.seo_url;
          });
          setResults(res);
          setLoadingData(false);
        }
      });
    }

    setLoading(false);
  }, []);

  // const cctype = results[0].content_type;
  // console.log('cctype', cctype);

  const moviesAndShows: any = [];
  results[0] && results[0].movies.map((c) => moviesAndShows.push(c));
  results[0] && results[0].shows.map((c) => moviesAndShows.push(c));
  const resultData = moviesAndShows.map((v) => {
    if (v.movie) {
      return Object.assign(v, {
        img_url: v.movie.posters && v.movie.posters[0],
        id: v.movie._id,
        name: v.movie.name,
        content_type: v.movie.content_type,
        where_to_watch: v.movie.where_to_watch,
      });
    } else if (v.show) {
      return Object.assign(v, {
        img_url: v.show.posters && v.show.posters[0],
        id: v.show._id,
        name: v.show.name,
        content_type: v.show.content_type,
        where_to_watch: v.show.where_to_watch,
      });
    }
  });
  const birth = new Date(results[0] && results[0].born_on)
    .toDateString()
    .slice(4);
  const month =
    results[0] &&
    results[0].born_on &&
    results[0].born_on.toLocaleString('default', { month: 'long' });

  const name = results[0] && results[0].name;

  const contentType = results[0] && results[0].content_type;

  let siteNavigationJSON = {};
  let breadcrumbSchemaJSON = {};

  useEffect(()=>{
    siteNavigationJSON = {
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
          name:
            location && location.state && location.state.type
              ? location.state.type === 'cast'
                ? 'Cast'
                : 'Crew'
              : '',
          url:
            'http://www.ottplay.com/' + location &&
            location.state &&
            location.state.type
              ? location.state.type
              : '',
        },
        {
          '@type': 'SiteNavigationElement',
          position: 3,
          name: results[0] && results[0].name ? results[0].name : '',
          url:
            'http://www.ottplay.com/ ' + location &&
            location.state &&
            location.state.type
              ? location.state.type
              : '' +
                '/' +
                (results[0] && results[0].seo_url ? results[0].seo_url : ''),
        },
      ],
    };
    breadcrumbSchemaJSON = {
      '@context': 'http://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: { '@id': 'http://www.ottplay.com/home', name: 'Home' },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@id':
              'http://www.ottplay.com/' + location &&
              location.state &&
              location.state.type
                ? location.state.type
                : '',
            name:
              location && location.state && location.state.type
                ? location.state.type === 'cast'
                  ? 'Cast'
                  : 'Crew'
                : '',
          },
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: {
            '@id':
              'http://www.ottplay.com/' +
              (location && location.state && location.state.type
                ? location.state.type
                : '') +
              '/' +
              window.location.pathname,
            name: results[0] && results[0].name ? results[0].name : null,
          },
        },
      ],
    };
  },[])
  return (
    <div className={classes.root}>
      <Grid xs={12} container item>
        <Grid sm={1} lg={2} item></Grid>
        <Grid xs={12} sm={10} lg={8} className={classes.pagePathBox} item>
          {/* <p className={classes.path}>
            {`Discover » ${contentType || 'Cast/Crew'} » ${
              name || 'Actor detail'
            }`}
          </p> */}
          {/* <PagePath path={['Home', `${name || 'Actor detail'}`]} /> */}
          <PagePath
            path={[
              { name: 'Home', path: '/home' },
              {
                name: `${name || 'Actor detail'}`,
                path: null,
              },
            ]}
          />
          {/* <p className={classes.path}>
            <a
              className="bread-crumb-link"
              onClick={() => history.push('/home')}
            >
              {'Home'}
            </a>{' '}
            <span>{'>>'}</span>
            {`${name || 'Actor detail'}`}
          </p> */}
        </Grid>
        <Grid sm={2} item></Grid>
      </Grid>

      {loadingData ? (
        <Spinner styles={{ height: '70vh' }} />
      ) : (
        <>
          {results.length > 0 &&
            results &&
            results.map((detail) => {
              return (
                <>
                  {detail.name ? (
                    <>
                      <SEO>
                        <meta
                          name="title"
                          content={
                            detail.seo && detail.seo.meta_title
                              ? detail.seo.meta_title
                              : ''
                          }
                        />
                        <meta
                          name="description"
                          content={
                            detail.seo && detail.seo.meta_description
                              ? detail.seo.meta_description
                              : ''
                          }
                        />
                        <meta
                          name="keywords"
                          content={
                            detail.seo &&
                            detail.seo.meta_keywords &&
                            detail.seo.meta_keywords?.length > 0
                              ? detail.seo.meta_keywords.join()
                              : ''
                          }
                        />
                        <meta
                          itemProp="name"
                          content={detail && detail.name ? detail.name : ''}
                          data-react-helmet="true"
                        />
                        <meta
                          itemProp="name"
                          content="Home"
                          data-react-helmet="true"
                        />
                        <meta
                          itemProp="description"
                          content={
                            detail.seo && detail.seo.meta_description
                              ? detail.seo.meta_description
                              : ''
                          }
                          data-react-helmet="true"
                        />
                        <meta
                          itemProp="image"
                          content={
                            detail.headshot && detail.headshot
                              ? detail.headshot
                              : 'www.ottplay.com'
                          }
                          data-react-helmet="true"
                        />
                        <meta
                          itemProp="url"
                          content={
                            'https://www.ottplay.com/' +
                            window.location.pathname
                          }
                          data-react-helmet="true"
                        />
                        <meta
                          itemProp="editor"
                          content="OTTPlay"
                          data-react-helmet="true"
                        />
                        <meta
                          itemProp="headline"
                          content={detail && detail.name ? detail.name : ''}
                          data-react-helmet="true"
                        />
                        <meta
                          itemProp="inLanguage"
                          content="English"
                          data-react-helmet="true"
                        />
                        <meta
                          itemProp="sourceOrganization"
                          content="Hindhustan Times"
                          data-react-helmet="true"
                        />
                        <meta
                          itemProp="keywords"
                          content={
                            detail.seo &&
                            detail.seo.meta_keywords &&
                            detail.seo.meta_keywords?.length > 0
                              ? detail.seo.meta_keywords
                              : ''
                          }
                          data-react-helmet="true"
                        />
                        <meta
                          itemProp="datePublished"
                          content={
                            detail && detail.onboarding_updated_on
                              ? new Date(detail.onboarding_updated_on)
                                  .toDateString()
                                  .slice(4)
                              : new Date().toDateString().slice(4)
                          }
                          data-react-helmet="true"
                        />
                        <meta
                          itemProp="dateModified"
                          content={
                            detail && detail.onboarding_updated_on
                              ? new Date(detail.onboarding_updated_on)
                                  .toDateString()
                                  .slice(4)
                              : new Date().toDateString().slice(4)
                          }
                        />
                        <script type="application/ld+json">
                          {JSON.stringify(siteNavigationJSON)}
                        </script>
                        <script type="application/ld+json">
                          {JSON.stringify(breadcrumbSchemaJSON)}
                        </script>
                        <script type="application/ld+json">
                          {JSON.stringify({
                            '@context': 'http://schema.org',
                            '@type': 'Person',
                            url: detail && detail.seo_url,
                            description:
                              detail.seo && detail.seo.meta_description
                                ? detail.seo.meta_description
                                : null,
                            name: detail && detail.name ? detail.name : null,
                            image:
                              detail.headshot && detail.headshot
                                ? detail.headshot
                                : 'www.ottplay.com',
                            jobTitle: detail && detail.profession,
                            birthDate: detail.born_on ? birth : null,
                          })}
                        </script>
                        <title>Cast/Crew page</title>
                        <meta name="description" content="" />
                      </SEO>

                      <CastCrewDescription
                        name={detail.name}
                        id={detail._id}
                        type={
                          detail.profession && detail.profession.join(' . ')
                        }
                        born={detail.born_on ? birth : null}
                        place={
                          detail.birth_place != '-' &&
                          detail.birth_place != null
                            ? detail.birth_place
                            : detail.nationality
                        }
                        content_type={detail.content_type}
                        description={
                          detail.full_bio && encodeURIComponent(detail.full_bio)
                          // .replace(/(<([^>]+)>)/gi, '')
                          // .replace(/&nbsp;/gi, '')
                          // .replace(/[!&#$%*@;+-=_][0-9][;&#]/gi, '')
                          // .replace(/&#/g, '')
                        }
                        img_url={
                          detail.headshot
                            ? getWebpUrl(detail.headshot)
                            : detail.headshot
                        }
                        synopTitle={detail.name}
                        synopDescription={
                          detail.full_bio && encodeURIComponent(detail.full_bio)
                          // .replace(/(<([^>]+)>)/gi, '')
                          // .replace(/&nbsp;/gi, '')
                          // .replace(/[!&#$%*@;+-=_][0-9][;&#]/gi, '')
                          // .replace(/&#/g, '')
                        }
                      />
                    </>
                  ) : null}

                  <Grid xs={12} container item>
                    <Grid sm={1} lg={2} item></Grid>
                    <Grid
                      xs={12}
                      sm={10}
                      lg={8}
                      item
                      className={classes.movieListBox}
                    >
                      {detail.popular_for && detail.popular_for.length > 0 ? (
                        <SimilarMovie
                          data={detail.name + ' Popular For'}
                          results={detail.popular_for.slice(0, 10)}
                          sourcePage={'CastCrewDetails'}
                        />
                      ) : null}
                      {moviesAndShows && moviesAndShows.length > 0 ? (
                        <SimilarMovie
                          data={'Movies & TV Shows of ' + detail.name}
                          results={moviesAndShows}
                          tag={'similar'}
                          screen={'home'}
                          sourcePage={'CastCrewDetails'}
                          type={'similar'}
                        />
                      ) : null}
                      {/* ad codes
                      <Grid
                        container
                        spacing={2}
                        direction="row"
                        //justify="center"
                        alignItems="center"
                      >
                        <Grid item sm={2} lg={2}></Grid>
                        <Grid
                          item
                          xs={12}
                          sm={10}
                          md={8}
                          container
                          className={classes.advert}
                        >
                          {width > 600 ? (
                            <ImageComponent src={ads} alt="ad" width="100%" />
                          ) : (
                            <ImageComponent src={mobileAds} alt="ad" width="100%" />
                          )}
                        </Grid>
                        <Grid item sm={2} lg={2}></Grid>
                      </Grid> */}
                      {/* {detail.awards && detail.awards.length > 0 ? (
                        <SimilarMovie
                          data={'Awards'}
                          awards={true}
                          results={detail.awards.slice(0, 6)}
                        />
                      ) : null} */}
                      {/* {detail.photos && detail.photos.length > 0 ? (
                        <PhotoThumbnail photos={detail.photos} />
                      ) : null} */}
                    </Grid>
                    <Grid sm={1} lg={2} item></Grid>
                  </Grid>
                </>
              );
            })}
        </>
      )}
    </div>
  );
}
