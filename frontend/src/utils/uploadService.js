import axios from 'axios';
export const uploadService = async (type = 'image', file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append(
      'upload_preset',
      type === 'image' ? 'uploadimage' : 'videocourses'
    );
    const result = await axios({
      method: 'POST',
      url: `https://api.cloudinary.com/v1_1/dkeiup2tp/${
        type === 'image' ? 'image' : 'video'
      }/upload`,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin',
        'Access-Control-Allow-Credentials': true,
      },
      data: formData,
    });
    if (result?.status===200) return result?.data?.url;
    return false;
  } catch (e) {
    return false;
  }
};
