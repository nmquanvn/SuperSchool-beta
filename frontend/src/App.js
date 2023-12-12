import userApi from '@api/userApi';
import { checkLogin } from '@app/userSlice';
import { getListCategory } from '@features/home/homeSlice';
import LoadingScreen from '@components/LoadingScreen';
import HomePage from '@features/home/HomePage';
import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Spin } from 'antd';
import PrivateRoute from '@utils/PrivateRoute';
const NotFoundPage = React.lazy(() => import('@components/NotFound'));
const CoursesPage = React.lazy(() => import('@features/courses/index'));
const LoginPage = React.lazy(() => import('@features/auth/login'));
const RegisterPage = React.lazy(() => import('@features/auth/register'));
const ContactPage = React.lazy(() => import('@features/home/ContactPage'));
const SearchPage = React.lazy(() => import('@features/search/SearchPage'));
const ProfilePage = React.lazy(() =>
  import('@features/profile/ProfilePage.jsx')
);
const TestUploadPage = React.lazy(() => import('./test/Upload'));

const CmsPage = React.lazy(() => import('@features/cms/cms'));
function App() {
  const category = useSelector(({ homeReducer }) => homeReducer?.category);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const CheckLogin = async () => {
      setLoading(true);
      const currentUser = await userApi.checkLogin();
      if (currentUser?.isLogin) {
        dispatch(checkLogin(currentUser));
      }
      setLoading(false);
    };
    const token = localStorage.getItem('token');
    if (token && token !== 'undefined') CheckLogin();
  }, [dispatch]);
  useEffect(() => {
    !category?.length && dispatch(getListCategory());
  }, [category?.length, dispatch]);
  return (
    <Spin spinning={loading}>
      <Suspense fallback={<LoadingScreen />}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/courses" component={CoursesPage} />
            <Route path="/manager" component={CmsPage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/register" exact component={RegisterPage} />
            <Route path="/contact" exact component={ContactPage} />
            <Route path="/search" component={SearchPage} />
            <PrivateRoute path="/profile">
              <ProfilePage />
            </PrivateRoute>
            <Route path="/upload" component={TestUploadPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </Spin>
  );
}

export default App;
