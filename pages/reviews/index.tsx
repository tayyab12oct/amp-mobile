import { Grid, Hidden, Theme, makeStyles } from '@material-ui/core';
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
import { NavBar, PagePath, Spinner, TopHeader } from '../../components';
import React, { useEffect, useState } from 'react';

import ImageComponent from '../../components/Images';
import { ListingHeader } from '../../components/ListingHeader';
import { NewsBunch } from '../../components/news/NewsBunch';
import RefineFilter from '../../components/RefineFilter';
import Router from 'next/router';
import SEO from '../../components/Seo';
import { ViewportContext } from '../../components/ViewportProvider';
import { WebfoxContext } from '../../services/webfox';
import { ads } from '../../public/static/newImages/ads';
import cookie from 'react-cookies';
import { firebaseAnalytics } from '../../components/firebaseConfig';

const pillButtons = [
  {
    id: '1',
    name: 'News',
    value: 'news',
  },
  {
    id: '2',
    name: 'Reviews',
    value: 'review',
  },
  {
    id: '3',
    name: 'OTTplay Lists',
    value: 'listicle',
  },
];
const _ht_clientid = cookie.load('_ht_clientid');
const initState = {
  sourceChange: '',
  result: [],
  button: 'all',
  title: 'All News',
  totalCount: 0,
  activeNewsUrl: '',
  page: 1,
  loadingData: true,
  contentType: 'review',
  refineState: false,
  sort: false,
  fButton: ['review'],
  source: '',
};

// const [refineState, setRefineState] = React.useState(false);
const windowAny: any = typeof window !== 'undefined' && window;
function AllNews({ ...props }) {
  const { webfox, webstore, actionDispatch, actions } = React.useContext(
    WebfoxContext
  );
  // const router = useRouter();
  const classes = useStyles();
  const { width } = React.useContext(ViewportContext);

  // const [sort, setSort] = React.useState('relevance');
  // const [button, setButton] = React.useState(['all']);
  const renderTitle = (button) => {
    // switch (button) {
    //   case 'DM':
    //     return 'Desi Martini';
    //   case 'LM':
    //     return 'Live Mint';
    //   case 'HT':
    //     return 'Hindustan Times';
    //   case 'FC':
    //     return 'Film Companion';
    //   default:
    //     return 'All News';
    // }
    switch (button) {
      case 'news':
        return 'All News';
      case 'review':
        return 'Reviews';
      case 'interview':
        return 'Interviews';
      case 'listicle':
        return 'OTTplay Lists';
      default:
        return 'All News';
    }
  };
  const [state, setState] = React.useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      ...JSON.parse(JSON.stringify(initState)),
      // button: urlQuery && urlQuery.get('type') ? urlQuery.get('type') : 'all',
      button:
        props.location && props.location.state && props.location.state.filter
          ? props.location.state.filter
          : 'all',
      // ['reviews'],
      contentType:
        // props.location &&
        // props.location.state &&
        // props.location.state.contentType
        //   ? props.location?.state.contentType
        //   : props.location?.search
        //   ? props.location?.pathname + props.location?.search
        //   :
        'review',
      refineState: false,
      fButton: [
        props.location &&
        props.location.state &&
        props.location.state.contentType
          ? props.location.state.contentType
          : 'review',
      ],
      source:
        props.location && props.location.state && props.location.state.source
          ? props.location.state.source
          : null,
      sourceChange: '',
      title: renderTitle(
        props.location &&
          props.location.state &&
          props.location.state.contentType
          ? props.location.state.contentType
          : 'review'
      ),
    }
  );
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  React.useEffect(() => {
    if (webstore.refine.news?.refineNews === true) {
      // if (
      //   webstore &&
      //   webstore.refine &&
      //   webstore.refine.news &&
      //   webstore.refine.news.filter &&
      //   webstore.refine.news.filter.selectedSource
      // ) {
      setState({
        sourceChange: false,
      });
      const selectedSource = webstore.refine.news.filter.selectedSource
        .replace(/\s/g, '')
        .toLowerCase();
      let ssource: any = '';
      if (selectedSource === 'Desi Martini'.replace(/\s/g, '').toLowerCase()) {
        ssource = 'DM';
      } else if (
        selectedSource === 'Live Mint'.replace(/\s/g, '').toLowerCase()
      ) {
        ssource = 'LM';
      } else if (
        selectedSource === 'Hindustan Times'.replace(/\s/g, '').toLowerCase()
      ) {
        ssource = 'HT';
      } else if (
        selectedSource === 'Film Companion'.replace(/\s/g, '').toLowerCase()
      ) {
        ssource = 'FC';
      } else if (
        selectedSource === 'OTTplay'.replace(/\s/g, '').toLowerCase()
      ) {
        ssource = 'OTT';
      } else if (webstore.refine.news.filter.selectedSource === 'All') {
        ssource = null;
      }
      firebaseAnalytics.logEvent('filter_click_content_seeall', {
        eventCategory: 'filter_click_content_seeall',
        eventAction: ssource,
        userType: getUserType(_ht_clientid ? true : false),
        user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
        preferredLanguages: getPreferredLanguages(languagesArr),
        preferredProviders: getPreferredProviders(providersArr),
      });
      windowAny.Moengage?.track_event('filter_click_content_seeall', {
        eventCategory: 'filter_click_content_seeall',
        eventAction: ssource,
        userType: getUserType(_ht_clientid ? true : false),
        user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
        preferredLanguages: getPreferredLanguages(languagesArr),
        preferredProviders: getPreferredProviders(providersArr),
      });
      setState({
        result: [],
        page: 1,

        source: ssource,
        loadingData: true,
        sourceChange: true,
      });
    }
  }, [webstore.refine.news?.filter.selectedSource]);

  let languagesArr: any = [];
  let providersArr: any = [];
  React.useEffect(() => {
    languagesArr = getLocalStorageData(
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES)
      ) || [],
      webstore.languages.name || []
    );
    providersArr = getLocalStorageData(
      JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_IDS)
      ) || [],
      webstore.streamingServices.selectedStreamingServices || []
    );
  }, []);
  React.useEffect(() => {
    getNews();
  }, [state.source]);

  const params = {
    data: {
      content_type: state.contentType,
      lang: getPreferredLanguages(languagesArr),
      page: state.page,
      limit: state.contentType === 'review' ? 15 : 16,
      source: state.source,
      responseType: 'full',
    },
  };
  // React.useEffect(() => {
  //   if (
  //     props.location && props.location.state && props.location.state.source
  //       ? props.location.state.source
  //       : null !== null
  //   ) {
  //     console.log('props.location.state.source: ', props.location.state.source);
  //     sourceSelected({
  //       source: {
  //         name: props.location.state.source,
  //       },
  //     });
  //   }
  // }, []);
  const sourceSelected = (item) => {
    actionDispatch(actions.SET_REFINE_SOURCE, {
      name: item.source.name,
    });
    apiPostData();
  };

  const apiPostData = () => {
    actionDispatch(actions.REFINE_NEWS_PAGE, {
      page: 'news',
    });
    setState({ refineState: true });
    // props.setRefineState(true);
  };

  const handleFilters = (button) => {
    // setInitialsLoading(true);
    if (button[0] === 'reviews') {
      setState({
        result: [],
        page: 1,
        button: button,
        // title: renderTitle(button),
      });
    } else if (button[0] === 'news') {
      setState({
        result: [],
        page: 1,
        button: button,
        // title: renderTitle(button),
      });
    } else if (button[0] === 'interviews') {
      setState({
        result: [],
        page: 1,
        button: button,
        // title: renderTitle(button),
      });
    }
  };
  const getNews = () => {
    const paramsLsticle = {
      // lang: getPreferredLanguages(languagesArr),
      page: params.data.page,
      limit: 16,
      source:
        webstore.refine.news?.filter.selectedSource
          .replace(/\s/g, '')
          .toLowerCase() === 'Ottplay'.replace(/\s/g, '').toLowerCase() &&
        state.fButton[0] === 'listicle'
          ? 'OTTplay'
          : state.source,
    };
    if (state.contentType === 'listicle') {
      webfox
        .getListicleList(paramsLsticle)
        .then((response) => {
          setState({
            result:
              response.data &&
              response.data.result &&
              response.data.result.length > 0
                ? [...state.result, response.data.result]
                : [...state.result],
            totalCount:
              params.data.page === 1
                ? response.data.totalDocuments
                : state.totalCount,
            page: params.data.page + 1,
            loadingData: false,
          });
        })
        .catch(() => {
          setState({ loadingData: false });
        });
    } else {
      webfox
        .getNews(params.data)
        .then((response) => {
          setState({
            result:
              response.data &&
              response.data.news &&
              response.data.news.length > 0
                ? [...state.result, response.data.news]
                : [...state.result],
            totalCount:
              params.data.page === 1
                ? response.data.totalDocuments
                : state.totalCount,
            page: params.data.page + 1,
            loadingData: false,
          });
        })
        .catch(() => {
          setState({ loadingData: false });
        });
    }
  };

  React.useEffect(() => {
    setState({ loadingData: true });
    firebaseAnalytics.logEvent('newslisting', {
      screen_view:
        '/newslisting' +
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
    windowAny.Moengage?.track_event('newslisting', {
      screen_view: '/newslisting',
      userType: getUserType(_ht_clientid ? true : false),
      preferredLanguages: getPreferredLanguages(languagesArr),
      preferredProviders: getPreferredProviders(providersArr),
      user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
    });

    getNews();
  }, [state.button[0]]);

  React.useEffect(() => {
    //load more news
    state.loadingData && state.page > 1 && getNews();
  }, [state.loadingData]);
  // React.useEffect(() => {
  //   //load more news
  //   state.loadingData &&
  //     state.page === 1 &&
  //     state.result.length == 0 &&
  //     getNews();
  // }, [state.loadingData]);
  React.useEffect(() => {
    getNews();
  }, [state.contentType]);

  React.useEffect(() => {
    Router.push({ pathname: setNewsNavPath() }, null, { shallow: true });
  }, [state.fButton]);

  const renderAd = () => {
    return (
      <div className={classes.adsWarp}>
        <ImageComponent src={ads.balaHorizontal} alt="ad" />
      </div>
    );
  };

  const handleData = (button) => {
    if (state.fButton !== button) {
      firebaseAnalytics.logEvent('refine_click_content_seeall', {
        eventCategory: 'refine_click_content_seeall',
        eventAction: button[0],
        userType: getUserType(_ht_clientid ? true : false),
        user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
        preferredLanguages: getPreferredLanguages(languagesArr),
        preferredProviders: getPreferredProviders(providersArr),
      });
      windowAny.Moengage?.track_event('refine_click_content_seeall', {
        eventCategory: 'refine_click_content_seeall',
        eventAction: button[0],
        userType: getUserType(_ht_clientid ? true : false),
        user_unique_id: _ht_clientid ? _ht_clientid : device_UUID,
        preferredLanguages: getPreferredLanguages(languagesArr),
        preferredProviders: getPreferredProviders(providersArr),
      });

      setState({
        result: [],
        page: 1,
        contentType: button[0],
        loadingData: true,
        title: renderTitle(button[0]),
      });
      params.data.content_type = button[0];
      params.data.page = 1;
      // getNews();
    }
  };

  const getSelectedSource = (sources) => {
    // console.log('getSelectedSource:', sources);
  };

  const handleScroll = () => {
    const wrappedElement = document.getElementById('top-header');
    if (wrappedElement) {
      if (
        Math.round(wrappedElement.getBoundingClientRect().bottom) <=
          windowAny.innerHeight + 600 &&
        !state.loadingData &&
        resultLength() < state.totalCount
      ) {
        setState({ loadingData: true });
      }
    }
  };

  React.useEffect(() => {
    const unlisten = () => {
      window.removeEventListener('scroll', handleScroll, false);
    };
    window.addEventListener('scroll', handleScroll, false);
    return () => {
      unlisten();
    };
  }, [state.result]);

  const renderLogo = () => {
    switch (state.button) {
      case 'DM':
        return 'https://images.ottplay.com/images/news/desi_martini.png';
      case 'LM':
        return 'https://images.ottplay.com/images/news/live_mint.png';
      case 'HT':
        return 'https://images.ottplay.com/images/news/hindustan_times.png';
      case 'FC':
        return 'https://images.ottplay.com/images/news/film_companion.png';
      default:
        return ' ';
    }
  };

  const renderPageTitle = () => {
    return (
      <div className={classes.titleWrap}>
        {<div className={classes.title}>{state.title}</div>}

        {/* //---TODO---for filter
{!loadingData && button !== 'all' && (
<div className={classes.publisherLogoHome}>
<ImageComponent src={renderLogo()} alt="publiser_logo" />
</div>
)} */}
      </div>
    );
  };

  const renderErrorMessage = () => {
    return (
      <div className={classes.errorBlock}>
        <div className={classes.secondLetter}>
          No results to show for the filter applied
        </div>
      </div>
    );
  };
  const setNewsNavPath = () => {
    switch (state.fButton[0]) {
      case 'interview':
        return '/interviews';
      case 'listicle':
        return '/listicles';
      case 'all-news':
        return '/all-news';
      case 'news':
        return '/all-news';
    }
  };

  const resultLength = () => {
    let resultLength = 0;
    for (let index = 0; index < state.result.length; index++) {
      resultLength = resultLength + state.result[index].length;
    }
    return resultLength;
  };
  let siteNavigationJSON = {};
  let breadcrumbSchemaJSON = {};
  React.useEffect(() => {
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
          name: 'News',
          url: 'http://www.ottplay.com/' + window.location.pathname,
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
            '@id': 'http://www.ottplay.com/' + window.location.pathname,
            name: 'News',
          },
        },
      ],
    };
  }, []);
  return (
    <div className={classes.root} id={'all-review-list'}>
      <div>
        <SEO>
          <meta property="og:title" content={'Top OTT Reviews'} />
          <meta property="og:site_name" content="OTTPlay" />
          <meta property="og:url" content="https://www.ottplay.com/" />
          <meta
            property="og:description"
            content="Check out news and reviews of the latest shows and movies dropping in across 30+ OTTs in India"
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content="https://images.ottplay.com/images/news-cover-image-344.jpg"
          />
          <title>Reviews page</title>
          <meta name="description" content="" />
          <script type="application/ld+json">
            {JSON.stringify(siteNavigationJSON)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(breadcrumbSchemaJSON)}
          </script>
          <meta name="robots" content="noindex,nofollow" />
          <meta name="googlebot" content="noindex,nofollow" />
        </SEO>
      </div>

      <Grid container spacing={2} className={classes.newsOuterBox}>
        <Grid sm={1} lg={2} className={classes.newsExtras} item></Grid>
        <Grid xs={12} sm={10} lg={8} item>
          <div>
            <PagePath
              path={[
                { name: 'Home', path: '/home' },
                { name: 'News', path: '/news' },
              ]}
            />
            {renderPageTitle()}
            {/* <GenreButtons
              button={state.button}
              setButton={(button) => {
                setState({ button: button });
              }}
              onSelect={handleData}
              from="news"
            /> */}
            <ListingHeader
              //count={totalData}
              // icon={}
              //headerText={'Titles recommended just for you'}
              from={'news'}
              pillButtons={pillButtons}
              sort={false}
              // setSort={(sort) => setState({ sort: sort })}
              results={state.result}
              handleRefine={() => {}}
              // onSort={() => console.log()}
              button={state.fButton}
              setButton={(btn) => {
                setState({ fButton: btn });
              }}
              onSelect={handleData}
              enableRefine={true}
              setRefineState={(r) => setState({ refineState: r })}
            />
          </div>
          <Grid xs={12} container>
            <Hidden only={['xs']}>
              <Grid
                sm={3}
                item
                // className={loadingData ? classes.filterBlur : ''}
              >
                <RefineFilter
                  forPage="news"
                  setRefineState={(r) => setState({ refineState: r })}
                />
              </Grid>
            </Hidden>
            <Grid
              xs={12}
              sm={9}
              item
              style={{ padding: width >= 600 ? '1rem 0 0 1rem' : '0px' }}
            >
              {resultLength() > 0 ? (
                <Grid container>
                  {/* <Grid sm={1} lg={3} item>
              <LeftPanel getSelectedSource={getSelectedSource} />
            </Grid>
            sm={11} lg={9} */}
                  <Grid xs={12} item>
                    <div className={classes.mainContainer}>
                      {/* <div className={classes.categoryWrap}> -----TODO----- </div> */}
                      <div className={classes.newsWarp}>
                        {state.result.map((item, index) => {
                          return (
                            <div className={classes.newsBunchWrap}>
                              <NewsBunch
                                result={item}
                                type={'listing'}
                                filter={state.button}
                                setFilter={handleData}
                                setActiveNewsUrl={(url) => {
                                  setState({
                                    activeNewsUrl: url,
                                  });
                                }}
                                activeNewsUrl={state.activeNewsUrl}
                                contentType={
                                  state.contentType === 'all-news'
                                    ? 'news'
                                    : state.contentType
                                }
                                sourceSelected={sourceSelected}
                              />
                              ;
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </Grid>
                </Grid>
              ) : (
                !state.loadingData && renderErrorMessage()
              )}
              {state.loadingData && (
                <Spinner
                  styles={{
                    height: params.data.page === 1 ? '60vh' : '40px',
                  }}
                />
              )}
            </Grid>
          </Grid>
          {}
        </Grid>
        <Grid sm={1} lg={2} className={classes.newsExtras} item></Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    // height: '100vh',
    // overflowY: 'auto',
    overflowX: 'hidden',
  },
  newsOuterBox: {
    margin: 0,
  },
  mainContainer: {
    width: '100%',
    display: 'inline-flex',
  },
  titleWrap: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#ffffff',
    minWidth: '400px',
    display: 'flex',
    fontSize: 'clamp(18px, 1.8vw, 30px)',
    alignItems: 'center',
    fontWeight: 'bold',
    padding: '5px 5% 12px 0',
    textTransform: 'capitalize',
  },
  publisherLogoHome: {
    '& img': {
      height: '40px',
      [theme.breakpoints.down('lg')]: {
        height: '35px',
      },
    },
  },
  newsWarp: {
    width: '100%',
  },
  newsBunchWrap: {
    paddingBottom: '20px',
  },
  adsWarp: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    '& img': {
      width: '66%',
    },
  },
  secondLetter: {
    fontSize: 'clamp(14px, 1.6vw, 22px)',
    color: '#FFFFFF',
    fontWeight: 500,
    textAlign: 'center',
    padding: '0px 20px',
  },
  errorBlock: {
    flexDirection: 'column',
    minHeight: '60vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  [theme.breakpoints.down('xs')]: {
    title: {
      padding: '0px 16px 15px 16px',
      width: '100%',
      minWidth: '100%',
    },
    newsBunchWrap: {
      paddingBottom: '20px',
      padding: '0px 16px',
    },
    newsExtras: {
      padding: '0px !important',
    },
  },
}));

export default AllNews;
