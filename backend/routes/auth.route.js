const userModel = require("../models/user.model");
var express = require("express");
var router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const validation = require("../middlewares/validate.mdw");
const loginSchema = require("../schemas/login.json");
const registerSchema = require("../schemas/register.json");
const jwt = require("jsonwebtoken");
const commonUtils = require("../utils/common");
const constant = require("../utils/constant");
const bcrypt = require("bcrypt");
const randomstring = require("randomstring");
const db = require("../utils/db");
// const { json } = require("body-parser");
const omit = require("lodash.omit");
const refreshTokenSchema = require("../schemas/refresh-token.json");
const { request } = require("express");
const mailService = require("../utils/mailService");
const rn = require("random-number");
const loginValidation = require("../middlewares/validation.login");

/**
 * @api {post} /api/auth/login Đăng nhập
 * @apiName Đăng nhập
 * @apiGroup Users
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *         "username": "tienqd",    -- bắt buộc
 *         "password": "123456"     -- bắt buộc
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxNCIsInVzZXJuYW1lIjoidGllbnFkIiwiZnVsbG5hbWUiOiJRdWFjaCBEaW5oIFRpZW4iLCJwaG9uZU51bWJlciI6bnVsbCwiZW1haWwiOm51bGwsInJlZnJlc2hfdG9rZW4iOiJRaG5pYlhBU1BKUmlEdDQ2aERCV1FHbGpVUmxabmZna1RPVjhVNkZSQ2tWcW8wUDNSd3g0UUJqbDlEQkZ5cUxZdDQxakVpS1FXamhVQ1RGbjBFU0Z1MkhMR2dpdThwQVhvbEh2aENHaWhFZENCS25lM3JoNGVyVDV2djNLYzN5ak00RXZqUTRDemluZTdEMTVvS1Q1UWg0ZDV1S2dUckhhbzNCbHpjZUw3SHVUTDlXS2NXTW45WVI5T1ZEb3lqR3NSd3ZOWEtxRTg1eGFUNFhNV3RvSWR5SDJ2R0NXVGlWVkY1VDRjVjJOMkp1NGw3YlZOcmdENUN5WEJkNGdVRmwiLCJncm91cENvZGUiOiJTVFVERU5UIiwiaWF0IjoxNjA5NTEzMTA1fQ.URyTjNUu0fg54zXeXH9OENXVISmdTpmOfaihnBfN2x4",
 *         "refresh_token": "QhnibXASPJRiDt46hDBWQGljURlZnfgkTOV8U6FRCkVqo0P3Rwx4QBjl9DBFyqLYt41jEiKQWjhUCTFn0ESFu2HLGgiu8pAXolHvhCGihEdCBKne3rh4erT5vv3Kc3yjM4EvjQ4Czine7D15oKT5Qh4d5uKgTrHao3BlzceL7HuTL9WKcWMn9YR9OVDoyjGsRwvNXKqE85xaT4XMWtoIdyH2vGCWTiVVF5T4cV2N2Ju4l7bVNrgD5CyXBd4gUFl"
 *     }
 */
router.post("/login", validation(loginSchema), function (req, res, next) {
  let userInfo = req.body;
  userModel
    .getByUserEmail(userInfo.email)
    .then((data) => {
      if (data) {
        let isValid = bcrypt.compareSync(userInfo.password, data.password);
        //check password
        if (isValid) {
          if (data.status) {
            data.password = undefined;
            const access_token = jwt.sign(
              commonUtils.parse2Plain(data),
              constant.SECRET_KEY,
              {
                expiresIn: "2h",
              }
            );
            const refresh_token = data.refresh_token;
            data.refresh_token = undefined;
            res.json({
              status: true,
              access_token: access_token,
              refresh_token: refresh_token,
              user: data,
            });
          } else {
            res.json({
              status: false,
              message:
                "Tài khoản của bạn đang bị khoá, hãy liên hệ quản trị viên!",
            });
          }
        } else {
          res.json({
            status: false,
            message: "Email hoặc mật khẩu không chính xác",
          });
        }
      } else {
        res.json({
          status: false,
          message: "Email hoặc mật khẩu không chính xác",
        });
      }
    })
    .catch(next);
});

/**
 * @api {post} /api/auth/register Đăng ký
 * @apiName Đăng ký
 * @apiGroup Users
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *         "username": "tienqd",            --bắt buộc
 *         "password": "123456",            --bắt buộc
 *         "usergroupid": 2,                --bắt buộc
 *         "fullname": "Quach Dinh Tien"    --bắt buộc
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxNCIsInVzZXJuYW1lIjoidGllbnFkIiwiZnVsbG5hbWUiOiJRdWFjaCBEaW5oIFRpZW4iLCJwaG9uZU51bWJlciI6bnVsbCwiZW1haWwiOm51bGwsInJlZnJlc2hfdG9rZW4iOiJRaG5pYlhBU1BKUmlEdDQ2aERCV1FHbGpVUmxabmZna1RPVjhVNkZSQ2tWcW8wUDNSd3g0UUJqbDlEQkZ5cUxZdDQxakVpS1FXamhVQ1RGbjBFU0Z1MkhMR2dpdThwQVhvbEh2aENHaWhFZENCS25lM3JoNGVyVDV2djNLYzN5ak00RXZqUTRDemluZTdEMTVvS1Q1UWg0ZDV1S2dUckhhbzNCbHpjZUw3SHVUTDlXS2NXTW45WVI5T1ZEb3lqR3NSd3ZOWEtxRTg1eGFUNFhNV3RvSWR5SDJ2R0NXVGlWVkY1VDRjVjJOMkp1NGw3YlZOcmdENUN5WEJkNGdVRmwiLCJncm91cENvZGUiOiJTVFVERU5UIiwiaWF0IjoxNjA5NTEzMTA1fQ.URyTjNUu0fg54zXeXH9OENXVISmdTpmOfaihnBfN2x4",
 *         "refresh_token": "QhnibXASPJRiDt46hDBWQGljURlZnfgkTOV8U6FRCkVqo0P3Rwx4QBjl9DBFyqLYt41jEiKQWjhUCTFn0ESFu2HLGgiu8pAXolHvhCGihEdCBKne3rh4erT5vv3Kc3yjM4EvjQ4Czine7D15oKT5Qh4d5uKgTrHao3BlzceL7HuTL9WKcWMn9YR9OVDoyjGsRwvNXKqE85xaT4XMWtoIdyH2vGCWTiVVF5T4cV2N2Ju4l7bVNrgD5CyXBd4gUFl"
 *     }
 */
router.post("/register", async function (req, res, next) {
  let userInfo = req.body;
  let newUser = {
    username: userInfo.email,
    password: userInfo.password,
    usergroupid: 2,
    fullname: userInfo.username,
    email: userInfo.email,
    picture: userInfo.picture,
  };
  newUser.refresh_token = randomstring.generate({ length: 255 });
  newUser.password = bcrypt.hashSync(newUser.password, constant.SALT_ROUNDS);

  let data = await userModel.getByUserEmail(userInfo.email);

  if (data && data.userId) {
    return res.status(500).json({
      code: "DUPLICATE_EMAIL",
      message: "Email đã tổn tại",
    });
  }

  db.transaction((transaction) => {
    userModel
      .create(transaction, newUser)
      .then((data) => {
        let access_token = "";
        data.refresh_token = undefined;
        access_token = jwt.sign(
          commonUtils.parse2Plain(data),
          constant.SECRET_KEY,
          { expiresIn: "2h" }
        );
        transaction.commit();
        res.json({
          status: true,
          refresh_token: newUser.refresh_token,
          access_token: access_token,
        });
      })
      .catch((err) => {
        transaction.rollback();
        next(err);
      });
  });
});

//Google login
router.post("/google-login", (req, res) => {
  const { idToken } = req.body;
  const client = new OAuth2Client(constant.GOOGLE_CLIENT);
  client
    .verifyIdToken({ idToken, audience: constant.GOOGLE_CLIENT })
    .then((resGG) => {
      const { email_verified, name, email, picture } = resGG.payload;
      if (email_verified) {
        //Check if this email is existed
        userModel
          .getByUserEmail(email)
          .then((data) => {
            if (data) {
              if (data.status) {
                const access_token = jwt.sign(
                  commonUtils.parse2Plain(data),
                  constant.SECRET_KEY,
                  { expiresIn: "2h" }
                );
                const refresh_token = data.refresh_token;
                data.refresh_token = undefined;
                res.json({
                  status: true,
                  access_token: access_token,
                  refresh_token: refresh_token,
                  user: data,
                });
              } else {
                res.json({
                  status: false,
                  message:
                    "Tài khoản của bạn đang bị khoá, hãy liên hệ quản trị viên!",
                });
              }
            } else {
              // This email not existed
              // Register account with email from google
              const raw_password = randomstring.generate({ length: 6 });
              const password = bcrypt.hashSync(
                raw_password,
                constant.SALT_ROUNDS
              );
              const rfToken = randomstring.generate({ length: 255 });
              let userInfo = {
                usergroupid: 2,
                fullname: name,
                email,
                picture,
                refresh_token: rfToken,
                username: email,
                password: password,
              };
              userModel
                .addUserFromGG(userInfo)
                .then((result) => {
                  const dataToSend = {
                    to: email,
                    subject: "SuperSchool - Password",
                    html: `<div>Mật khẩu mặc định của bạn là: ${raw_password}</div>`,
                  };
                  mailService.sendMail(dataToSend);
                  const access_token = jwt.sign(
                    commonUtils.parse2Plain(userInfo),
                    constant.SECRET_KEY
                  );
                  res.json({
                    status: true,
                    access_token,
                    refresh_token: rfToken,
                    user: omit(userInfo, ["refresh_token", "password"]),
                  });
                })
                .catch((err) => {
                  res.json({
                    status: false,
                    message: "Đăng nhập bằng google thất bại",
                  });
                });
            }
          })
          .catch((err) => {
            res.json({
              status: false,
              message: "Đăng nhập bằng google thất bại",
            });
          });
      } else {
        res.json({
          status: false,
          message: "Đăng nhập bằng google thất bại",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: false,
        message: "Đăng nhập bằng google thất bại",
      });
    });
});

/**
 * @api {post} /api/users/refresh-token Refresh Token
 * @apiName Refresh Token
 * @apiGroup Users
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *         "refresh_token": "QhnibXASPJRiDt46hDBWQGljURlZnfgkTOV8U6FRCkVqo0P3Rwx4QBjl9DBFyqLYt41jEiKQWjhUCTFn0ESFu2HLGgiu8pAXolHvhCGihEdCBKne3rh4erT5vv3Kc3yjM4EvjQ4Czine7D15oKT5Qh4d5uKgTrHao3BlzceL7HuTL9WKcWMn9YR9OVDoyjGsRwvNXKqE85xaT4XMWtoIdyH2vGCWTiVVF5T4cV2N2Ju4l7bVNrgD5CyXBd4gUFl"
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxNCIsInVzZXJuYW1lIjoidGllbnFkIiwiZnVsbG5hbWUiOiJRdWFjaCBEaW5oIFRpZW4iLCJwaG9uZU51bWJlciI6bnVsbCwiZW1haWwiOm51bGwsImdyb3VwQ29kZSI6IlNUVURFTlQiLCJpYXQiOjE2MDk1MTYxNzV9.zLGJpdGPrGs6BbfL5r6G1OW3xVhrG-cdzZEeczx2hAI"
 *     }
 */
router.post(
  "/refresh-token",
  validation(refreshTokenSchema),
  (req, res, next) => {
    let { access_token, refresh_token } = req.body;
    const { userId } = jwt.verify(access_token, constant.SECRET_KEY, {
      ignoreExpiration: true,
    });
    userModel
      .findByIdAndRefreshToken(userId, refresh_token)
      .then((data) => {
        if (data) {
          const access_token = jwt.sign(
            commonUtils.parse2Plain(data),
            constant.SECRET_KEY,
            { expiresIn: "2h" }
          );
          res.json({
            access_token: access_token,
          });
        } else {
          throw "Refresh token fail";
        }
      })
      .catch(next);
  }
);

router.post("/check-login", (req, res) => {
  try {
    const access_token = req.headers.authorization;
    const user = jwt.verify(access_token, constant.SECRET_KEY, {
      ignoreExpiration: true,
    });
    if (!user)
      return res.json({
        isLogin: false,
        message: "Can not find user",
      });
    userModel.getByUserEmail(user.email).then((data) => {
      if (data) {
        res.json({
          isLogin: true,
          user: omit(data, ["password", "refresh_token"]),
        });
      } else {
        res.json({
          isLogin: false,
        });
      }
    });
  } catch (error) {
    throw error;
  }
});

//Check existed email
router.post("/check-email", async (req, res) => {
  try {
    const { email } = req.body;
    //Check is existed user
    const user = await userModel.findUserByEmail(email);
    if (user) {
      return res.json({
        status: false,
        message: "Email đã tồn tại, hãy đăng nhập!",
      });
    }
    const otp = commonUtils.padLeadingZero(
      rn({ min: 0, max: 9999, integer: true }),
      4
    );
    //check if user existed in OTP table
    const userOTP = await userModel.findUserOTP(email);
    if (!userOTP) {
      await userModel.addOTP(email, otp);
    } else {
      await userModel.updateOTP(email, otp);
    }
    const dataToSend = {
      to: email,
      subject: "SuperSchool - Mã OTP",
      html: `<div>Mã OTP của bạn là: ${otp}</div>`,
    };
    const sendMail = await mailService.sendMail(dataToSend);
    if (sendMail) res.json({ status: true });
  } catch (error) {
    throw error;
  }
});
//Confirm OTP
router.post("/confirm-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    //check otp
    const data = await userModel.checkOTP(email, otp);
    if (data) return res.json({ status: true });
    res.json({ status: false });
  } catch (error) {
    throw error;
  }
});
module.exports = router;
