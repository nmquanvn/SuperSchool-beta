import axiosClient from './axiosClient';

const coursesApi = {
  getTopViewCourses: () => {
    const url = '/course/views/top';
    return axiosClient.get(url);
  },
  getCoursesByAdmin: () => {
    const url = '/admin/view/courses/';
    return axiosClient.get(url);
  },
  changePublish: async (id, check) => {
    const url = `/course/disable-course/${id}`;
    return await axiosClient.put(url, { publish: check });
  },
  getCoursesByTeacher: async (id) => {
    const url = `/admin/view/teachercourses/${id}`;
    await axiosClient.get(url);
    return await axiosClient.get(url);
  },
  findById: async (id) => {
    const url = `/course/findById/${id}`;
    return axiosClient.get(url);
  },
  teacherCreateCourse: async (obj) => {
    console.log(obj);
    const url = `course/create/`;
    return axiosClient.post(url, obj);
  },
  // 3 khoa hoc noi bac
  getCoursesHightLight: () => {
    const url = '/course/top-highlight';
    return axiosClient.get(url);
  },
  // top 10 view
  getTop10ViewCourses: () => {
    const url = '/course/top10View';
    return axiosClient.get(url);
  },
  // top 10 newest courses
  getTop10NewestCourses: () => {
    const url = '/course/top10Newest';
    return axiosClient.get(url);
  },
  // search
  getCoursesWhenSearch: (data) => {
    const url = '/course/search';
    return axiosClient.post(url, data);
  },
  // chi tiet khoa hoc
  getDetailCourses: (id) => {
    const url = `/course/findById/${id}`;
    return axiosClient.get(url);
  },
  // get review courses
  getReviewCourses: (data) => {
    const url = '/course/review/findByCourseId';
    return axiosClient.post(url, data);
  },
  // review courses
  reviewCourses: (data) => {
    const url = '/course/review';
    return axiosClient.post(url, data);
  },
  //dk khoa hoc
  registerCourses: (data) => {
    const url = `/register-course?courseId=${data}`;
    return axiosClient.post(url);
  },
  //them khoa hoc vao ds yeu thich
  likeCourses: (data) => {
    const url = `/course/favorite/add-to-favorite?courseId=${data}`;
    return axiosClient.post(url);
  },
  //ds khoa hoc yeu thich
  listLikeCourses: () => {
    const url = '/course/favorite/get-list';
    return axiosClient.get(url);
  },
  //ds khoa hoc dang theo hoc
  listEnrollCourses: () => {
    const url = '/register-course/get-list';
    return axiosClient.get(url);
  },
  //xoa khoa hoc yeu thich
  deleteLikeCourses: (id) => {
    const url = `/course/favorite/remove-from-favorite/${id}`;
    return axiosClient.delete(url);
  },
  updateCourse: (id, data) => {
    const url = `/course/update/${id}`;
    return axiosClient.put(url, data);
  },
};
export default coursesApi;
