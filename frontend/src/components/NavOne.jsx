/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Input, message } from 'antd';
import { getCoursesWhenSearch } from '@features/search/searchSlice';
const { Search } = Input;

function NavOne() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { keyword } = useParams();
  const [sticky, setSticky] = useState(false);
  const category = useSelector(({ homeReducer }) => homeReducer?.category);
  const onSearch = (keyword) => {
    if (!keyword) return message.error('Hãy nhập từ khoá tìm kiếm');
    const dataToSend = {
      fullText: keyword,
    };
    if (keyword) dispatch(getCoursesWhenSearch(dataToSend));
    history.push(`/search/keyword=${keyword}`);
  };
  // const mobileMenu = () => {
  //   let mainNavToggler = document.querySelector('.menu-toggler');
  //   let mainNav = document.querySelector('.main-navigation');
  //   mainNavToggler.addEventListener('click', function () {
  //     mainNav?.style?.display =
  //       mainNav?.style?.display !== 'block' ? 'block' : 'none';
  //   });
  // };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // mobileMenu();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleScroll = () => {
    if (window.scrollY > 70) {
      setSticky(true);
    } else if (window.scrollY < 70) {
      setSticky(false);
    }
  };
  return (
    <header className="site-header site-header__header-one ">
      <nav
        className={`navbar navbar-expand-lg navbar-light header-navigation stricky ${
          sticky ? 'stricked-menu stricky-fixed' : ''
        }`}
      >
        <div className="container d-flex justify-content-between">
          <div className="">
            <Link to="/">
              <Link to="/" className="navbar-brand">
                <div
                  style={{
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    color: 'orange',
                  }}
                >
                  SuperSchool
                </div>
              </Link>
            </Link>
            <button className="menu-toggler">
              <span className="kipso-icon-menu"></span>
            </button>
          </div>
          <div>
            <Search
              placeholder="Nhập từ khoá cần tìm"
              allowClear
              enterButton
              onSearch={onSearch}
              style={{ width: 350 }}
              defaultValue={keyword}
            />
          </div>
          <div>
            <ul className=" navigation-box">
              <li>
                <Link to="/courses">Các lĩnh vực</Link>
                <ul className="sub-menu">
                  {category?.map((cat) => (
                    <li key={cat?.categoryId}>
                      <a>{cat?.categoryName}</a>
                      {cat?.children?.length ? (
                        <ul className="sub-menu">
                          {cat.children.map((child) => (
                            <li key={child?.categoryId}>
                              <Link
                                to={`/courses/category/${child?.categoryId}?`}
                              >
                                <a>{child?.categoryName}</a>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        ''
                      )}
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <Link to="/contact">
                  <a>Liên hệ</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default React.memo(NavOne);
