const knex = require("../utils/db");

module.exports = {
  registerCourse: (studentCourse) => {
    return knex("student_course").insert({
      studentid: studentCourse.studentId,
      courseid: studentCourse.courseId,
      createddate: studentCourse.createdDate
    }).returning("*");
  },
  findByStudentAndCourse: (studentCourse) => {
    return knex("student_course").where({
      studentid: studentCourse.studentId,
      courseid: studentCourse.courseId
    }).first();
  },
  getList: (userId) => {
    return knex("student_course as sc")
      .innerJoin("course as c", "sc.courseid", "c.courseid")
      .innerJoin('user as t', 'c.teacherid', 't.userid')
      .innerJoin('category as ca', 'c.categoryid', 'ca.categoryid')
      .leftJoin('review as r', 'c.courseid', 'r.courseid')
      .where({
        studentid: userId
      })
      .orderBy("sc.createddate", "desc")
      .select(
        "c.courseid",
        "c.title as courseName",
        "c.imagePath as imagePath",
        "c.description",
        "c.status as courseStatus",
        "sc.status",
        'ca.name as categoryName',
        't.fullname as teacherName',
        't.picture as teacherAvatar',
        knex.raw('coalesce(avg(r.rating), 0) as averageStar')
      )
      .groupBy(
        'c.courseid',
        't.userid',
        'ca.categoryid',
        'sc.studentcourseid'
      );
  }
};