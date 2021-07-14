import React, { useEffect } from 'react';

//import { Footer } from './Footer';
import { Hidden } from '@material-ui/core';
import { LOCALSTORAGE_KEY_CONSTANTS } from '../utils/constants';
import { NavBar } from './NavBar';
import { TopHeader } from './TopHeader';
import dynamic from 'next/dynamic';

// const OnboardingFooter = dynamic(() => import('./OnboardingFooter'), {
//   ssr: false,
// });

const Footer: any = dynamic<Function>(
  import('./Footer').then((module) => module.Footer) as any,
  { ssr: false }
);
// import { OnboardingFooter } from './OnboardingFooter';

// const TopHeader: any = dynamic<Function>(
//   import('./TopHeader').then((module) => module.TopHeader) as any,
//   { ssr: false }
// );

// const NavBar: any = dynamic<Function>(
//   import('./NavBar').then((module) => module.NavBar) as any,
//   { ssr: false }
// );

export default function Layout({ children }) {
  const handleScroll = () => {
    const appRoutes = document.getElementById('top-header');
    if (appRoutes) {
      const vertualNavEle = document.getElementById('vertualNavBar');
      if (vertualNavEle) {
        if (appRoutes.getBoundingClientRect().top < -80) {
          vertualNavEle.style.height = 'fit-content';
        } else {
          vertualNavEle.style.height = '0px';
        }
      }
    }
  };

  useEffect(() => {
    const unlisten = () => {
      window.removeEventListener('scroll', handleScroll, false);
    };

    window.addEventListener('scroll', handleScroll, false);
    return () => {
      unlisten();
    };
  }, []);

  return (
    <div id="top-header">
      {typeof window !== 'undefined' &&
      localStorage.getItem('fromForYou') === 'true' &&
      localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.ONBOARDING_DONE) ==
        undefined ? (
        <Hidden only={['xs']}>
          <TopHeader isOnboarding={true} />
        </Hidden>
      ) : (
        <div>
          <TopHeader isOnboarding={false} screen />
          <Hidden only={['xs']}>
            <NavBar isVertual={false} />
            <NavBar isVertual={true} />
          </Hidden>
        </div>
      )}
      {children}
      <Footer />
    </div>
  );
}
