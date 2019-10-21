const fs = require('fs');
const router = require('koa-router')();
const User = require('../controller/user')
const config = require('../config/default.js');
const webName = "/" + config.webName

router.post(webName + '/login', User.login)

router.post(webName + '/add', User.add)

router.get(webName + '/queryUserList', User.queryUserList)

router.get(webName + '/captcha', User.captcha)

module.exports = router