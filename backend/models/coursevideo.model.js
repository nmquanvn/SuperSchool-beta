const db = require('../utils/db');
const commonUtils = require('../utils/common');

module.exports = {
    findByCourseId: (queryParams) => {
        // let {userId} = commonUtils.currentUser;
        let query = db('coursevideo as cv').where('cv.courseid', queryParams.courseId);

        // if(userId) {
        //     query.join('student_course as sc', function() {
        //         this.on('sc.courseid', '=', 'cv.courseid');
        //         this.andOnVal('sc.studentid', '=', userId)
        //     }, 'left');
        //     query.whereRaw('(sc.studentcourseid is not null or cv.preview = true)');
        // } else {
        //     query.where('cv.preview', true);
        // }

        if(queryParams.pageSize) {
            query.limit(queryParams.pageSize);
            query.offset(queryParams.offset);
        }

        query.orderBy('cv.orderno', 'asc');

        return query;
    },
    createMutiple: (videos) => {
        let query = db('coursevideo').insert(videos);

        return query;
    },
    deleteById: (id) => {
        return db('coursevideo').where('coursevideoid', id).del();
    }
}