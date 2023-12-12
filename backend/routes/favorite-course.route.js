const express = require('express');
const router = express.Router();
const favoriteCourseModel = require('../models/favorite-course.model');
const commonUtils = require('../utils/common');
const loginValidation = require("../middlewares/validation.login");

router.post('/add-to-favorite', loginValidation(['STUDENT']), async (req, res, next) => {
  const {courseId} = req.query;
  const {userId} = commonUtils.currentUser;

  const favoriteCourse = {
    courseId,
    studentId: userId
  };

  let existedData = await favoriteCourseModel.findByStudentAndCourse(favoriteCourse)

  if(existedData) {
    return res.status(500).json({
      code: 'ALREADY_EXISTED',
      message: 'Course already existed in favorite list'
    });
  }

  favoriteCourseModel.addToFavorite(favoriteCourse).then(result => {
    res.json({
      data: result[0]
    });
  }).catch(next);
});

router.delete('/remove-from-favorite/:id', loginValidation(['STUDENT']), async (req, res, next) => {
  const {id} = req.params;

  favoriteCourseModel.removeFromFavorite(id).then(result => {
    res.json({
      data: result[0]
    });
  }).catch(next);
});

router.get('/get-list', loginValidation(['STUDENT']), (req, res, next) => {
  const {userId} = commonUtils.currentUser;

  favoriteCourseModel.getList(userId).then(
    result => {
      res.json({
        data: result
      })
    }
  ).catch(next);
});

module.exports = router;