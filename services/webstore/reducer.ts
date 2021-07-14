import {
  HOME_SCREEN_SECTIONS,
  LOCALSTORAGE_KEY_CONSTANTS,
  getLocalStorageData,
  pushDataLocalStorage,
} from '../../utils/constants';

import actions from './actions';

// Reducer
// the function that accepts our app state, and the action to
// take upon it, which then carries out that action
const reducerComp = (state, action) => {
  const hiddenData =
    JSON.parse(
      localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.HIDDEN_DATA_OBJ)
    ) || [];
  const deleteData =
    JSON.parse(
      localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.UNLIKED_DATA_OBJ)
    ) || [];
  switch (action.type) {
    case actions.INITIATE_HOME_SCREEN_SECTION_LIST: {
      return {
        ...state,
        home: {
          ...state.home,
          sections: [],
          loading: true,
        },
      };
    }
    case actions.FETCH_HOME_SCREEN_SECTION_LIST_SUCCESS: {
      return {
        ...state,
        home: {
          ...state.home,
          sections: action.payload,
          loading: false,
        },
      };
    }
    case actions.FETCH_HOME_SCREEN_SECTION_LIST_FAILURE:
      return {
        ...state,
        home: {
          ...state.home,
          sections: [],
          loading: false,
        },
      };
    case actions.FETCH_EDITORS_CHOICE_SUCCESS: {
      return {
        ...state,
        home: {
          ...state.home,
          editorsChoice: action.payload,
          loading: false,
        },
      };
    }
    case actions.FETCH_EDITORS_CHOICE_FAILURE:
      return {
        ...state,
        home: {
          ...state.home,
          editorsChoice: [],
          loading: false,
        },
      };

    case actions.FETCH_DOCUMENTARY_MOVIES_SUCCESS: {
      return {
        ...state,
        home: {
          ...state.home,
          topDocumentaries: action.payload,
          loading: false,
        },
      };
    }
    case actions.FETCH_DOCUMENTARY_MOVIES_FAILURE:
      return {
        ...state,
        home: {
          ...state.home,
          topDocumentaries: [],
          loading: false,
        },
      };

    case actions.FETCH_FREE_TICKET_JUNCTION_SUCCESS: {
      return {
        ...state,
        home: {
          ...state.home,
          freeTicketJunction: action.payload,
          loading: false,
        },
      };
    }
    case actions.FETCH_FREE_TICKET_JUNCTION_FAILURE:
      return {
        ...state,
        home: {
          ...state.home,
          freeTicketJunction: [],
          loading: false,
        },
      };
    case actions.FETCH_TOP_ORIGINALS_SUCCESS: {
      return {
        ...state,
        home: {
          ...state.home,
          topOriginals: action.payload,
          loading: false,
        },
      };
    }
    case actions.FETCH_TOP_ORIGINALS_FAILURE:
      return {
        ...state,
        home: {
          ...state.home,
          topOriginals: [],
          loading: false,
        },
      };
    case actions.FETCH_TIME_TO_KILL_MOVIES_SUCCESS: {
      return {
        ...state,
        home: {
          ...state.home,
          timeToKillMovies: action.payload,
          loading: false,
        },
      };
    }
    case actions.FETCH_TIME_TO_KILL_MOVIES_FAILURE:
      return {
        ...state,
        home: {
          ...state.home,
          timeToKillMovies: [],
          loading: false,
        },
      };
    case actions.FETCH_SECTION_DATA_SUCCESS: {
      const { data, lastPage, section } = action.payload;
      switch (section) {
        case HOME_SCREEN_SECTIONS.EDITORS_CHOICE: {
          return {
            ...state,
            home: {
              ...state.home,
              editorsChoice: {
                loading: false,
                data,
                lastPage: lastPage,
              },
            },
          };
        }
        case HOME_SCREEN_SECTIONS.HOT_ON_HOTSTAR: {
          return {
            ...state,
            home: {
              ...state.home,
              hotOnHotstar: {
                loading: false,
                data,
                lastPage: lastPage,
              },
            },
          };
        }
        case HOME_SCREEN_SECTIONS.PICKS_FROM_NETFLIX: {
          return {
            ...state,
            home: {
              ...state.home,
              picksFromNetflix: {
                loading: false,
                data,
                lastPage: lastPage,
              },
            },
          };
        }
        case HOME_SCREEN_SECTIONS.PRIME_VIDEO_PATAKAS: {
          return {
            ...state,
            home: {
              ...state.home,
              primeVideoPatakas: {
                loading: false,
                data,
                lastPage: lastPage,
              },
            },
          };
        }
        case HOME_SCREEN_SECTIONS.TRENDING: {
          return {
            ...state,
            home: {
              ...state.home,
              trending: {
                loading: false,
                data,
                lastPage: lastPage,
              },
            },
          };
        }
        case HOME_SCREEN_SECTIONS.SONY_LIV: {
          return {
            ...state,
            home: {
              ...state.home,
              sonyLiv: {
                loading: false,
                data,
                lastPage: lastPage,
              },
            },
          };
        }
        case HOME_SCREEN_SECTIONS.ZINGER_ZEE5: {
          return {
            ...state,
            home: {
              ...state.home,
              zee5: {
                loading: false,
                data,
                lastPage: lastPage,
              },
            },
          };
        }
        case HOME_SCREEN_SECTIONS.FEATURED: {
          return {
            ...state,
            home: {
              ...state.home,
              featured: {
                loading: false,
                data,
                lastPage: lastPage,
              },
            },
          };
        }

        default:
          return {
            ...state,
          };
      }
    }
    case actions.FETCH_SECTION_DATA_FAILURE: {
      const { section } = action.payload;
      switch (section) {
        case HOME_SCREEN_SECTIONS.EDITORS_CHOICE: {
          return {
            ...state,
            home: {
              ...state.home,
              editorsChoice: {
                ...state.home.editorsChoice,
                loading: false,
                data: [],
                lastPage: 0,
              },
            },
          };
        }
        case HOME_SCREEN_SECTIONS.HOT_ON_HOTSTAR: {
          return {
            ...state,
            home: {
              ...state.home,
              hotOnHotstar: {
                ...state.home.hotOnHotstar,
                loading: false,
                data: [],
                lastPage: 0,
              },
            },
          };
        }
        case HOME_SCREEN_SECTIONS.PICKS_FROM_NETFLIX: {
          return {
            ...state,
            home: {
              ...state.home,
              picksFromNetflix: {
                ...state.home.picksFromNetflix,
                loading: false,
                data: [],
                lastPage: 0,
              },
            },
          };
        }
        case HOME_SCREEN_SECTIONS.PRIME_VIDEO_PATAKAS: {
          return {
            ...state,
            home: {
              ...state.home,
              primeVideoPatakas: {
                ...state.home.primeVideoPatakas,
                loading: false,
                data: [],
                lastPage: 0,
              },
            },
          };
        }
        case HOME_SCREEN_SECTIONS.TRENDING: {
          return {
            ...state,
            home: {
              ...state.home,
              trending: {
                ...state.home.trending,
                loading: false,
                data: [],
                lastPage: 0,
              },
            },
          };
        }
        case HOME_SCREEN_SECTIONS.SONY_LIV: {
          return {
            ...state,
            home: {
              ...state.home,
              sonyLiv: {
                loading: false,
                data: [],
                lastPage: 0,
              },
            },
          };
        }

        case HOME_SCREEN_SECTIONS.ZINGER_ZEE5: {
          return {
            ...state,
            home: {
              ...state.home,
              zee5: {
                loading: false,
                data: [],
                lastPage: 0,
              },
            },
          };
        }
        case HOME_SCREEN_SECTIONS.FEATURED: {
          return {
            ...state,
            home: {
              ...state.home,
              featured: {
                loading: false,
                data: [],
                lastPage: 0,
              },
            },
          };
        }

        default:
          return {
            ...state,
          };
      }
    }
    case actions.FETCH_HOT_ON_HOTSTAR_SUCCESS: {
      return {
        ...state,
        home: {
          ...state.home,
          hotOnHotstar: action.payload,
          loading: false,
        },
      };
    }
    case actions.FETCH_HOT_ON_HOTSTAR_FAILURE:
      return {
        ...state,
        home: {
          ...state.home,
          hotOnHotstar: [],
          loading: false,
        },
      };
    case actions.FETCH_PICKS_FROM_NETFLIX_SUCCESS: {
      return {
        ...state,
        home: {
          ...state.home,
          picksFromNetflix: action.payload,
          loading: false,
        },
      };
    }
    case actions.FETCH_PICKS_FROM_NETFLIX_FAILURE:
      return {
        ...state,
        home: {
          ...state.home,
          picksFromNetflix: [],
          loading: false,
        },
      };
    case actions.FETCH_PRIME_VIDEOS_PATAKAS_SUCCESS: {
      return {
        ...state,
        home: {
          ...state.home,
          primeVideosPatakas: action.payload,
          loading: false,
        },
      };
    }
    case actions.FETCH_PRIME_VIDEOS_PATAKAS_FAILURE:
      return {
        ...state,
        home: {
          ...state.home,
          primeVideosPatakas: [],
          loading: false,
        },
      };
    case actions.FETCH_FETCH_RECENTLY_PLAYED_MOVIES_SUCCESS: {
      return {
        ...state,
        home: {
          ...state.home,
          recentlyPlayedMovies: action.payload,
          loading: false,
        },
      };
    }
    case actions.FETCH_FETCH_RECENTLY_PLAYED_MOVIES_FAILURE:
      return {
        ...state,
        home: {
          ...state.home,
          recentlyPlayedMovies: [],
          loading: false,
        },
      };
    case actions.INITIATE_FETCH_MOVIES: {
      return {
        ...state,
        moviesList: {
          ...state.moviesList,
          data: [],
          loading: true,
          nextPage: 0,
          lastPage: 0,
          loadMore: false,
        },
      };
    }
    case actions.FETCH_MOVIES_SUCCESS: {
      const movies = action.payload.movies
        ? action.payload.movies
        : action.payload;
      action.payload = movies.filter((item) => {
        const index = hiddenData.findIndex((data) => data._id === item._id);
        if (index === -1) {
          return true;
        } else return false;
      });
      action.payload = action.payload.filter((item) => {
        const index = deleteData.findIndex((data) => data._id === item._id);
        if (index === -1) {
          return true;
        } else return false;
      });
      return {
        ...state,
        moviesList: {
          ...state.moviesList,
          data: action.payload,
          loading: false,
          nextPage: action.payload.nextPage
            ? action.payload.nextPage
            : state.moviesList.nextPage,
          lastPage: action.payload.lastPage
            ? action.payload.lastPage
            : state.moviesList.lastPage,
        },
      };
    }
    case actions.FETCH_MOVIES_FAILURE:
      return {
        ...state,
        moviesList: {
          ...state.moviesList,
          data: [],
          loading: false,
          nextPage: 0,
          lastPage: 0,
        },
      };

    case actions.INITIATE_FETCH_SHOWS: {
      return {
        ...state,
        showList: {
          ...state.showList,
          data: [],
          loading: true,
          nextPage: 0,
          lastPage: 0,
          loadMore: false,
        },
      };
    }
    case actions.FETCH_SHOWS_SUCCESS: {
      const shows = action.payload.shows
        ? action.payload.shows
        : action.payload;
      action.payload = shows.filter((item) => {
        const index = hiddenData.findIndex((data) => data._id === item._id);
        if (index === -1) {
          return true;
        } else return false;
      });
      action.payload = action.payload.filter((item) => {
        const index = deleteData.findIndex((data) => data._id === item._id);
        if (index === -1) {
          return true;
        } else return false;
      });
      return {
        ...state,
        showList: {
          ...state.showList,
          data: action.payload,
          loading: false,
          nextPage: action.payload.nextPage
            ? action.payload.nextPage
            : state.showList.nextPage,
          lastPage: action.payload.lastPage
            ? action.payload.lastPage
            : state.showList.lastPage,
        },
      };
    }
    case actions.FETCH_SHOWS_FAILURE:
      return {
        ...state,
        showList: {
          ...state.showList,
          data: [],
          loading: false,
          nextPage: 0,
          lastPage: 0,
        },
      };

    case actions.INITIATE_FETCH_WATCHLIST_MOVIES: {
      return {
        ...state,
        watchlist: {
          ...state.watchlist,
          data: [],
          loading: true,
          nextPage: 0,
          lastPage: 0,
          loadMore: false,
        },
      };
    }
    case actions.FETCH_WATCHLIST_MOVIES_SUCCESS: {
      return {
        ...state,
        watchlist: {
          ...state.watchlist,
          data: action.payload,
          loading: false,
          nextPage: action.payload.nextPage,
          lastPage: action.payload.lastPage,
        },
      };
    }
    case actions.FETCH_WATCHLIST_MOVIES_FAILURE:
      return {
        ...state,
        watchlist: {
          ...state.watchlist,
          data: [],
          loading: false,
          nextPage: 0,
          lastPage: 0,
        },
      };

    case actions.INITIATE_MOVIES_DETAILS_LIST: {
      return {
        ...state,
        movieDetailsList: {
          ...state.movieDetailsList,
          data: [],
          loading: true,
          nextPage: 0,
          lastPage: 0,
          loadMore: false,
        },
      };
    }
    case actions.FETCH_MOVIES_DETAILS_LIST_SUCCESS: {
      return {
        ...state,
        movieDetailsList: {
          ...state.movieDetailsList,
          data: action.payload,
          loading: false,
          nextPage: action.payload.nextPage,
          lastPage: action.payload.lastPage,
        },
      };
    }
    case actions.FETCH_MOVIES_DETAILS_LIST_FAILURE:
      return {
        ...state,
        movieDetailsList: {
          ...state.movieDetailsList,
          data: [],
          loading: false,
          nextPage: 0,
          lastPage: 0,
        },
      };

    case actions.INITIATE_SHOWS_DETAILS_LIST: {
      return {
        ...state,
        showDetailsList: {
          ...state.showDetailsList,
          data: [],
          loading: true,
          nextPage: 0,
          lastPage: 0,
          loadMore: false,
        },
      };
    }
    case actions.FETCH_SHOWS_DETAILS_LIST_SUCCESS: {
      return {
        ...state,
        showDetailsList: {
          ...state.showDetailsList,
          data: action.payload,
          loading: false,
          nextPage: action.payload.nextPage,
          lastPage: action.payload.lastPage,
        },
      };
    }
    case actions.FETCH_SHOWS_DETAILS_LIST_FAILURE:
      return {
        ...state,
        showDetailsList: {
          ...state.showDetailsList,
          data: [],
          loading: false,
          nextPage: 0,
          lastPage: 0,
        },
      };

    case actions.INITIATE_LANGUAGE_LIST: {
      return {
        ...state,
        getLanguage: {
          ...state.getLanguage,
          data: [],
          loading: true,
          nextPage: 0,
          lastPage: 0,
          loadMore: false,
        },
      };
    }
    case actions.FETCH_LANGUAGE_LIST_SUCCESS: {
      return {
        ...state,
        getLanguage: {
          ...state.getLanguage,
          data: action.payload,
          loading: false,
          nextPage: action.payload.nextPage,
          lastPage: action.payload.lastPage,
        },
      };
    }
    case actions.FETCH_LANGUAGE_LIST_FAILURE:
      return {
        ...state,
        getLanguage: {
          ...state.getLanguage,
          data: [],
          loading: false,
          nextPage: 0,
          lastPage: 0,
        },
      };

    case actions.INITIATE_GENRES_LIST: {
      return {
        ...state,
        genreList: {
          ...state.genreList,
          data: [],
          loading: true,
          nextPage: 0,
          lastPage: 0,
          loadMore: false,
        },
      };
    }
    case actions.FETCH_GENRES_LIST_SUCCESS: {
      return {
        ...state,
        genreList: {
          ...state.genreList,
          data: action.payload,
          loading: false,
          nextPage: action.payload.nextPage,
          lastPage: action.payload.lastPage,
        },
      };
    }
    case actions.FETCH_GENRES_LIST_FAILURE:
      return {
        ...state,
        genreList: {
          ...state.genreList,
          data: [],
          loading: false,
          nextPage: 0,
          lastPage: 0,
        },
      };

    case actions.INITIATE_CAST_LIST: {
      return {
        ...state,
        castList: {
          ...state.castList,
          data: [],
          loading: true,
          nextPage: 0,
          lastPage: 0,
          loadMore: false,
        },
      };
    }
    case actions.FETCH_CAST_LIST_SUCCESS: {
      return {
        ...state,
        castList: {
          ...state.castList,
          data: action.payload,
          loading: false,
          nextPage: action.payload.nextPage,
          lastPage: action.payload.lastPage,
        },
      };
    }
    case actions.FETCH_CAST_LIST_FAILURE:
      return {
        ...state,
        castList: {
          ...state.castList,
          data: [],
          loading: false,
          nextPage: 0,
          lastPage: 0,
        },
      };

    case actions.SET_CAST: {
      let selectedCast = [...state.cast.selectedCast];
      let name = [...state.cast.name];
      if (action.payload.toggle === true) {
        selectedCast.push(action.payload.cast);
        name.push(action.payload.name);
      } else if (name.includes(action.payload.name)) {
        selectedCast.splice(selectedCast.indexOf(action.payload.cast), 1);
        name.splice(name.indexOf(action.payload.name), 1);
      } else {
        selectedCast.push(action.payload.cast);
        name.push(action.payload.name);
      }
      if (action.payload.toggle === false) {
        selectedCast = [];
        name = [];
      }
      if (typeof window !== undefined) {
        localStorage.setItem(
          LOCALSTORAGE_KEY_CONSTANTS.CAST_NAMES,
          JSON.stringify(Array.from(new Set(name)))
        );
        localStorage.setItem(
          LOCALSTORAGE_KEY_CONSTANTS.CAST_IDS,
          JSON.stringify(Array.from(new Set(selectedCast)))
        );
      }
      return {
        ...state,
        cast: {
          ...state.cast,
          selectedCast: Array.from(new Set(selectedCast)),
          toggle: action.payload.toggle,
          name: Array.from(new Set(name)),
        },
      };
    }

    case actions.INITIATE_CREW_LIST: {
      return {
        ...state,
        crewList: {
          ...state.crewList,
          data: [],
          loading: true,
          nextPage: 0,
          lastPage: 0,
          loadMore: false,
        },
      };
    }
    case actions.FETCH_CREW_LIST_SUCCESS: {
      return {
        ...state,
        crewList: {
          ...state.crewList,
          data: action.payload,
          loading: false,
          nextPage: action.payload.nextPage,
          lastPage: action.payload.lastPage,
        },
      };
    }
    case actions.FETCH_CREW_LIST_FAILURE:
      return {
        ...state,
        crewList: {
          ...state.crewList,
          data: [],
          loading: false,
          nextPage: 0,
          lastPage: 0,
        },
      };

    case actions.SET_CREW: {
      let selectedCrew = [...state.crew.selectedCrew];
      let name = [...state.crew.name];
      if (action.payload.toggle === true) {
        selectedCrew.push(action.payload.crew);
        name.push(action.payload.name);
      } else if (name.includes(action.payload.name)) {
        selectedCrew.splice(selectedCrew.indexOf(action.payload.crew), 1);
        name.splice(name.indexOf(action.payload.name), 1);
      } else {
        selectedCrew.push(action.payload.crew);
        name.push(action.payload.name);
      }
      if (action.payload.toggle === false) {
        selectedCrew = [];
        name = [];
      }
      if (typeof window !== undefined) {
        localStorage.setItem(
          LOCALSTORAGE_KEY_CONSTANTS.CREW_NAMES,
          JSON.stringify(Array.from(new Set(name)))
        );
        localStorage.setItem(
          LOCALSTORAGE_KEY_CONSTANTS.CREW_IDS,
          JSON.stringify(Array.from(new Set(selectedCrew)))
        );
      }
      return {
        ...state,
        crew: {
          ...state.crew,
          selectedCrew: Array.from(new Set(selectedCrew)),
          toggle: action.payload.toggle,
          name: Array.from(new Set(name)),
        },
      };
    }

    case actions.INITIATE_PHOTOS_LIST: {
      return {
        ...state,
        getPhotos: {
          ...state.getPhotos,
          data: [],
        },
      };
    }
    case actions.FETCH_PHOTOS_LIST_SUCCESS: {
      return {
        ...state,
        getPhotos: {
          ...state.getPhotos,
          data: action.payload,
        },
      };
    }
    case actions.FETCH_PHOTOS_LIST_FAILURE:
      return {
        ...state,
        getPhotos: {
          ...state.getPhotos,
          data: [],
        },
      };

    case actions.INITIATE_PROVIDER_LIST: {
      return {
        ...state,
        getProvider: {
          ...state.getProvider,
          data: [],
          loading: true,
          nextPage: 0,
          lastPage: 0,
          loadMore: false,
        },
      };
    }
    case actions.FETCH_PROVIDER_LIST_SUCCESS: {
      return {
        ...state,
        getProvider: {
          ...state.getProvider,
          data: action.payload,
          loading: false,
          nextPage: action.payload.nextPage,
          lastPage: action.payload.lastPage,
        },
      };
    }
    case actions.FETCH_PROVIDER_LIST_FAILURE:
      return {
        ...state,
        getProvider: {
          ...state.getProvider,
          data: [],
          loading: false,
          nextPage: 0,
          lastPage: 0,
        },
      };

    case actions.SET_USER_DATA:
      return {
        ...state,
        cookie_user_data: {
          ...state.cookie_user_data,
          data: action.payload,
        },
      };

    case actions.INITIATE_FETCH_ONBOARDING_MOVIES: {
      return {
        ...state,
        onboardingMovies: {
          ...state.onboardingMovies,
          data: [],
          loading: true,
          nextPage: 0,
          lastPage: 0,
          loadMore: false,
        },
      };
    }

    case actions.FETCH_ONBOARDING_MOVIES_SUCCESS: {
      return {
        ...state,
        onboardingMovies: {
          ...state.onboardingMovies,
          data: action.payload.onboardMovies,
          loading: false,
          nextPage: action.payload.nextPage,
          lastPage: action.payload.lastPage,
        },
      };
    }

    case actions.FETCH_ONBOARDING_MOVIES_FAILURE:
      return {
        ...state,
        onboardingMovies: {
          ...state.onboardingMovies,
          data: [],
          loading: false,
          nextPage: 0,
          lastPage: 0,
        },
      };

    case actions.INITIATE_CAST_DETAILS: {
      return {
        ...state,
        castDetails: {
          ...state.castDetails,
          data: [],
          loading: true,
          nextPage: 0,
          lastPage: 0,
          loadMore: false,
        },
      };
    }

    case actions.CAST_DETAILS_SUCCESS: {
      return {
        ...state,
        castDetails: {
          ...state.castDetails,
          data: action.payload,
          loading: false,
          nextPage: action.payload.nextPage,
          lastPage: action.payload.lastPage,
        },
      };
    }

    case actions.CAST_DETAILS_FAILURE:
      return {
        ...state,
        castDetails: {
          ...state.castDetails,
          data: [],
          loading: false,
          nextPage: 0,
          lastPage: 0,
        },
      };

    case actions.FETCH_MORE_ONBOARDING_MOVIES_SUCCESS: {
      return {
        ...state,
        onboardingMovies: {
          ...state.onboardingMovies,
          data: [
            ...state.onboardingMovies.data,
            ...action.payload.onboardMovies,
          ],
          nextPage: action.payload.nextPage,
          lastPage: action.payload.lastPage,
        },
      };
    }
    case actions.FETCH_MORE_ONBOARDING_MOVIES_FAILURE:
      return {
        ...state,
        onboardingMovies: {
          ...state.onboardingMovies,
          data: [],
          loading: false,
          nextPage: 0,
          lastPage: 0,
        },
      };
    case actions.INITIATE_FETCH_RECOMMENDATIONS: {
      return {
        ...state,
        recommendations: {
          ...state.recommendations,
          data: [],
          filteredData: [],
          loading: true,
          nextPage: 0,
          lastPage: 0,
          applyFilter: false,
          refine: false,
        },
      };
    }
    case actions.FETCH_RECOMMENDATIONS_SUCCESS: {
      return {
        ...state,
        recommendations: {
          ...state.recommendations,
          data: action.payload,
          loading: false,
          applyFilter: false,
          refine: false,
          nextPage: action.payload.nextPage,
          lastPage: action.payload.lastPage,
        },
      };
    }
    case actions.FETCH_RECOMMENDATIONS_FAILURE:
      return {
        ...state,
        recommendations: {
          ...state.recommendations,
          data: [],
          loading: false,
          applyFilter: false,
          refine: false,
          nextPage: 0,
          lastPage: 0,
        },
      };
    case actions.FETCH_MORE_RECOMMENDATIONS:
      return {
        ...state,
        recommendations: {
          ...state.recommendations,
          refine: false,
          data: [...state.recommendations.data, ...action.payload.movies],
          loading: false,
          nextPage: action.payload.nextPage,
          lastPage: action.payload.lastPage,
        },
      };
    case actions.REFINE_RECOMMENDATIONS: {
      return {
        ...state,
        recommendations: {
          ...state.recommendations,
          refine: true,
        },
      };
    }
    case actions.FILTER_RECOMMENDATIONS_DATA: {
      return {
        ...state,
        recommendations: {
          ...state.recommendations,
          applyFilter: true,
          filteredData: action.payload,
        },
      };
    }

    case actions.INITIATE_FETCH_TRAILER_MOVIES: {
      return {
        ...state,
        getTrailer: {
          ...state.getTrailer,
          data: [],
          loading: true,
          nextPage: 0,
          lastPage: 0,
        },
      };
    }
    case actions.FETCH_TRAILER_MOVIES_SUCCESS: {
      return {
        ...state,
        getTrailer: {
          ...state.getTrailer,
          data: action.payload,
          loading: false,
          nextPage: action.payload.nextPage,
          lastPage: action.payload.lastPage,
        },
      };
    }
    case actions.FETCH_TRAILER_MOVIES_FAILURE:
      return {
        ...state,
        getTrailer: {
          ...state.getTrailer,
          data: [],
          loading: false,
          applyFilter: false,
          refine: false,
          nextPage: 0,
          lastPage: 0,
        },
      };

    case actions.INITIATE_EPISODE_LIST: {
      return {
        ...state,
        episodeList: {
          ...state.episodeList,
          data: [],
          loading: true,
          nextPage: 0,
          lastPage: 0,
        },
      };
    }
    case actions.FETCH_EPISODE_LIST_SUCCESS: {
      return {
        ...state,
        episodeList: {
          ...state.episodeList,
          data: action.payload,
          loading: false,
          nextPage: action.payload.nextPage,
          lastPage: action.payload.lastPage,
        },
      };
    }
    case actions.FETCH_EPISODE_LIST_FAILURE:
      return {
        ...state,
        episodeList: {
          ...state.episodeList,
          data: [],
          loading: false,
          refine: false,
          nextPage: 0,
          lastPage: 0,
        },
      };

    case actions.INITIATE_FETCH_CREW_DETAILS: {
      return {
        ...state,
        getCrew: {
          ...state.getCrew,
          data: [],
          loading: true,
          nextPage: 0,
          lastPage: 0,
        },
      };
    }
    case actions.FETCH_CREW_DETAILS_SUCCESS: {
      return {
        ...state,
        getCrew: {
          ...state.getCrew,
          data: action.payload,
          loading: false,
          nextPage: action.payload.nextPage,
          lastPage: action.payload.lastPage,
        },
      };
    }
    case actions.FETCH_CREW_DETAILS_FAILURE:
      return {
        ...state,
        getCrew: {
          ...state.getCrew,
          data: [],
          loading: false,
          refine: false,
          nextPage: 0,
          lastPage: 0,
        },
      };

    case actions.INITIATE_TRENDING_SEARCH: {
      return {
        ...state,
        trendingSearch: {
          ...state.trendingSearch,
          data: [],
          loading: true,
          nextPage: 0,
          lastPage: 0,
        },
      };
    }
    case actions.FETCH_TRENDING_SEARCH_SUCCESS: {
      return {
        ...state,
        trendingSearch: {
          ...state.trendingSearch,
          data: action.payload,
          loading: false,
          nextPage: action.payload.nextPage,
          lastPage: action.payload.lastPage,
        },
      };
    }
    case actions.FETCH_TRENDING_SEARCH_FAILURE:
      return {
        ...state,
        trendingSearch: {
          ...state.trendingSearch,
          data: [],
          loading: false,
          refine: false,
          nextPage: 0,
          lastPage: 0,
        },
      };

    case actions.INITIATE_ALL_SEARCH: {
      return {
        ...state,
        allSearch: {
          ...state.allSearch,
          data: [],
          loading: true,
          nextPage: 0,
          lastPage: 0,
        },
      };
    }
    case actions.FETCH_ALL_SEARCH_SUCCESS: {
      return {
        ...state,
        allSearch: {
          ...state.allSearch,
          data: action.payload,
          loading: false,
          nextPage: action.payload.nextPage,
          lastPage: action.payload.lastPage,
        },
      };
    }
    case actions.FETCH_ALL_SEARCH_FAILURE:
      return {
        ...state,
        allSearch: {
          ...state.allSearch,
          data: [],
          loading: false,
          refine: false,
          nextPage: 0,
          lastPage: 0,
        },
      };

    case actions.INITIATE_LIKED_MOVIE: {
      return {
        ...state,
        postLikedMovie: {
          ...state.postLikedMovie,
          data: [],
        },
      };
    }
    case actions.POST_LIKED_MOVIE_SUCCESS: {
      return {
        ...state,
        postLikedMovie: {
          ...state.gepostLikedMovieCrew,
          data: action.payload,
        },
      };
    }
    case actions.POST_LIKED_MOVIE_FAILURE:
      return {
        ...state,
        postLikedMovie: {
          ...state.postLikedMovie,
          data: [],
        },
      };

    case actions.INITIATE_RECOMMENDED_MOVIES: {
      return {
        ...state,
        recommendedMovies: {
          ...state.postLikedMovie,
          data: [],
        },
      };
    }
    case actions.FETCH_RECOMMENDED_MOVIES_SUCCESS: {
      action.payload = action.payload.filter((item) => {
        const index = hiddenData.findIndex((data) =>
          data._id != undefined ? data._id === item._id : data.id === item.id
        );
        if (index === -1) {
          return true;
        } else return false;
      });
      action.payload = action.payload.filter((item) => {
        const index = deleteData.findIndex((data) =>
          data._id != undefined ? data._id === item._id : data.id === item.id
        );
        if (index === -1) {
          return true;
        } else return false;
      });
      return {
        ...state,
        recommendedMovies: {
          ...state.recommendedMovies,
          data: action.payload,
        },
      };
    }
    case actions.FETCH_RECOMMENDED_MOVIES_FAILURE:
      return {
        ...state,
        recommendedMovies: {
          ...state.recommendedMovies,
          data: [],
        },
      };

    case actions.INITIATE_SIMILAR_MOVIES: {
      return {
        ...state,
        postSimilarMovies: {
          ...state.postSimilarMovies,
          data: [],
        },
      };
    }
    case actions.FETCH_SIMILAR_MOVIES_SUCCESS: {
      return {
        ...state,
        postSimilarMovies: {
          ...state.postSimilarMovies,
          data: action.payload,
        },
      };
    }
    case actions.FETCH_SIMILAR_MOVIES_FAILURE:
      return {
        ...state,
        postSimilarMovies: {
          ...state.postSimilarMovies,
          data: [],
        },
      };

    case actions.INITIATE_SIMILAR_SHOWS: {
      return {
        ...state,
        postSimilarShows: {
          ...state.postSimilarShows,
          data: [],
        },
      };
    }
    case actions.FETCH_SIMILAR_SHOWS_SUCCESS: {
      return {
        ...state,
        postSimilarShows: {
          ...state.postSimilarShows,
          data: action.payload,
        },
      };
    }
    case actions.FETCH_SIMILAR_SHOWS_FAILURE:
      return {
        ...state,
        postSimilarShows: {
          ...state.postSimilarShows,
          data: [],
        },
      };

    case actions.INITIATE_CAST_DETAIL: {
      return {
        ...state,
        castDetail: {
          ...state.castDetail,
          data: [],
        },
      };
    }
    case actions.FETCH_CAST_DETAILS_SUCCESS: {
      return {
        ...state,
        castDetail: {
          ...state.castDetail,
          data: action.payload,
        },
      };
    }
    case actions.FETCH_CAST_DETAILS_FAILURE:
      return {
        ...state,
        castDetail: {
          ...state.castDetail,
          data: [],
        },
      };

    case actions.INITIATE_CREW_DETAIL: {
      return {
        ...state,
        crewDetail: {
          ...state.crewDetail,
          data: [],
        },
      };
    }
    case actions.FETCH_CREW_DETAIL_SUCCESS: {
      return {
        ...state,
        crewDetail: {
          ...state.crewDetail,
          data: action.payload,
        },
      };
    }
    case actions.FETCH_CREW_DETAIL_FAILURE:
      return {
        ...state,
        crewDetail: {
          ...state.crewDetail,
          data: [],
        },
      };

    case actions.ADD_TO_WATCHLIST: {
      const forYouData = [...state.recommendations.data];
      const index = forYouData.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        forYouData[index].addedToWatchList = true;
      }
      const newWatchList = [...state.watchlist.data];
      const newWatchListIndex = newWatchList.findIndex(
        (item) => item.id === action.payload.id
      );

      if (newWatchListIndex === -1) {
        newWatchList.push(action.payload);
      }

      return {
        ...state,
        recommendations: {
          ...state.recommendations,
          data: forYouData,
        },
        watchlist: {
          ...state.watchlist,
          data: newWatchList,
        },
      };
    }

    case actions.REMOVE_FROM_WATCHLIST: {
      const forYouData = [...state.recommendations.data];
      const index = forYouData.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        forYouData[index].addedToWatchList = false;
      }
      const newWatchList = [...state.watchlist.data];
      const newWatchListIndex = newWatchList.findIndex(
        (item) => item.id === action.payload.id
      );

      if (newWatchListIndex !== -1) {
        newWatchList.splice(newWatchListIndex, 1);
      }

      return {
        ...state,
        recommendations: {
          ...state.recommendations,
          data: forYouData,
        },
        watchlist: {
          ...state.watchlist,
          data: newWatchList,
        },
      };
    }
    case actions.LIKE_MOVIE: {
      const forYouData = [...state.recommendations.data];
      const index = forYouData.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        forYouData[index].liked = true;
      }
      const newLikedMoviesOrShows = [...state.userProfile.likedMoviesOrShows];
      const newLikedMoviesOrShowsIndex = newLikedMoviesOrShows.findIndex(
        (item) => item.id === action.payload.id
      );

      if (newLikedMoviesOrShowsIndex === -1) {
        newLikedMoviesOrShows.push(action.payload);
      }

      return {
        ...state,
        recommendations: {
          ...state.recommendations,
          data: forYouData,
        },
        userProfile: {
          ...state.userProfile,
          likedMoviesOrShows: newLikedMoviesOrShows,
        },
      };
    }
    case actions.DISLIKE_MOVIE: {
      const forYouData = [...state.recommendations.data];
      const index = forYouData.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        forYouData[index].liked = false;
      }
      const newLikedMoviesOrShows = [...state.userProfile.likedMoviesOrShows];
      const newLikedMoviesOrShowsIndex = newLikedMoviesOrShows.findIndex(
        (item) => item.id === action.payload.id
      );

      if (newLikedMoviesOrShowsIndex !== -1) {
        newLikedMoviesOrShows.splice(newLikedMoviesOrShowsIndex, 1);
      }

      return {
        ...state,
        recommendations: {
          ...state.recommendations,
          data: forYouData,
        },
        userProfile: {
          ...state.userProfile,
          likedMoviesOrShows: newLikedMoviesOrShows,
        },
      };
    }
    case actions.HIDE_MOVIE: {
      const forYouData = [...state.recommendations.data];
      const index = forYouData.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        forYouData[index].hidden = true;
      }
      const newHiddenMoviesOrShows = [...state.userProfile.hiddenMoviesOrShows];
      const newHiddenMoviesOrShowsIndex = newHiddenMoviesOrShows.findIndex(
        (item) => item.id === action.payload.id
      );

      if (newHiddenMoviesOrShowsIndex === -1) {
        newHiddenMoviesOrShows.push(action.payload);
      }

      return {
        ...state,
        recommendations: {
          ...state.recommendations,
          data: forYouData,
        },
        userProfile: {
          ...state.userProfile,
          hiddenMoviesOrShows: newHiddenMoviesOrShows,
        },
      };
    }
    case actions.UNHIDE_MOVIE: {
      const data =
        JSON.parse(
          localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.HIDDEN_DATA_OBJ)
        ) || [];
      const index = data.findIndex(
        (item) =>
          (item._id || item.id) === (action.payload._id || action.payload.id)
      );
      if (index !== -1) {
        data.splice(index, 1);
      }
      if (typeof window !== undefined) {
        localStorage.setItem(
          LOCALSTORAGE_KEY_CONSTANTS.HIDDEN_DATA_OBJ,
          JSON.stringify(data)
        );
      }

      return {
        ...state,
        hideMovie: {
          ...state.data,
          hidden: data,
        },
      };
    }

    case actions.SET_STREAMING_SERVICES: {
      let data = [...state.streamingServices.selectedStreamingServices];
      let name = [...state.streamingServices.name];
      if (action.payload.toggle === true) {
        data.push(action.payload.providers);
        name.push(action.payload.name);
      } else if (data.includes(action.payload.providers)) {
        data.splice(data.indexOf(action.payload.providers), 1);
        name.splice(name.indexOf(action.payload.name), 1);
      } else {
        data.push(action.payload.providers);
        name.push(action.payload.name);
      }
      if (action.payload.toggle === false) {
        data = [];
        name = [];
      }
      if (typeof window !== undefined) {
        localStorage.setItem(
          LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_IDS,
          JSON.stringify(data)
        );
        localStorage.setItem(
          LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_NAMES,
          JSON.stringify(name)
        );
      }
      return {
        ...state,
        streamingServices: {
          ...state.data,
          selectedStreamingServices: Array.from(new Set(data)),
          toggle: action.payload.toggle,
          name: Array.from(new Set(name)),
        },
        refine: {
          ...state.refine,
          forYou: {
            ...state.refine.forYou,
            selectedStreamingServices: Array.from(new Set(data)),
            selectedStreamingServicesName: Array.from(new Set(name)),
          },
        },
      };
    }

    case actions.SET_LANGUAGES: {
      let name = [...state.languages.name];
      let data = [...state.languages.selectedLanguages];
      if (action.payload.toggle === true) {
        data.push(action.payload.language);
        name.push(action.payload.name);
      } else if (name.includes(action.payload.name)) {
        data.splice(data.indexOf(action.payload.language), 1);
        name.splice(name.indexOf(action.payload.name), 1);
      } else {
        data.push(action.payload.language);
        name.push(action.payload.name);
      }
      if (action.payload.toggle === false) {
        data = [];
        name = [];
      }
      if (typeof window !== undefined) {
        localStorage.setItem(
          LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES,
          JSON.stringify(Array.from(new Set(name)))
        );
      }
      return {
        ...state,
        languages: {
          ...state.data,
          selectedLanguages: Array.from(new Set(data)),
          toggle: action.payload.toggle,
          name: Array.from(new Set(name)),
        },
        refine: {
          ...state.refine,
          forYou: {
            ...state.refine.forYou,
            selectedLanguages: Array.from(new Set(name)),
            // selectedLanguagesName: Array.from(new Set(name)),
          },
        },
      };
    }

    // case actions.SET_ALL_LANGUAGES: {
    //    const all = [...state.getLanguage.data.languages]
    //   if (all.includes(action.payload)) {
    //     all.push(action.payload);
    //   }
    //   return {
    //     ...state,
    //     getLanguage: {
    //       ...state.all,
    //       selectedLanguages: all,
    //     },
    //   };
    // }

    case actions.EPISODE_LIST: {
      const data = [...state.episodeList.data.episodes];
      // data.filter((data) => data.season_number === action.payload.selectedView);

      return {
        ...state,
        episodeList: {
          ...state.data,
          selectedView: action.payload.selectedView,
        },
      };
    }

    case actions.SET_GENRES: {
      const data = [...state.refineGenres.selectedRefineGenres];
      let selectedGenres = [...state.genres.selectedGenres];
      let name = [...state.genres.name];
      if (action.payload.toggle === true) {
        selectedGenres.push(action.payload.genre);
        name.push(action.payload.name);
      } else if (selectedGenres.includes(action.payload.genre)) {
        selectedGenres.splice(selectedGenres.indexOf(action.payload.genre), 1);
        name.splice(name.indexOf(action.payload.name), 1);
      } else {
        selectedGenres.push(action.payload.genre);
        name.push(action.payload.name);
      }
      if (action.payload.toggle === false) {
        selectedGenres = [];
        name = [];
      }

      if (data.includes(action.payload)) {
        data.splice(data.indexOf(action.payload), 1);
      } else {
        data.push(action.payload);
      }
      if (typeof window !== undefined) {
        localStorage.setItem(
          LOCALSTORAGE_KEY_CONSTANTS.GENRES_NAMES,
          JSON.stringify(Array.from(new Set(name)))
        );
        localStorage.setItem(
          LOCALSTORAGE_KEY_CONSTANTS.GENRE_IDS,
          JSON.stringify(Array.from(new Set(data.map((item) => item.genre))))
        );
      }
      return {
        ...state,
        refineGenres: {
          ...state.data,
          selectedRefineGenres: data,
        },
        genres: {
          ...state.genres,
          selectedGenres: Array.from(new Set(selectedGenres)),
          toggle: action.payload.toggle,
          name: Array.from(new Set(name)),
        },
      };
    }

    // case actions.ADDED_TO_WATCHLIST: {
    //   const data = [...state.addedToWatchlist.watchlistData];
    //   if (data.includes(action.payload.id)) {
    //     data.splice(data.indexOf(action.payload.id), 1);
    //   } else {
    //     data.push(action.payload);
    //     localStorage.setItem('watchlist selected', JSON.stringify(data));
    //   }

    //   return {
    //     ...state,
    //     addedToWatchlist: {
    //       ...state.data,
    //       watchlistData: data,
    //     },
    //   };
    // }

    case actions.FETCH_ARRAY_OF_WATCHLIST: {
      const data =
        [...state.watchlistArr.watchlistArr].length > 0
          ? [...state.watchlistArr.watchlistArr]
          : JSON.parse(
              localStorage.getItem(
                LOCALSTORAGE_KEY_CONSTANTS.WATCHLISTED_DATA_OBJ
              )
            ) || [];
      const index = data.findIndex(
        (item) =>
          (item._id || item.id) === (action.payload._id || action.payload.id)
      );
      if (index === -1) {
        data.push(action.payload);
      } else {
        data.splice(index, 1);
      }
      if (typeof window !== undefined) {
        localStorage.setItem(
          LOCALSTORAGE_KEY_CONSTANTS.WATCHLISTED_DATA_OBJ,
          JSON.stringify(data)
        );
      }

      return {
        ...state,
        watchlistArr: {
          ...state.data,
          watchlistArr: data,
        },
      };
    }

    case actions.HIDE_ARRAY_OF_WATCHLIST: {
      const data =
        [...state.watchlistArr.watchlistArr].length > 0
          ? [...state.watchlistArr.watchlistArr]
          : JSON.parse(
              localStorage.getItem(
                LOCALSTORAGE_KEY_CONSTANTS.WATCHLISTED_DATA_OBJ
              )
            ) || [];
      const index = data.findIndex(
        (item) =>
          (item._id || item.id) === (action.payload._id || action.payload.id)
      );
      if (index !== -1) {
        data.splice(index, 1);
      }
      if (typeof window !== undefined) {
        localStorage.setItem(
          LOCALSTORAGE_KEY_CONSTANTS.WATCHLISTED_DATA_OBJ,
          JSON.stringify(data)
        );
      }

      return {
        ...state,
        watchlistArr: {
          ...state.data,
          watchlistArr: data,
        },
      };
    }

    case actions.ADDED_TO_RECENTS: {
      const data = [...state.recents.history];
      const index = data.findIndex((item) => item.name === action.payload.name);
      if (index === -1) {
        data.push(action.payload);
      }
      return {
        ...state,
        recents: {
          ...state.data,
          history: data,
        },
      };
    }

    case actions.ADDED_TO_LIKED: {
      const data =
        JSON.parse(
          localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LIKED_DATA_OBJ)
        ) || [];
      const index = data.findIndex(
        (item) =>
          (item._id || item.id) === (action.payload._id || action.payload.id)
      );
      if (index === -1) {
        data.push(action.payload);
      } else {
        data.splice(index, 1);
      }
      if (typeof window !== undefined) {
        localStorage.setItem(
          LOCALSTORAGE_KEY_CONSTANTS.LIKED_DATA_OBJ,
          JSON.stringify(data)
        );
      }
      return {
        ...state,
        likeArr: {
          ...state.data,
          liked: data,
          unlike: action.payload.unlike,
        },
      };
    }

    case actions.HIDE_ADDED_TO_LIKED: {
      const data =
        JSON.parse(
          localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.LIKED_DATA_OBJ)
        ) || [];
      const index = data.findIndex(
        (item) =>
          (item._id || item.id) === (action.payload._id || action.payload.id)
      );
      if (index !== -1) {
        data.splice(index, 1);
      }
      if (typeof window !== undefined) {
        localStorage.setItem(
          LOCALSTORAGE_KEY_CONSTANTS.LIKED_DATA_OBJ,
          JSON.stringify(data)
        );
      }
      return {
        ...state,
        likeArr: {
          ...state.data,
          liked: data,
          unlike: action.payload.unlike,
        },
      };
    }

    case actions.ADDED_TO_HIDDEN: {
      const data = [...state.hideMovie.hidden];
      const index = data.findIndex(
        (item) =>
          (item._id || item.id) === (action.payload._id || action.payload.id)
      );
      if (index === -1) {
        data.push(action.payload);
      } else {
        data.splice(index, 1);
      }
      if (typeof window !== undefined) {
        localStorage.setItem(
          LOCALSTORAGE_KEY_CONSTANTS.HIDDEN_DATA_OBJ,
          JSON.stringify(data)
        );
      }

      return {
        ...state,
        hideMovie: {
          ...state.data,
          hidden: data,
        },
      };
    }

    case actions.ADDED_TO_DISLIKE: {
      const data = [...state.dislikedMovie.dislike];
      const index = data.findIndex(
        (item) =>
          (item._id || item.id) === (action.payload._id || action.payload.id)
      );
      if (index === -1) {
        data.push(action.payload);
      } else {
        data.splice(index, 1);
      }
      if (typeof window !== undefined) {
        localStorage.setItem(
          LOCALSTORAGE_KEY_CONSTANTS.UNLIKED_DATA_OBJ,
          JSON.stringify(data)
        );
      }
      return {
        ...state,
        dislikedMovie: {
          ...state.data,
          dislike: data,
          liking: action.payload.liking,
          //close: action.payload.close
        },
      };
    }

    case actions.LIKED_MOVIE_CARD: {
      const data = [...state.likedMovieCard.liked];
      const liked_obj = [...state.likedMovieCard.liked_obj];
      const name = [...state.likedMovieCard.likedName];

      const dislike = [...state.likedMovieCard.disliked];
      const disliked_obj = [...state.likedMovieCard.disliked_obj];
      const dislikeName = [...state.likedMovieCard.dislikedName];

      const likedLang_MovieIDArr = [
        ...state.likedMovieCard.likedLang_MovieIDArr,
      ];
      const unlikedLang_MovieIDArr = [
        ...state.likedMovieCard.unlikedLang_MovieIDArr,
      ];

      const selectData =
        action.payload.liked != undefined
          ? action.payload.liked
          : action.payload.disliked;

      const index = data.findIndex((item) => item === selectData);
      if (index === -1 && action.payload.select != 'dislike') {
        data.push(action.payload.liked);
        name.push(action.payload.likedName);
        liked_obj.push(action.payload.data_obj);
        likedLang_MovieIDArr.push(
          action.payload.language + '_' + action.payload.liked
        );
      } else if (
        (index !== -1 && action.payload.select === 'dislike') ||
        action.payload.select === 'like'
      ) {
        data.splice(index, 1);
        name.splice(index, 1);
        liked_obj.splice(index, 1);
        likedLang_MovieIDArr.splice(index, 1);
      }
      if (action.payload.select === 'dislike') {
        disliked_obj.push(action.payload.data_obj);
        dislike.push(action.payload.disliked);
        dislikeName.push(action.payload.dislikedName);
        unlikedLang_MovieIDArr.push(
          action.payload.language + '_' + action.payload.disliked
        );
      }
      if (typeof window !== undefined) {
        localStorage.setItem(
          LOCALSTORAGE_KEY_CONSTANTS.LIKED_DATA_OBJ,
          JSON.stringify(liked_obj)
        );
        localStorage.setItem(
          LOCALSTORAGE_KEY_CONSTANTS.LIKED_DATA_IDS,
          JSON.stringify(data)
        );
        localStorage.setItem(
          LOCALSTORAGE_KEY_CONSTANTS.UNLIKED_DATA_IDS,
          JSON.stringify(dislike)
        );
        localStorage.setItem(
          LOCALSTORAGE_KEY_CONSTANTS.UNLIKED_DATA_OBJ,
          JSON.stringify(disliked_obj)
        );
        localStorage.setItem(
          LOCALSTORAGE_KEY_CONSTANTS.LANG_LIKED_DATA_IDS,
          JSON.stringify(likedLang_MovieIDArr)
        );
        localStorage.setItem(
          LOCALSTORAGE_KEY_CONSTANTS.LANG_UNLIKED_DATA_IDS,
          JSON.stringify(unlikedLang_MovieIDArr)
        );
      }
      return {
        ...state,
        likedMovieCard: {
          ...state.data,
          liked_obj: liked_obj,
          liked: data,
          select: action.payload.select,
          likedName: name,
          disliked_obj: disliked_obj,
          disliked: dislike,
          dislikedName: dislikeName,
          likedLang_MovieIDArr: likedLang_MovieIDArr,
          unlikedLang_MovieIDArr: unlikedLang_MovieIDArr,
        },
      };
    }

    case actions.SET_CONTENT_TYPE: {
      const data = [...state.contentType.selectedContentType];
      if (data.includes(action.payload)) {
        data.splice(data.indexOf(action.payload), 1);
      } else {
        data.push(action.payload);
      }

      return {
        ...state,
        contentType: {
          ...state.data,
          selectedContentType: data,
        },
      };
    }

    case actions.SET_FREE_PAID: {
      const data = [...state.free_paid.selectedFree_Paid];
      if (data.includes(action.payload)) {
        data.splice(data.indexOf(action.payload), 1);
      } else {
        data.push(action.payload);
      }

      return {
        ...state,
        free_paid: {
          ...state.data,
          selectedFree_Paid: data,
        },
      };
    }

    case actions.SET_AIRDATE: {
      const data = [...state.airdate.selectedAirdate];
      if (data.includes(action.payload)) {
        data.splice(data.indexOf(action.payload), 1);
      } else {
        data.push(action.payload);
      }

      return {
        ...state,
        airdate: {
          ...state.data,
          selectedAirdate: data,
        },
      };
    }

    case actions.SET_QUALITY: {
      const data = [...state.quality.selectedQuality];
      if (data.includes(action.payload)) {
        data.splice(data.indexOf(action.payload), 1);
      } else {
        data.push(action.payload);
      }

      return {
        ...state,
        quality: {
          ...state.data,
          selectedQuality: data,
        },
      };
    }

    case actions.SET_RUNTIME_MIN: {
      const data = [...state.runtime_min.selectedRuntime_min];
      if (data.includes(action.payload)) {
        data.splice(data.indexOf(action.payload), 1);
      } else {
        data.push(action.payload);
      }

      return {
        ...state,
        runtime_min: {
          ...state.data,
          selectedRuntime_min: data,
        },
      };
    }

    case actions.SET_CONTENT_RATINGS: {
      const data = [...state.contentRating.selectedContentRating];
      if (data.includes(action.payload)) {
        data.splice(data.indexOf(action.payload), 1);
      } else {
        data.push(action.payload);
      }

      return {
        ...state,
        contentRating: {
          ...state.data,
          selectedContentRating: data,
        },
      };
    }
    case actions.SET_REFINE_STREAMING_SERVICES: {
      if (action.payload) {
        let name = [...state.refine.forYou.selectedStreamingServicesName];
        let data = [...state.refine.forYou.selectedStreamingServices];
        // if ([...state.refine.forYou.selectedStreamingServices].length === 0) {
        //   if (action.payload.clear === undefined) {
        //     name =
        //       JSON.parse(
        //         localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_NAMES)
        //       ) || [];
        //     data =
        //       JSON.parse(
        //         localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_IDS)
        //       ) || [];
        //   }
        //   if (action.payload.clear !== 'clear') {
        //     name =
        //       JSON.parse(
        //         localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_NAMES)
        //       ) || [];
        //     data =
        //       JSON.parse(
        //         localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.PROVIDER_IDS)
        //       ) || [];
        //   }
        // }
        // let data = [...state.streamingServices.selectedStreamingServices];
        // let name = [...state.streamingServices.name];
        if (action.payload.toggle === true) {
          data.push(action.payload.providers);
          name.push(action.payload.name);
        } else if (data.includes(action.payload.providers)) {
          data.splice(data.indexOf(action.payload.providers), 1);
          name.splice(name.indexOf(action.payload.name), 1);
        } else {
          data.push(action.payload.providers);
          name.push(action.payload.name);
        }
        if (action.payload.toggle === false) {
          data = [];
          name = [];
        }
        return {
          ...state,
          refine: {
            ...state.refine,
            loading: false,
            forYou: {
              ...state.refine.forYou,
              refineForYou: false,
              selectedStreamingServices: Array.from(new Set(data)),
              selectedStreamingServicesName: Array.from(new Set(name)),
              selectedAllStreams:
                action.payload.toggle !== undefined
                  ? action.payload.toggle
                  : false,
              unSelectedAllStreams:
                Array.from(new Set(data)).length > 0 ? false : true,
            },
          },
        };
      }
      return state;
    }
    case actions.SET_REFINE_LANGUAGES: {
      if (action.payload) {
        let name = [...state.refine.forYou.selectedLanguages];

        if (action.payload.toggle === true) {
          name.push(action.payload.name);
        } else if (name.includes(action.payload.name)) {
          name.splice(name.indexOf(action.payload.name), 1);
        } else {
          name.push(action.payload.name);
        }
        if (action.payload.toggle === false) {
          name = [];
        }
        return {
          ...state,
          refine: {
            ...state.refine,
            loading: false,
            forYou: {
              ...state.refine.forYou,
              refineForYou: false,
              selectedLanguages: Array.from(new Set(name)),
              selectedAllLanguages:
                action.payload.toggle !== undefined
                  ? action.payload.toggle
                  : false,
              unSelectedAllLanguages:
                Array.from(new Set(name)).length > 0 ? false : true,
            },
          },
        };
      }
      return state;
    }
    case actions.SET_REFINE_GENRE: {
      if (action.payload) {
        let data = [...state.refine.forYou.selectedGenres];
        let name = [...state.refine.forYou.selectedGenresName];
        // if ([...state.refine.forYou.selectedGenres].length === 0) {
        //   data =
        //     JSON.parse(
        //       localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.GENRE_IDS)
        //     ) || [];
        // }
        if (action.payload.toggle === true) {
          data.push(action.payload.genre);
          name.push(action.payload.name);
        } else if (data.includes(action.payload.genre)) {
          data.splice(data.indexOf(action.payload.genre), 1);
          name.splice(name.indexOf(action.payload.name), 1);
        } else {
          data.push(action.payload.genre);
          name.push(action.payload.name);
        }
        if (action.payload.toggle === false) {
          data = [];
          name = [];
        }
        return {
          ...state,
          refine: {
            ...state.refine,
            loading: false,
            forYou: {
              ...state.refine.forYou,
              refineForYou: false,
              selectedGenres: Array.from(new Set(data)),
              selectedGenresName: Array.from(new Set(name)),
              selectedAllGenres:
                action.payload.toggle !== undefined
                  ? action.payload.toggle
                  : false,
              unSelectedAllGenres:
                Array.from(new Set(data)).length > 0 ? false : true,
            },
          },
        };
      }
      return state;
    }
    case actions.SET_REFINE_FREE_PAID: {
      if (action.payload) {
        let name = [...state.refine.forYou.selectedFreePaid];

        if (action.payload.toggle === true) {
          name.push(action.payload.name);
        } else if (name.includes(action.payload.name)) {
          name.splice(name.indexOf(action.payload.name), 1);
        } else {
          name.push(action.payload.name);
        }
        if (action.payload.toggle === false) {
          name = [];
        }
        return {
          ...state,
          refine: {
            ...state.refine,
            loading: false,
            forYou: {
              ...state.refine.forYou,
              refineForYou: false,
              selectedFreePaid: Array.from(new Set(name)),
              selectedAllFreePaid:
                action.payload.toggle !== undefined
                  ? action.payload.toggle
                  : false,
              unSelectedAllFreePaid:
                Array.from(new Set(name)).length > 0 ? false : true,
            },
          },
        };
      }
      return state;
    }
    case actions.SET_REFINE_QUALITY: {
      if (action.payload) {
        let name = [...state.refine.forYou.selectedQuality];

        if (action.payload.toggle === true) {
          name.push(action.payload.name);
        } else if (name.includes(action.payload.name)) {
          name.splice(name.indexOf(action.payload.name), 1);
        } else {
          name.push(action.payload.name);
        }
        if (action.payload.toggle === false) {
          name = [];
        }
        return {
          ...state,
          refine: {
            ...state.refine,
            loading: false,
            forYou: {
              ...state.refine.forYou,
              refineForYou: false,
              selectedQuality: Array.from(new Set(name)),
              selectedAllQuality:
                action.payload.toggle !== undefined
                  ? action.payload.toggle
                  : false,
              unSelectedAllQuality:
                Array.from(new Set(name)).length > 0 ? false : true,
            },
          },
        };
      }
      return state;
    }
    case actions.SET_REFINE_CONTENT_TYPE: {
      if (action.payload) {
        let name: any = [...state.refine.forYou.selectedContentType];

        if (action.payload.toggle === true) {
          name.push(action.payload.name);
        } else if (name.includes(action.payload.name)) {
          name.splice(name.indexOf(action.payload.name), 1);
        } else {
          name = [];
          name.push(action.payload.name);
        }
        if (action.payload.toggle === false) {
          name = [];
        }
        return {
          ...state,
          refine: {
            ...state.refine,
            loading: false,
            forYou: {
              ...state.refine.forYou,
              refineForYou: false,
              selectedContentType: Array.from(new Set(name)),
              selectedAllContentType:
                action.payload.toggle !== undefined
                  ? action.payload.toggle
                  : false,
              unSelectedAllContentType:
                Array.from(new Set(name)).length > 0 ? false : true,
            },
          },
        };
      }
      return state;
    }
    case actions.SET_REFINE_CONTENT_RATING: {
      if (action.payload) {
        let name: any = [...state.refine.forYou.selectedContentRating];

        if (action.payload.toggle === true) {
          name.push(action.payload.name);
        } else if (name.includes(action.payload.name)) {
          name.splice(name.indexOf(action.payload.name), 1);
        } else {
          name.push(action.payload.name);
        }
        if (action.payload.toggle === false) {
          name = [];
        }
        return {
          ...state,
          refine: {
            ...state.refine,
            loading: false,
            forYou: {
              ...state.refine.forYou,
              refineForYou: false,
              selectedContentRating: Array.from(new Set(name)),
              selectedAllContentRating:
                action.payload.toggle !== undefined
                  ? action.payload.toggle
                  : false,
              unSelectedAllContentRating:
                Array.from(new Set(name)).length > 0 ? false : true,
            },
          },
        };
      }
      return state;
    }
    case actions.SET_REFINE_RUNTIME_MIN: {
      if (action.payload) {
        let name: any = [...state.refine.forYou.selectedRuntimeMin];
        let name2: any = [...state.refine.forYou.selectedRuntimeMin2];
        if (action.payload.toggle === true) {
          name.push(action.payload.name);
          name2.push(action.payload.name2);
        } else if (name.includes(action.payload.name)) {
          name.splice(name.indexOf(action.payload.name), 1);
          name2.splice(name2.indexOf(action.payload.name2), 1);
        } else {
          name = [];
          name2 = [];
          name.push(action.payload.name);
          name2.push(action.payload.name2);
        }
        if (action.payload.toggle === false) {
          name = [];
          name2 = [];
        }
        return {
          ...state,
          refine: {
            ...state.refine,
            loading: false,
            forYou: {
              ...state.refine.forYou,
              refineForYou: false,
              selectedRuntimeMin: Array.from(new Set(name)),
              selectedRuntimeMin2: Array.from(new Set(name2)),
              selectedAllRuntimeMin:
                action.payload.toggle !== undefined
                  ? action.payload.toggle
                  : false,
              unSelectedAllRuntimeMin:
                Array.from(new Set(name)).length > 0 ? false : true,
            },
          },
        };
      }
      return state;
    }
    case actions.REFINE_FOR_YOU_PAGE: {
      return {
        ...state,
        refine: {
          ...state.refine,
          loading: false,
          forYou: {
            ...state.refine.forYou,
            refineForYou: true,
            filter: {
              ...state.refine.forYou.filter,
              selectedLanguages: Array.from(
                new Set([...state.refine.forYou.selectedLanguages])
              ),
              selectedStreamingServices: Array.from(
                new Set([...state.refine.forYou.selectedStreamingServices])
              ),
              selectedGenres: Array.from(
                new Set([...state.refine.forYou.selectedGenres])
              ),
              selectedFreePaid: Array.from(
                new Set([...state.refine.forYou.selectedFreePaid])
              ),
              selectedQuality: Array.from(
                new Set([...state.refine.forYou.selectedQuality])
              ),
              selectedContentType: Array.from(
                new Set([...state.refine.forYou.selectedContentType])
              ),
              selectedRuntimeMin: Array.from(
                new Set([...state.refine.forYou.selectedRuntimeMin])
              ),
              selectedContentRating: Array.from(
                new Set([...state.refine.forYou.selectedContentRating])
              ),
            },
          },
        },
      };
    }
    case actions.REFINE_NEWS_PAGE: {
      return {
        ...state,
        refine: {
          ...state.refine,
          loading: false,
          news: {
            ...state.refine.news,
            refineNews: true,
            filter: {
              ...state.refine.news.filter,
              selectedSource: state.refine.news.selectedSource,
            },
          },
        },
      };
    }
    case actions.SET_REFINE_SOURCE: {
      if (action.payload) {
        let name = state.refine.news.selectedSource;
        if (name === action.payload.name) {
          name = 'All';
        } else {
          name = action.payload.name;
        }
        if (action.payload.toggle === false) {
          name = '';
        }
        return {
          ...state,
          refine: {
            ...state.refine,
            loading: false,
            news: {
              ...state.refine.news,
              refineSource: false,
              selectedSource: name,
              selectedAllSource:
                action.payload.toggle !== undefined
                  ? action.payload.toggle
                  : false,
              unSelectedAllSource: name === '' ? false : true,
            },
          },
        };
      }
      return state;
    }
    case actions.SET_SEEALL_EPISODES: {
      if (action.payload) {
        if (typeof window !== undefined) {
          localStorage.setItem(
            LOCALSTORAGE_KEY_CONSTANTS.SEEALL_EPISODE_OBJ,
            JSON.stringify(action.payload)
          );
        }
        return {
          ...state,
          seeAllEpisodesParams: {
            ...state.seeAllEpisodesParams,
            ...action.payload,
          },
        };
      }
      break;
    }

    case actions.SET_MOVIE_NAV_FILTER: {
      if (action.payload) {
        if (typeof window !== undefined) {
          localStorage.setItem(
            LOCALSTORAGE_KEY_CONSTANTS.MOVIE_NAV_FILTER_OBJ,
            JSON.stringify(action.payload)
          );
        }
        return {
          ...state,
          movieNavFilter: {
            ...action.payload,
          },
        };
      }
      break;
    }
    default:
      return state;
  }
};

export default reducerComp;
