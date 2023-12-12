import React, { useState } from 'react';
import profileApi from '@api/profileApi';
import { Upload, Spin, message } from 'antd';
import { uploadService } from '@utils/uploadService';

import { useSelector } from 'react-redux';

function UserInfo() {
  const currentUser = useSelector(({ userReducer }) => userReducer?.user);
  const [loading, setLoading] = useState(false);
  const uploadImage = async (options) => {
    const { file } = options;
    const link = await uploadService('image', file);
    if (link) {
      const dataToSend = {
        userId: +currentUser?.userId,
        picture: link,
      };
      const res = await profileApi.updateAvatar(dataToSend);
      setLoading(false);
      if (res?.message === 'Success') {
        message.success('Cập nhật ảnh đại diện thành công');
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      } else {
        message.error('Cập nhật ảnh đại diện thất bại');
      }
    } else {
      message.error("Cập nhật ảnh đại diện thất bại")
    }
  };
  return (
    <Spin spinning={loading}>
      <div className="user-info">
        <Upload
          accept="image/*"
          customRequest={uploadImage}
          maxCount={1}
          showUploadList={false}
          beforeUpload={() => setLoading(true)}
        >
          <img
            className="img-profile img-circle img-responsive center-block"
            style={{ cursor: 'pointer' }}
            src={
              currentUser?.picture
                ? currentUser?.picture
                : 'https://apsec.iafor.org/wp-content/uploads/sites/37/2017/02/IAFOR-Blank-Avatar-Image.jpg'
            }
            alt=""
          />
        </Upload>
        <ul className="meta list list-unstyled">
          <li className="name">
            {currentUser?.username}
            <br />
            <label className="label label-info">{currentUser?.groupCode}</label>
          </li>
        </ul>
      </div>
    </Spin>
  );
}

export default UserInfo;
