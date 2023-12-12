const randomString = require('randomstring');
const { returning } = require('../utils/db');
const knex = require('../utils/db');
const db = require('../utils/db');



module.exports = {
  findAll: () => {
    return db('user');
  },
  checkMailDuplicate: (userId, email) => {
    return db('user').where('userid', '!=', userId).where('email', email).first();
  },
  getUserbyGroupId: (groupId) => {
    return db('user').where('usergroupid', groupId);
  },
  toggleStatus: (userId, status) => {
    return db('user').where('userid', userId).update({
      status: status,
    });
  },
  addAccount: (
    fullname,
    email,
    usergroupid,
    picture,
    password,
    refresh_token
  ) => {
    // var password = randomString.generate({length:20});
    return db('user')
      .insert({
        username: email,
        password,
        fullname,
        email,
        refresh_token,
        usergroupid,
        picture,
      })
      .returning('userid');
  },
  removeTeacher: (userId) => {
    return db('user').where('userid', userId).delete();
  },
  getByUserEmail: (email) => {
    return db
      .from('user as u')
      .innerJoin('usergroup as g', 'u.usergroupid', 'g.usergroupid')
      .select(
        'u.userid as userId',
        'u.username',
        'u.fullname',
        'u.email',
        'u.refresh_token',
        'u.status',
        'g.code as groupCode',
        'u.password',
        'u.picture'
      )
      .where('email', email)
      .first();
  },
    getByUserName: (username) => {
        return db.from('user as u').innerJoin('usergroup as g', 'u.usergroupid', 'g.usergroupid').select('u.userid as userId', 'u.username', 'u.fullname', 'u.email', 'u.refresh_token', 'g.code as groupCode', 'u.password').where('username', username).first();
    },
    findById: (id) => {
        return db('user').where('userid', id).first();
    },
  findUserByEmail: (email) => {
    return db('user').where('email', email).first();
  },
  findVisitorByEmail: (email) => {
    return db('otp').where('visitor_email', email).first();
  },
    create: async (transaction, user) => {
        const userIds = await transaction('user').transacting(transaction).insert(user).returning('userid');

    return transaction
      .from('user as u')
      .innerJoin('usergroup as g', 'u.usergroupid', 'g.usergroupid')
      .select(
        'u.userid as userId',
        'u.username',
        'u.fullname',
        'u.email',
        'u.refresh_token',
        'g.code as groupCode'
      )
      .where('userid', userIds[0])
      .first();
  },
  findByIdAndRefreshToken: (userId, refreshToken) => {
    return db
      .from('user as u')
      .innerJoin('usergroup as g', 'u.usergroupid', 'g.usergroupid')
      .select(
        'u.userid as userId',
        'u.username',
        'u.fullname',
        // 'u.phonenumber as phoneNumber',
        'u.email',
        'g.code as groupCode'
      )
      .where({ 'u.userid': userId, 'u.refresh_token': refreshToken })
      .first();
  },
  updateInfo: (userId, fullname) => {
    return db('user').where('userid', userId).update({
      fullname: fullname,
    });
  },
  updateAvatar: (userId, picture) => {
    return db('user').where('userid', userId).update({
      picture: picture,
    });
  },
  changePassword: (user) => {
    return db('user').where('userid', user.userId).update({
      password: user.password,
      refresh_token: user.refresh_token,
    });
  },
  search: (condition) => {
    let fullname = condition.fullname || '';
    let query = db('user')
      .whereRaw(`lower(fullname) like '%${fullname.toLowerCase()}%'`)
      .orderBy('userid', 'desc');

    return query;
  },
  getTeacherInfo: (id) => {
    return db('user').where('userid', id).first();
  },
  addUserFromGG: (userInfo) => {
    return db('user').insert(userInfo);
  },
  addOTP: (email, otp) => {
    return db('otp').insert({
      visitor_email: email,
      generated_otp: otp,
    });
  },
  updateOTP: (email, otp) => {
    return db('otp').where('visitor_email', email).update({
      generated_otp: otp,
    });
  },
  findUserOTP: (email) => {
    return db('otp').where('visitor_email', email).first();
  },
  checkOTP: (email, otp) => {
    return db('otp')
      .where({
        visitor_email: email,
        generated_otp: otp,
      })
      .first();
  },
};
