/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';

import Router from 'next/router';

const TransitionContext: any = React.createContext<{
  isTransitioning: boolean;
  setTransitioning: React.Dispatch<any>;
  slotList: [];
  addToSlot: React.Dispatch<any>;
}>({
  isTransitioning: false,
  setTransitioning: () => null,
  slotList: [],
  addToSlot: () => null,
});

// This is a simple helper function that will take a type
// (from the constants above) and a payload, which will be the
// value which needs to be affected in state .It returns
// a simple object that will be passed to our dispatch function

const TransitionProvider = ({ children }) => {
  const [isTransitioning, setTransitioning] = useState(false);
  const [slotList, addToSlot] = useState([]);
  
  const windowAny: any = typeof window !== "undefined" && window;
  const { googletag } = windowAny;

  useEffect(() => {
    Router.events.on("routeChangeStart", setTransitionStarted);
    Router.events.on("routeChangeComplete", setTransitionComplete);

    return () => {
      Router.events.off("routeChangeStart", setTransitionStarted);
      Router.events.off("routeChangeComplete", setTransitionComplete);
    }
  }, [])
  
  const setTransitionStarted = () => {
    // destroy all ad slots
    const { googletag } = windowAny;
    console.log('executing router started', googletag)

    googletag.cmd.push(function () {
      googletag.pubads().clear();
    });
    googletag.cmd.push(function () {
      googletag.pubads().refresh();
    });

    // destroy all ad slots
    googletag.cmd.push(function () {
      googletag.destroySlots();
    });
    setTransitioning(true);
  };

  console.log('executing router ', Router)

  const setTransitionComplete = () => {
    
    // windowAny.googletag.cmd.push(function () {
    //   windowAny.googletag.display(`${adInfo.id}`);
    //   // setTransitioning(false);
    // });
    setTransitioning(false);
    console.log('executing google tag clean',)
    console.log('executing router complete', googletag)
    // googletag?.cmd.push(function () {
    //   googletag.destroySlots();
    // });
  };

  console.log('executing initiated');
  return (
    <TransitionContext.Provider
      value={{ isTransitioning, setTransitioning, slotList, addToSlot }}
    >
      {children}
    </TransitionContext.Provider>
  );
};

const useTransitionState = () => React.useContext(TransitionContext);


export { TransitionContext, TransitionProvider, useTransitionState };
