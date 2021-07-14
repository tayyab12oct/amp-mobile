import React, { createContext, useContext, useState } from 'react';
import { StoreContext, actions } from './webstore';

import webfox from './webbase';

const WebfoxContext: any = createContext<{
  fetchRecommendations: () => null;
}>({
  fetchRecommendations: () => null,
});

// const WebfoxContext: any = React.createContext({});

const WebfoxProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [forYouPageRefresh, setForYouPageRefresh] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const { state, actionDispatch } = useContext(StoreContext);

  return (
    <WebfoxContext.Provider
      value={{
        webfox,
        loading,
        setLoading,
        loadingMore,
        setLoadingMore,
        setForYouPageRefresh,
        forYouPageRefresh,
        // web store
        webstore: state,
        actions,
        actionDispatch,
      }}
    >
      {children}
    </WebfoxContext.Provider>
  );
};

export { WebfoxContext, WebfoxProvider };
