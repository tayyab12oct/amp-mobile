import { FETCH_POLICY } from '../../utils/constants';
import api from './queries';

const logerror = api.logError;

export const auth = () => {};
export const webfoxstore = () => {};

export const getAllMovies: any = async (params: any) => {
  const res = await api.getMoviesList(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};

export const getAllShows: any = async (params: any) => {
  const res = await api.getShowsList(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};

// export const getAllRecommendedMovies: any = async (params: any) => {
//   const res = await api.getRecommendedList(params).catch((e) => {
//     logerror(e);
//     return { data: null, error: e };
//   });

//   const val: any = res ? res.data : null;

//   return { data: val ? val.data : null, error: null };
// };

// export const getAllWatchlistMovies: any = async (params: any) => {
//   const res = await api.getWatchlistMoviesList(params).catch((e) => {
//     logerror(e);
//     return { data: null, error: e };
//   });

//   const val: any = res ? res.data : null;

//   return { data: val ? val.data : null, error: null };
// };

export const getMoviesDetailsList: any = async (params: any) => {
  const res = await api.getMoviesDetailsList(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;

  return { data: val ? val.data : null, error: null };
};

export const getAllLanguageList: any = async (params: any) => {
  const res = await api.getLanguages(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });
  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};

export const getAllGenresList: any = async (params: any) => {
  const res = await api.getGenres(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });
  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};

export const getAllProviderList: any = async (params: any) => {
  const res = await api.getProvidersList(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};

export const getAllOnboardingList: any = async (params: any) => {
  const res = await api.getOnboardingList(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};

export const getAllTrailers: any = async (params: any) => {
  const res = await api.getTrailers(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};

export const getAllCrew: any = async (params: any) => {
  const res = await api.getCrew(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};

export const getCrewOnboardingList: any = async (params: any) => {
  const res = await api.getCrewOnboardingList(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};

export const getCastOnboardingList: any = async (params: any) => {
  const res = await api.getCastOnboardingList(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};

export const getAllTrendingSearch: any = async (params: any) => {
  const res = await api.getTrendingSearch(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};

export const getAllSearch: any = async (id: any, params: any) => {
  const res = await api.getAllSearchItem(id, params).catch((e) => {
    logerror(e);
    return { data: [], error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};

export const postAllLikesMovie: any = async (params: any) => {
  const res = await api.postLikedMovie(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};

export const postAllDislikedMovie: any = async (params: any) => {
  const res = await api.postDislikedMovie(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};

// export const CastDetail: any = async (params: any) => {
//   const res = await api.castDetails(params).catch((e) => {
//     logerror(e);
//     return { data: null, error: e };
//   });

//   const val: any = res ? res.data : null;
//   return { data: val ? val.data : null, error: null };
// };

export const getShowDetailsList: any = async (params: any) => {
  const res = await api.getShowDetailsList(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};

export const episodeList: any = async (params: any) => {
  const res = await api.getEpisodeList(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};

export const getSimilarMovies: any = async (params: any) => {
  const res = await api.postSimilarMovies(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};

export const getRecommendedMovies: any = async (params: any) => {
  const res = await api.postRecommendedMovies(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};
export const getRefinedRecommendedMovies: any = async (params: any) => {
  const res = await api.postRefinedRecommendedMovies(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};
// export const getCastDetail: any = async (params: any) => {
//   const res = await api.castDetails(params).catch((e) => {
//     logerror(e);
//     return { data: null, error: e };
//   });

//   const val: any = res ? res.data : null;
//   return { data: val ? val.data : null, error: null };
// };

export const getCrewDetail: any = async (params: any) => {
  const res = await api.crewDetail(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};

export const getCriticsReview: any = async (params: any) => {
  const res = await api.criticsReview(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};

export const getCriticsReviewDetails: any = async (params: any) => {
  const res = await api.getCriticsReviewDetails(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};

export const postREAnalytics: any = async (params: any) => {
  const res = await api.postREAnalytics(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};

export const getSectionList: any = async (params: any) => {
  const res = await api.getSectionList(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};

export const getSectionData: any = async (params: any) => {
  const res = await api.getSectionData(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};
export const getDocumentaryMovies: any = async (params: any) => {
  const res = await api.getDocumentaryMovies(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};
export const getFreeMovies: any = async (params: any) => {
  const res = await api.getFreeMovies(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};
export const getTrendingMovies: any = async (params: any) => {
  const res = await api.getTrendingMovies(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};
export const getTimetokillMovies: any = async (params: any) => {
  const res = await api.getTimetokillMovies(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};
export const getRecentlyPlayedMovies: any = async (params: any) => {
  const res = await api.getRecentlyPlayedMovies(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};
export const getPrimeVideoPatakas: any = async (params: any) => {
  const res = await api.getPrimeVideoPatakas(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};
export const getPicksFromNetflix: any = async (params: any) => {
  const res = await api.getPicksFromNetflix(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};
export const getHotOnHotstar: any = async (params: any) => {
  const res = await api.getHotOnHotstar(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};

export const getProfileData: any = async (params: any) => {
  const res = await api.getProfileData(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};

// News-code
export const getAllNews: any = async (params: any) => {
  const res = await api.getAllNews(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};

export const getWidgetNews: any = async (params: any) => {
  const res = await api.getWidgetNews(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};

export const getNews: any = async (params: any) => {
  const res = await api.getNews(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};

export const getNewsDetails: any = async (params: any) => {
  const res = await api.getNewsDetails(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};

export const getListicleList: any = async (params: any) => {
  const res = await api.getListicleList(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};

export const getListicleDetails: any = async (params: any) => {
  const res = await api.getListicleDetails(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};

export const getHomeWidgetList: any = async (params: any) => {
  const res = await api.getHomeWidgetList(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};
export const getProfileSelectedData: any = async (params: any) => {
  const res = await api.getProfileSelectedData(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};

export const getWidgets: any = async (params: any) => {
  const res = await api.getWidgets(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};
export const updateProfileSelectedData: any = async (params: any) => {
  const res = await api.updateProfileSelectedData(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};

export const getWidgetData: any = async (params: any, endpoint: any) => {
  const res = await api.getWidgetData(params, endpoint).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};

export const clearCacheData: any = async () => {
  const res = await api.clearCacheData().catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  return { data: val ? val.data : null, error: null };
};
