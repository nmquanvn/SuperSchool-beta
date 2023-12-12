const express = require('express');
const router = express.Router();
const courseVideoModel = require('../models/coursevideo.model');
const paramsValidation = require('../middlewares/validate.mdw');
const fs = require('fs');
const CONSTANT = require('../utils/constant');
const path = require('path');
const commonUtils = require('../utils/common');
const loginValidation = require("../middlewares/validation.login");

router.get(
  '/findByCourseId',
  loginValidation(['NOT_NEED_LOGIN']),
  paramsValidation(require('../schemas/pagination.json')),
  (req, res, next) => {
    let courseId = req.query.courseId;
    let offset = 0;
    let pageSize = 10;
    if (req.body) {
      pageSize = req.body.pageSize || 10;
      offset = pageSize * ((req.body.page || 1) - 1);
    }
    let queryParams = {
      courseId: courseId,
      pageSize: pageSize,
      offset: offset,
    };

    courseVideoModel
      .findByCourseId(queryParams)
      .then((videos) => {
        res.json({
          data: videos,
        });
      })
      .catch(next);
  }
);

router.post(
  '/addVideosToCourse',
  loginValidation([CONSTANT.USER_GROUP.ADMIN, CONSTANT.USER_GROUP.TEACHER]),
  paramsValidation(require('../schemas/addVideoToCourse.json')),
  function (req, res, next) {
    let requestBody = req.body;
    let videos = [];
    let publicPath = path.dirname(require.main.filename) + '/public/';
    let now = new Date();

    requestBody.videos.forEach((video) => {
      if (video.data) {
        let filePath = now.getTime() + '_' + video.fileName;

        fs.writeFile(
          publicPath + filePath,
          video.data,
          'binary',
          function (err) {
            if (err) {
              res.status(500).json({
                message: CONSTANT.ERRORS.SYSTEM_ERROR,
              });
            }
          }
        );

        videos.push({
          courseid: requestBody.courseId,
          videopath: filePath,
          orderno: video.orderNo,
        });
      }
    });

    courseVideoModel
      .createMutiple(videos)
      .then((_) => {
        res.json({
          message: 'Success',
        });
      })
      .catch(next);
  }
);

module.exports = router;
