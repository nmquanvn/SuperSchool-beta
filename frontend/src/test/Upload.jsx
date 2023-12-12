import { Upload, Button, Row } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { uploadService } from '@utils/uploadService';

function AddCouses() {
  const uploadImage = async (options) => {
    const { file, onSuccess, onError } = options;
    const link = await uploadService('image', file);
    if (link) {
      onSuccess(file);
      alert(link);
    } else {
      onError(file);
    }
  };
  const uploadVideo = async (options) => {
    const { file } = options;
    const link = await uploadService('video', file);
    console.log(link);
  };
  return (
    <>
      <div>upload image</div>
      <Row>
        <Upload accept="image/*" customRequest={uploadImage} maxCount={1}>
          <Button icon={<UploadOutlined />}>Upload image</Button>
        </Upload>
      </Row>
      <div>upload video</div>
      <Row>
        <Upload accept="video/*" customRequest={uploadVideo} maxCount={1}>
          <Button icon={<UploadOutlined />}>Upload video</Button>
        </Upload>
      </Row>
    </>
  );
}

export default AddCouses;
