const mongoose = require('mongoose');
const mongoUtil = require('../utils/mongoUtil.js');

const USER_TABLE_NAME = "user"
exports.createUserTable = function () {
  const userTable = {
    userName: String,
    password: String,
    age: Number,
    gender: String,
    createDate: {
      type: Date,
      default: Date.now
    },
  }
  mongoUtil.createSchema(USER_TABLE_NAME, userTable);
}

exports.addUser = function (obj) {
  const DemoUser = mongoose.model(USER_TABLE_NAME);
  const userDoc = new DemoUser(obj);
  return userDoc.save();
}

exports.login = function (obj) {
  return new Promise((resolve, reject) => {
    var User = mongoose.model(USER_TABLE_NAME);

    User.findOne(obj, function (err, result) {
      if (err || !result) {
        reject('查询失败')
      } else {
        resolve(result || [])
      }
    });

  })
}

exports.queryUserList = function (obj) {
  return new Promise((resolve, reject) => {
    var User = mongoose.model(USER_TABLE_NAME);
    User.find(obj, function (err, doc) {
      if (err) {
        reject('查询失败')
      } else {
        resolve(doc);
      }
    });

  })
}