var express = require('express');
const validation = require('../middlewares/validate.mdw');
var router = express.Router();
var rn = require('random-number');
const fs = require('fs');
const path = require('path');
const courseModel = require('../models/course.model');
const constant = require('../utils/constant');
const db = require('../utils/db');
const reviewModel = require('../models/review.model');
const studentCourseModel = require('../models/student-course.model');
const commonUtils = require('../utils/common');
const loginValidation = require("../middlewares/validation.login");

router.post('/findByCourseId', (req, res, next) => {
    let courseId = req.body.courseId;

    reviewModel.findByCourseId(courseId).then(reviews => {
        res.json({
            data: reviews
        })
    }).catch(next);
});

router.post('/', loginValidation(['STUDENT']), async (req, res, next) => {
    const {courseId, comment, rating} = req.body;
    const {userId} = commonUtils.currentUser;
    const review = {
        courseId,
        comment,
        rating,
        userId,
        createdDate: new Date(),
        updatedDate: new Date()
    };

    let registered = await studentCourseModel.findByStudentAndCourse({
        studentId: userId,
        courseId
    });

    if(!registered || !registered.studentcourseid) {
        return res.status(500).json({
            message: 'Không thể đánh giá khi chưa tham gia khóa học',
            code: 'NOT_REGISTER_COURSE'
        })
    }

    reviewModel.create(review).then(result => {
        res.json({
            data: result[0]
        })
    }).catch(next);
});

module.exports = router;
