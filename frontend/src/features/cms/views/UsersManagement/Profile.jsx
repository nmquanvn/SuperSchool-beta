import React from 'react';

// material-ui-icons
import PermIdentity from 'material-ui-icons/PermIdentity';

// core components
import GridContainer from '@cmscomponents/Grid/GridContainer.jsx';
import ItemGrid from '@cmscomponents/Grid/ItemGrid.jsx';
import ProfileCard from '@cmscomponents/Cards/ProfileCard.jsx';
import IconCard from '@cmscomponents/Cards/IconCard.jsx';
import Button from '@cmscomponents/CustomButtons/Button.jsx';
import { Link } from 'react-router-dom';
import Clearfix from '@cmscomponents/Clearfix/Clearfix.jsx';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
function Profile() {
  const currentUser = useSelector(({ userReducer }) => userReducer?.user);
  const history = useHistory();
  const info = {
    username: currentUser.username,
    fullname: currentUser.fullname,
    email: currentUser.email,
    phonenumber: '99999999',
    dob: 'Chưa cập nhật',
    reg: 'Chưa cập nhật',
    group: currentUser.groupCode,
    description:
      "Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...",
  };
  return (
    <div>
      <GridContainer>
        <ItemGrid xs={12} sm={12} md={8}>
          <IconCard
            icon={PermIdentity}
            iconColor="rose"
            title="Thông tin cá nhân"
            category={` - ${info.group}`}
            content={
              <div>
                <GridContainer>
                  <ItemGrid xs={12} sm={12} md={4}>
                    <h5>Tên đăng nhập :</h5>
                  </ItemGrid>

                  <ItemGrid xs={12} sm={12} md={3}>
                    <h5>{info.username}</h5>
                  </ItemGrid>
                  <ItemGrid xs={12} sm={12} md={5}></ItemGrid>
                </GridContainer>
                <GridContainer>
                  <ItemGrid xs={12} sm={12} md={4}>
                    <h5>Họ tên:</h5>
                  </ItemGrid>
                  <ItemGrid xs={12} sm={12} md={8}>
                    <h5>{info.fullname}</h5>
                  </ItemGrid>
                </GridContainer>
                <GridContainer>
                  <ItemGrid xs={12} sm={12} md={4}>
                    <h5>Email:</h5>
                  </ItemGrid>
                  <ItemGrid xs={12} sm={12} md={8}>
                    <h5>{info.email}</h5>
                  </ItemGrid>
                </GridContainer>
                <GridContainer>
                  <ItemGrid xs={12} sm={12} md={4}>
                    <h5>Số điện thoại:</h5>
                  </ItemGrid>
                  <ItemGrid xs={12} sm={12} md={8}>
                    <h5>{info.phonenumber}</h5>
                  </ItemGrid>
                </GridContainer>
                <GridContainer>
                  <ItemGrid xs={12} sm={12} md={4}>
                    <h5>Ngày sinh:</h5>
                  </ItemGrid>
                  <ItemGrid xs={12} sm={12} md={8}>
                    <h5>{info.dob}</h5>
                  </ItemGrid>
                </GridContainer>
                <GridContainer>
                  <ItemGrid xs={12} sm={12} md={4}>
                    <h5>Ngày đăng ký:</h5>
                  </ItemGrid>
                  <ItemGrid xs={12} sm={12} md={8}>
                    <h5>{info.reg}</h5>
                  </ItemGrid>
                </GridContainer>
                <Link to="/profile">
                  <Button color="rose" right>
                    Cập nhật thông tin
                  </Button>
                </Link>
                <Link to="/profile/change-password">
                  <Button
                    color="warning"
                    onClick={() => {
                      history.push('/manager/editprofile');
                    }}
                    right
                  >
                    Đổi mật khẩu
                  </Button>
                </Link>
                <Clearfix />
              </div>
            }
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={4}>
          <ProfileCard
            avatar={currentUser.picture}
            subtitle={info.group}
            title={info.fullname}
            description={info.description}
            content={
              <Link to="/">
                <Button color="rose" round>
                  Về trang chủ
                </Button>
              </Link>
            }
          />
        </ItemGrid>
      </GridContainer>
    </div>
  );
}

export default Profile;
