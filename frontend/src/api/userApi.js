import axiosClient from './axiosClient';

const userApi = {
  getAll: (params) => {
    const url = '/admin/listuser';
    return axiosClient.get(url, { params });
  },
  getUsersbyGroupId: async (id) => {
    const url = `admin/getuserbygroupid/${id}`;
    return await axiosClient.get(url);
  },
  userGroupTableFill: async (id) => {
    const data = await userApi.getUsersbyGroupId(id);

    return {
      title: id === 1 ? 'Quản trị viên' : id === 2 ? 'Học viên' : 'Giảng viên',
      headerRow: ['ID', 'Email', 'Họ tên', 'Trạng thái', 'Thao tác'],
      footerRow: ['ID', 'Email', 'Họ tên', 'Trạng thái', 'Thao tác'],
      dataRows: data.data.map((prop) => [
        prop.userid,
        prop.email,
        prop.fullname,
        prop.status ? 'Đang hoạt động' : 'Đã khoá',
      ]),
    };
  },
  userToogleStatus: async (id, status) => {
    const url = 'admin/togglestatus';
    return await axiosClient.post(url, { userId: +id, status: status });
  },
  get: (id) => {
    const url = `/user/${id}`;
    return axiosClient.get(url);
  },
  getUsers: async () => {},
  getMe: async () => {
    const token = localStorage.getItem('token');
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  },
  adminCreateAccount: async (obj) => {
    const url = 'admin/createteacher';
    return await axiosClient.post(url, obj);
  },
  //using
  login: (data) => {
    const url = '/auth/login';
    return axiosClient.post(url, data);
  },
  googleLogin: (idToken) => {
    const url = '/auth/google-login';
    return axiosClient.post(url, idToken);
  },
  checkLogin: () => {
    const url = '/auth/check-login';
    return axiosClient.post(url, {});
  },
  checkEmail: (email) => {
    const url = '/auth/check-email';
    return axiosClient.post(url, email);
  },
  confirmOTP: (data) => {
    const url = '/auth/confirm-otp';
    return axiosClient.post(url, data);
  },
  register: (data) => {
    const url = '/auth/register';
    return axiosClient.post(url, data);
  },
};

export default userApi;
