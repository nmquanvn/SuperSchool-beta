const jwt = require('jsonwebtoken');
let commonUtils = require('../utils/common');
const constant = require('../utils/constant');

module.exports = (roles) => (req, res, next) => {
  try {
    if (roles.indexOf(commonUtils.currentUser.groupCode) == -1) {
      return res.status(403).json({
        message: 'You do not have permission to access this function',
      });
    }

    next();
  } catch (ex) {
    res.status(401).json({
      message: 'Unauthorized',
    });
  }
};
