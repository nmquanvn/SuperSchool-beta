import React, { useEffect, useState } from 'react';
import NavOne from '@components/NavOne';
import Footer from '@components/Footer';
import PageHeader from '@components/PageHeader';
import LikeCourses from '../components/LikeCourses';
import TopBar from '@components/TopBar';
import coursesApi from '@api/coursesApi';
import { Spin } from 'antd';

function LikeCoursesPage() {
  const [likeCourses, setLikeCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchLikeCourses = async () => {
    setLoading(true);
    const res = await coursesApi.listLikeCourses();
    setLikeCourses(res?.data);
    setLoading(false);
  };
  const handleDeleteLikeCourse = async (e) => {
    await coursesApi.deleteLikeCourses(e);
    fetchLikeCourses();
  };
  useEffect(() => {
    fetchLikeCourses();
  }, []);
  return (
    <Spin spinning={loading}>
      <TopBar />
      <NavOne />
      <PageHeader title="Các khoá học yêu thích" />
      <LikeCourses
        dataLike={likeCourses}
        deleteLikeCourse={(e) => handleDeleteLikeCourse(e)}
      />
      <Footer />
    </Spin>
  );
}

export default LikeCoursesPage;
