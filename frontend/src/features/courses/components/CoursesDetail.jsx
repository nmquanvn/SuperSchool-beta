/*eslint-disable*/
import { message, Modal, Rate, Spin } from 'antd';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import coursesApi from '@api/coursesApi';
import { getDetailCourses } from '@features/courses/coursesSlice';
import { useHistory } from 'react-router-dom';

const SModal = styled(Modal)`
  .ant-modal-footer {
    display: none !important;
  }
`;
const CoursesDetail = ({ coursesId }) => {
  const [show, setShow] = useState(false);
  const [videoTitle, setVideoTitle] = useState();
  const [urlVideo, setUrlVideo] = useState('');
  const [rate, setRate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingC, setLoadingC] = useState(false);
  const [comment, setComment] = useState('');
  const [review, setReview] = useState([]);

  const history = useHistory();
  const isLogin = useSelector(({ userReducer }) => userReducer?.isLogin);
  const detailCourses = useSelector(
    ({ coursesReducer }) => coursesReducer?.detailCourses
  );
  const dispatch = useDispatch();
  const fetchReview = async (x) => {
    setLoading(true);
    const { data } = await coursesApi.getReviewCourses(x);
    setLoading(false);
    setReview(data);
  };
  useEffect(() => {
    fetchReview({ courseId: +coursesId });
  }, []);

  const handleClickVideo = (item) => {
    if (!item?.preview && !detailCourses?.registered)
      return message.error('Tham gia khoá học này để xem video');
    setUrlVideo(item?.videopath);
    setShow(true);
    setVideoTitle(item?.title);
  };
  const renderStar = (n) => {
    const arr = [];
    for (let i = 1; i <= n; i++) {
      arr.push(<i className="fa fa-star" key={i}></i>);
    }
    return arr;
  };
  const postComment = async (data) => {
    if (!detailCourses?.registered)
      return message.error('Không thể đánh giá khoá học khi chưa ghi danh');
    await coursesApi.reviewCourses(data);
    dispatch(getDetailCourses(coursesId));
    fetchReview({ courseId: +coursesId });
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!isLogin)
      return message.error('Bạn cần đăng nhập để thực hiện nhận xét');
    if (!rate) return message.error('Bạn chưa đánh giá sao');
    if (!comment) return message.error('Bạn chưa nhận xét khoá học này');
    const dataToSend = {
      courseId: +coursesId,
      rating: rate,
      comment: comment,
    };
    postComment(dataToSend);
    setComment('');
    setRate(0);
  };
  const handleEnroll = async () => {
    if (!isLogin) return history.push('/login');
    setLoadingC(true);
    await coursesApi.registerCourses(+coursesId);
    setLoadingC(false);
    dispatch(getDetailCourses(coursesId));
  };
  const handleLike = async () => {
    if (!isLogin) return history.push('/login');
    setLoadingC(true);
    await coursesApi.likeCourses(+coursesId);
    setLoadingC(false);
    dispatch(getDetailCourses(coursesId));
  };
  return (
    <>
      <SModal
        title={videoTitle}
        visible={show}
        onCancel={() => setShow(false)}
        width="610px"
        destroyOnClose
      >
        <iframe
          width="560"
          height="315"
          src={urlVideo}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </SModal>
      <section className="course-details">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="course-details__content">
                <div className="course-details__top">
                  <div className="course-details__top-left">
                    <h2 className="course-details__title">
                      {detailCourses?.title}
                    </h2>
                    <div className="course-one__stars d-flex justify-content-between">
                      <span className="course-one__count d-flex">
                        {detailCourses?.ratingAvgPoint}
                        <span className="course-one__stars-wrap">
                          <i className="fa fa-star"></i>
                        </span>
                      </span>
                      <span className="course-one__stars-count">
                        {detailCourses?.views} view
                      </span>
                    </div>
                  </div>
                  <div
                    className="course-details__top-right"
                    style={{ fontFamily: 'Segoe UI', width: '300px' }}
                  >
                    <a className="course-one__category">
                      {detailCourses?.categoryName}
                    </a>
                  </div>
                </div>
                <div className="course-one__image">
                  <img
                    src={
                      detailCourses?.imagePath
                        ? detailCourses?.imagePath
                        : '/assets/images/course-d-1.jpg'
                    }
                    alt=""
                    width="770px"
                    height="447px"
                  />
                  <i className="far fa-heart"></i>
                </div>

                <ul
                  className="course-details__tab-navs list-unstyled nav nav-tabs"
                  role="tablist"
                >
                  <li>
                    <a
                      className="active"
                      role="tab"
                      data-toggle="tab"
                      href="#overview"
                    >
                      Giới thiệu khoá học
                    </a>
                  </li>
                  <li>
                    <a
                      className=""
                      role="tab"
                      data-toggle="tab"
                      href="#curriculum"
                    >
                      Danh sách bài học
                    </a>
                  </li>
                  <li>
                    <a className="" role="tab" data-toggle="tab" href="#review">
                      Đánh giá
                    </a>
                  </li>
                </ul>
                <div className="tab-content course-details__tab-content ">
                  <div
                    className="tab-pane show active  animated fadeInUp"
                    role="tabpanel"
                    id="overview"
                  >
                    <p className="course-details__tab-text">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: detailCourses?.description,
                        }}
                      />
                    </p>
                    <br />
                    <p className="course-details__tab-text">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: detailCourses?.detailDescription,
                        }}
                      />
                    </p>
                    <br />
                  </div>
                  <div
                    className="tab-pane  animated fadeInUp"
                    role="tabpanel"
                    id="curriculum"
                  >
                    <ul className="course-details__curriculum-list list-unstyled">
                      {detailCourses?.videos?.length > 0 &&
                        detailCourses?.videos.map((item, index) => {
                          return (
                            <li
                              key={index}
                              onClick={() => handleClickVideo(item)}
                            >
                              <div className="course-details__curriculum-list-left">
                                <div className="course-details__meta-icon video-icon">
                                  <i className="fas fa-play"></i>
                                </div>
                                <div
                                  className="font-weight-bold"
                                  style={{ cursor: 'pointer' }}
                                >
                                  {item?.title}
                                </div>
                              </div>
                              {item?.preview && <div>Xem thử</div>}
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                  <div
                    className="tab-pane  animated fadeInUp"
                    role="tabpanel"
                    id="review"
                  >
                    <div className="row justify-content-center">
                      <div className="col-xl-5 justify-content-xl-end justify-content-sm-center d-flex">
                        <div className="course-details__review-box">
                          <div className="d-flex align-items-center">
                            <div className="course-details__review-count">
                              {detailCourses?.ratingAvgPoint}
                            </div>
                            <div className="course-details__review-stars">
                              <i className="fa fa-star"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Spin spinning={loading}>
                      <div className="course-details__comment">
                        {review?.length > 0 ? (
                          review.map((item, index) => (
                            <div
                              className="course-details__comment-single"
                              key={index}
                            >
                              <div className="course-details__comment-top">
                                <div className="course-details__comment-img">
                                  <img
                                    src={
                                      item?.picture
                                        ? item?.picture
                                        : '/assets/images/team-1-2.jpg'
                                    }
                                    alt=""
                                  />
                                </div>
                                <div className="course-details__comment-right">
                                  <h2 className="course-details__comment-name">
                                    {item?.username}
                                  </h2>
                                  <div className="course-details__comment-meta">
                                    <div className="course-details__comment-stars">
                                      {renderStar(Math.round(item?.rating))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <p className="course-details__comment-text">
                                {item?.comment}
                              </p>
                            </div>
                          ))
                        ) : (
                          <div>...</div>
                        )}
                      </div>
                    </Spin>
                    <div className="mb-3">
                      <Rate value={rate} onChange={(e) => setRate(e)} />
                    </div>
                    <form
                      onSubmit={handleSubmitForm}
                      className="course-details__comment-form"
                    >
                      <h2 className="course-details__title">Thêm đánh giá</h2>
                      <div className="row">
                        <div className="col-lg-12">
                          <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                          <button
                            type="submit"
                            className="thm-btn course-details__comment-form-btn"
                          >
                            Đánh giá
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="course-details__price mb-5">
                <p className="course-details__price-text">Giá khoá học</p>
                <p className="course-details__price-amount">
                  {detailCourses?.price} $
                </p>
                <Spin spinning={loadingC}>
                  {detailCourses?.registered ? (
                    <div>Đã ghi danh</div>
                  ) : (
                    <div
                      className="thm-btn course-details__price-btn"
                      style={{ cursor: 'pointer' }}
                      onClick={handleEnroll}
                    >
                      Ghi danh khoá học này
                    </div>
                  )}
                  {detailCourses?.favorite ? (
                    <div>Đã yêu thích khoá họcn này</div>
                  ) : (
                    <div
                      className="thm-btn course-details__price-btn"
                      style={{ cursor: 'pointer', backgroundColor: 'red' }}
                      onClick={handleLike}
                    >
                      Yêu thích khoá học này
                    </div>
                  )}
                </Spin>
              </div>
              <div className="course-details__list">
                <h2 className="course-details__list-title">
                  Thông tin giảng viên
                </h2>
                <div className="course-details__list-item">
                  <div className="course-details__list-img">
                    <img src={detailCourses?.teacherAvatar} alt="" />
                  </div>
                  <div className="course-details__list-content">
                    <h3>Họ và tên: {detailCourses?.teacherName}</h3>
                    <h3>Email: {detailCourses?.teacherEmail}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CoursesDetail;
