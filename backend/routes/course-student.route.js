const express = require('express');
const router = express.Router();
const commonUtils = require('../utils/common');
const studentCourseModel = require('../models/student-course.model');
const loginValidation = require("../middlewares/validation.login");

router.post('/', loginValidation(['STUDENT']), async (req, res, next) => {
  const {courseId} = req.query;
  const {userId} = commonUtils.currentUser;
  const studentCourse = {
    courseId,
    studentId: userId,
    createdDate: new Date()
  };

  // check existed
  const existedData = await studentCourseModel.findByStudentAndCourse(studentCourse);

  if(existedData) {
    return res.status(500).json({
      code: 'ALREADY_EXISTED',
      message: 'Student already registered this course'
    });
  }

  studentCourseModel.registerCourse(studentCourse).then(
    result => {
      res.json({
        data: result[0]
      })
    }
  ).catch(next);
});

router.get('/get-list', loginValidation(['STUDENT']), (req, res, next) => {
  const { userId } = commonUtils.currentUser;

  studentCourseModel.getList(userId).then(
    result => {
      res.json({
        data: result
      })
    }).catch(next)
});

module.exports = router;