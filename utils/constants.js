import { browserName, deviceType } from 'react-device-detect';

import cookie from 'react-cookies';
import package_json from '../package.json';
import { v4 as uuidv4 } from 'uuid';

// NetInfoState Type
export const NETINFO_STATE_TYPE = {
  NONE: 'none',
  CELLULAR: 'cellular',
  WIFI: 'wifi',
};
export const IMAGE_BASE_URL = 'https://images.ottplay.com/static';
export const TOKEN =
  'IJPWKPTVZF7PP2TY5VODGG3XQELGXRWSKHUB5L3XTFOC75DGRTTXSI3H3EZ5RGKQ2JZ2MK2IZMJXHKU4I7KP5ZVNC3TSBNTBI3JB4ZA=';
export const _HT_CLIENTID = '1611408030281';
export const SSO_LOGIN_URL =
  'https://accounts.hindustantimes.com/?type=plain&ref=ottplay';
export const SSO_LOGOUT_URL = 'https://accounts.hindustantimes.com/logout.html';
export const SLURRP_URL =
  'http://onelink.to/5qr7vx?utm_source=ottplay&utm_medium=newsroom-ad&utm_campaign=mar-21-intro';
export const FB_OTT = 'https://www.facebook.com/ottplayapp';
export const TW_OTT = 'https://www.twitter.com/ottplayapp';
export const IN_OTT = 'https://www.instagram.com/ottplayapp';
export const YT_OTT =
  'https://www.youtube.com/channel/UCKQsdfd97oCQatbdef3i19Q';

export const HINDUSTAN_TIMES = 'https://www.hindustantimes.com/';
export const LIVE_MINT = 'https://www.livemint.com/';
export const LIVE_HINDUSTAN = 'https://www.livehindustan.com/';
export const DESI_MARTINI = 'https://www.desimartini.com/';
export const SHINE = 'https://www.shine.com/';
export const SLURRP = 'https://www.slurrp.com/';
export const HEALTHSHOTS = ' https://www.healthshots.com/';

export const FETCH_POLICY = {
  NETWORK: 'network',
  CACHE: 'cache',
  CACHE_AND_NETWORK: 'cache-network',
};
export const generatePermalink = (type, seo_url) => {
  let permalink;
  switch (type) {
    case 'show':
      permalink = 'show/' + seo_url;
      break;
    case 'movie':
      permalink = 'movie/' + seo_url;
      break;
    case 'tv_shows':
      permalink = 'tv-shows/' + seo_url;
      break;
    case 'web_series':
      permalink = 'web-series/' + seo_url;
      break;
    case 'cast_crew':
      permalink = 'people/' + seo_url;
      break;
    case 'cast':
      permalink = 'people/' + seo_url;
      break;
    case 'crew':
      permalink = 'people/' + seo_url;
  }
  return permalink;
};

export const device_UUID = JSON.stringify(uuidv4());
const device_UUID1 = JSON.stringify(uuidv4());
const _ht_clientid = cookie.load('_ht_clientid');

export const contextParamsForREAnalytics = {
  platform: device_UUID1.isDesktop ? 'dweb' : 'mweb',
  device_type: deviceType,
  // browser_name: browserName,
  unique_id: device_UUID,
  device_id: device_UUID,
  user_id: _ht_clientid ? _ht_clientid : '',
};

export const HOME_SCREEN_SECTIONS = {
  FEATURED: 'Featured',
  EDITORS_CHOICE: "Editor's Choice",
  FREE_TICKET_JUNCTION: 'Free Ticket Junction',
  HOT_ON_HOTSTAR: 'Hot on Hotstar',
  PICKS_FROM_NETFLIX: 'Picks From Netflix',
  TOP_ORIGINALS: 'Top Originals',
  TOP_DOCUMENTARIES: 'Top documentaries',
  TIME_TO_KILL: 'Time to Kill',
  RECENTLY_ADDED: 'Recently Added',
  RECENTLY_VIEWED: 'Recently Viewed',
  PRIME_VIDEO_PATAKAS: "Prime Video's Patakas",
  TRENDING: 'Trending',
  SONY_LIV: 'Sony LIV',
  ZINGER_ZEE5: 'Zinger from Zee5',
  NEWS: 'News',
  LISTICLES: 'Listicles',
  REVIEWS: 'Reviews',
  INTERVIEWS: 'Interviews',
};
export const LOCALSTORAGE_KEY_CONSTANTS = {
  FOR_YOU_PAGE_REFRESH: 'for_you_page_refresh',
  CAST_NAMES: 'onboarding_selected_cast_names',
  CREW_NAMES: 'onboarding_selected_crew_names',
  CAST_IDS: 'onboarding_selected_cast_ids',
  CREW_IDS: 'onboarding_selected_crew_ids',
  GENRES_NAMES: 'onboarding_selected_genres_names',
  LANGUAGE_NAMES: 'onboarding_selected_language_names',
  PROVIDER_IDS: 'onboarding_selected_provider_ids',
  PROVIDER_NAMES: 'onboarding_selected_provider_names',
  GENRE_IDS: 'onboarding_selected_genre_ids',
  LIKED_DATA_IDS: 'liked_data_ids',
  LIKED_DATA_OBJ: 'liked_data_obj',
  LANG_LIKED_DATA_IDS: 'lang_liked_data_id',

  UNLIKED_DATA_IDS: 'unliked_data_ids',
  LANG_UNLIKED_DATA_IDS: 'lang_unliked_data_ids',
  UNLIKED_DATA_OBJ: 'unliked_data_obj',

  HIDDEN_DATA_OBJ: 'hidden_data_obj',
  WATCHLISTED_DATA_OBJ: 'watchlisted_data_obj',
  ONBOARDING_DONE: 'logged_in',
  SEEALL_EPISODE_OBJ: 'episode_data_obj',
  MOVIE_NAV_FILTER_OBJ: 'movie_nav_filter_obj',
};
export const sortProvidersByUserPreference = (
  providers,
  preferredProviders
) => {
  const sortedProviders =
    providers && providers.length > 0 ? [...providers] : [];
  const userPreferredOTTs = preferredProviders.map((item) =>
    item.toLowerCase()
  );
  if (sortedProviders.length > 0) {
    sortedProviders.forEach((item, index) => {
      if (
        item &&
        item.provider &&
        item.provider.name &&
        userPreferredOTTs.includes(item.provider.name.toLowerCase())
      ) {
        sortedProviders.splice(index, 1);
        sortedProviders.unshift(item);
      }
    });
  }
  return sortedProviders;
};
export const VARIABLE = {
  LOGOUT_MESSAGE: 'You  have already signed in',
  LOGIN_MESSAGE:
    'Sign in to synchronize your watchlist across all your devices',
  GENRE_WIDGET: 'What’s Your Genre, Boss?',
  SEE_All: 'See All',
  LANGUAGE_WIDGET: 'Top languages',
  BUILD_NUMBER: package_json.version,
  SONY_LIV_TITLE: 'Specials from SonyLIV',
  ZINGER_ZEE5_TITLE: 'Zingers from Zee5',
};

export const pushDataLocalStorage = (localStorageKey, data, data_type) => {
  let str = '';
  if (localStorageKey === LOCALSTORAGE_KEY_CONSTANTS.WATCHLISTED_DATA_OBJ) {
    const oldItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    const newArr = [];
    const newItem = data;
    let found = false;
    if (oldItems.length > 0) {
      for (let i = 0; i < oldItems.length; i++) {
        if (data_type === 'ID') {
          if (oldItems[i] !== newItem) {
            newArr.push(oldItems[i]);
            found = false;
          } else {
            found = true;
          }
        } else if (data_type === 'OBJ') {
          if (oldItems[i]._id !== newItem._id) {
            newArr.push(oldItems[i]);
            found = false;
          } else {
            found = true;
          }
        }
      }
      if (typeof window !== undefined) {
        localStorage.setItem(localStorageKey, JSON.stringify(newArr));
      }
    }
    if (found) {
      return;
    }
  }

  if (
    data_type === 'OBJ' &&
    localStorageKey === LOCALSTORAGE_KEY_CONSTANTS.UNLIKED_DATA_OBJ
  ) {
    str = LOCALSTORAGE_KEY_CONSTANTS.LIKED_DATA_OBJ;
  } else if (
    data_type === 'OBJ' &&
    localStorageKey === LOCALSTORAGE_KEY_CONSTANTS.LIKED_DATA_OBJ
  ) {
    str = LOCALSTORAGE_KEY_CONSTANTS.UNLIKED_DATA_OBJ;
  } else if (
    data_type === 'ID' &&
    localStorageKey === LOCALSTORAGE_KEY_CONSTANTS.UNLIKED_DATA_IDS
  ) {
    str = LOCALSTORAGE_KEY_CONSTANTS.LIKED_DATA_IDS;
  } else if (
    data_type === 'ID' &&
    localStorageKey === LOCALSTORAGE_KEY_CONSTANTS.LIKED_DATA_IDS
  ) {
    str = LOCALSTORAGE_KEY_CONSTANTS.UNLIKED_DATA_IDS;
  }
  const oldItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
  const newItem = data;
  let found = false;
  for (let i = 0; i < oldItems.length; i++) {
    if (data_type === 'ID') {
      if (oldItems[i] === newItem) {
        found = true;
        break;
      }
    } else if (data_type === 'OBJ') {
      if (oldItems[i]._id === newItem._id) {
        found = true;
        break;
      }
    }
  }
  if (!found) {
    oldItems.push(newItem);
  }
  if (typeof window !== undefined) {
    localStorage.setItem(localStorageKey, JSON.stringify(oldItems));
  }

  if (str !== '') {
    const presentArr = JSON.parse(localStorage.getItem(str)) || [];
    const newArr = [];
    if (presentArr.length > 0) {
      for (let i = 0; i < presentArr.length; i++) {
        if (data_type === 'ID') {
          if (presentArr[i] !== newItem) {
            newArr.push(presentArr[i]);
          }
        } else if (data_type === 'OBJ') {
          if (presentArr[i]._id !== newItem._id) {
            newArr.push(presentArr[i]);
          }
        }
      }
      if (typeof window !== undefined) {
        localStorage.setItem(str, JSON.stringify(newArr));
      }
    }
  }
};

export const getLocalStorageData = (arr1, arr2) => {
  let arr3 = [];
  if (arr1 !== null && arr1 !== undefined && arr1.length > 0) {
    if (arr1 == null || arr1 == undefined || arr1.length === 0) {
      arr1 = [];
    }
    arr3 = arr1;
  } else {
    // if (arr2 !== null && arr2 !== undefined && arr2.length > 0) arr4 = arr2;
  }
  return arr3;
};

export const getUserType = (isLoggedIn = false) =>
  isLoggedIn ? ' logged in' : 'guest';
export const getPreferredLanguages = (selectedLanguages = []) =>
  selectedLanguages.length > 0 ? selectedLanguages.toString() : '';
export const getPreferredProviders = (selectedProviders = []) =>
  selectedProviders.length > 0 ? selectedProviders.toString() : '';

export const SCREEN_NAME = {
  DISCOVER: 'Discover',
  FOR_YOU: 'ForYou',
};

export const DATE_FORMATE = {
  MONTH_FORMATTED: 'MMM DD, YYYY, hh.mm A',
  TIME_FORMATTED: 'hh.mm A, MMM DD, YYYY',
  DATE_FORMATTED: 'MMM DD, YYYY',
};

export const HOME_SCREEN_TEMPLETE = {
  ADS_WIDGET: 'ads_widget',
  FEATURED_CARD_CAROAURAL: 'featured_card_carousel',
  GENRE_WIDGET: 'genre_widget',
  LANGUAGE_ROUND_WIDGET: 'languages_round_widget',
  MOVIES_WIDGET: 'movies_widget',
  NEWS_WIDGET: 'news_widget',
  PROVIDER_ROUND_WIDGET: 'streaming_service_round_widget',
  REVIEWS_WIDGET: 'reviews_widget',
};

export const AD_SIZES = {
  INLINE_RECTANGLE: [[300, 250]],
  LEADERBOARD: [
    [728, 90],
    [728, 250],
    [970, 90],
    [970, 250],
  ],
  LARGE_LEADERBOARD: [[728, 250]],
  SMALL_SQUARE: [
    [20, 20],
    [100, 100],
    [300, 250],
  ],
};

export const AD_CODES = {
  home: {
    ad_1: {
      id: 'div-gpt-ad-1618249298405-home-ad-1',
      sizes: AD_SIZES.INLINE_RECTANGLE,
      adCode: '/1055314/OTTPLAY_Desktop_Home/OTTPLAY_Desk_Home_3_Mrec',
      page: 'home',
      position: 'Next to OTTplay Lists',
    },
    ad_2: {
      id: 'div-gpt-ad-1618249298405-home-ad-2',
      sizes: AD_SIZES.INLINE_RECTANGLE,
      adCode: '/1055314/OTTPLAY_Desktop_Home/OTTPLAY_Desk_Home_4_Mrec',
      page: 'home',
      position: 'Next to Interviews',
    },
  },
  news_details: {
    ad_1: {
      id: 'div-gpt-ad-1618249298405-news-details-ad-1',
      sizes: AD_SIZES.INLINE_RECTANGLE,
      adCode: '/1055314/OTTPLAY_Desktop_Story/OTTPLAY_Desk_Story_1_Mrec',
      page: 'news review listicle interview details',
      position: 'Next to first paragraph',
    },
  },
  item0: {
    id: 'div-gpt-ad-1618249298405-0',
    sizes: AD_SIZES.LEADERBOARD,
    adCode: '/1055314/OTTPLAY_Desktop_Home/OTTPLAY_Desk_Home_Masthead',
    page: 'home',
    position: 'below header',
  },
  item1: {
    id: 'div-gpt-ad-1618249298405-1',
    sizes: AD_SIZES.INLINE_RECTANGLE,
    adCode: '/1055314/OTTPLAY_Desktop_Home/OTTPLAY_Desk_Home_1_Mrec',
    page: 'home',
    position: 'next to whats your genre boss',
  },
  item2: {
    id: 'div-gpt-ad-1618249298405-2',
    sizes: AD_SIZES.LEADERBOARD,
    adCode: '/1055314/OTTPLAY_Desktop_Home/OTTPLAY_Desk_Home_2_Billboard',
    page: 'home',
    position: 'below top languages',
  },
  item3: {
    id: 'div-gpt-ad-1618249298405-3',
    sizes: AD_SIZES.INLINE_RECTANGLE,
    adCode: '/1055314/OTTPLAY_Desktop_Home/OTTPLAY_Desk_Home_3_Mrec',
    page: 'home, news widget',
    position: 'next to OTT newsroom',
  },
  item4: {
    id: 'div-gpt-ad-1618249298405-4',
    sizes: AD_SIZES.LEADERBOARD,
    adCode: '/1055314/OTTPLAY_Desktop_Home/OTTPLAY_Desk_Home_3_Billboard',
    page: 'home',
    position: 'below prime video patakas',
  },
  item5: {
    id: 'div-gpt-ad-1618249298405-5',
    sizes: AD_SIZES.LEADERBOARD,
    adCode: '/1055314/OTTPLAY_Desktop_Home/OTTPLAY_Desk_Home_4_Billboard',
    page: 'home',
    position: 'below reviews',
  },
  item6: {
    id: 'div-gpt-ad-1618249298405-6',
    sizes: AD_SIZES.LEADERBOARD,
    adCode: '/1055314/OTTPLAY_Desktop_Home/OTTPLAY_Desk_Home_5_Billboard',
    page: 'home',
    position: 'below Listicles',
  },
  item7: {
    id: 'div-gpt-ad-1618249298405-7',
    sizes: AD_SIZES.LARGE_LEADERBOARD,
    adCode: '/1055314/OTTPLAY_Desktop_Section/OTTPLAY_Desk_Section_Masthead',
    page: 'foryou',
    position: 'before the header',
  },
  item8: {
    id: 'div-gpt-ad-1618249298405-8',
    sizes: AD_SIZES.LARGE_LEADERBOARD,
    adCode: '/1055314/OTTPLAY_Desktop_Section/OTTPLAY_Desk_Section_2_Billboard',
    page: 'foryou',
    position: 'ads after every 2 rows',
  },
  item9: {
    id: 'div-gpt-ad-1618249298405-9',
    sizes: AD_SIZES.INLINE_RECTANGLE,
    adCode: '/1055314/OTTPLAY_Desktop_Story/OTTPLAY_Desk_Story_1_Mrec',
    page: 'movie/show detail Page',
    position: 'next to where to watch(right side)',
  },
  item10: {
    id: 'div-gpt-ad-1618249298405-10',
    sizes: AD_SIZES.LEADERBOARD,
    adCode: '/1055314/OTTPLAY_Desktop_Story/OTTPLAY_Desk_Story_2_Billboard',
    page: 'movie/show detail Page',
    position: 'below cast & crew widget',
  },
  item11: {
    id: 'div-gpt-ad-1618249298405-11',
    sizes: AD_SIZES.LARGE_LEADERBOARD,
    adCode: '/1055314/OTTPLAY_Desktop_Story/OTTPLAY_Desk_Story_3_Billboard',
    page: 'news listing',
    position: 'before the header',
  },
  item12: {
    id: 'div-gpt-ad-1618249298405-12',
    sizes: AD_SIZES.LARGE_LEADERBOARD,
    adCode: '/1055314/OTTPLAY_Desktop_Story/OTTPLAY_Desk_Story_4_Billboard',
    page: 'review/news/listicle/interview detail page',
    position: 'before the header',
  },
  item13: {
    id: 'div-gpt-ad-1618249298405-13',
    sizes: AD_SIZES.INLINE_RECTANGLE,
    adCode: '/1055314/OTTPLAY_Desktop_Story/OTTPLAY_Desk_Story_3_Mrec',
    page: 'review/news/listicle/interview detail page',
    position: 'before the header',
  },
  mobile: {
    item0: {
      id: 'div-gpt-ad-mob-1618249298405-0',
      sizes: AD_SIZES.INLINE_RECTANGLE,
      adCode: '/1055314/OTTPLAY_WAP_Home/OTTPLAY_WAP_Home_2_Mrec',
      page: 'home',
      position: 'below featured widget',
    },
    item1: {
      id: 'div-gpt-ad-mob-1618249298405-1',
      sizes: AD_SIZES.INLINE_RECTANGLE,
      adCode: '/1055314/OTTPLAY_WAP_Home/OTTPLAY_WAP_Home_3_Mrec',
      page: 'home',
      position: 'after editors choice',
    },
    item2: {
      id: 'div-gpt-ad-mob-1618249298405-2',
      sizes: AD_SIZES.INLINE_RECTANGLE,
      adCode: '/1055314/OTTPLAY_WAP_Home/OTTPLAY_WAP_Home_4_Mrec',
      page: 'home',
      position: 'after every 3 widgets',
    },
    item3: {
      id: 'div-gpt-ad-mob-1618249298405-3',
      sizes: AD_SIZES.SMALL_SQUARE,
      adCode: '/1055314/OTTPLAY_WAP_Home/OTTPLAY_WAP_Home_1_Mrec',
      page: 'movie/show detail page',
      position: 'hidden ad(run if premium)-below the trailer blue line',
    },
    item4: {
      id: 'div-gpt-ad-1618249298405-4',
      sizes: AD_SIZES.LEADERBOARD,
      adCode: '/1055314/OTTPLAY_Desktop_Home/OTTPLAY_Desk_Home_3_Billboard',
      page: 'home',
      position: 'below prime video patakas',
    },
    item5: {
      id: 'div-gpt-ad-1618249298405-5',
      sizes: AD_SIZES.LEADERBOARD,
      adCode: '/1055314/OTTPLAY_Desktop_Home/OTTPLAY_Desk_Home_4_Billboard',
      page: 'home',
      position: 'below reviews',
    },
    item6: {
      id: 'div-gpt-ad-1618249298405-6',
      sizes: AD_SIZES.LEADERBOARD,
      adCode: '/1055314/OTTPLAY_Desktop_Home/OTTPLAY_Desk_Home_5_Billboard',
      page: 'home',
      position: 'below Listicles',
    },
    item7: {
      id: 'div-gpt-ad-1618249298405-7',
      sizes: AD_SIZES.LARGE_LEADERBOARD,
      adCode: '/1055314/OTTPLAY_Desktop_Section/OTTPLAY_Desk_Section_Masthead',
      page: 'foryou',
      position: 'before the header',
    },
    item8: {
      id: 'div-gpt-ad-1618249298405-8',
      sizes: AD_SIZES.LARGE_LEADERBOARD,
      adCode:
        '/1055314/OTTPLAY_Desktop_Section/OTTPLAY_Desk_Section_2_Billboard',
      page: 'foryou',
      position: 'ads after every 2 rows',
    },
    item9: {
      id: 'div-gpt-ad-1618249298405-9',
      sizes: AD_SIZES.INLINE_RECTANGLE,
      adCode: '/1055314/OTTPLAY_Desktop_Story/OTTPLAY_Desk_Story_1_Mrec',
      page: 'movie/show detail Page',
      position: 'next to where to watch(right side)',
    },
    item10: {
      id: 'div-gpt-ad-1618249298405-10',
      sizes: AD_SIZES.LEADERBOARD,
      adCode: '/1055314/OTTPLAY_Desktop_Story/OTTPLAY_Desk_Story_2_Billboard',
      page: 'movie/show detail Page',
      position: 'below cast & crew widget',
    },
    item11: {
      id: 'div-gpt-ad-1618249298405-11',
      sizes: AD_SIZES.LARGE_LEADERBOARD,
      adCode: '/1055314/OTTPLAY_Desktop_Story/OTTPLAY_Desk_Story_3_Billboard',
      page: 'news listing',
      position: 'before the header',
    },
    item12: {
      id: 'div-gpt-ad-1618249298405-12',
      sizes: AD_SIZES.LARGE_LEADERBOARD,
      adCode: '/1055314/OTTPLAY_Desktop_Story/OTTPLAY_Desk_Story_4_Billboard',
      page: 'review/news/listicle/interview detail page',
      position: 'before the header',
    },
    item13: {
      id: 'div-gpt-ad-1618249298405-13',
      sizes: AD_SIZES.INLINE_RECTANGLE,
      adCode: '/1055314/OTTPLAY_Desktop_Story/OTTPLAY_Desk_Story_3_Mrec',
      page: 'review/news/listicle/interview detail page',
      position: 'before the header',
    },
    mobile: {
      item0: {
        id: 'div-gpt-ad-mob-1618249298405-0',
        sizes: AD_SIZES.INLINE_RECTANGLE,
        adCode: '/1055314/OTTPLAY_WAP_Home/OTTPLAY_WAP_Home_2_Mrec',
        page: 'home',
        position: 'below featured widget',
      },
      item1: {
        id: 'div-gpt-ad-mob-1618249298405-1',
        sizes: AD_SIZES.INLINE_RECTANGLE,
        adCode: '/1055314/OTTPLAY_WAP_Home/OTTPLAY_WAP_Home_3_Mrec',
        page: 'home',
        position: 'after editors choice',
      },
      item2: {
        id: 'div-gpt-ad-mob-1618249298405-2',
        sizes: AD_SIZES.INLINE_RECTANGLE,
        adCode: '/1055314/OTTPLAY_WAP_Home/OTTPLAY_WAP_Home_4_Mrec',
        page: 'home',
        position: 'after every 3 widgets',
      },
      item3: {
        id: 'div-gpt-ad-mob-1618249298405-3',
        sizes: AD_SIZES.SMALL_SQUARE,
        adCode: '/1055314/OTTPLAY_WAP_Home/OTTPLAY_WAP_Home_1_Mrec',
        page: 'movie/show detail page',
        position: 'hidden ad(run if premium)-below the trailer blue line',
      },
      item4: {
        id: 'div-gpt-ad-1618249298405-4',
        sizes: AD_SIZES.LEADERBOARD,
        adCode: '/1055314/OTTPLAY_Desktop_Home/OTTPLAY_Desk_Home_3_Billboard',
        page: 'home',
        position: 'below prime video patakas',
      },
      item5: {
        id: 'div-gpt-ad-1618249298405-5',
        sizes: AD_SIZES.LEADERBOARD,
        adCode: '/1055314/OTTPLAY_Desktop_Home/OTTPLAY_Desk_Home_4_Billboard',
        page: 'home',
        position: 'below reviews',
      },
      item6: {
        id: 'div-gpt-ad-1618249298405-6',
        sizes: AD_SIZES.LEADERBOARD,
        adCode: '/1055314/OTTPLAY_Desktop_Home/OTTPLAY_Desk_Home_5_Billboard',
        page: 'home',
        position: 'below Listicles',
      },
      item7: {
        id: 'div-gpt-ad-1618249298405-7',
        sizes: AD_SIZES.LARGE_LEADERBOARD,
        adCode:
          '/1055314/OTTPLAY_Desktop_Section/OTTPLAY_Desk_Section_Masthead',
        page: 'foryou',
        position: 'before the header',
      },
      item8: {
        id: 'div-gpt-ad-1618249298405-8',
        sizes: AD_SIZES.LARGE_LEADERBOARD,
        adCode:
          '/1055314/OTTPLAY_Desktop_Section/OTTPLAY_Desk_Section_2_Billboard',
        page: 'foryou',
        position: 'ads after every 2 rows',
      },
      item9: {
        id: 'div-gpt-ad-1618249298405-9',
        sizes: AD_SIZES.INLINE_RECTANGLE,
        adCode: '/1055314/OTTPLAY_Desktop_Story/OTTPLAY_Desk_Story_1_Mrec',
        page: 'movie/show detail Page',
        position: 'next to where to watch(right side)',
      },
      item10: {
        id: 'div-gpt-ad-1618249298405-10',
        sizes: AD_SIZES.LEADERBOARD,
        adCode: '/1055314/OTTPLAY_Desktop_Story/OTTPLAY_Desk_Story_2_Billboard',
        page: 'movie/show detail Page',
        position: 'below cast & crew widget',
      },
      item11: {
        id: 'div-gpt-ad-1618249298405-11',
        sizes: AD_SIZES.LARGE_LEADERBOARD,
        adCode: '/1055314/OTTPLAY_Desktop_Story/OTTPLAY_Desk_Story_3_Billboard',
        page: 'news listing',
        position: 'before the header',
      },
      item12: {
        id: 'div-gpt-ad-1618249298405-12',
        sizes: AD_SIZES.LARGE_LEADERBOARD,
        adCode: '/1055314/OTTPLAY_Desktop_Story/OTTPLAY_Desk_Story_4_Billboard',
        page: 'review/news/listicle/interview detail page',
        position: 'before the header',
      },
      item13: {
        id: 'div-gpt-ad-1618249298405-13',
        sizes: AD_SIZES.INLINE_RECTANGLE,
        adCode: '/1055314/OTTPLAY_Desktop_Story/OTTPLAY_Desk_Story_3_Mrec',
        page: 'review/news/listicle/interview detail page',
        position: 'before the header',
      },
      mobile: {
        item0: {
          id: 'div-gpt-ad-mob-1618249298405-0',
          sizes: AD_SIZES.INLINE_RECTANGLE,
          adCode: '/1055314/OTTPLAY_WAP_Home/OTTPLAY_WAP_Home_2_Mrec',
          page: 'home',
          position: 'below featured widget',
        },
        item1: {
          id: 'div-gpt-ad-mob-1618249298405-1',
          sizes: AD_SIZES.INLINE_RECTANGLE,
          adCode: '/1055314/OTTPLAY_WAP_Home/OTTPLAY_WAP_Home_3_Mrec',
          page: 'home',
          position: 'after editors choice',
        },
        item2: {
          id: 'div-gpt-ad-mob-1618249298405-2',
          sizes: AD_SIZES.INLINE_RECTANGLE,
          adCode: '/1055314/OTTPLAY_WAP_Home/OTTPLAY_WAP_Home_4_Mrec',
          page: 'home',
          position: 'after every 3 widgets',
        },
        item3: {
          id: 'div-gpt-ad-mob-1618249298405-3',
          sizes: AD_SIZES.SMALL_SQUARE,
          adCode: '/1055314/OTTPLAY_WAP_Home/OTTPLAY_WAP_Home_1_Mrec',
          page: 'movie/show detail page',
          position: 'hidden ad(run if premium)-below the trailer blue line',
        },
      },
    },
  },
};

export const NEWS_TYPE = {
  interviews: 'interviews',
  news: 'news',
  reviews: 'reviews',
};
