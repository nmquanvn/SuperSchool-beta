import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '@app/userSlice';
import { Menu, Dropdown } from 'antd';
import {
  DownOutlined,
  UserOutlined,
  LikeOutlined,
  BookOutlined,
  LogoutOutlined,
  UserSwitchOutlined,
  GithubOutlined,
} from '@ant-design/icons';

function Topbar() {
  const dispatch = useDispatch();
  const isLogin = useSelector(({ userReducer }) => userReducer?.isLogin);
  const currentUser = useSelector(
    ({ userReducer }) => userReducer?.user?.fullname
  );
  const groupCode = useSelector(
    ({ userReducer }) => userReducer?.user?.groupCode
  );
  const menu = (
    <Menu size="large">
      <Menu.Item
        style={{ height: 50, width: 250 }}
        className="d-flex align-items-center"
      >
        <UserOutlined />
        <Link to="/profile">Trang cá nhân</Link>
      </Menu.Item>
      <Menu.Item
        style={{ height: 50, width: 250 }}
        className="d-flex align-items-center"
      >
        <LikeOutlined />
        <Link to="/courses/like">Khoá học yêu thích</Link>
      </Menu.Item>
      <Menu.Item
        style={{ height: 50, width: 250 }}
        className="d-flex align-items-center"
      >
        <BookOutlined />
        <Link to="/courses/enroll">Khoá học đang theo học</Link>
      </Menu.Item>

      {groupCode === 'ADMIN' && (
        <Menu.Item
          style={{ height: 50, width: 250 }}
          className="d-flex align-items-center"
        >
          <UserSwitchOutlined /> <Link to="/manager">Admin Dashboard</Link>
        </Menu.Item>
      )}
      {groupCode === 'TEACHER' && (
        <Menu.Item
          style={{ height: 50, width: 250 }}
          className="d-flex align-items-center"
        >
          <GithubOutlined />
          <Link to="/manager/courses">Quản lý khoá học của bạn</Link>
        </Menu.Item>
      )}
      <Menu.Item
        onClick={() => dispatch(logout())}
        style={{ height: 50, width: 250 }}
        className="d-flex align-items-center"
      >
        <LogoutOutlined />
        <div>Đăng xuất</div>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="topbar-one">
      <div className="container">
        <Link to="/" style={{ color: '#fff', fontWeight: 'bold' }}>
          Trang chủ
        </Link>
        <div className="topbar-one__right d-flex align-items-center">
          {isLogin ? (
            <Dropdown overlay={menu}>
              <div
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
                style={{ color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Xin chào {currentUser}
                <DownOutlined />
              </div>
            </Dropdown>
          ) : (
            <>
              <Link to="/login">Đăng nhập</Link>
              <Link to="/register">Đăng ký</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Topbar;
