import { HOME_SCREEN_SECTIONS } from '../../../utils/constants';
import { NewsWidget } from '../../NewsWidget';
import React from 'react';
import { WebfoxContext } from '../../../services/webfox';
import { useRouter } from 'next/router';

export function NewsListWidget({ ...props }) {
  const {
    webfox,
    webstore,
    actions,
    actionDispatch,
    loading,
    setLoading,
  } = React.useContext(WebfoxContext);
  const router = useRouter();
  const { title, data, contentType, googleAd, section } = props;

  const newsSourceSelected = (item, content) => {
    let ssource: any = null;
    let source: any = null;
    const selectedSource = item.replace(/\s/g, '').toLowerCase();
    if (selectedSource === 'Desi Martini'.replace(/\s/g, '').toLowerCase()) {
      ssource = 'DM';
      source = 'Desi Martini';
    } else if (
      selectedSource === 'Live Mint'.replace(/\s/g, '').toLowerCase()
    ) {
      ssource = 'LM';
      source = 'Live Mint';
    } else if (
      selectedSource === 'Hindustan Times'.replace(/\s/g, '').toLowerCase()
    ) {
      ssource = 'HT';
      source = 'Hindustan Times';
    } else if (
      selectedSource === 'Film Companion'.replace(/\s/g, '').toLowerCase()
    ) {
      ssource = 'FC';
      source = 'Film Companion';
    } else if (selectedSource === 'OTTplay'.replace(/\s/g, '').toLowerCase()) {
      ssource = 'OTT';
      source = 'OTTplay';
    } else if (webstore.refine.news.filter.selectedSource === 'All') {
      ssource = null;
      source = null;
    }
    actionDispatch(actions.SET_REFINE_SOURCE, {
      name: source,
    });
    actionDispatch(actions.REFINE_NEWS_PAGE, {
      page: 'news',
    });
    router.push({
      pathname: '/news',
      query: {
        contentType: content,
        source: ssource,
      },
    });
  };

  const formattedData = () => {
    if (
      section &&
      (section === HOME_SCREEN_SECTIONS.NEWS ||
        section === HOME_SCREEN_SECTIONS.INTERVIEWS ||
        section === HOME_SCREEN_SECTIONS.LISTICLES)
    ) {
      const objKey =
        section === HOME_SCREEN_SECTIONS.LISTICLES ? 'listicle' : 'news';
      const result =
        data &&
        data.length > 0 &&
        data.map((element) => {
          if (element[objKey]) {
            return {
              ...element[objKey],
              title: element[objKey].headline ? element[objKey].headline : null,
              news_type: element[objKey].content_type
                ? element[objKey].content_type
                : null,
              published_date: element[objKey].published_on
                ? element[objKey].published_on
                : null,
              content_type: element.content_type ? element.content_type : null,
            };
          }
        });
      return result;
    } else if (section && section === HOME_SCREEN_SECTIONS.REVIEWS) {
      const getReviewProvider = (ele) => {
        const array =
          ele?.movies?.length > 0
            ? ele.movies[0]
            : ele?.shows?.length > 0
            ? ele.shows[0]
            : [];
        const prov =
          array.where_to_watch?.length > 0
            ? array.where_to_watch.map((prov) => {
                return prov?.provider
                  ? { ...prov.provider, status: 'published' }
                  : null;
              })
            : [];
        return prov;
      };

      const result =
        data &&
        data.length > 0 &&
        data.map((element) => {
          if (element.review) {
            return {
              ...element.review,
              title: element.review.headline ? element.review.headline : null,
              news_type: element.review.content_type
                ? element.review.content_type
                : null,
              published_date: element.review.published_on
                ? element.review.published_on
                : null,
              content_type: element.content_type ? element.content_type : null,
              providerUnique: getReviewProvider(element.review),
              details:
                element.review.movies?.length > 0
                  ? element.review.movies
                  : element.review.shows?.length > 0
                  ? element.review.shows
                  : [],
            };
          }
        });
      return result;
    } else return data;
  };

  return (
    <NewsWidget
      title={title}
      page={1}
      newsResult={formattedData()}
      contentType={
        contentType
          ? contentType
          : title === 'OTT Newsroom'
          ? 'news'
          : title === 'Interviews'
          ? 'interview'
          : 'listicle'
      }
      sourceSelected={(item) => {
        //navigate to respective news listing with selected source
        newsSourceSelected(
          item.source.name,
          title === 'OTT Newsroom'
            ? 'news'
            : title === 'Interviews'
            ? 'interview'
            : 'listicle'
        );
      }}
      googleAd={googleAd}
    />
  );
}
