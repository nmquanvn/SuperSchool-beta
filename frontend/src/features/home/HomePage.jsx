import CoursesCarousel from '@components/CoursesCarousel';
import TopBar from '@components/TopBar';
import NavOne from '@components/NavOne';
import BestViewCategory from '@components/BestViewCategory';
import Footer from '@components/Footer';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCoursesHightLight,
  getTop10View,
  getTop10New,
  getTopRegisterCategory,
} from '@features/home/homeSlice';

function HomePage() {
  const dispatch = useDispatch();
  const coursesHightLight = useSelector(
    ({ homeReducer }) => homeReducer?.coursesHightLight
  );
  const top10View = useSelector(({ homeReducer }) => homeReducer?.top10View);
  const top10New = useSelector(({ homeReducer }) => homeReducer?.top10New);
  const topRegisterCategory = useSelector(
    ({ homeReducer }) => homeReducer?.topRegisterCategory
  );
  useEffect(() => {
    if (!coursesHightLight?.length) return dispatch(getCoursesHightLight());
  }, [coursesHightLight?.length, dispatch]);
  useEffect(() => {
    if (!top10View?.length) return dispatch(getTop10View());
  }, [top10View?.length, dispatch]);
  useEffect(() => {
    if (!top10New?.length) return dispatch(getTop10New());
  }, [top10New?.length, dispatch]);
  useEffect(() => {
    if (!topRegisterCategory?.length) return dispatch(getTopRegisterCategory());
  }, [topRegisterCategory?.length, dispatch]);
  return (
    <>
      <TopBar />
      <NavOne />
      <CoursesCarousel type="hightlight" data={coursesHightLight} />
      <CoursesCarousel type="new" data={top10View} />
      <CoursesCarousel type="bestview" data={top10New} />
      <BestViewCategory data={topRegisterCategory} />
      <Footer />
    </>
  );
}

export default React.memo(HomePage);
