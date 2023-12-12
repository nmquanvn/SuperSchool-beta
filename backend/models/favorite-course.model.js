const knex = require("../utils/db");

module.exports = {
  addToFavorite: (studentCourse) => {
    return knex("favoritecourse").insert({
      courseid: studentCourse.courseId,
      studentid: studentCourse.studentId
    }).returning("*");
  },
  findByStudentAndCourse: (studentCourse) => {
    return knex("favoritecourse").where({
      courseid: studentCourse.courseId,
      studentid: studentCourse.studentId
    }).first();
  },
  getList: (studentId) => {
    return knex("favoritecourse as fc")
      .innerJoin("course as c", "fc.courseid", "c.courseid")
      .innerJoin("category as ca", "c.categoryid", "ca.categoryid")
      .innerJoin("user as t", "t.userid", "c.teacherid")
      .leftJoin("review as r", "c.courseid", "r.courseid")
      .where({
        studentid: studentId
      })
      .orderBy("fc.favoritecourseid", "asc")
      .select(
        "c.courseid as courseId",
        "c.title as courseName",
        "c.imagePath as imagePath",
        "c.description",
        "fc.favoritecourseid as favoriteCourseId",
        'ca.name as categoryName',
        't.fullname as teacherName',
        't.fullname as teacherName',
        't.picture as teacherAvatar',
        knex.raw('coalesce(avg(r.rating), 0) as "averageStar"')
      )
      .groupBy(
        'c.courseid',
        't.userid',
        'ca.categoryid',
        'fc.favoritecourseid'
      );
  },
  removeFromFavorite: (id) => {
    return knex("favoritecourse").where({
      "courseid": id
    }).del().returning("*");
  }
};