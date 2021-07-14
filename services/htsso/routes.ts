import { FETCH_POLICY } from '../../utils/constants';
import api from './queries';

const logerror = api.logError;

export const auth = () => {};
export const webfoxstore = () => {};

export const getProfileData: any = async (params: any) => {
  const res = await api.getProfileData(params).catch((e) => {
    logerror(e);
    return { data: null, error: e };
  });

  const val: any = res ? res.data : null;
  // console.log("getAllMovies : " + JSON.stringify(val));

  return { data: val ? val.data : null, error: null };
};
