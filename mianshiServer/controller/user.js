const User = require('../dataBase/user.js');
// 引入jwt token工具
const JwtUtil = require('../utils/jwtUtil.js');

const svgCaptcha = require('svg-captcha');

const CODE = 0;
const ERROE_CODE = 1;
exports.add = async (ctx, next) => {
  const reqBody = ctx.request.body;
  await User.addUser({
    userName: reqBody.userName,
    password: reqBody.password,
    age: reqBody.age,
    gender: reqBody.gender
  }).then((result) => {
    ctx.body = {
      code: CODE,
      msg: '添加成功'
    }
  }).catch((e) => {
    console.log(e)
    ctx.body = {
      code: ERROE_CODE,
      msg: '添加失败'
    }
  })

}
exports.queryUserList = async (ctx, next) => {
  try {
    const list = await User.queryUserList({})
    ctx.body = {
      code: CODE,
      msg: '查询成功',
      data: list
    }

  } catch (error) {
    console.log(error)
    ctx.body = {
      code: ERROE_CODE,
      msg: '查询失败'
    }
  }
}


exports.login = async (ctx, next) => {
  const reqBody = ctx.request.body;
  const captchaText = ctx.cookies && ctx.cookies.get('captchaText') || ''
  const {
    userName,
    password,
    captcha = ''
  } = reqBody
  if (captcha.toLowerCase() !== captchaText.toLowerCase()) {
    ctx.body = {
      code: ERROE_CODE,
      msg: '验证码不正确'
    }
  } else if (userName && password && userName.length >= 4 && password.length >= 6) {
    try {
      const dbUser = await User.login({
        userName,
        password
      })
      if (dbUser) {
        // 登陆成功，添加token验证
        const _id = dbUser._id.toString();
        // 将用户id传入并生成token
        const jwt = new JwtUtil(_id);
        const token = jwt.generateToken();
        // 将 token 返回给客户端
        ctx.append('token', token);
        ctx.body = {
          code: CODE,
          msg: '登录成功',
          data: dbUser
        }
      }

    } catch (error) {
      ctx.body = {
        code: ERROE_CODE,
        msg: '用户名或密码错误'
      }
    }

  } else {
    ctx.body = {
      code: ERROE_CODE,
      msg: '用户名或密码错误'
    }
  }
}

exports.captcha = async (ctx, next) => {
  const captcha = svgCaptcha.create({ //这种生成的是随机数验证码
    size: 4, //验证码长度
    fontSize: 50, //字体大小
    width: 100,
    height: 40,
    background: '#FFF'
  });
  ctx.response.type = 'image/svg+xml';
  ctx.cookies.set("captchaText", captcha.text, {
    maxAge: 86400000 * 7
  });
  ctx.body = captcha.data;
}