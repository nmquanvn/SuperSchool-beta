import axiosClient from './axiosClient';

const profileApi = {
  changePassword: (data) => {
    const url = '/users/changePassword';
    return axiosClient.post(url, data);
  },
  updateInfo: (data)=>{
    const url = '/users/updateInfo';
    return axiosClient.post(url, data);
  },
  updateAvatar: (data)=>{
    const url = '/users/updateAvatar';
    return axiosClient.post(url, data);
  }
};

export default profileApi;
