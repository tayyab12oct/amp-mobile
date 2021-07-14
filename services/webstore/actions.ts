// Action constants

export default {
  INITIATE_FETCH_MOVIES: 'INITIATE_FETCH_MOVIES',
  FETCH_MOVIES_SUCCESS: 'FETCH_MOVIES_SUCCESS',
  FETCH_MOVIES_FAILURE: 'FETCH_MOVIES_FAILURE',

  INITIATE_FETCH_SHOWS: 'INITIATE_FETCH_SHOWS',
  FETCH_SHOWS_SUCCESS: 'FETCH_SHOWS_SUCCESS',
  FETCH_SHOWS_FAILURE: 'FETCH_SHOWS_FAILURE',

  INITIATE_FETCH_WATCHLIST_MOVIES: 'INITIATE_FETCH_WATCHLIST_MOVIES',
  FETCH_WATCHLIST_MOVIES_SUCCESS: 'FETCH_MOVIES_WATCHLIST_SUCCESS',
  FETCH_WATCHLIST_MOVIES_FAILURE: 'FETCH_MOVIES_WATCHLIST_FAILURE',

  INITIATE_MOVIES_DETAILS_LIST: 'INITIATE_MOVIES_DETAILS_LIST',
  FETCH_MOVIES_DETAILS_LIST_SUCCESS: 'FETCH_MOVIES_DETAILS_LIST_SUCCESS',
  FETCH_MOVIES_DETAILS_LIST_FAILURE: 'FETCH_MOVIES_DETAILS_LIST_FAILURE',

  INITIATE_LANGUAGE_LIST: 'INITIATE_LANGUAGE_LIST',
  FETCH_LANGUAGE_LIST_SUCCESS: 'FETCH_LANGUAGE_LIST_SUCCESS',
  FETCH_LANGUAGE_LIST_FAILURE: 'FETCH_LANGUAGE_LIST_FAILURE',

  INITIATE_GENRES_LIST: 'INITIATE_GENRES_LIST',
  FETCH_GENRES_LIST_SUCCESS: 'FETCH_GENRES_LIST_SUCCESS',
  FETCH_GENRES_LIST_FAILURE: 'FETCH_GENRES_LIST_FAILURE',

  INITIATE_CAST_LIST: 'INITIATE_CAST_LIST',
  FETCH_CAST_LIST_SUCCESS: 'FETCH_CAST_LIST_SUCCESS',
  FETCH_CAST_LIST_FAILURE: 'FETCH_CAST_LIST_FAILURE',

  INITIATE_CREW_LIST: 'INITIATE_CREW_LIST',
  FETCH_CREW_LIST_SUCCESS: 'FETCH_CREW_LIST_SUCCESS',
  FETCH_CREW_LIST_FAILURE: 'FETCH_CREW_LIST_FAILURE',

  INITIATE_PROVIDER_LIST: 'INITIATE_PROVIDER_LIST',
  FETCH_PROVIDER_LIST_SUCCESS: 'FETCH_PROVIDER_LIST_SUCCESS',
  FETCH_PROVIDER_LIST_FAILURE: 'FETCH_PROVIDER_LIST_FAILURE',

  INITIATE_FETCH_ONBOARDING_MOVIES: 'INITIATE_FETCH_ONBOARDING_MOVIES',
  FETCH_ONBOARDING_MOVIES_SUCCESS: 'FETCH_ONBOARDING_MOVIES_SUCCESS',
  FETCH_ONBOARDING_MOVIES_FAILURE: 'FETCH_ONBOARDING_MOVIES_FAILURE',

  INITIATE_FETCH_TRAILER_MOVIES: 'INITIATE_FETCH_TRAILER_MOVIES',
  FETCH_TRAILER_MOVIES_SUCCESS: 'FETCH_TRAILER_MOVIES_SUCCESS',
  FETCH_TRAILER_MOVIES_FAILURE: 'FETCH_TRAILER_MOVIES_FAILURE',

  INITIATE_EPISODE_LIST: 'INITIATE_EPISODE_LIST',
  FETCH_EPISODE_LIST_SUCCESS: 'FETCH_EPISODE_LIST_SUCCESS',
  FETCH_EPISODE_LIST_FAILURE: 'FETCH_EPISODE_LIST_FAILURE',

  INITIATE_FETCH_CREW_DETAILS: 'INITIATE_FETCH_CREW_DETAILS',
  FETCH_CREW_DETAILS_SUCCESS: 'FETCH_CREW_DETAILS_SUCCESS',
  FETCH_CREW_DETAILS_FAILURE: 'FETCH_CREW_DETAILS_FAILURE',

  INITIATE_TRENDING_SEARCH: 'INITIATE_TRENDING_SEARCH',
  FETCH_TRENDING_SEARCH_SUCCESS: 'FETCH_TRENDING_SEARCH_SUCCESS',
  FETCH_TRENDING_SEARCH_FAILURE: 'FETCH_TRENDING_SEARCH_FAILURE',

  INITIATE_ALL_SEARCH: 'INITIATE_ALL_SEARCH',
  FETCH_ALL_SEARCH_SUCCESS: 'FETCH_ALL_SEARCH_SUCCESS',
  FETCH_ALL_SEARCH_FAILURE: 'FETCH_ALL_SEARCH_FAILURE',

  INITIATE_LIKED_MOVIE: 'INITIATE_LIKED_MOVIE',
  POST_LIKED_MOVIE_SUCCESS: 'POST_LIKED_MOVIE_SUCCESS',
  POST_LIKED_MOVIE_FAILURE: 'POST_LIKED_MOVIE_FAILURE',

  INITIATE_CAST_DETAILS: 'INITIATE_CAST_DETAILS',
  CAST_DETAILS_SUCCESS: 'CAST_DETAILS_SUCCESS',
  CAST_DETAILS_FAILURE: 'CAST_DETAILS_FAILURE',

  INITIATE_SHOWS_DETAILS_LIST: 'INITIATE_SHOWS_DETAILS_LIST',
  FETCH_SHOWS_DETAILS_LIST_SUCCESS: 'FETCH_SHOWS_DETAILS_LIST_SUCCESS',
  FETCH_SHOWS_DETAILS_LIST_FAILURE: 'FETCH_SHOWS_DETAILS_LIST_FAILURE',

  INITIATE_PHOTOS_LIST: 'INITIATE_PHOTOS_LIST',
  FETCH_PHOTOS_LIST_SUCCESS: 'FETCH_PHOTOS_LIST_SUCCESS',
  FETCH_PHOTOS_LIST_FAILURE: 'FETCH_PHOTOS_LIST_FAILURE',

  INITIATE_SIMILAR_MOVIES: 'INITIATE_SIMILAR_MOVIES',
  FETCH_SIMILAR_MOVIES_SUCCESS: 'FETCH_SIMILAR_MOVIES_SUCCESS',
  FETCH_SIMILAR_MOVIES_FAILURE: 'FETCH_SIMILAR_MOVIES_FAILURE',

  INITIATE_SIMILAR_SHOWS: 'INITIATE_SIMILAR_SHOWS',
  FETCH_SIMILAR_SHOWS_SUCCESS: 'FETCH_SIMILAR_MOVIES_SUCCESS',
  FETCH_SIMILAR_SHOWS_FAILURE: 'FETCH_SIMILAR_MOVIES_FAILURE',

  INITIATE_RECOMMENDED_MOVIES: 'INITIATE_RECOMMENDED_MOVIES',
  FETCH_RECOMMENDED_MOVIES_SUCCESS: 'FETCH_RECOMMENDED_MOVIES_SUCCESS',
  FETCH_RECOMMENDED_MOVIES_FAILURE: 'FETCH_RECOMMENDED_MOVIES_FAILURE',
  SET_USER_DATA: 'SET_USER_DATA',

  INITIATE_CAST_DETAIL: 'INITIATE_CAST_DETAIL',
  FETCH_CAST_DETAILS_SUCCESS: 'FETCH_CAST_DETAILS_SUCCESS',
  FETCH_CAST_DETAILS_FAILURE: 'FETCH_CAST_DETAILS_FAILURE',

  INITIATE_CREW_DETAIL: 'INITIATE_CREW_DETAIL',
  FETCH_CREW_DETAIL_SUCCESS: 'FETCH_CREW_DETAIL_SUCCESS',
  FETCH_CREW_DETAIL_FAILURE: 'FETCH_CAST_DETAIL_FAILURE',

  INITIATE_HOME_SCREEN_SECTION_LIST: 'INITIATE_HOME_SCREEN_SECTION_LIST',
  FETCH_HOME_SCREEN_SECTION_LIST_SUCCESS:
    'FETCH_HOME_SCREEN_SECTION_LIST_SUCCESS',
  FETCH_HOME_SCREEN_SECTION_LIST_FAILURE:
    'FETCH_HOME_SCREEN_SECTION_LIST_FAILURE',
  FETCH_EDITORS_CHOICE_SUCCESS: 'FETCH_EDITORS_CHOICE_SUCCESS',
  FETCH_EDITORS_CHOICE_FAILURE: 'FETCH_EDITORS_CHOICE_FAILURE',
  FETCH_DOCUMENTARY_MOVIES_SUCCESS: 'FETCH_DOCUMENTARY_MOVIES_SUCCESS',
  FETCH_DOCUMENTARY_MOVIES_FAILURE: 'FETCH_DOCUMENTARY_MOVIES_FAILURE',
  FETCH_TOP_ORIGINALS_SUCCESS: 'FETCH_TOP_ORIGINALS_SUCCESS',
  FETCH_TOP_ORIGINALS_FAILURE: 'FETCH_TOP_ORIGINALS_FAILURE',
  FETCH_TIME_TO_KILL_MOVIES_SUCCESS: 'FETCH_TIME_TO_KILL_MOVIES_SUCCESS',
  FETCH_TIME_TO_KILL_MOVIES_FAILURE: 'FETCH_TIME_TO_KILL_MOVIES_FAILURE',
  FETCH_HOT_ON_HOTSTAR_SUCCESS: 'FETCH_HOT_ON_HOTSTAR_SUCCESS',
  FETCH_HOT_ON_HOTSTAR_FAILURE: 'FETCH_HOT_ON_HOTSTAR_FAILURE',
  INITIATE_FETCH_PICKS_FROM_NETFLIX: 'INITIATE_FETCH_PICKS_FROM_NETFLIX',
  FETCH_PICKS_FROM_NETFLIX_SUCCESS: 'FETCH_PICKS_FROM_NETFLIX_SUCCESS',
  FETCH_PICKS_FROM_NETFLIX_FAILURE: 'FETCH_PICKS_FROM_NETFLIX_FAILURE',
  INITIATE_FETCH_PRIME_VIDEOS_PATAKAS: 'INITIATE_FETCH_PRIME_VIDEOS_PATAKAS',
  FETCH_PRIME_VIDEOS_PATAKAS_SUCCESS: 'FETCH_PRIME_VIDEOS_PATAKAS_SUCCESS',
  FETCH_PRIME_VIDEOS_PATAKAS_FAILURE: 'FETCH_PRIME_VIDEOS_PATAKAS_FAILURE',
  INITIATE_FETCH_RECENTLY_PLAYED_MOVIES:
    'INITIATE_FETCH_RECENTLY_PLAYED_MOVIES',
  FETCH_FETCH_RECENTLY_PLAYED_MOVIES_SUCCESS:
    'FETCH_FETCH_RECENTLY_PLAYED_MOVIES_SUCCESS',
  FETCH_FETCH_RECENTLY_PLAYED_MOVIES_FAILURE:
    'FETCH_FETCH_RECENTLY_PLAYED_MOVIES_FAILURE',
  FETCH_FREE_TICKET_JUNCTION_SUCCESS: 'FETCH_FREE_TICKET_JUNCTION_SUCCESS',
  FETCH_FREE_TICKET_JUNCTION_FAILURE: 'FETCH_FREE_TICKET_JUNCTION_FAILURE',
  FETCH_SECTION_DATA_SUCCESS: 'FETCH_SECTION_DATA_SUCCESS',
  FETCH_SECTION_DATA_FAILURE: 'FETCH_SECTION_DATA_FAILURE',

  EPISODE_LIST: 'EPISODE_LIST',

  ADDED_TO_LIKED: 'ADDED_TO_LIKED',

  ADDED_TO_RECENTS: 'ADDED_TO_RECENTS',

  ADDED_TO_HIDDEN: 'ADDED_TO_HIDDEN',

  ADDED_TO_DISLIKE: 'ADDED_TO_DISLIKE',

  SET_ALL_LANGUAGES: 'SET_ALL_LANGUAGES',

  FETCH_ARRAY_OF_WATCHLIST: 'FETCH_ARRAY_OF_WATCHLIST',

  LIKED_MOVIE_CARD: 'LIKED_MOVIE_CARD',

  FETCH_RECOMMENDATIONS_SUCCESS: 'FETCH_RECOMMENDATIONS_SUCCESS',
  FETCH_RECOMMENDATIONS_FAILURE: 'FETCH_RECOMMENDATIONS_FAILURE',
  FETCH_MORE_RECOMMENDATIONS: 'FETCH_MORE_RECOMMENDATIONS',
  ADD_TO_WATCHLIST: 'ADD_TO_WATCHLIST',
  HIDE_ARRAY_OF_WATCHLIST: 'HIDE_ARRAY_OF_WATCHLIST',
  HIDE_ADDED_TO_LIKED: 'HIDE_ADDED_TO_LIKED',
  REMOVE_FROM_WATCHLIST: 'REMOVE_FROM_WATCHLIST',
  SELECT_LANGUAGE: 'SELECT_LANGUAGE',
  SELECT_PROVIDER: 'SELECT_PROVIDER',
  RETRIEVE_APP_STATE: 'RETRIEVE_APP_STATE',
  SELECT_ALL_LANGUAGES: 'SELECT_ALL_LANGUAGES',
  UNSELECT_ALL_LANGUAGES: 'UNSELECT_ALL_LANGUAGES',
  SELECT_ALL_PROVIDERS: 'SELECT_ALL_PROVIDERS',
  UNSELECT_ALL_PROVIDERS: 'UNSELECT_ALL_PROVIDERS',
  ADD_PROFILE_DATA: 'ADD_PROFILE_DATA',
  ADD_PROFILE_PIC: 'ADD_PROFILE_PIC',
  REMOVE_PROFILE_PIC: 'REMOVE_PROFILE_PIC',
  USER_LOGIN: 'USER_LOGIN',
  FETCH_TRENDING: 'FETCH_TRENDING',
  FETCH_RECENT_SEARCH: 'FETCH_RECENT_SEARCH',
  FETCH_SEARCH_RESULTS: 'FETCH_SEARCH_RESULTS',
  FETCH_LANGUAGES: 'FETCH_LANGUAGES',
  FETCH_PROVIDERS: 'FETCH_PROVIDERS',
  FETCH_MORE_PROVIDERS: 'FETCH_MORE_PROVIDERS',
  REFINE_RECOMMENDATIONS: 'REFINE_RECOMMENDATIONS',
  INITIATE_FETCH_RECOMMENDATIONS: 'INITIATE_FETCH_RECOMMENDATIONS',
  LIKE_MOVIE: 'LIKE_MOVIE',
  DISLIKE_MOVIE: 'DISLIKE_MOVIE',
  HIDE_MOVIE: 'HIDE_MOVIE',
  UNHIDE_MOVIE: 'UNHIDE_MOVIE',
  FILTER_RECOMMENDATIONS_DATA: 'FILTER_RECOMMENDATIONS_DATA',

  FETCH_MORE_ONBOARDING_MOVIES_SUCCESS: 'FETCH_MORE_ONBOARDING_MOVIES_SUCCESS',
  FETCH_MORE_ONBOARDING_MOVIES_FAILURE: 'FETCH_MORE_ONBOARDING_MOVIES_FAILURE',
  SET_STREAMING_SERVICES: 'SET_STREAMING_SERVICES',
  SET_LANGUAGES: 'SET_LANGUAGES',
  SET_GENRES: 'SET_GENRES',
  SET_CAST: 'SET_CAST',
  SET_CREW: 'SET_CREW',
  SET_RATING: 'SET_RATING',
  SET_CONTENT_TYPE: 'SET_CONTENT_TYPE',
  SET_FREE_PAID: 'SET_FREE_PAID',
  SET_AIRDATE: 'SET_AIRDATE',
  SET_QUALITY: 'SET_QUALITY',
  SET_PRICE: 'SET_PRICE',
  SET_RUNTIME_MIN: 'SET_RUNTIME_MIN',
  SET_CONTENT_RATINGS: 'SET_CONTENT_RATINGS',
  SET_RELAESE_YEAR: 'SET_RELAESE_YEAR',
  REFINE_FOR_YOU_PAGE: 'REFINE_FOR_YOU_PAGE',
  SET_REFINE_STREAMING_SERVICES: 'SET_REFINE_STREAMING_SERVICES',
  SET_REFINE_LANGUAGES: 'SET_REFINE_LANGUAGES',
  SET_REFINE_GENRE: 'SET_REFINE_GENRE',
  SET_REFINE_FREE_PAID: 'SET_REFINE_FREE_PAID',
  SET_REFINE_CONTENT_TYPE: 'SET_REFINE_CONTENT_TYPE',
  SET_REFINE_QUALITY: 'SET_REFINE_QUALITY',
  SET_REFINE_RUNTIME_MIN: 'SET_REFINE_RUNTIME_MIN',
  REFINE_NEWS_PAGE: 'REFINE_NEWS_PAGE',
  SET_REFINE_SOURCE: 'SET_REFINE_SOURCE',
  SET_REFINE_CONTENT_RATING: 'SET_REFINE_CONTENT_RATING',
  SET_SEEALL_EPISODES: 'SET_SEEALL_EPISODES',
  SET_MOVIE_NAV_FILTER: 'SET_MOVIE_NAV_FILTER',
};
