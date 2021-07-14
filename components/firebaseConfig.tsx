// import 'firebase/analytics';

// import * as firebase from 'firebase';

import 'firebase/functions';
import 'firebase/analytics';

import * as firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: 'AIzaSyDOxT4ToTt6GdCkNCq-u8YNcl8y5Ha-xoM',
  authDomain: 'ottplay-100.firebaseapp.com',
  databaseURL: 'https://ottplay-100.firebaseio.com',
  projectId: 'ottplay-100',
  storageBucket: 'ottplay-100.appspot.com',
  messagingSenderId: '461924812382',
  appId: '1:461924812382:web:44ef626cdad0ba272916cf',
  measurementId: 'G-B5Z12ZR9X4',
};
export const firebaseConfigPreprod = {
  apiKey: 'AIzaSyAnQZT3P63mA9WFDFo4teAmwBxHpmeUxIs',
  authDomain: 'ottplay-preprod.firebaseapp.com',
  projectId: 'ottplay-preprod',
  storageBucket: 'ottplay-preprod.appspot.com',
  messagingSenderId: '851148249132',
  appId: '1:851148249132:web:2fe1005b61afc964391989',
  measurementId: 'G-L93QRBE95X',
};

if (process.env.REACT_APP_ENV === 'production') {
  // Initialize Firebase

  if (typeof window !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
} else {
  if (typeof window !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfigPreprod);
    firebase.analytics();
  }
}

export const firebaseAnalytics: any =
  typeof window !== 'undefined' && firebase.apps.length && firebase.analytics();
