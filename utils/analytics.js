import { firebaseAnalytics } from '../components/firebaseConfig';

const windowAny = typeof window !== 'undefined' && window;

export const setAnalyticsUserProperties = (params) => {
  if (params && params.userType !== undefined) {
    firebaseAnalytics.setUserProperties({ userType: params.userType });

    windowAny?.Moengage?.add_user_attribute('userType', params.userType);
  }
  if (params && params.preferredLanguages !== undefined) {
    firebaseAnalytics.setUserProperties({
      preferredLanguages: params.preferredLanguages,
    });
    windowAny?.Moengage?.add_user_attribute(
      'preferredLanguages',
      params.preferredLanguages
    );
  }
  if (params && params.preferredProviders !== undefined) {
    firebaseAnalytics.setUserProperties({
      preferredProviders: params.preferredProviders,
    });
    windowAny?.Moengage?.add_user_attribute(
      'preferredProviders',
      params.preferredProviders
    );
  }
  if (params && params.user_unique_id !== undefined) {
    firebaseAnalytics.setUserProperties({
      user_unique_id: params.user_unique_id,
    });
    windowAny?.Moengage?.add_user_attribute(
      'user_unique_id',
      params.user_unique_id
    );
  }
};
