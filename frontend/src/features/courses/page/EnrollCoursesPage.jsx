import React, { useEffect, useState } from 'react';
import NavOne from '@components/NavOne';
import Footer from '@components/Footer';
import PageHeader from '@components/PageHeader';
import EnrollCourses from '../components/EnrollCourses';
import TopBar from '@components/TopBar';
import coursesApi from '@api/coursesApi';
import { Spin } from 'antd';

function EnrollCoursesPage() {
  const [enrollCourses, setEnrollCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchEnrollCourses = async () => {
    setLoading(true)
    const res = await coursesApi.listEnrollCourses();
    setEnrollCourses(res?.data);
    setLoading(false)
  };
  useEffect(() => {
    fetchEnrollCourses();
  }, []);
  return (
    <Spin spinning={loading}>
      <TopBar />
      <NavOne />
      <PageHeader title="Các khoá học đang theo dõi" />
      <EnrollCourses dataEnroll={enrollCourses} />
      <Footer />
    </Spin>
  );
}

export default EnrollCoursesPage;
