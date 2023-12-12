var express = require('express');
const validation = require('../middlewares/validate.mdw');
const formValidation = require('../middlewares/validate.mdw');
var router = express.Router();
var rn = require('random-number');
const fs = require('fs');
const path = require('path');
const courseModel = require('../models/course.model');
const courseVideoModel = require('../models/coursevideo.model');
const studentCourseModel = require('../models/student-course.model');
const favoriteCourseModel = require('../models/favorite-course.model');
const constant = require('../utils/constant');
const db = require('../utils/db');
const loginValidation = require('../middlewares/validation.login');
const commonUtils = require('../utils/common');
const jwt = require('jsonwebtoken');

//top 3 khóa học nổi bật nhất trong tuần qua (nhiều lượt đăng kí nhất)
router.get('/top-highlight', function (req, res, next) {
  let quantity = 3;
  courseModel
    .topHighlight(3)
    .then((courses) => {
      res.json({
        data: courses,
      });
    })
    .catch(next);
});

router.get('/', (req, res, next) => {
  courseModel.getAll().then((data) => res.json({ data: data }));
});
/**
 * @api {get} /api/course/top10View Top 10 khóa học được xem nhiều nhất
 * @apiName Top 10 khóa học được xem nhiều nhất
 * @apiGroup Courses
 *
 * @apiParam {Number} categoryId Id của category khóa học.(Bắt buộc)
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *         "page": 1,
 *         "pageSize": 10
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *        "data": [
 *            {
 *                "courseid": "3",
 *                "title": "Lập trình Java căn bản",
 *                "imagePath": null,
 *                "description": "",
 *                "detailDescription": "",
 *                "views": "0",
 *                "createddate": "2021-01-09T09:22:06.842Z",
 *                "updateddate": null,
 *                "price": "1200000.00",
 *                "categoryid": "6",
 *                "teacherid": "4",
 *                "status": "INCOMPLETE"
 *            }
 *        ]
 *    }
 */
router.get('/top10View', (req, res, next) => {
  let quantity = 10;

  courseModel
    .getTopByColumnName(quantity, 'c.views', 'desc')
    .then((courses) => {
      res.json({
        data: courses,
      });
    });
});

router.get(
  '/findByCategoryId',
  validation(require('../schemas/pagination.json')),
  (req, res, next) => {
    let queryParams = req.query;
    let body = req.body;
    let page = body.page;
    let pageSize = body.pageSize;

    courseModel
      .findByCategoryId(queryParams.categoryId, page, pageSize)
      .then((data) => {
        res.json({
          data: data,
        });
      })
      .catch(next);
  }
);

/**
 * @api {get} /api/course/top10Newest Top 10 khóa học mới nhất
 * @apiName Top 10 khóa học mới nhất
 * @apiGroup Courses
 *
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *        "data": [
 *            {
 *                "courseid": "3",
 *                "title": "Lập trình Java căn bản",
 *                "imagePath": null,
 *                "description": "",
 *                "detailDescription": "",
 *                "views": "0",
 *                "createddate": "2021-01-09T09:22:06.842Z",
 *                "updateddate": null,
 *                "price": "1200000.00",
 *                "categoryid": "6",
 *                "teacherid": "4",
 *                "status": "INCOMPLETE"
 *            }
 *        ]
 *    }
 */
router.get('/top10Newest', (req, res, next) => {
  courseModel.getTopByColumnName(10, 'createddate', 'desc').then((courses) => {
    res.json({
      data: courses,
    });
  });
});

/**
 * @api {get} /api/course/findByCategoryId/:categoryId Get course by categoryId
 * @apiName Get course by categoryId
 * @apiGroup Courses
 *
 * @apiParam {Number} categoryId Id của category khóa học.(Bắt buộc)
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *         "page": 1,
 *         "pageSize": 10
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "data": [
 *             {
 *                 "title": "Lập trình Java căn bản",
 *                 "categoryName": "Lập trình Java",
 *                 "teacherName": "Bùi Xuân Bách",
 *                 "ratingavg": null,
 *                 "ratingcount": "0",
 *                 "image": null,
 *                 "originalPrice": "1200000.00",
 *                 "discountPrice": null
 *             }
 *         ],
 *         "totalItems": "1"
 *     }
 */
router.get(
  '/findByCategoryId/:categoryId',
  validation(require('../schemas/pagination.json')),
  (req, res, next) => {
    let params = req.params;
    let body = req.body;
    let page = body.page;
    let pageSize = body.pageSize;

    courseModel
      .findByCategoryId(params.categoryId, page, pageSize)
      .then((data) => {
        courseModel.countByCategoryId(params.categoryId).then((totalItems) => {
          res.json({
            data: data,
            totalItems: totalItems.count,
          });
        });
      })
      .catch(next);
  }
);

/**
 * @api {get} /api/course/register/top Top registration
 * @apiName Top registration
 * @apiGroup Courses
 *
 * @apiParam {Number} quantity Số lượng khóa học có lượt đăng ký cao nhất (bắt buộc)
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "data": [
 *             {
 *                 "courseid": "5",
 *                 "title": "Hướng đối tượng với C++",
 *                 "imagePath": null,
 *                 "description": null,
 *                 "detailDescription": null,
 *                 "views": "4",
 *                 "createddate": "2021-01-02T17:00:00.000Z",
 *                 "price": "500000.00",
 *                 "categoryid": "2",
 *                 "teacherid": "1",
 *                 "countQuantityRegister": "2"
 *             }
 *         ]
 *     }
 */
router.get('/register/top', function (req, res, next) {
  var quantity = req.query.quantity;
  var categoryId = req.query.categoryId;

  courseModel
    .topRegister(quantity, categoryId)
    .then((courses) => {
      res.json({
        data: courses,
      });
    })
    .catch(next);
});

/**
 * @api {get} /api/course/search Search courses
 * @apiName Search courses
 * @apiGroup Courses
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *         "pageSize": 10,
 *         "page": 1,
 *         "searchString": "",
 *         "categoryId": 2,
 *         "orderBy": "a",
 *         "orderType": "ASC",
 *         "fullText": "TESTAPI"
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "data": [
 *             {
 *                 "courseid": "4",
 *                 "title": "Lập trình C++ ",
 *                 "imagePath": null,
 *                 "description": null,
 *                 "detailDescription": null,
 *                 "views": "0",
 *                 "createddate": "2021-01-02T17:00:00.000Z",
 *                 "price": "1500000.00",
 *                 "categoryid": "2",
 *                 "teacherid": "1"
 *             }
 *         ]
 *     }
 */
router.post('/search', function (req, res, next) {
  let body = {};

  if (req.body) {
    body = req.body;
  }

  let result = courseModel.searchCourse(body);

  result[0]
    .then((courses) => {
      result[1].then((countCourses) => {
        res.json({
          data: courses,
          totalItems: +countCourses.totalItems,
        });
      });
    })
    .catch(next);
});

// xem chi tiết khóa học
router.get(
  '/findById/:id',
  loginValidation(['NOT_NEED_LOGIN']),
  (req, res, next) => {
    let { id } = req.params;
    const access_token = req.headers.authorization;
    const userId = access_token
      ? jwt.verify(access_token, constant.SECRET_KEY, {
          ignoreExpiration: true,
        }).userId
      : null;
    courseModel
      .findById(id)
      .then(async (course) => {
        if (!course.courseid) {
          throw 'Not found';
        } else {
          await courseModel.updateViews(course.courseid, +course.views + 1);
          course.favorite = false;
          if (userId) {
            let data = await favoriteCourseModel.findByStudentAndCourse({
              courseId: course.courseid,
              studentId: userId,
            });
            if (data && data.favoritecourseid) {
              course.favorite = true;
            }
          }
          course.registered = false;
          if (userId) {
            let temp1 = await studentCourseModel.findByStudentAndCourse({
              studentId: userId,
              courseId: course.courseid,
            });
            if (temp1 && temp1.studentcourseid) {
              course.registered = true;
            }
          }
          let courseVideo = { courseId: course.courseid };
          let result = await courseVideoModel.findByCourseId(courseVideo);
          course.videos = result;
          res.json({
            data: course,
          });
        }
      })
      .catch(next);
  }
);

// Tạo khóa học
router.post(
  '/create',
  loginValidation([constant.USER_GROUP.ADMIN, constant.USER_GROUP.TEACHER]),
  validation(require('../schemas/createUpdateCourse.json')),
  (req, res, next) => {
    db.transaction((transaction) => {
      //init data before insert
      let course = {};
      let requestBody = req.body;
      let now = new Date();
      let publicPath = path.dirname(require.main.filename) + '/public/';
      let {
        title,
        description,
        detailDescription,
        price,
        categoryId,
        imagePath,
        videos,
      } = req.body;
      let teacherId = commonUtils.currentUser.userId;

      if (requestBody) {
        course = {
          title,
          description,
          detailDescription,
          price,
          categoryId,
          teacherId,
          imagePath,
          videos,
          views: 0,
          createddate: now,
        };

        if (videos) {
          videos.forEach((element) => {
            var video = {};
            video.filePath = element.filePath;
            video.orderNo = element.orderNo;
            video.preview = element.preview;
            video.title = element.title;
            video.description = element.description;

            videos.push(video);
          });
        }
      }

      courseModel
        .create(transaction, course, videos)
        .then(async (courseIds) => {
          await courseModel.uploadVideos(courseIds[0], videos);
          transaction.commit();
          res.json({
            data: 'Success',
          });
        })
        .catch((err) => {
          transaction.rollback();
          next(err);
        });
    });
  }
);

//Bổ sung thông tin, bài giảng cho khóa học
router.put(
  '/update/:id',
  loginValidation([constant.USER_GROUP.ADMIN, constant.USER_GROUP.TEACHER]),
  validation(require('../schemas/createUpdateCourse.json')),
  (req, res, next) => {
    db.transaction((transaction) => {
      //init data before update
      let course = {};
      let requestBody = req.body;
      let now = new Date();
      let {
        title,
        imagePath,
        description,
        detailDescription,
        categoryId,
        price,
        videos,
        status,
      } = req.body;
      let teacherId = commonUtils.currentUser.userId;
      let courseId = req.params.id;

      // if(deletedVideoIds) {
      //   deletedVideoIds.forEach(async (e) => {
      //     await courseVideoModel.deleteById(e);
      //   });
      // }

      if (requestBody) {
        course = {
          title,
          imagePath,
          description,
          detailDescription,
          categoryid: categoryId,
          teacherid: teacherId,
          price,
          courseId,
          videos,
          status,
        };
        course.updateddate = now;
      }

      courseModel
        .update(transaction, course)
        .then((_) => {
          transaction.commit();
          res.json({
            data: 'Success',
          });
        })
        .catch((err) => {
          transaction.rollback();
          next(err);
        });
    });
  }
);

router.delete(
  '/delete/:id',
  loginValidation([constant.USER_GROUP.ADMIN, constant.USER_GROUP.TEACHER]),
  (req, res, next) => {
    db.transaction((transaction) => {
      courseModel
        .delete(transaction, req.params.id)
        .then((_) => {
          transaction.commit();
          res.json({
            data: 'Success',
          });
        })
        .catch((err) => {
          transaction.rollback();
          next(err);
        });
    });
  }
);

router.get(
  '/findByTeacherId',
  formValidation(require('../schemas/pagination.json')),
  (req, res, next) => {
    let searchString = '';
    let categoryId = null;
    let page;
    let pageSize;

    if (req.body) {
      searchString = req.body.searchString || '';
      categoryId = req.body.categoryId;
      page = req.body.page || 1;
      pageSize = req.body.pageSize || 10;
    }

    courseModel
      .searchCourse(searchString, categoryId, page, pageSize)
      .then((courses) => {
        res.json({
          data: courses,
        });
      })
      .catch(next);
  }
);

// router.get("findById/:id", (req, res, next) => {
//   console.log(1111111);
//   courseModel
//     .findById(req.params.id)
//     .then((course) => {
//       res.json({
//         data: course,
//       });
//     })
//     .catch(next);
// });

router.post(
  '/create',
  loginValidation([constant.USER_GROUP.ADMIN, constant.USER_GROUP.TEACHER]),
  validation(require('../schemas/createUpdateCourse.json')),
  (req, res, next) => {
    db.transaction((transaction) => {
      //init data before insert
      let course = {};
      let requestBody = req.body;
      let now = new Date();
      let publicPath = path.dirname(require.main.filename) + '/public/';
      var videos = [];
      let {
        title,
        description,
        detailDescription,
        price,
        categoryId,
        teacherId,
        imagePath,
      } = req.body;

      course = {
        title,
        description,
        detailDescription,
        price,
        categoryId,
        teacherId,
        imagePath,
        views: 0,
        createddate: now,
      };

      if (requestBody.videos) {
        requestBody.videos.forEach((element) => {
          var video = {};
          video.fileName = element.filePath;
          video.orderNo = element.orderNo;
          video.preview = element.preview ? true : false;
          video.title = element.title;
          video.description = element.description;

          videos.push(video);
        });
      }

      courseModel
        .create(transaction, course, videos)
        .then((_) => {
          transaction.commit();
          res.json({
            data: 'Success',
          });
        })
        .catch((err) => {
          transaction.rollback();
          next(err);
        });
    });
  }
);

router.put(
  '/update',
  loginValidation([constant.USER_GROUP.ADMIN, constant.USER_GROUP.TEACHER]),
  validation(require('../schemas/createUpdateCourse.json')),
  (req, res, next) => {
    db.transaction((transaction) => {
      //init data before update
      let course = {};
      let requestBody = req.body;
      let now = new Date();
      let {
        title,
        imagePath,
        description,
        detailDescription,
        price,
        categoryId,
        teacherId,
        deletedVideoIds,
        moreVideos,
      } = req.body;
      course = {
        title,
        imagePath,
        description,
        detailDescription,
        price,
        categoryId,
        teacherId,
        status,
        updateddate: now,
      };

      //delete the video
      if (deletedVideoIds) {
        deletedVideoIds.forEach(async (e) => {
          await courseVideoModel.deleteById(e);
        });
      }

      courseModel
        .update(transaction, course)
        .then((_) => {
          transaction.commit();
          res.json({
            data: 'Success',
          });
        })
        .catch((err) => {
          transaction.rollback();
          next(err);
        });
    });
  }
);

router.delete(
  '/delete/:id',
  loginValidation([constant.USER_GROUP.ADMIN, constant.USER_GROUP.TEACHER]),
  (req, res, next) => {
    db.transaction((transaction) => {
      courseModel
        .delete(transaction, req.params.id)
        .then((_) => {
          transaction.commit();
          res.json({
            data: 'Success',
          });
        })
        .catch((err) => {
          transaction.rollback();
          next(err);
        });
    });
  }
);

router.get(
  '/findByTeacherId/:teacherId',
  loginValidation(['TEACHER']),
  formValidation(require('../schemas/pagination.json')),
  (req, res, next) => {
    let teacherId = req.params.teacherId;
    let page;
    let pageSize;

    if (req.body) {
      page = req.body.page || 1;
      pageSize = req.body.pageSize || 10;
    }

    courseModel
      .findByTeacherId(teacherId, page, pageSize)
      .then((courses) => {
        res.json({
          data: courses,
        });
      })
      .catch(next);
  }
);

router.put(
  '/disable-course/:courseId',
  loginValidation(['ADMIN']),
  validation(require('../schemas/disable-course.json')),
  (req, res, next) => {
    let { publish } = req.body;
    let { courseId } = req.params;

    courseModel
      .selectByIdSimple(courseId)
      .then(async (course) => {
        course.publish = publish;

        course = await courseModel.updateSimple(course);

        res.json({
          data: course,
        });
      })
      .catch(next);
  }
);

module.exports = router;
