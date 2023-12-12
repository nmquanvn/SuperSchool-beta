import CoursesList from '@cmsviews/CourseManagement/CoursesList';
import TeacherCourses from '@cmsviews/CourseManagement/TeacherCourses';
import AddCourse from '@cmsviews/CourseManagement/AddCourse.jsx';
import EditCourse from '@cmsviews/CourseManagement/EditCourse.jsx';
import ListIcon from 'material-ui-icons/List';
// Users
import AdminTable from '@cmsviews/UsersManagement/AdminTable.jsx';
import StudentTable from '@cmsviews/UsersManagement/StudentTable.jsx';
import TeacherTable from '@cmsviews/UsersManagement/TeacherTable.jsx';
import AccountRegister from '@cmsviews/UsersManagement/AccountRegister.jsx';
import Profile from '@cmsviews/UsersManagement/Profile.jsx';
import UserAndCourse from '@cmsviews/UsersManagement/UserAndCourses.jsx';
// material-ui-icons
import DashboardIcon from 'material-ui-icons/Dashboard';
import ContentPaste from 'material-ui-icons/ContentPaste';
import GroupIcon from 'material-ui-icons/Group';
import PersonIcon from 'material-ui-icons/Person';
//Category
import MainCategoryTables from '@cmsviews/CategoryManagement/MainCategoryTables';
import SubCategoryTables from '@cmsviews/CategoryManagement/SubCategoryTables';
import CategoryForm from '@cmsviews/CategoryManagement/CategoryForm';
import parseJwt from '@utils/parseJwt';

const group = parseJwt(localStorage.token).groupCode;
var managerRoutes = [
  // User Info
  {
    path: '/manager/profile',
    icon: PersonIcon,
    name: 'Thông tin cá nhân',
    component: Profile,
  },
  {
    collapse: true,
    path: '/manager/users',
    name: 'Quản Lý Tài Khoản',
    state: 'openUsers',
    icon: GroupIcon,
    views: [
      {
        path: '/manager/users/admin',
        name: 'Tài khoản Admin',
        mini: 'AD',
        component: AdminTable,
      },
      {
        path: '/manager/users/teacher',
        name: 'Tài khoản Giáo viên',
        mini: 'TE',
        component: TeacherTable,
      },
      {
        path: '/manager/users/student',
        name: 'Tài khoản Học viên',
        mini: 'STU',
        component: StudentTable,
      },
      {
        path: '/manager/users/add-user',
        name: 'Tạo tài khoản',
        mini: 'RG',
        component: AccountRegister,
      },
    ],
  },
  {
    collapse: true,
    path: '/manager/category',
    name: 'Quản lý danh mục',
    state: 'openCategory',
    icon: ContentPaste,
    views: [
      {
        path: '/manager/category/main-category',
        name: 'Danh mục chính',
        mini: 'MN',
        component: MainCategoryTables,
      },
      {
        path: '/manager/category/sub-category',
        name: 'Danh mục phụ',
        mini: 'SB',
        component: SubCategoryTables,
      },
      {
        path: '/manager/category/category-form',
        name: 'Điều chỉnh danh mục',
        mini: 'ED',
        component: CategoryForm,
      },
    ],
  },
  {
    path: '/manager/courses',
    name: 'Quản lý khóa học',
    icon: ListIcon,
    component: CoursesList,
  },
  {
    path: '/manager/add-course',
    name: 'Thêm khoá học',
    icon: DashboardIcon,
    component: AddCourse,
  },

  //User Edit
  // {
  //   path: '/manager/editprofile',
  //   icon: PersonIcon,
  //   name: 'Sửa thông tin',
  //   component: UserProfile,
  // },
  {
    path: '/manager/viewinfo',
    icon: DashboardIcon,
    name: 'Thông tin người dùng',
    component: UserAndCourse,
    hidden: true,
  },
  {
    path: '/manager/edit-course/:id',
    icon: DashboardIcon,
    name: 'Chỉnh sửa khoá học',
    hidden: true,
    component: EditCourse,
  },
  {
    redirect: true,
    path: '/',
    pathTo: '/manager/profile',
    name: 'Dashboard',
  },
];

var teacherRoutes = [
  {
    path: '/manager/profile',
    icon: PersonIcon,
    name: 'Thông tin cá nhân',
    component: Profile,
  },

  {
    path: '/manager/teachercourses',
    icon: DashboardIcon,
    name: 'Khoá học của tôi',
    component: TeacherCourses,
  },
  {
    path: '/manager/add-course',
    name: 'Thêm khoá học',
    icon: DashboardIcon,
    component: AddCourse,
  },
  {
    path: '/manager/edit-course/:id',
    icon: DashboardIcon,
    name: 'Chỉnh sửa khoá học',
    hidden: true,
    component: EditCourse,
  },
  {
    redirect: true,
    path: '/',
    pathTo: '/manager/profile',
    name: 'Dashboard',
  },
];
let dashRoutes = [];
if (group === 'ADMIN') {
  dashRoutes = managerRoutes;
} else if (group === 'TEACHER') {
  dashRoutes = teacherRoutes;
}

export default dashRoutes;
