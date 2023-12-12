import Footer from '@components/Footer';
import NavOne from '@components/NavOne';
import PageHeader from '@components/PageHeader';
import TopBar from '@components/TopBar';
import { getCoursesWhenSearch } from '@features/search/searchSlice';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Courses from '../components/Courses';

function Search() {
  const { keyword } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    const dataToSend = {
      fullText: keyword,
    };
    if (keyword) dispatch(getCoursesWhenSearch(dataToSend));
  }, [keyword, dispatch]);
  return (
    <>
      <TopBar />
      <NavOne />
      <PageHeader title="Tìm kiếm khoá học" />
      <Courses />
      <Footer />
    </>
  );
}

export default React.memo(Search);
