import { Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Spinner } from '../../components';
import DeviceType from '../../components/Device';
import SEO from '../../components/Seo';
// import DynamicWidgetDriver from '../../components/Drivers/DynamicWidget/MainDriver';
// import { OnBoardBanner } from '../components/OnBoardBanner';
import { firebaseAnalytics } from '../../components/firebaseConfig';
// import Onboard from '../components/onboard';
// import SEO from '../components/Seo';
import webfox from '../../services/webbase';
import { WebfoxContext } from '../../services/webfox';
import {
  getLocalStorageData,
  HOME_SCREEN_TEMPLETE,
  LOCALSTORAGE_KEY_CONSTANTS,
} from '../../utils/constants';
import cookie from 'cookie';
import HomeSEO from '../../containers/HomeSEO';
import { combinations } from '../../utils/helper'

const DynamicWidgetDriver = dynamic(() =>
  import('../../components/Drivers/DynamicWidget/MainDriver')
);

const OnBoardBanner = dynamic(() => import('../../components/OnBoardBanner'));

const Onboard = dynamic(() => import('../../components/onboard'));

// const firebaseAnalytics = dynamic(() =>
//   import('../components/firebaseConfig').then(
//     (mod) => mod.firebaseAnalytics
//   )
// );

const windowAny: any = typeof window !== 'undefined' && window;
export default function DynamicHomeScreen ({ web, mob }) {
  const classes = useStyles();
  typeof window !== 'undefined' && localStorage.setItem('fromForYou', 'false');
  const { webfox, webstore } = React.useContext(WebfoxContext);
  const { home, languages, likedMovieCard, streamingServices } = webstore;
  const [loadingData, setLoading] = useState(false);
  const [slide, setSlide] = useState({ min: 0, max: 5 });
  const router = useRouter();
  const isMobile = DeviceType().isMobile;
  // const [web, setWeb] = useState(props.web);
  // const [mob, setMob] = useState(props.mob);
  const [clientSide, setClientSide] = useState(false);
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
    //const [sessionBanner, setSessionBanner] = useState(false);

    const handleClose = () => {
      typeof window !== 'undefined' &&
        sessionStorage.setItem('non-onboard', 'true');
      //router.push('/');
      //setSessionBanner(true);
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

  if (web?.serverSideHomeWidgetData && mob?.serverSideHomeWidgetData) {
    const serverSideHomeWidgetData = isMobile
      ? mob.serverSideHomeWidgetData
      : web.serverSideHomeWidgetData;
    const staticHomeWidgetList = isMobile
      ? mob.staticHomeWidgetList
      : web.staticHomeWidgetList;

    return (
      <div>
        <SEO>
          <meta name="robots" content="noindex,nofollow" />
          <meta name="googlebot" content="noindex,nofollow" />
        </SEO>
        <HomeSEO />
        <Grid xs={12} container>
          <DynamicWidgetDriver
            menu={'Home'}
            topComponent={onboarding}
            staticHomeWidgetList={
              staticHomeWidgetList.length > 0
                ? staticHomeWidgetList.filter((widget) => {
                    return (
                      widget.end_point ||
                      widget.template_name === HOME_SCREEN_TEMPLETE.ADS_WIDGET
                    );
                  })
                : []
            }
            serverSideHomeWidgetData={serverSideHomeWidgetData}
            clientSide={clientSide}
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

export async function getStaticProps (context) {
  const paramsWeb = {
    platform: 'web',
    menu: 'Home',
  };

  const paramsMob = {
    platform: 'mweb',
    menu: 'Home',
  };
  
  const languagesArr =  context.params.homeslug.split("-").map(item=>{
    return item.charAt(0).toUpperCase() + item.slice(1)
  });
  
  const resWeb = await webfox.getHomeWidgetList(paramsWeb);
  const resMob = await webfox.getHomeWidgetList(paramsMob);

  if (await !resWeb.data) {
    return {
      notFound: true,
    };
  }

  if (await !resMob.data) {
    return {
      notFound: true,
    };
  }

  const allDataWeb = [];
  const allDataMob = [];

  const fetchSectionData = async (
    dataParams,
    endpoint,
    templateName,
    section,
    platform
  ) => {
    const resData = await webfox.getWidgetData(
      dataParams,
      endpoint.replace(/\s/g, '')
    );

    const response = await resData.data;

    let result = [];
    if (response?.rank && response?.rank?.length > 0) {
      const sortedData = await response.rank
        .filter((item) => {
          if (item.show != null || item.movie != null) return true;
          else return false;
        })
        .sort((a, b) => a.order - b.order);
      result = sortedData.map((item) => item.show || item.movie);

      if (
        templateName === HOME_SCREEN_TEMPLETE.PROVIDER_ROUND_WIDGET ||
        templateName === HOME_SCREEN_TEMPLETE.LANGUAGE_ROUND_WIDGET ||
        templateName === HOME_SCREEN_TEMPLETE.NEWS_WIDGET ||
        templateName === HOME_SCREEN_TEMPLETE.REVIEWS_WIDGET
      ) {
        result = await response.rank;
      }
    } else if (response?.genres && response?.genres?.length > 0) {
      result = await response.genres.filter((item) => {
        return item.hasOwnProperty('icon_url');
      });
      if (platform === 'web') await allDataWeb.push({ genres: result });
      else await allDataMob.push({ genres: result });
    }
    if (templateName === HOME_SCREEN_TEMPLETE.PROVIDER_ROUND_WIDGET)
      if (platform === 'web') await allDataWeb.push({ providers: result });
      else await allDataMob.push({ providers: result });

    if (templateName === HOME_SCREEN_TEMPLETE.LANGUAGE_ROUND_WIDGET)
      if (platform === 'web') await allDataWeb.push({ language: result });
      else await allDataMob.push({ language: result });

    if (templateName === HOME_SCREEN_TEMPLETE.FEATURED_CARD_CAROAURAL)
      if (platform === 'web') await allDataWeb.push({ featured: result });
      else await allDataMob.push({ featured: result });
    if (
      templateName === HOME_SCREEN_TEMPLETE.MOVIES_WIDGET ||
      templateName === HOME_SCREEN_TEMPLETE.NEWS_WIDGET ||
      templateName === HOME_SCREEN_TEMPLETE.REVIEWS_WIDGET
    ) {
      if (platform === 'web') await allDataWeb.push({ [section]: result });
      else await allDataMob.push({ [section]: result });
    }
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
              limit: 25,
              language: languagesArr?.length > 0 ? languagesArr.toString() : '',
            };
            break;
          case HOME_SCREEN_TEMPLETE.FEATURED_CARD_CAROAURAL:
            params = {
              module_name: 'Home',
              platform: 'web',
              section: item.section,
              limit: 25,
              language: languagesArr?.length > 0 ? languagesArr.toString() : '',
            };
            break;
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
              limit: 45,
            };
            break;
          case HOME_SCREEN_TEMPLETE.NEWS_WIDGET:
            params = {
              module_name: 'Home',
              platform: 'web',
              section: item.section,
              limit: 16,
            };
            break;
          case HOME_SCREEN_TEMPLETE.REVIEWS_WIDGET:
            params = {
              module_name: 'Home',
              platform: 'web',
              section: item.section,
              limit: 9,
            };
            break;
          default:
            params = null;
            break;
        }

        return params;
      };
      const dataParams = getParams();
      if (dataParams && item.end_point) {
        await fetchSectionData(
          dataParams,
          item.end_point,
          item.template_name,
          item.section,
          'web'
        );
      }
    })
  );

  await Promise.all(
    resMob.data.result[0].active.map(async (item) => {
      const getParams = () => {
        let params: any = {};
        switch (item.template_name) {
          case HOME_SCREEN_TEMPLETE.MOVIES_WIDGET:
            params = {
              module_name: 'Home',
              platform: 'web',
              section: item.section,
              limit: 25,
              language: languagesArr?.length > 0 ? languagesArr.toString() : '',
            };
            break;
          case HOME_SCREEN_TEMPLETE.FEATURED_CARD_CAROAURAL:
            params = {
              module_name: 'Home',
              platform: 'web',
              section: item.section,
              limit: 25,
              language: languagesArr?.length > 0 ? languagesArr.toString() : '',
            };
            break;
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
              limit: 45,
            };
            break;
          case HOME_SCREEN_TEMPLETE.NEWS_WIDGET:
            params = {
              module_name: 'Home',
              platform: 'web',
              section: item.section,
              limit: 13,
            };
            break;
          case HOME_SCREEN_TEMPLETE.REVIEWS_WIDGET:
            params = {
              module_name: 'Home',
              platform: 'web',
              section: item.section,
              limit: 9,
            };
            break;
          default:
            params = null;
            break;
        }

        return params;
      };
      const dataParams = getParams();
      if (dataParams && item.end_point) {
        await fetchSectionData(
          dataParams,
          item.end_point,
          item.template_name,
          item.section,
          'mob'
        );
      }
    })
  );
  return {
    props: {
      web: await {
        staticHomeWidgetList: await resWeb.data.result[0].active,
        serverSideHomeWidgetData: await [...allDataWeb],
      },
      mob: await {
        staticHomeWidgetList: await resMob.data.result[0].active,
        serverSideHomeWidgetData: await [...allDataMob],
      },
    },
    //revalidate: 900,
  };
}

export async function getStaticPaths() {
  let data = [];
  const getPaths = combinations(['english', 'hindi'])

  await getPaths.filter(item => {return item.length > 0}).map(item => {
      data.push({params: {homeslug: item.join('-')}})
  })
  
  return {
    paths: await data,
    fallback: true,
  };
}
