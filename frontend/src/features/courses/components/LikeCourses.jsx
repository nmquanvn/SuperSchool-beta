import LikeCoursesItem from './LikeCoursesItem';
import { Pagination, Spin } from 'antd';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const numEachPage = 3;

const LikeCourses = ({ dataLike, deleteLikeCourse }) => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(numEachPage);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const loading = useSelector(({ coursesReducer }) => coursesReducer?.loading);

  const handleChange = (value) => {
    setMin((value - 1) * numEachPage);
    setMax(value * numEachPage);
    setPage(value);
  };

  useEffect(() => {
    setData(dataLike);
  }, [dataLike]);

  return (
    <Spin spinning={loading}>
      <div
        className="d-flex justify-content-end font-weight-bold container mt-3"
        style={{ color: 'orange' }}
      ></div>
      <section className="course-one course-page">
        <div className="container" style={{ minHeight: '500px' }}>
          <div className="row">
            {data &&
              data.length > 0 &&
              data.slice(min, max).map((item, index) => (
                <div className="col-lg-4" key={index}>
                  <LikeCoursesItem
                    data={item}
                    deleteLikeCourse={deleteLikeCourse}
                  />
                </div>
              ))}
          </div>
          <div className="d-flex justify-content-center">
            <Pagination
              current={page}
              defaultPageSize={numEachPage}
              onChange={handleChange}
              total={data?.length}
            />
          </div>
        </div>
      </section>
    </Spin>
  );
};

export default React.memo(LikeCourses);
