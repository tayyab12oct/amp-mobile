import axios from 'axios';

const webfoxConfig: any = {
  // apiKey: 'AIzaXXXXXXXXXXXXXXXXXXXXXXX',
  // authDomain: 'test-XXXX.firebaseapp.com',
  // databaseURL: 'https://test-XXXXXX.firebaseio.com',
  // projectId: 'test-XXXX',
  // storageBucket: 'test-XXXX.appspot.com',
  // messagingSenderId: 'XXXXXXX',
  // appId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  baseURL:
    typeof window !== 'undefined' && sessionStorage.getItem('env') !== null
      ? sessionStorage.getItem('env')
      : process.env.REACT_APP_API_BASE_URL,
  // Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
  // baseURL: 'https://stg-webapi.ottplay.com/api/v2/web',
  //baseURL: 'https://stg-webapi.ottplay.com/api/',
  //baseURL: 'https://api.ottplay.com/api/',
  // baseURL: 'https://ott-webapi.robosoftin.com:8493/api/',
  timeout: 8000,
  responseType: 'json',
};

export default axios.create(webfoxConfig);

// const instance = axios.create({
//   baseURL: 'https://some-domain.com/api/',
//   timeout: 1000,
//   headers: {'X-Custom-Header': 'foobar'}
// });
