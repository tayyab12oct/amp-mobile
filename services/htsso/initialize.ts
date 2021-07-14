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
  typeof window !== "undefined" && sessionStorage.getItem('env') !== null
      ? sessionStorage.getItem('env')
      : process.env.REACT_APP_API_BASE_URL,
  // baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 8000,
  responseType: 'json',
};

export default axios.create(webfoxConfig);

// const instance = axios.create({
//   baseURL: 'https://some-domain.com/api/',
//   timeout: 1000,
//   headers: {'X-Custom-Header': 'foobar'}
// });
