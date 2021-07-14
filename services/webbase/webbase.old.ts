import * as routes from './routes';

import logError from './queries';

const getRoute = () => {
  try {
    return {
      // auth: routes.auth,
      // webfoxstore: routes.auth,
      getAllMovies: routes.getAllMovies,
    };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('getRoute encountered error', e);
  }
  // finally {
  //   // eslint-disable-next-line no-console
  //   logError('getRoute encountered error..need a gracefull shutdown');
  // }
  return {};
};

export default {
  // auth: getRoute().auth,
  // webfoxstore: getRoute().auth,

  // Movie Api
  getAllMovies: getRoute().getAllMovies,
};
