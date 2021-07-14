/* eslint-disable global-require */
import React, { createContext, useEffect, useState } from 'react';

import { LOCALSTORAGE_KEY_CONSTANTS } from '../utils/constants';
import getConst from '../theme/constant';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize';

export const LocalizationContext = createContext({});

const { DEFAULT_LANGUAGE, APP_LANGUAGE } = getConst;

// Get all languages
const translationGetters = {
  en: () => require('../translations/en.json'),
  nl: () => require('../translations/nl.json'),
};

const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);

const setI18nLang = (languageTag = DEFAULT_LANGUAGE) => {
  translate.cache.clear();

  i18n.translations = { [languageTag]: translationGetters[languageTag]() };
  i18n.locale = languageTag;
};

// Provider Component

const LocalizationProvider = ({ children, lang = DEFAULT_LANGUAGE }) => {
  const [appLanguage, setLanguage] = useState(lang || DEFAULT_LANGUAGE);

  const setAppLanguage = (language) => {
    setLanguage(language);
    // localStorage.setItem(APP_LANGUAGE, language);localStorageKeyConstants
    if (typeof window !== undefined) {
      localStorage.setItem(LOCALSTORAGE_KEY_CONSTANTS.LANGUAGE_NAMES, language);
    }
  };

  const setI18nInit = async () => {
    const currentLanguage = await localStorage.getItem(APP_LANGUAGE);

    if (currentLanguage && currentLanguage === lang) {
      setLanguage(currentLanguage);
    } else if (currentLanguage && currentLanguage !== lang) {
      setLanguage(lang);
    } else {
      const fallback = { languageTag: lang };
      // eslint-disable-next-line operator-linebreak
      //   const { languageTag } =
      //     RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) || fallback

      //   setAppLanguage(languageTag);
    }
  };

  useEffect(() => {
    setI18nInit()
      .then(() => {})
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }, []);

  useEffect(() => {
    setI18nLang(appLanguage);
    // RNLocalize.addEventListener('change', setI18nLang(appLanguage))

    // return RNLocalize.removeEventListener('change', setI18nLang(appLanguage))
  }, [appLanguage]);

  return (
    <LocalizationContext.Provider
      value={{
        translate,
        setI18nLang,
        setI18nInit,
        setAppLanguage,
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};

export default LocalizationProvider;
