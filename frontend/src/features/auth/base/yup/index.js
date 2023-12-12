import * as Yup from 'yup';
import { REGEX_EMAIL } from '@constants';

export const LogInEndValSchemaOne = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Mật khẩu có ít nhất 6 ký tự')
    .required('Trường mật khẩu không thể bỏ trống'),
  email: Yup.string()
    .matches(REGEX_EMAIL, {
      message: 'Vui lòng nhập đúng định dạng email',
      excludeEmptyString: true,
    })
    .required('Trường email không thể bỏ trống'),
});
export const RegisterStepOneValidationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(REGEX_EMAIL, {
      message: 'Vui lòng nhập đúng định dạng email',
      excludeEmptyString: true,
    })
    .required('Trường email không thể bỏ trống'),
});
export const RegisterStepThreeValidationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Tên có ít nhất 3 ký tự')
    .max(10, "Tên người dùng không quá 10 ký tự")
    .required('Trường tên người dùng không thể bỏ trống'),
  password: Yup.string()
    .min(6, 'Mật khẩu có ít nhất 6 ký tự')
    .required('Trường mật khẩu không thể bỏ trống'),
  repassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Mật khẩu không khớp'
  ),
});
