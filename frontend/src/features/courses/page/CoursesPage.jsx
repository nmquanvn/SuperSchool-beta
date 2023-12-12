import React, { useEffect } from 'react';
import NavOne from '@components/NavOne';
import Footer from '@components/Footer';
import PageHeader from '@components/PageHeader';
import Courses from '../components/Courses';
import TopBar from '@components/TopBar';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getListCourses } from '@features/courses/coursesSlice';

function CoursesPage() {
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  useEffect(() => {
    if (categoryId) return dispatch(getListCourses({ categoryId: categoryId }));
    dispatch(getListCourses());
  }, [categoryId, dispatch]);
  return (
    <>
      <TopBar />
      <NavOne />
      <PageHeader title="Các khoá học" />
      <Courses />
      <Footer />
    </>
  );
}

export default CoursesPage;
