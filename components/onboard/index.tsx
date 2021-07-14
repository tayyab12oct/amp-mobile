import React, { useEffect } from 'react';

import { Hidden } from '@material-ui/core';
import { LOCALSTORAGE_KEY_CONSTANTS } from '../../utils/constants';
import { Onboarding } from './Onboard';
import OnboardingFooter from '../OnboardingFooter';
import { useRouter } from 'next/router';

export default function OnboardLayout() {
  const router = useRouter();

  const Redirect = ({ to }) => {
    useEffect(() => {
      router.push(to);
    }, [to]);

    return null;
  };

  return (
    <div
      id="onbording-wrapper"
      style={{
        backgroundPosition: 'bottom',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {localStorage.getItem(LOCALSTORAGE_KEY_CONSTANTS.ONBOARDING_DONE) ? (
        <Redirect to="foryou" />
      ) : (
        <Onboarding />
      )}

      {localStorage.getItem('fromForYou') === 'true' && (
        <Hidden only={['xs']}>
          <OnboardingFooter />
        </Hidden>
      )}
    </div>
  );
}
