const jwt = require('jsonwebtoken');
let commonUtils = require('../utils/common');
const constant = require('../utils/constant');

module.exports = (roles = []) => async (req, res, next) => {
  try {
    const access_token =
      req.token || req.header('Access-Token') || req.headers.authorization;

    commonUtils.currentUser = jwt.verify(access_token, constant.SECRET_KEY);

    if (roles && roles.length > 0 && roles.indexOf('NOT_NEED_LOGIN') === -1) {
      if (roles.indexOf(commonUtils.currentUser.groupCode) < 0) {
        res.status(403).json({
          message: 'Not have permission',
          code: 'FORBIDDEN',
        });
      }
    }

    next();
  } catch (ex) {
    commonUtils.currentUser = {};

    if (roles.indexOf('NOT_NEED_LOGIN') > -1) {
      next();
      return;
    }

    res.status(401).json({
      message: 'Unauthorized',
      code: 'UNAUTHORIZED',
    });
  }
};
