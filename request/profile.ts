import axios from './index';

export const getUserProfile = (): AxiosServerResponse<Profile> => {
  return axios.get('/profile');
};

export const postUserProfile = (profile: Profile): AxiosServerResponse<Profile> => {
  return axios.post('/profile', { profile });
};
