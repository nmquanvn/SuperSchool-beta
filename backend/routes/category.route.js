var express = require('express');
const validateMdw = require('../middlewares/validate.mdw');
var router = express.Router();

const categoryModel = require("../models/category.model");
const courseModel = require("../models/course.model");
const common = require("../utils/common");
const constant = require("../utils/constant");
const db = require("../utils/db");
const loginValidation = require("../middlewares/validation.login");

/**
 * @api {get} /api/category Lấy danh sách category
 * @apiName Lấy danh sách category
 * @apiGroup Category
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "data": [
 *             {
 *                 "categoryId": "4",
 *                 "categoryName": "Lập trình",
 *                 "parentId": null,
 *                 "children": [
 *                     {
 *                         "categoryId": "5",
 *                         "categoryName": "Lập trình Python",
 *                         "parentId": "4"
 *                     }
 *                 ]
 *             }
 *         ]
 *     }
 */
router.get('/', (req, res, next) => {
  categoryModel
    .getListCategory(null)
    .then((data) => {
      if (data) {
        res.json({
          data: customizeListCategory(data),
        });
      } else {
        throw 'Refresh token fail';
      }
    })
    .catch(next);
});

function customizeListCategory(categoryList) {
  //get parent category
  let parentCategories = categoryList.filter(
    (category) => category.parentId == null
  );
  let children = categoryList.filter((category) => category.parentId != null);

  parentCategories.forEach((parent) => {
    parent.children = children.filter(
      (category) => category.parentId == parent.categoryId
    );
  });

  return parentCategories;
}

router.get('/getByParentId', (req, res, next) => {
  let queryParams = req.query;

  categoryModel
    .findByParentId(queryParams.parentId)
    .then((data) => {
      if (data) {
        res.json({
          data: data,
        });
      } else {
        throw 'Refresh token fail';
      }
    })
    .catch(next);
});

router.get('/getTree', (req, res, next) => {
  categoryModel
    .getTree()
    .then((data) => {
      if (data) {
        res.json({ data: data });
      } else {
        throw 'Refresh token fail';
      }
    })
    .catch(next);
});
/**
 * @api {get} /api/category/register/top Top course register
 * @apiName Top course register
 * @apiGroup Category
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "data": [
 *             {
 *                 "categoryid": "2",
 *                 "name": "C++",
 *                 "code": "C++",
 *                 "parentid": "1",
 *                 "count": "2"
 *             }
 *         ]
 *     }
 */
router.get('/register/top', function (req, res, next) {
  categoryModel
    .getTopRegister()
    .then((categories) => {
      res.json({
        data: categories,
      });
    })
    .catch(next);
});

/**
 * @api {get} /api/category/findById/:id Get details of category
 * @apiName Get details of category
 * @apiGroup Category
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "data": {
 *             "categoryid": "6",
 *             "name": "Lập trình Java",
 *             "code": "C01.2",
 *             "parentid": "4",
 *             "english": "Java Basic"
 *         }
 *     }
 */
router.get(
  "/findById/:id",
  loginValidation([constant.USER_GROUP.ADMIN]),
  (req, res, next) => {
    categoryModel
      .findById(req.params.id)
      .then((category) => {
        res.json({
          data: category,
        });
      })
      .catch(next);
  }
);

/**
 * @api {post} /api/category/create Create a category
 * @apiName Create a category
 * @apiGroup Category
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *         "name": "C++",
 *         "code": "C01",
 *         "parentId": null
 *     }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "data": "Success"
 *     }
 */
router.post(
  "/create",
  loginValidation([constant.USER_GROUP.ADMIN]),
  validateMdw(require("../schemas/createCategory.json")),
  (req, res, next) => {
    db.transaction((transaction) => {
      categoryModel
        .create(transaction, req.body)
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

/**
 * @api {delete} /api/category/delete/:id Delete a category
 * @apiName Delete a category
 * @apiGroup Category
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "data": "Success"
 *     }
 */
router.delete(
  "/delete/:id",
  loginValidation([constant.USER_GROUP.ADMIN]),
  async (req, res, next) => {
    let { id } = req.params;
    let categories = await categoryModel.findByParentId(id);

    if (categories && categories.length > 0) {
      return res.status(403).json({
        code: 'HAS_SUB_CAT',
        message: 'Lĩnh vực này có lĩnh vực phụ, không thể xóa.',
      });
    }

    let totalCourse = await courseModel.countByCategoryId(id);

    if (+totalCourse.count > 0) {
      return res.status(403).json({
        code: 'HAS_COURSES',
        message: 'Lĩnh vực này có khóa học, không thể xóa.',
      });
    }

    db.transaction((transaction) => {
      categoryModel.delete(transaction, id).then((_) => {
        transaction.commit();
        res.json({
          data: 'Success',
        });
      });
    });
  }
);

router.put(
  "/update",
  loginValidation([constant.USER_GROUP.ADMIN]),
  validateMdw(require("../schemas/updateCategory.json")),
  (req, res, next) => {
    db.transaction((transaction) => {
      categoryModel
        .update(transaction, req.body)
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

module.exports = router;
