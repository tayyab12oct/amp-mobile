import {
  HOME_SCREEN_SECTIONS,
  HOME_SCREEN_TEMPLETE,
  LOCALSTORAGE_KEY_CONSTANTS,
  getLocalStorageData,
} from '../utils/constants';
import React, { useState } from 'react';

import DeviceType from '../components/Device';
import { Grid } from '@material-ui/core';
// import Onboard from '../components/onboard';
import SEO from '../components/Seo';
import { Spinner } from '../components';
import { Theme } from '@material-ui/core/styles';
import { WebfoxContext } from '../services/webfox';
import dynamic from 'next/dynamic';
// import DynamicWidgetDriver from '../../components/Drivers/DynamicWidget/MainDriver';
// import { OnBoardBanner } from '../components/OnBoardBanner';
import { firebaseAnalytics } from '../components/firebaseConfig';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import webfox from '../services/webbase';

const DynamicWidgetDriver = dynamic(() =>
  import('../components/Drivers/DynamicWidget/MainDriver')
);

const OnBoardBanner = dynamic(() => import('../components/OnBoardBanner'));

const Onboard = dynamic(() => import('../components/onboard'));

// const firebaseAnalytics = dynamic(() =>
//   import('../components/firebaseConfig').then(
//     (mod) => mod.firebaseAnalytics
//   )
// );

const windowAny: any = typeof window !== 'undefined' && window;
export default function DynamicHomeScreen ({
  serverSideHomeWidgetData,
  staticHomeWidgetList,
}) {
  const classes = useStyles();
  typeof window !== 'undefined' && localStorage.setItem('fromForYou', 'false');

  const { webfox, webstore } = React.useContext(WebfoxContext);
  const { home, languages, likedMovieCard, streamingServices } = webstore;
  const [loadingData, setLoading] = useState(false);
  const [slide, setSlide] = useState({ min: 0, max: 5 });
  const router = useRouter();
  const isMobile = DeviceType().isMobile;
  const languagesArr: any = getLocalStorageData(
    JSON.parse(
      typeof window !== 'undefined' &&
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES)
    ) || [
      'English',
      'Hindi',
      'Tamil',
      'Telugu',
      'Kannada',
      'Bengali',
      'Marathi',
      'Gujarati',
      'Punjabi',
      'Malayalam',
    ],
    languages.name || []
  );
  if (typeof window !== 'undefined') {
    document.cookie = `userAgent=${navigator.userAgent}`;
    document.cookie = `languagesArr=${languagesArr}`;
  }

  const siteNavigationJSON = {
    '@context': 'http://schema.org',
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'SiteNavigationElement',
        position: 1,
        name: 'Home',
        url: 'http://www.ottplay.com/home',
      },
    ],
  };
  const breadcrumbSchemaJSON = {
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@id':
            'http://www.ottplay.com/' +
            (typeof window !== 'undefined' && window.location?.pathname),
          name: 'Home',
        },
      },
    ],
  };

  const onboarding = () => {
    const onboardingDone =
      typeof window !== 'undefined' &&
      localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.ONBOARDING_DONE);
    return onboardingDone ||
      (typeof window !== 'undefined' &&
        sessionStorage.getItem('non-onboard') === 'true')
      ? ''
      : ((typeof window !== 'undefined' && window.location?.pathname === '/') ||
          (typeof window !== 'undefined' &&
            window.location?.pathname === '/home')) && (
          <Grid xs={12} item style={{ flexGrow: 1 }}>
            <Onboard />
          </Grid>
        );
  };

  const onBoardingBanner = () => {
    const [sessionBanner, setSessionBanner] = useState(false);

    const handleClose = () => {
      typeof window !== 'undefined' &&
        sessionStorage.setItem('non-onboard', 'true');
      //router.push('/');
      setSessionBanner(true);
    };

    const proceedFromWelcome = () => {
      firebaseAnalytics.logEvent('welcome', {
        eventCategory: 'onboarding_welcome',
        eventAction: 'proceed',
        eventValue: 5,
      });
      windowAny.Moengage &&
        windowAny.Moengage.track_event('welcome', {
          eventCategory: 'onboarding_welcome',
          eventAction: 'proceed',
          eventValue: 5,
        });
      router.push('/onboard/language');
    };

    const onboardingDone =
      typeof window !== 'undefined' &&
      localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.ONBOARDING_DONE);
    return onboardingDone ||
      (typeof window !== 'undefined' &&
        sessionStorage.getItem('non-onboard') === 'true')
      ? ''
      : ((typeof window !== 'undefined' && window.location?.pathname === '/') ||
          (typeof window !== 'undefined' &&
            window.location?.pathname === '/home')) && (
          <Grid xs={12} item style={{ flexGrow: 1 }}>
            <div className={classes.stickBottom}>
              <OnBoardBanner
                handleClose={handleClose}
                proceedFromWelcome={proceedFromWelcome}
              />
            </div>
          </Grid>
        );
  };

  if (staticHomeWidgetList && serverSideHomeWidgetData) {
    return (
      <div>
        <SEO>
          <meta
            property="og:title"
            content="OTTplay - Movies, TV Shows, Web Series streaming search, where to watch online"
          />
          <meta property="og:site_name" content="OTTPlay" />
          <meta
            property="og:url"
            content={
              process.env.REACT_APP_FRONTEND_URL + router?.asPath?.slice(1)
            }
          />
          <meta
            property="og:description"
            content="OOTTplay is a platform for finding Movies, TV Shows, Web Series - WHAT to watch, WHERE to watch, HOW to watch, and even WHEN to watch! We cover all the major streaming services and OTTs like Netflix, Amazon Prime Video, Hotstar Disney, Sonyliv, Zee5 and many others"
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content="https://images.ottplay.com/images/ottplay-cover-image-700.png"
          />
          <title>
            OTTplay - Movies, TV Shows, Web Series streaming search, where to
            watch online
          </title>
          <meta
            name="description"
            content="OTTplay is a platform for finding Movies, TV Shows, Web Series - WHAT to watch, WHERE to watch, HOW to watch, and even WHEN to watch! We cover all the major streaming services and OTTs like Netflix, Amazon Prime Video, Hotstar Disney, Sonyliv, Zee5 and many others"
          />
          <meta
            itemProp="keywords"
            content="OTTplay, OTTplay app, OTTplay movies, OTTplay web series, OTTplay TV shows, OTT streaming, Streaming search engine India, Where to watch movies, where to watch tv shows, where to watch web series, Netflix, Amazon Prime video, Hotstar Disney, Sonyliv, Zee5"
          />
          <meta
            name="keywords"
            content="OTTplay, OTTplay app, OTTplay movies, OTTplay web series, OTTplay TV shows, OTT streaming, Streaming search engine India, Where to watch movies, where to watch tv shows, where to watch web series, Netflix, Amazon Prime video, Hotstar Disney, Sonyliv, Zee5"
          />
          <script type="application/ld+json">
            {JSON.stringify(siteNavigationJSON)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(breadcrumbSchemaJSON)}
          </script>
        </SEO>
        <Grid xs={12} container>
          <DynamicWidgetDriver
            menu={'Home'}
            fromMobilePage
            topComponent={onboarding}
            staticHomeWidgetList={staticHomeWidgetList}
            serverSideHomeWidgetData={serverSideHomeWidgetData}
          />
        </Grid>
        {onBoardingBanner()}
        {loadingData && (
          <Spinner
            styles={{
              height: '40px',
            }}
          />
        )}
        <div id={'ottplay-home-page'}></div>
      </div>
    );
  } else return null;
}

const useStyles = makeStyles((theme: Theme) => ({
  stickBottom: {
    position: 'fixed',
    bottom: 0,
    zIndex: 1000,
    width: '100%',
  },
}));

export const getSelectedLanguages = getLocalStorageData(
  JSON.parse(
    typeof window !== 'undefined' &&
      localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES)
  ) || [
    'English',
    'Hindi',
    'Tamil',
    'Telugu',
    'Kannada',
    'Bengali',
    'Marathi',
    'Gujarati',
    'Punjabi',
    'Malayalam',
  ],
  []
);

export async function getStaticProps (context) {
  const params = {
    platform: 'mweb',
    menu: 'Home',
  };

  const resWeb = await webfox.getHomeWidgetList(params);

  if (await !resWeb.data) {
    return {
      notFound: true,
    };
  }

  const languagesArr = await getSelectedLanguages;

  const allData = [];
  const fetchListicles = async () => {
    const params = {
      page: 1,
      limit: 5,
    };
    const resp = await webfox.getListicleList(params);
    const result = await resp.data.result;
    await allData.push({ listicles: result });
  };

  const fetchNews = async (section) => {
    const params = {
      lang: languagesArr.length > 0 ? languagesArr.toString() : '',
      page: 1,
      limit: 5,
      responseType: 'full',
      content_type:
        section === HOME_SCREEN_SECTIONS.INTERVIEWS
          ? 'interview'
          : section === HOME_SCREEN_SECTIONS.REVIEWS
          ? 'review'
          : 'news',
    };
    const contentType = params.content_type;
    const respo = await webfox.getNews(params);
    const result = await respo.data.news;
    await allData.push({ [contentType]: result });
  };

  const fetchSectionData = async (
    dataParams,
    endpoint,
    templateName,
    section
  ) => {
    const resData = await webfox.getWidgetData(
      dataParams,
      endpoint.replace(/\s/g, '')
    );

    const response = await resData.data;

    let result = [];
    const contentType = '';
    if (response.rank && response.rank.length > 0) {
      const sortedData = await response.rank
        .filter((item) => {
          if (item.show != null || item.movie != null) return true;
          else return false;
        })
        .sort((a, b) => a.order - b.order);
      result = sortedData.map((item) => item.show || item.movie);

      if (
        templateName === HOME_SCREEN_TEMPLETE.PROVIDER_ROUND_WIDGET ||
        templateName === HOME_SCREEN_TEMPLETE.LANGUAGE_ROUND_WIDGET
      ) {
        result = await response.rank;
      }
    } else if (response.genres && response.genres.length > 0) {
      result = await response.genres.filter((item) => {
        return item.hasOwnProperty('icon_url');
      });
      await allData.push({ genres: result });
    }
    if (templateName === HOME_SCREEN_TEMPLETE.PROVIDER_ROUND_WIDGET)
      await allData.push({ providers: result });

    if (templateName === HOME_SCREEN_TEMPLETE.LANGUAGE_ROUND_WIDGET)
      await allData.push({ language: result });

    // if (templateName === HOME_SCREEN_TEMPLETE.FEATURED_CARD_CAROAURAL)
    //   await allData.push({ featured: result });

    if (templateName === HOME_SCREEN_TEMPLETE.MOVIES_WIDGET)
      await allData.push({ [section]: result });
  };

  await Promise.all(
    resWeb.data.result[0].active.map(async (item) => {
      const getParams = () => {
        let params: any = {};
        switch (item.template_name) {
          case HOME_SCREEN_TEMPLETE.MOVIES_WIDGET:
            params = {
              module_name: 'Home',
              platform: 'web',
              section: item.section,
              limit: 10,
              language: languagesArr?.length > 0 ? languagesArr.toString() : '',
            };
            break;
          // case HOME_SCREEN_TEMPLETE.FEATURED_CARD_CAROAURAL:
          //   params = {
          //     module_name: 'Home',
          //     platform: 'web',
          //     section: item.section,
          //     limit: 5,
          //     language: languagesArr?.length > 0 ? languagesArr.toString() : '',
          //   };
          //   break;
          case HOME_SCREEN_TEMPLETE.PROVIDER_ROUND_WIDGET:
            params = { limit: 45, module_name: 'Providers', platform: 'web' };
            break;
          case HOME_SCREEN_TEMPLETE.LANGUAGE_ROUND_WIDGET:
            params = {
              limit: 12,
              module_name: 'Languages',
              platform: 'web',
            };
            break;
          case HOME_SCREEN_TEMPLETE.GENRE_WIDGET:
            params = {
              limit: 10,
            };
            break;
          default:
            params = null;
            break;
        }

        return params;
      };
      const dataParams = getParams();

      if (item.section === HOME_SCREEN_SECTIONS.LISTICLES) {
        await fetchListicles();
      } else if (
        item.section === HOME_SCREEN_SECTIONS.INTERVIEWS ||
        item.section === HOME_SCREEN_SECTIONS.NEWS ||
        item.section === HOME_SCREEN_SECTIONS.REVIEWS
      ) {
        await fetchNews(item.section);
      } else if (dataParams && item.end_point) {
        await fetchSectionData(
          dataParams,
          item.end_point,
          item.template_name,
          item.section
        );
      }
    })
  );

  return {
    props: {
      staticHomeWidgetList: await resWeb.data.result[0].active,
      serverSideHomeWidgetData: await [...allData],
    },
    revalidate: 900,
  };
}
