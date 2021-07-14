import { LOCALSTORAGE_KEY_CONSTANTS } from '../../utils/constants';

export default {
  photosBrowser: {
    data: [],
  },
  home: {
    sections: [],
    featured: [],
  },
  moviesList: {
    data: [],
    loading: false,
    loadMore: false,
    nextPage: 0,
    lastPage: 0,
  },

  showList: {
    data: [],
    loading: false,
    loadMore: false,
    nextPage: 0,
    lastPage: 0,
  },

  movieDetailsList: {
    data: [],
    loading: false,
    loadMore: false,
    nextPage: 0,
    lastPage: 0,
  },

  getLanguage: {
    data: [],
    loading: false,
    loadMore: false,
    nextPage: 0,
    lastPage: 0,
  },

  getPhotos: {
    data: [],
  },

  getTrailer: {
    data: [],
    loading: false,
    loadMore: false,
    nextPage: 0,
    lastPage: 0,
  },

  getCrew: {
    data: [],
    loading: false,
    loadMore: false,
    nextPage: 0,
    lastPage: 0,
  },

  postLikedMovie: {
    data: [],
  },

  recents: {
    history: [],
  },

  recommendedMovies: {
    data: [],
    loading: false,
    loadMore: false,
    nextPage: 0,
    lastPage: 0,
  },

  postSimilarMovies: {
    data: [],
  },

  postSimilarShows: {
    data: [],
  },

  castDetail: {
    data: [],
    loading: false,
    loadMore: false,
  },

  crewDetail: {
    data: [],
    loading: false,
    loadMore: false,
  },

  onboardingMovies: {
    data: [],
    loading: false,
    loadMore: false,
    nextPage: 0,
    lastPage: 0,
  },
  recommendations: {
    data: [],
    filteredData: [],
    refine: false,
    loading: false,
    nextPage: 0,
    lastPage: 0,
    loadMore: false,
    applyFilter: true,
  },

  addedToWatchlist: {
    watchlistData: [],
  },

  watchlistArr: {
    watchlistArr: [],
  },

  likeArr: {
    liked:
      JSON.parse(
        typeof window !== 'undefined' &&
          typeof window !== 'undefined' &&
          localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LIKED_DATA_OBJ)
      ) || [],
    unlike: true,
  },

  episodeSeason: {
    season: [],
    selected: 1,
  },

  hideMovie: {
    hidden: [],
  },

  dislikedMovie: {
    dislike:
      JSON.parse(
        typeof window !== 'undefined' &&
          localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.UNLIKED_DATA_OBJ)
      ) || [],
    like: true,
    //close: false
  },
  likedMovieCard: {
    liked:
      JSON.parse(
        typeof window !== 'undefined' &&
          localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LIKED_DATA_IDS)
      ) || [],
    liked_obj:
      JSON.parse(
        typeof window !== 'undefined' &&
          localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LIKED_DATA_OBJ)
      ) || [],
    disliked_obj:
      JSON.parse(
        typeof window !== 'undefined' &&
          localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.UNLIKED_DATA_OBJ)
      ) || [],
    select: '',
    likedName: [],
    disliked:
      JSON.parse(
        typeof window !== 'undefined' &&
          localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.UNLIKED_DATA_IDS)
      ) || [],
    dislikedName: [],
    likedLang_MovieIDArr:
      JSON.parse(
        typeof window !== 'undefined' &&
          localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANG_LIKED_DATA_IDS)
      ) || [],
    unlikedLang_MovieIDArr:
      JSON.parse(
        typeof window !== 'undefined' &&
          localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANG_UNLIKED_DATA_IDS)
      ) || [],
  },

  watchlist: {
    data: [],
    loading: false,
    page: 1,
    loadMore: false,
  },

  showDetailsList: {
    data: [],
    loading: false,
    loadMore: false,
    nextPage: 0,
    lastPage: 0,
  },

  episodeList: {
    data: [],
    loading: false,
    loadMore: false,
    nextPage: 0,
    lastPage: 0,
  },

  userProfile: {
    isLogin: false,
    first_name: '',
    last_name: '',
    name: '',
    emailId: '',
    profile_image_url: '',
    likedMoviesOrShows: [],
    reviewedMoviesOrShows: [],
    hiddenMoviesOrShows: [],
  },
  languages: {
    data: [],
    selectedLanguages: [],
    toggle: false,
    name:
      JSON.parse(
        typeof window !== 'undefined' &&
          localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES)
      ) || [],
  },

  selectALL: {
    all: [],
  },
  ottProviders: {
    data: [],
    selectedProviders: [],
    totalCount: 0,
    nextPage: 0,
  },

  genreList: {
    data: [],
    selectedGenres: [],
  },

  genres: {
    data: [],
    selectedGenres: [],
    toggle: false,
    name:
      JSON.parse(
        typeof window !== 'undefined' &&
          localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.GENRES_NAMES)
      ) || [],
  },

  castList: {
    data: [],
  },

  cast: {
    data: [],
    selectedCast:
      JSON.parse(
        typeof window !== 'undefined' &&
          localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.CAST_IDS)
      ) || [],
    toggle: false,
    name:
      JSON.parse(
        typeof window !== 'undefined' &&
          localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.CAST_NAMES)
      ) || [],
  },

  crewList: {
    data: [],
  },

  crew: {
    data: [],
    selectedCrew:
      JSON.parse(
        typeof window !== 'undefined' &&
          localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.CREW_IDS)
      ) || [],
    toggle: false,
    name:
      JSON.parse(
        typeof window !== 'undefined' &&
          localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.CREW_NAMES)
      ) || [],
  },

  trending: {
    data: [],
    loading: false,
    page: 1,
    loadMore: false,
  },
  recentSearch: {
    data: [],
    loading: false,
    page: 1,
    loadMore: false,
  },
  trendingSearch: {
    data: [],
    loading: false,
    //page: 1,
    loadMore: false,
  },

  allSearch: {
    data: [],
    loading: false,
    loadMore: false,
  },

  castDetails: {
    data: [],
    loading: false,
    //page: 1,
    loadMore: false,
  },

  streamingServices: {
    data: [],
    selectedStreamingServices:
      JSON.parse(
        typeof window !== 'undefined' &&
          localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_IDS)
      ) || [],
    name:
      JSON.parse(
        typeof window !== 'undefined' &&
          localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_NAMES)
      ) || [],
    toggle: false,
  },
  refineGenres: {
    data: [],
    selectedRefineGenres: [],
  },
  rating: {
    data: [],
    selectedRating: [],
  },
  contentType: {
    data: [],
    selectedContentType: [],
  },
  free_paid: {
    data: [],
    selectedFree_Paid: [],
  },
  airdate: {
    data: [],
    selectedAirdate: [],
  },
  quality: {
    data: [],
    selectedQuality: [],
  },
  price: {
    data: [],
    selectedPrice: [],
  },
  runtime_min: {
    data: [],
    selectedRuntime_min: [],
  },
  contentRating: {
    data: [],
    selectedContentRating: [],
  },
  releaseYear: {
    data: [],
    selectedReleaseYear: [],
  },
  cookie_user_data: {
    data: {},
  },
  refine: {
    loading: false,
    forYou: {
      filter: {
        selectedLanguages: [],
        selectedGenres: [],
        selectedStreamingServices: [],
        selectedFreePaid: [],
        selectedQuality: [],
        selectedContentType: [],
        selectedRuntimeMin: [],
        selectedContentRating: [],
      },
      refineForYou: false,
      unSelectedAllLanguages: false,
      unSelectedAllGenres: false,
      unSelectedAllStreams: false,
      selectedAllLanguages: false,
      selectedAllStreams: false,
      selectedAllGenres: false,
      unSelectedAllFreePaid: false,
      selectedAllFreePaid: false,
      unSelectedAllQuality: false,
      selectedAllQuality: false,
      unSelectedAllContentType: false,
      selectedAllContentType: false,
      unSelectedAllRuntimeMin: false,
      selectedAllRuntimeMin: false,
      unSelectedAllContentRating: false,
      selectedAllContentRating: false,
      selectedStreamingServices: [],
      selectedStreamingServicesName: [],
      selectedGenres: [],
      selectedGenresName: [],
      selectedLanguages: [],
      selectedFreePaid: [],
      selectedQuality: [],
      selectedContentType: [],
      selectedRuntimeMin: [],
      selectedRuntimeMin2: [],
      selectedContentRating: [],
    },
    news: {
      filter: {
        selectedSource: '',
      },
      refineSource: false,
      selectedSource: '',
      unSelectedAllSource: false,
      selectedAllSource: false,
    },
  },
  seeAllEpisodesParams:
    JSON.parse(
      typeof window !== 'undefined' &&
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.SEEALL_EPISODE_OBJ)
    ) || {},

  movieNavFilter:
    JSON.parse(
      typeof window !== 'undefined' &&
        localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.MOVIE_NAV_FILTER_OBJ)
    ) || {},
};
