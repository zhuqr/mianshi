const mongoUtil = require('../utils/mongoUtil.js');
const User = require('./user.js');
exports.init = function () {
  mongoUtil.createMongo().then(() => {
    User.createUserTable();
  });
}