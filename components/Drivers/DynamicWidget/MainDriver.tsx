import {
  AD_SIZES,
  HOME_SCREEN_SECTIONS,
  HOME_SCREEN_TEMPLETE,
  LOCALSTORAGE_KEY_CONSTANTS,
  device_UUID,
  getLocalStorageData,
  getPreferredLanguages,
  getPreferredProviders,
  getUserType,
} from '../../../utils/constants';

import { ErrorFallback } from '../../ErrorFallback';
import React from 'react';
import { Spinner } from '../..';
import { ViewportContext } from '../../ViewportProvider';
import { WebfoxContext } from '../../../services/webfox';
import WidgetDriver from './WidgetDriver';
import cookie from 'react-cookies';
import { firebaseAnalytics } from '../../firebaseConfig';
import useDynamicRefs from 'use-dynamic-refs';
import webfox from '../../../services/webbase';

const MainDriver = ({ staticHomeWidgetList, ...props }) => {
  const {
    widgetListUrl,
    menu,
    topComponent,
    serverSideHomeWidgetData,
    clientSide,
    fromMobilePage,
  } = props;
  const [getRef, setRef] = useDynamicRefs();
  const { webfox } = React.useContext(WebfoxContext);
  const { width } = React.useContext(ViewportContext);
  const [result, setResult] = React.useState([]);
  const [error, setError] = React.useState(false as any);
  const [loadingData, setLoadingData] = React.useState(false as any);
  const windowAny: any = typeof window !== 'undefined' && window;
  const _ht_clientid = cookie.load('_ht_clientid');
  const { webstore } = React.useContext(WebfoxContext);
  const { home, languages, likedMovieCard, streamingServices } = webstore;
  const [widgetList, setWidgetList] = React.useState([]);
  const [startIndex, setStartIndex] = React.useState(0);
  const [endIndex, setEndIndex] = React.useState(4);
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
    webstore.languages.name || []
  );
  const providersArr: any = getLocalStorageData(
    JSON.parse(
      typeof window !== 'undefined' &&
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_IDS)
    ) || [],
    streamingServices.selectedStreamingServices || []
  );

  // React.useEffect(() => {
  //   setWidgetList(
  //     widgetList.concat(staticHomeWidgetList.slice(startIndex, endIndex))
  //   );
  // }, [endIndex]);

  React.useEffect(() => {
    setWidgetList(
      widgetList.concat(staticHomeWidgetList.slice(startIndex, endIndex))
    );
  }, [endIndex]);

  React.useEffect(() => {
    firebaseAnalytics.logEvent('screen_view', {
      page_title: '/home/navigation',
    });
    windowAny.Moengage?.track_event('screen_view', {
      page_title: '/home/navigation',
    });
    const params = {
      platform: width && width < 600 ? 'mweb' : 'web',
      menu: menu,
    };
    webfox
      .getHomeWidgetList(params)
      .then((resp) => {
        if (resp.data.result !== null && resp.data.result.length > 0) {
          const response = resp.data.result[0].active;
          //setResult(response);
          setError(false);
        } else {
          setError(true);
        }
        setLoadingData(false);
      })
      .catch((error) => {
        setError(true);
        setLoadingData(false);
      });
  }, []);

  React.useEffect(() => {
    window.addEventListener('scroll', () => handleScroll(endIndex), false);
    return () => {
      window.removeEventListener('scroll', () => handleScroll(endIndex), false);
    };
  }, [endIndex]);

  const handleScroll = (end) => {
    const wrappedElement = document.getElementById('top-header');
    if (wrappedElement) {
      if (
        Math.round(wrappedElement.getBoundingClientRect().bottom) <=
          windowAny.innerHeight + 30 &&
        end < staticHomeWidgetList?.length
      ) {
        setStartIndex((prev) => prev + 4);
        setEndIndex((prev) => prev + 4);
      }
    }
  };

  const setAddSize = (adSize) => {
    switch (adSize) {
      case 'leaderboard':
        return AD_SIZES.LEADERBOARD;
      case 'inline_rectangle':
        return AD_SIZES.INLINE_RECTANGLE;
      case 'small_square':
        return AD_SIZES.SMALL_SQUARE;
      case 'large_leaderboard':
        return AD_SIZES.LARGE_LEADERBOARD;
      default:
        return '';
    }
  };
  if (typeof window !== 'undefined') {
    document.cookie = `languagesArr=${languagesArr}`;
  }

  if (staticHomeWidgetList)
    return !loadingData ? (
      !error ? (
        <>
          {/* {topComponent ? topComponent() : ''} */}
          {staticHomeWidgetList.slice(0, endIndex).map((widget: any, index) => {
            const sectionName = widget.section;
            return (
              <WidgetDriver
                key={index}
                fromMobilePage={fromMobilePage}
                endpoint={widget.end_point}
                section={widget.section ? widget.section : null}
                seeAll={widget.see_all ? widget.see_all : null}
                templateName={
                  widget.template_name ? widget.template_name : null
                }
                title={widget.title ? widget.title : null}
                referance={setRef(widget.title + widget.order)}
                adInfo={{
                  id: [widget.template_name, widget.order].join('_'),
                  sizes: setAddSize(widget.ad_size),
                  adCode: widget.ad_code,
                }}
                serverSideHomeWidgetData={
                  serverSideHomeWidgetData &&
                  serverSideHomeWidgetData[0] &&
                  serverSideHomeWidgetData
                }
              />
            );
          })}{' '}
        </>
      ) : (
        <ErrorFallback path={'/home'} />
      )
    ) : (
      <Spinner styles={{ maxHeight: '60vh' }} />
    );
  else return null;
};
export default MainDriver;
