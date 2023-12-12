const db = require("../utils/db");
const commonUtils = require("../utils/common");
module.exports = {
  getAll: () => {
    return db("course");
  },
  topLatest: (quantity) => {
    let query = db("course").orderByRaw("createddate desc nulls last");
    if (quantity) {
      query.limit(quantity);
    }
    return query;
  },
  viewForAdmin: () => {
    let query = db
      .select("c.*", "u.fullname as teachername", "ct.parentid as parentid")
      .from("course as c")
      .leftJoin("user as u", "c.teacherid", "u.userid")
      .leftJoin("category as ct", "ct.categoryid", "c.categoryid");
    return query;
  },
  viewForTeacher: (id) => {
    let query = db
      .select("c.*", "u.fullname as teachername", "ct.parentid as parentid")
      .from("course as c")
      .where("c.teacherid", id)
      .leftJoin("user as u", "c.teacherid", "u.userid")
      .leftJoin("category as ct", "ct.categoryid", "c.categoryid");
    return query;
  },
  findByCategoryId: (categoryId, page, pageSize) => {
    let query = db("course");

    if (categoryId) {
      query.where("categoryid", categoryId);
    } else {
      query.where("categoryid", null);
    }

    if (pageSize && pageSize > 0) {
      query.offset(pageSize * (page - 1));
      query.limit(pageSize);
    }

    return query;
  },
  countByCategoryId: (categoryId) => {
    let query = db("course as co");

    if (categoryId) {
      query.where("co.categoryid", categoryId);
    } else {
      query.where("co.categoryid", null);
    }

    return query.count().first();
  },
  findByTeacherId: (teacherId) => {
    let query = db("course");

    query.where("teacherid", teacherId);

    return query;
  },
  findById: (id) => {
    //   return db("course").where("courseid", id).first(); ==> Changed behavior
    return db("course as c")
      .innerJoin("user as u", "u.userid", "c.teacherid")
      .innerJoin("category as cat", "cat.categoryid", "c.categoryid")
      .leftJoin("review as r", "r.courseid", "c.courseid")
      .leftJoin("student_course as sc", "sc.courseid", "c.courseid")
      .leftJoin("promotion as p", "p.courseid", "c.courseid")
      .select(
        "c.courseid",
        "c.imagePath",
        "c.title as courseName",
        "c.description as shortDescription",
        "c.detailDescription",
        "c.*",
        "cat.name as categoryName",
        db.raw(
          'coalesce(round(cast(avg(r.rating) as numeric), 1), 0) as "ratingAvgPoint"'
        ),
        db.raw('count(distinct r.userid) as "totalReviewPerson"'),
        db.raw('count(distinct sc.studentid) as "totalStudentRegister"'),
        "p.value as priceDiscount",
        "c.price",
        "c.updateddate",
        "u.fullname as teacherName",
        "u.email as teacherEmail",
        "u.picture as teacherAvatar",
        "c.views"
      )
      .where("c.courseid", id)
      .groupBy(
        "c.courseid",
        "c.imagePath",
        "courseName",
        "shortDescription",
        "c.detailDescription",
        "priceDiscount",
        "c.price",
        "c.updateddate",
        "u.userid",
        "cat.categoryid"
      )
      .first();
  },
  topView: (quantity) => {
    let query = db("course").orderByRaw("views desc nulls last");

    if (quantity) {
      query.limit(quantity);
    }

    return query;
  },
  topRegister: (quantity, categoryId) => {
    let query = db
      .from("course as c")
      .leftJoin("student_course as sc", "c.courseid", "sc.courseid")
      .select("c.*")
      .count("sc.studentcourseid as countQuantityRegister")
      .groupBy("c.courseid")
      .distinct()
      .orderByRaw('"countQuantityRegister" desc nulls last');

    if (quantity) {
      query.limit(quantity);
    }

    if (categoryId) {
      query.where("categoryid", categoryId);
    }

    return query;
  },

  //Change behavior && merge
  searchCourse: (body) => {
    let { searchString, categoryId, orderBy, orderType, fullText } = body;

    let query = db.select(
      db.raw(
        ' c.*, count(p.promotionid) as "totalPromotions", u.fullname as "teacherName", ca.name as "categoryName", count(sc.studentcourseid) as totalstudents, coalesce(avg(r.rating), 0) as "averageStar",' +
          ' case when maxCourse.courseid = c.courseid then true else false end as "isBestSeller"\n' +
          "from course c \n" +
          "inner join category ca \n" +
          "on c.categoryid = ca.categoryid \n" +
          "left join (\n" +
          "\tselect sc0.courseid, count(distinct sc0.studentid) as totalStudents\n" +
          "\tfrom student_course sc0\n" +
          "\tgroup by sc0.courseid\n" +
          "\torder by totalStudents\n" +
          "\tlimit 1\n" +
          ") as maxCourse\n" +
          "on c.courseid = maxcourse.courseid and maxCourse.totalStudents > 0 "
      )
    );

    query
      .innerJoin("user as u", "u.userid", "c.teacherid")
      .leftJoin("review as r", "r.courseid", "c.courseid")
      .leftJoin("student_course as sc", "sc.courseid", "c.courseid")
      .leftJoin("promotion as p", "p.courseid", "c.courseid");

    if (categoryId) {
      query.where("ca.categoryid", categoryId);
    }

    query.where("publish", true);

    if (fullText) {
      query.whereRaw(
        `to_tsvector(unaccent(c.title) || ' ' || unaccent(ca.name)) @@ plainto_tsquery(unaccent('${fullText}'))`
      );
    }

    if (orderBy) {
      query.orderBy(orderBy, orderType ? orderType : "asc");
    }

    query.groupBy(
      "c.courseid",
      "u.userid",
      "ca.categoryid",
      "maxcourse.courseid"
    );

    let queryCount = db
      .from("course as c")
      .where("title", "like", `%${searchString}%`);

    if (categoryId) {
      queryCount.where("categoryid", categoryId);
    }

    queryCount.where("c.publish", true);

    queryCount.count("c.courseid as totalItems").first();

    return [query, queryCount];
  },
  // searchCourse: (body) => {
  //     let searchString = body.searchString || '';
  //     let categoryId = body.categoryId;
  //     let page = body.page;
  //     let pageSize = body.pageSize;
  //     let orderBy = body.orderBy;
  //     let orderType = body.orderType;
  //     let fullText = body.fullText;

  //     let query = db.select(db.raw(' c.*, case when maxCourse.courseid = c.courseid then true else false end as "isBestSeller"\n' +
  //         'from course c \n' +
  //         'inner join category ca \n' +
  //         'on c.categoryid = ca.categoryid \n' +
  //         'left join (\n' +
  //         '\tselect sc0.courseid, count(distinct sc0.studentid) as totalStudents\n' +
  //         '\tfrom student_course sc0\n' +
  //         '\tgroup by sc0.courseid\n' +
  //         '\torder by totalStudents\n' +
  //         '\tlimit 1\n' +
  //         ') as maxCourse\n' +
  //         'on c.courseid = maxcourse.courseid and maxCourse.totalStudents > 0 '));

  //     query.where('title', 'like', `%${searchString}%`);

  //     if(fullText) {
  //         query.whereRaw(`to_tsvector(c.title || ' ' || ca.name) @@ plainto_tsquery('${fullText}')`);
  //     }

  //     if (categoryId) {
  //         query.where('categoryid', categoryId);
  //     }

  //     if(orderBy) {
  //         query.orderBy(orderBy, orderType ? orderType : 'asc');
  //     }

  //     if (pageSize) {
  //         query.limit(pageSize);
  //         query.offset((page - 1) * pageSize);
  //     }

  //     let queryCount = db.from('course as c')
  //         .where('title', 'like', `%${searchString}%`);

  //     if (categoryId) {
  //         queryCount.where('categoryid', categoryId);
  //     }

  //     queryCount.count('c.courseid as totalItems').first();

  //     return [query, queryCount];
  // },
  create: async (transaction, course, videos) => {
    let {
      title,
      description,
      detailDescription,
      price,
      categoryId,
      teacherId,
      imagePath,
      views,
      createddate,
    } = course;
    return transaction("course")
      .insert({
        title,
        description,
        detailDescription,
        price,
        categoryid: categoryId,
        teacherid: teacherId,
        imagePath,
        views,
        createddate,
      })
      .returning("courseid");
  },
  uploadVideos: async (courseId, videos) => {
    if (videos && videos.length > 0) {
      await videos.forEach(async (video) => {
        await db("coursevideo").insert({
          courseid: courseId,
          videopath: video.filePath,
          orderno: video.orderNo,
          preview: video.preview ? true : false,
          title: video.title,
          description: video.description,
        });
      });
    }
  },
  update: async (transaction, course) => {
    await transaction("coursevideo").where('courseid', course.courseId).del();
    if(course.videos) {
      course.videos.forEach(async (video) => {
        await transaction("coursevideo").insert({
          courseid: course.courseId,
          videopath: video.filePath,
          orderno: video.orderNo,
          preview: video.preview ? true : false,
          title: video.title,
          description: video.description,
        });
      });
    }

    return transaction("course")
      .where("courseid", course.courseId)
      .update({
        ...course,
        videos: undefined,
        courseId: undefined,
      });
  },
  delete: (transaction, id) => {
    return transaction("course").where("courseid", id).del();
  },
  getTopByColumnName: (quantity, columnName, order) => {
    let query = db("course as c");

    query.innerJoin("user as u", "u.userid", "c.teacherid");
    query.innerJoin("category as ca", "ca.categoryid", "c.categoryid");
    query.leftJoin("student_course as sc", "sc.courseid", "c.courseid");
    query.leftJoin("review as r", "r.courseid", "c.courseid");

    query.orderBy(columnName, order);
    query.limit(quantity);

    query.select(
      "c.*",
      "u.fullname as teacherName",
      "u.picture as teacherAvatar",
      "ca.name as categoryName"
    );
    query.select(db.raw('count(sc.studentcourseid) as "totalstudents"'));
    query.select(db.raw('coalesce(avg(r.rating), 0) as "averageStar"'));
    query.groupBy("c.courseid", "u.userid", "ca.categoryid");

    return query;
  },
  topHighlight: (quantity) => {
    let mondayOfLastWeek = commonUtils.getMondayOfLastWeek();
    let sundayOfLastWeek = commonUtils.getSundayOfLastWeek();

    let query = db("course as c");

    query.innerJoin("student_course as sc", "sc.courseid", "c.courseid");
    query.leftJoin("review as r", "r.courseid", "c.courseid");
    query.innerJoin("user as u", "u.userid", "c.teacherid");
    query.innerJoin("category as ca", "ca.categoryid", "c.categoryid");
    query.select(db.raw('count(sc.studentcourseid) as "totalstudents"'));
    query.select(db.raw('coalesce(avg(r.rating), 0) as "averageStar"'));

    query.where("sc.createddate", ">=", mondayOfLastWeek);
    query.where("sc.createddate", "<=", sundayOfLastWeek);

    return query
      .select(
        "c.*",
        "u.fullname as teacherName",
        "u.picture as teacherAvatar",
        "ca.name as categoryName"
      )
      .groupBy("c.courseid", "u.userid", "ca.categoryid")
      .limit(quantity);
  },
  selectByIdSimple: (id) => {
    return db("course").where("courseid", id).first();
  },
  updateSimple: (course) => {
    return db("course")
      .where("courseid", course.courseid)
      .update(course)
      .returning("*");
  },
  updateViews: (id, views) => {
    return db("course").where("courseid", id).update({
      views: views,
    });
  },
};
