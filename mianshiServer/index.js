const path = require('path')
const Koa = require('koa');
const koaBody = require('koa-body')
const cors = require('koa-cors')
const config = require('./config/default.js');
const mongoInit = require('./dataBase/mongoInit.js');
// 引入jwt token工具
const JwtUtil = require('./utils/jwtUtil.js');
const session = require('koa-session');

const app = new Koa()


const CONFIG = {
  key: 'SESSIONID',
  /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  overwrite: true,
  /** (boolean) can overwrite or not (default true) */
  httpOnly: false,
  /** (boolean) httpOnly or not (default true) */
  signed: false,
  /** (boolean) signed or not (default true) */
  rolling: false,
  /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/
};


app.use(cors({
  origin: "*",
  credentials: true
})); // 解决跨域

const NOT_TOKEN_URL = ['/login', '/captcha']
app.use(async (ctx, next) => {
  // 我这里知识把登陆和注册请求去掉了，其他的多有请求都需要进行token校验 

  if (!NOT_TOKEN_URL.find(item => ctx.url.includes(item))) {
    let token = ctx.header.token;
    let jwt = new JwtUtil(token);
    let result = jwt.verifyToken();
    // 如果考验通过就next，否则就返回登陆信息不正确
    if (result == 'err') {
      ctx.response.body = {
        code: 403,
        msg: '登录已过期,请重新登录',
      }
    } else {
      await next();
    }
  } else {
    await next();
  }
});


app.use(koaBody({
  multipart: true
}));

app.use(session(CONFIG, app));
//  路由
mongoInit.init();
app.use(require('./routers/router.js').routes());
app.listen(config.port)