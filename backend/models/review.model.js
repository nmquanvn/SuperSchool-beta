const db = require('../utils/db');

module.exports = {
    findByCourseId: (courseId) => {
        return db.from('review as r')
        .where('courseid', courseId)
        .leftJoin("user as us", "r.userid", "us.userid")
        .orderBy('updateddate', 'desc');
    },
    create: (review) => {
        return db('review').insert({
            courseid: review.courseId,
            comment: review.comment,
            rating: review.rating,
            userid: review.userId,
            createddate: review.createdDate,
            updateddate: review.updatedDate
        }).returning('*');
    }
};