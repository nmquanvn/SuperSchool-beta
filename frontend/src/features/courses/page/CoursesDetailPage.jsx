import React, { useEffect } from 'react';
import TopBar from '@components/TopBar';
import NavOne from '@components/NavOne';
import Footer from '@components/Footer';
import PageHeader from '@components/PageHeader';
import CourseDetails from '../components/CoursesDetail';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import { getDetailCourses } from '@features/courses/coursesSlice';

function CoursesDetailPage() {
  const dispatch = useDispatch();
  const { coursesId } = useParams();
  const loading = useSelector(({ coursesReducer }) => coursesReducer?.loading);
  useEffect(() => {
    if (coursesId) {
      dispatch(getDetailCourses(coursesId));
    }
  }, [coursesId, dispatch]);
  return (
    <Spin spinning={loading}>
      <TopBar />
      <NavOne />
      <PageHeader title="Chi tiết khoá học" />
      <CourseDetails coursesId={coursesId} />
      <Footer />
    </Spin>
  );
}

export default CoursesDetailPage;
