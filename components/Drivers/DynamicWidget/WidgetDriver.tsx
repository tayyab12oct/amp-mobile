import {
  AD_CODES,
  HOME_SCREEN_SECTIONS,
  HOME_SCREEN_TEMPLETE,
} from '../../../utils/constants';
import {
  AdsWidget,
  FeaturedCarouselWidget,
  GenreWidget,
  LanguageWidget,
  MovieWidget,
  NewsListWidget,
  StreamingServiceWidget,
} from '../Template';

import GoogleAdOttPlay from '../../GoogleAds';
import { Grid } from '@material-ui/core';
import React from 'react';
import { Spinner } from '../..';
import { ViewportContext } from '../../ViewportProvider';
import { WebfoxContext } from '../../../services/webfox';

const WidgetDriver = ({ ...props }) => {
  const { width } = React.useContext(ViewportContext);
  const {
    section,
    title,
    templateName,
    seeAll,
    endpoint,
    referance,
    adInfo,
    serverSideHomeWidgetData,
    movieData,
    fromMobilePage
  } = props;

  const WidgetWrapper = (component) => {
    return (
      <Grid
        xs={12}
        container
        item
        style={{ padding: width < 600 ? '0px 16px' : '0px' }}
      >
        <Grid sm={1} lg={2} item></Grid>
        <Grid xs={12} sm={10} lg={8} item>
          {component}
        </Grid>
        <Grid sm={1} lg={2} item></Grid>
      </Grid>
    );
  };

  const renderWidget = () => {
    if (serverSideHomeWidgetData && serverSideHomeWidgetData.length > 0)
      switch (templateName) {
        // case HOME_SCREEN_TEMPLETE.ADS_WIDGET:
        //   return <AdsWidget adInfo={adInfo} />;
        case HOME_SCREEN_TEMPLETE.FEATURED_CARD_CAROAURAL:
          return (
            !fromMobilePage ? (<FeaturedCarouselWidget
              title={title}
              data={
                serverSideHomeWidgetData.filter((item) => item.featured)[0]
                  ? serverSideHomeWidgetData.filter((item) => item.featured)[0]
                      .featured
                  : []
              }
            />) : []
          );
        case HOME_SCREEN_TEMPLETE.GENRE_WIDGET:
          return WidgetWrapper(
            <GenreWidget
              title={title}
              data={serverSideHomeWidgetData.filter((item) => item.genres)}
            />
          );
        case HOME_SCREEN_TEMPLETE.LANGUAGE_ROUND_WIDGET:
          return WidgetWrapper(
            <LanguageWidget
              title={title}
              data={
                serverSideHomeWidgetData.filter((item) => item.language)[0]
                  ? serverSideHomeWidgetData.filter((item) => item.language)[0]
                      .language
                  : []
              }
            />
          );
        case HOME_SCREEN_TEMPLETE.MOVIES_WIDGET:
          return WidgetWrapper(
            <MovieWidget
              title={title}
              data={
                serverSideHomeWidgetData.filter((item) =>
                  item.hasOwnProperty(section)
                )[0]
                  ? serverSideHomeWidgetData.filter((item) =>
                      item.hasOwnProperty(section)
                    )[0][section]
                  : []
              }
              seeAll={seeAll}
              referance={referance}
              section={section}
            />
          );
        case HOME_SCREEN_TEMPLETE.NEWS_WIDGET:
          return WidgetWrapper(
            <NewsListWidget
              title={title}
              data={
                section === 'Listicles'
                  ? serverSideHomeWidgetData
                      .filter((item) => item[section])[0]
                      ?.[section].filter((item, index) => {
                        return item?.listicle?.name;
                      })
                  : serverSideHomeWidgetData
                      .filter((item) => item[section])[0]
                      ?.[section].filter((item, index) => {
                        return item?.news?.headline;
                      })
              }
              section={section}
              googleAd={
                title === 'OTT Newsroom' ? (
                  <GoogleAdOttPlay adInfo={AD_CODES.item3} />
                ) : null
              }
            />
          );
        case HOME_SCREEN_TEMPLETE.REVIEWS_WIDGET:
          return WidgetWrapper(
            <NewsListWidget
              title={title}
              data={
                serverSideHomeWidgetData
                  .filter((item) => item[section])[0]
                  ?.[section].filter((item, index) => {
                    return item?.review?.headline;
                  })
              }
              contentType="review"
              section={section}
            />
          );
        case HOME_SCREEN_TEMPLETE.PROVIDER_ROUND_WIDGET:
          return WidgetWrapper(
            <StreamingServiceWidget
              title={title}
              data={
                serverSideHomeWidgetData.filter((item) => item.providers)[0]
                  ? serverSideHomeWidgetData.filter((item) => item.providers)[0]
                      .providers
                  : []
              }
            />
          );
        default:
          return <div></div>;
      }
  };

  if (serverSideHomeWidgetData)
    return (
      <>
        {<AdsWidget adInfo={adInfo} />}
        {
          //serverSideHomeWidgetData.length > 0 &&
          // templateName !== HOME_SCREEN_TEMPLETE.ADS_WIDGET ? (
          serverSideHomeWidgetData.length > 0 ? (
            renderWidget()
          ) : (
            <Spinner styles={{ height: '30vh' }} />
          )
        }{' '}
      </>
    );
  else return null;
};
export default WidgetDriver;
