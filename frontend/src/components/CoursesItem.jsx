/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';

function CoursesItem({ data }) {
  const renderStar = (n) => {
    const arr = [];
    for (let i = 1; i <= n; i++) {
      arr.push(<i className="fa fa-star" key={i}></i>);
    }
    return arr;
  };
  const renderNew = (date) => {
    const date1 = new Date(date);
    const date2 = new Date();
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 3)
      return (
        <div
          style={{
            position: 'absolute',
            zIndex: '10000',
            right: '0',
            top: '-20px',
          }}
        >
          <img
            src="https://icons.iconarchive.com/icons/custom-icon-design/flatastic-4/512/New-icon.png"
            width="70px"
            height="70px"
          />
        </div>
      );
  };
  return (
    <div className="course-one__single">
      {+data?.totalPromotions ? (
        <div style={{ position: 'absolute', zIndex: '10000', left: '0' }}>
          <img
            src="https://icons.iconarchive.com/icons/custom-icon-design/pretty-office-11/512/sale-icon.png"
            width="70px"
            height="70px"
          />
        </div>
      ) : null}
      {renderNew(data?.createddate)}
      <div className="course-one__image">
        <img src={data?.imagePath} alt="" width="370px" height="194px" />
      </div>
      <div className="course-one__content">
        <Link
          to={`/courses/category/${data?.categoryid}?`}
          className="course-one__category"
        >
          {data?.categoryName}
        </Link>
        <div className="course-one__admin">
          <img
            src={
              data?.teacherAvatar
                ? data?.teacherAvatar
                : '/assets/images/team-1-1.jpg'
            }
            alt=""
          />
          <div>{data?.teacherName}</div>
        </div>
        <h2
          className="course-one__title"
          style={{ height: '55px', textOverflow: 'ellipsis', fontSize: '18px' }}
        >
          <Link to={`/courses/detail/${data?.courseid}`}>
            <a>{data?.title}</a>
          </Link>
        </h2>
        <div className="course-one__stars d-flex justify-content-between">
          <div>
            <span className="course-one__stars-wrap">
              Rating
              {renderStar(Math.round(data?.averageStar))}
            </span>
            <span className="course-one__count">{data?.averageStar}</span>
          </div>
          <span className="course-one__stars-count">View {data?.views}</span>
        </div>
        <div className="course-one__meta">
          <a href="/course-details">
            <i className="fas fa-user"></i>
            {data?.totalstudents}
          </a>
          <a>{data?.price}$</a>
        </div>
        <Link
          to={`/courses/detail/${data?.courseid}`}
          className="course-one__link"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
}

export default React.memo(CoursesItem);
