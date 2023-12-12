var express = require("express");
// const courseModel = require("../models/course.model");
var router = express.Router();
const courseModel = require("../models/course.model");
const categoryModel = require("../models/category.model");

//Get 10 khoa hoc moi nhat
router.get("/getnewestcourse", (req, res, next) => {
  courseModel
    .topLatest(10)
    .then((data) => {
      res.json({
        data: courses,
      });
    })
    .catch(next);
});

//Get 10 khoa hoc xem nhieu nhat
router.get("/getTopView", (req, res, next) => {
  courseModel
    .topView(10)
    .then((data) => {
      res.json({
        data: courses,
      });
    })
    .catch(next);
});

//Get 5 category with highest registed
router.get("/getTopRegister", (req, res, next) => {
  categoryModel
    .getTopRegister(10)
    .then((data) => {
      res.json({
        data: category,
      });
    })
    .catch(next);
});
module.exports = router;
