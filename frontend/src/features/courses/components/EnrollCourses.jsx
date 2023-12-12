import { DownOutlined } from '@ant-design/icons';
import EnrollCoursesItem from './EnrollCoursesItem';
import { Button, Dropdown, Menu, Pagination, Spin } from 'antd';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const numEachPage = 3;

const EnrollCourses = ({ dataEnroll }) => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(numEachPage);
  const [sort, setSort] = useState('Sắp xếp');
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const loading = useSelector(({ coursesReducer }) => coursesReducer?.loading);

  const handleChange = (value) => {
    setMin((value - 1) * numEachPage);
    setMax(value * numEachPage);
    setPage(value);
  };

  useEffect(() => {
    setData(dataEnroll);
  }, [dataEnroll]);

  const handleClick = ({ key }) => {
    const newArray = [...data];
    if (key === 'default') {
      setSort('Sắp xếp');
      setData(newArray);
    } else if (key === 'asc') {
      setSort('Giá thấp tới cao');
      newArray.sort((a, b) => {
        return parseInt(a.price) - parseInt(b.price);
      });
      setData(newArray);
    } else if (key === 'dsc') {
      setSort('Giá cao tới thấp');
      newArray.sort((a, b) => {
        return parseInt(b.price) - parseInt(a.price);
      });
      setData(newArray);
    }
  };

  const menu = (
    <Menu onClick={handleClick}>
      <Menu.Item key="default">
        <div>Sắp xếp</div>
      </Menu.Item>
      <Menu.Item key="asc">
        <div>Giá thấp đến cao</div>
      </Menu.Item>
      <Menu.Item key="dsc">
        <div>Giá cao đến thấp</div>
      </Menu.Item>
    </Menu>
  );
  return (
    <Spin spinning={loading}>
      <div
        className="d-flex justify-content-end font-weight-bold container mt-3"
        style={{ color: 'orange' }}
      >
        <Dropdown overlay={menu} placement="bottomCenter">
          <Button>
            {sort} <DownOutlined />
          </Button>
        </Dropdown>
      </div>
      <section className="course-one course-page">
        <div className="container" style={{ minHeight: '500px' }}>
          <div className="row">
            {data &&
              data.length > 0 &&
              data.slice(min, max).map((item, index) => (
                <div className="col-lg-4" key={index}>
                  <EnrollCoursesItem data={item} />
                </div>
              ))}
          </div>
          <div className="d-flex justify-content-center">
            <Pagination
              current={page}
              hideOnSinglePage
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

export default React.memo(EnrollCourses);
