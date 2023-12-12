import Footer from '@components/Footer';
import TopBar from '@components/TopBar';
import React from 'react';
import { NavLink, Route, Switch, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import UpdateInfo from './components/UpdateInfo';
import UserInfo from './components/UserInfo';
import('../profile/profileStyle.css');
const AddCourses = React.lazy(() => import('./components/AddCouses'));
const ChangePassword = React.lazy(() => import('./components/ChangePassword'));
const UpdateCourses = React.lazy(() => import('./components/UpdateCourses'));
const NotFoundPage = React.lazy(() => import('@components/NotFound'));

const StyledNavLink = styled(NavLink)`
  color: #5f6369;
  font-size: 14px;
  font-weight: 500;
  margin-right: 32px;
  padding: 12px;
  &.active {
    color: #1890ff !important;
    border-bottom: 2px solid !important;
  }
`;
function ProfilePage() {
  const match = useRouteMatch();
  return (
    <>
      <TopBar />
      <div className="container">
        <div className="view-account">
          <section className="module">
            <div className="module-inner">
              <div className="side-bar">
                <UserInfo />
                <nav className="side-menu">
                  <ul className="nav">
                    <li>
                      <StyledNavLink to={`/profile`} exact>
                        <span className="fa fa-user" /> Cập nhật thông tin
                      </StyledNavLink>
                    </li>
                    <li>
                      <StyledNavLink to={`/profile/change-password`} exact>
                        <span className="fas fa-unlock" /> Thay đổi mật khẩu
                      </StyledNavLink>
                    </li>
                  </ul>
                </nav>
              </div>
              <Switch>
                <Route exact path={match.url} component={UpdateInfo} />
                <Route
                  exact
                  path={`${match.url}/change-password`}
                  component={ChangePassword}
                />
                <Route
                  exact
                  path={`${match.url}/add-courses`}
                  component={AddCourses}
                />
                <Route
                  exact
                  path={`${match.url}/update-courses`}
                  component={UpdateCourses}
                />
                <Route component={NotFoundPage} />
              </Switch>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProfilePage;
