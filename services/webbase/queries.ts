import cookie from 'react-cookies';
import { device_UUID } from '../../utils/constants';
import webfox from './initialize';
// async function throwAnError() {
//   throw new Error('Oops!');
// }
const _ht_clientid = cookie.load('_ht_clientid');
const logError = (error) => {
  // eslint-disable-next-line no-console
  console.log('system error: ', error);
  // return 42;
};

// const exec = async (fn, params = null, error = null) => {
//   const res = {
//     data: null,
//     error: null,
//     syserror: null,
//   }

//   // const {response, e} = await fn(params);
//   // res.data = response;
//   // res.error = e;
//   // console.log(">>> response >>> " + response, );
//   // return res;

//   const response = await fn(params).catch((e) => {
//     logError(e)
//     res.error = error;
//     res.syserror = e;
//   })
//   console.log('paramss', params)
//   //console.log(">>> response >>> " + JSON.stringify(response));
//   if (response) {
//     res.data = response;
//   }
//   return res;
// };
// Add a request interceptor to set the Auth Token
webfox.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = 'Bearer ' + process.env.REACT_APP_KEY;
    config.headers.unique_id = device_UUID;
    config.headers.device_id = device_UUID;
    config.headers.user_id = _ht_clientid ? _ht_clientid : '';
    config.headers.client_id = _ht_clientid ? _ht_clientid : '';
    config.headers.auth = cookie.load('token') ? cookie.load('token') : '';
    config.headers.deviceType =
      typeof window !== 'undefined' && window.screen.width > 600
        ? 'web'
        : 'wap';
    return config;
  },
  (error) => Promise.reject(error)
);
const exec = async (fn, params = null, error = null) => {
  const res = {
    data: null,
    error: null,
    syserror: null,
  };

  await fn(params)
    .then((response) => {
      res.data = response;
    })
    .catch((err) => {
      if (err.response) {
        res.error = err.response;
      } else if (err.request) {
        res.error = err.request;
      } else {
        res.error = err;
      }
    });

  return res;
};

export const getMoviesList = (params) =>
  exec(() => {
    return webfox.get('v3.1/web/movie', { params });
  });

export const getShowsList = (params) =>
  exec(() => {
    return webfox.get('v3.1/web/show', { params });
  });

export const getMoviesDetailsList = (params) =>
  exec(() => {
    return webfox.get(`v3.1/web/movie/seo/url`, { params });
  });

export const getLanguages = (params) =>
  exec(() => {
    return webfox.get('v3/web/ranking', { params });
  });

export const getGenres = (params) =>
  exec(() => {
    return webfox.get('v3/web/genre', { params });
  });

export const getCastOnboardingList = (params) =>
  exec(() => {
    return webfox.get('v3/web/ranking', { params });
  });

export const getCrewOnboardingList = (params) =>
  exec(() => {
    return webfox.get('v3/web/ranking', { params });
  });

export const getProvidersList = (params) =>
  exec(() => {
    return webfox.get('v3/web/ranking', { params });
  });

export const getOnboardingList = (params) =>
  exec(() => {
    return webfox.get('v3/web/onboard', { params });
  });

export const getTrailers = (params) =>
  exec(() => {
    return webfox.get('v3/web/trailer/', { params });
  });

export const getCrew = (params) =>
  exec(() => {
    return webfox.get('v3/web/crew/', { params });
  });

export const getTrendingSearch = (params) =>
  exec(() => {
    return webfox.get('v3/web/trending', { params });
  });

export const getAllSearchItem = (id, params) =>
  exec(() => {
    return webfox.get(`v3.1/web/search/${id}`, { params });
  });

export const postLikedMovie = (params) =>
  exec(() => {
    return webfox.post(`v3/web/movie/like?${JSON.stringify(params)}`, {});
  });

export const postDislikedMovie = (params) =>
  exec(() => {
    return webfox.post(`v3/web/movie/dislike?${JSON.stringify(params)}`, {});
  });

// export const castDetails = (params) =>
//   exec(() => {
//     return webfox.get(`v3/cast/`, { params });
//   });

export const getSectionList = (params) =>
  exec(() => webfox.get('/v3/web/ranking/section', { params }));

export const getSectionData = (params) =>
  exec(() => webfox.get('/v3/web/ranking', { params }));

export const getDocumentaryMovies = (params) =>
  exec(() => webfox.post('v3/web/recommend/v1/discover/documentary', params));

export const getFreeMovies = (params) =>
  exec(() => webfox.post('v3/web/recommend/v1/discover/free', params));

export const getTrendingMovies = (params) =>
  exec(() => webfox.post('v3/web/recommend/v1/discover/trending', params));

export const getTimetokillMovies = (params) =>
  exec(() => webfox.post('v3/web/recommend/v1/discover/timetokill', params));

export const getRecentlyPlayedMovies = (params) =>
  exec(() => webfox.post('v3/web/recommend/get-recently-played', params));

export const getPrimeVideoPatakas = (params) =>
  exec(() => webfox.post('v3/web/recommend/get-prime-video-patakas', params));

export const getPicksFromNetflix = (params) =>
  exec(() => webfox.post('v3/web/recommend/get-picks-from-netflix', params));

export const getHotOnHotstar = (params) =>
  exec(() => webfox.post('v3/web/recommend/get-hot-on-hotstar', params));

export const getShowDetailsList = (params) =>
  exec(() => {
    return webfox.get(`v3.1/web/show/seo/url`, { params });
  });

export const getEpisodeList = (params) =>
  exec(() => {
    return webfox.get(`v3/web/episode/seo/url`, { params });
  });

export const postSimilarMovies = (data) =>
  exec(() => {
    return webfox.post(`v3/web/recommend/v1/similar/movies`, data.query);
  });

export const postRecommendedMovies = (params) =>
  exec(() => {
    return webfox.post(`v3/web/recommend/v2/filter/movies`, params.query);
  });

// export const castDetail = (params) =>
//   exec(() => {
//     return webfox.get(`v3/web/cast/seo/url`, { params });
//   });

export const crewDetail = (params) =>
  exec(() => {
    return webfox.get(`v3.1/web/cast/seo/url/people`, { params });
  });

export const criticsReview = (params) =>
  exec(() => {
    return webfox.get('/web/recommend/v1.3/news/details', { params });
  });

export const postREAnalytics = (params) =>
  exec(() => {
    return webfox.post(`v3/web/analytics/`, params);
  });

// export const getProfileData = (params) =>
//   exec(() => {
//     return webfox.post('/v3/web/user/login', params.user);
//   });
export const getProfileData = (params) =>
  exec(() => {
    return webfox.post('/v3/web/user/auth/login', params.user);
  });

export const getProfileSelectedData = (params) =>
  exec(() => {
    return webfox.get(`/v3/web/user/auth/data/${params}`);
  });

export const updateProfileSelectedData = (params) =>
  exec(() => {
    return webfox.put('/v3/web/user/auth/preferred-data', params.data);
  });

export const postRefinedRecommendedMovies = (params) =>
  exec(() => {
    return webfox.post(`v3/web/recommend/v2.9/filter/movies`, params.query);
  });

//   News-code
export const getAllNews = (params) =>
  exec(() => {
    return webfox.post('/v3/web/recommend/v1.3/news/listing', params.data);
  });

export const getWidgetNews = (params) =>
  exec(() => {
    return webfox.post('/v3/web/recommend/v1.3/news/home', params.data);
  });

export const getNews = (params) =>
  exec(() => {
    return webfox.post(
      '/v3.1/web/recommend/v1.3/news/source/content/home',
      params
    );
  });

export const getNewsDetails = (params) =>
  exec(() => {
    return webfox.get(`v3/web/news/seo/url`, { params });
  });

export const getCriticsReviewDetails = (params) =>
  exec(() => {
    return webfox.get(`/v3/web/review/seo/url`, { params });
  });

export const getListicleList = (params) =>
  exec(() => {
    return webfox.get(`/v3/web/listicle/list`, { params });
  });

export const getListicleDetails = (params) =>
  exec(() => {
    return webfox.get(`/v3/web/listicle/seo/url`, { params });
  });

export const getHomeWidgetList = (params) =>
  exec(() => {
    return webfox.get(`/v3.1/web/widget/list/`, { params });
  });

export const getWidgets = (param) =>
  exec(() => {
    const params = param.data;
    return webfox.get(`${param.endpoint}`, { params });
  });

// export const getWidgetData = (params, endpoint) => {
//   console.log('endpointBBBB', endpoint);
//   exec(() => {
//     return webfox.get(`${endpoint}`, { params });
//   });
// };

// const getWidgetData = (params) => {
//   exec(() => {
//     return webfox.get('/v3/web/ranking', { params });
//   });
// };

const getWidgetData = (params, endpoint) =>
  exec(() => {
    return webfox.get(endpoint, { params });
  });

export const clearCacheData = () =>
  exec(() => webfox.get('v2/web/cache/clear-all'));

export default {
  getMoviesList,
  getShowsList,
  getMoviesDetailsList,
  getLanguages,
  getGenres,
  getProvidersList,
  getOnboardingList,
  logError,
  getTrailers,
  getCrew,
  getCrewOnboardingList,
  getCastOnboardingList,
  getTrendingSearch,
  getAllSearchItem,
  postLikedMovie,
  getShowDetailsList,
  getEpisodeList,
  postSimilarMovies,
  postRecommendedMovies,
  crewDetail,
  postDislikedMovie,
  criticsReview,
  postREAnalytics,
  getSectionList,
  getSectionData,
  getDocumentaryMovies,
  getFreeMovies,
  getTrendingMovies,
  getTimetokillMovies,
  getRecentlyPlayedMovies,
  getPrimeVideoPatakas,
  getPicksFromNetflix,
  getHotOnHotstar,
  getProfileData,
  postRefinedRecommendedMovies,
  // News-code
  getAllNews,
  getWidgetNews,
  getNewsDetails,
  getNews,
  getCriticsReviewDetails,
  getListicleList,
  getListicleDetails,
  getHomeWidgetList,
  getWidgets,
  getProfileSelectedData,
  updateProfileSelectedData,
  getWidgetData,
  clearCacheData,
};
