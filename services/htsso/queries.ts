import webfox from './initialize';

// async function throwAnError() {
//   throw new Error('Oops!');
// }

const logError = (error) => {
  // eslint-disable-next-line no-console
  console.log('system error: ', error);
  // return 42;
};

const exec = async (fn, params = null, error = null) => {
  const res = {
    data: null,
    error: null,
    syserror: null,
  };

  // const {response, e} = await fn(params);
  // res.data = response;
  // res.error = e;
  // console.log(">>> response >>> " + response);
  // return res;

  const response = await fn(params).catch((e) => {
    logError(e);
    res.error = error;
    res.syserror = e;
  });
  console.log('>>> response >>> ' + JSON.stringify(response));
  if (response) {
    res.data = response;
  }
  // res.data = response;
  return res;
};

const getProfileData = (params) =>
  exec(() => {
    return webfox.get('/v2/fetchUserData', {
      headers: {
        accept: '*/*',
        Authorization: `${params}`,
      },
    });
  });

export default {
  getProfileData,
  logError,
};
