<template>
  <div class="login-contanier">
    <div class="img-logo">
      <img src="@/assets/logo.jpg"
           alt="">
    </div>
    <Form ref="form"
          :model="form"
          :rules="ruleInline">
      <FormItem prop="userName">
        <Input type="text"
               v-model="form.userName"
               placeholder="用户名">
        <Icon type="ios-person-outline"
              slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password"
               v-model="form.password"
               placeholder="密码">
        <Icon type="ios-lock-outline"
              slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="captcha">
        <Row>
          <Col span="17">
          <Input type="text"
                 v-model="form.captcha"
                 placeholder="验证码">
          <Icon type="ios-lock-outline"
                slot="prepend"></Icon>
          </Input>
          </Col>
          <Col span="5"
               offset="1">
          <img :src="captchaImg"
               class="captcha"
               @click="refreshCaptcha"
               alt="">
          </Col>
        </Row>

      </FormItem>
      <FormItem class="btn-wrap">
        <Button type="primary"
                @click="handleSubmit('form')">登录</Button>
        <Button style="margin-left: 8px"
                @click="handleReset('form')">重置</Button>
      </FormItem>
    </form>
  </div>

</template>
<script>
/* import { encrypt } from '@/utils/index.js' */
import { login } from '@/api/index.js'
import { format } from 'path';
export default {
  data () {
    return {
      captchaImg: '/demo/captcha?t=' + new Date(),
      form: {
        userName: '',
        password: '',
        captcha: ''
      },
      ruleInline: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { type: 'string', min: 4, message: '用户名必须大于4位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码必须大于6位', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ]

      }
    }
  },
  created () {
  },
  methods: {
    refreshCaptcha () {
      this.captchaImg = '/demo/captcha?t=' + new Date();
    },
    handleReset (name) {
      this.$refs[name].resetFields();
    },
    handleSubmit (name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          const { code, msg, data } = await login({
            data: this.form
          });
          if (code == 0) {
            localStorage.setItem('user', JSON.stringify(data));
            this.$router.push('/');
            this.$Message.success('登录成功!');
          } else {
            this.refreshCaptcha()
            this.$Message.error(msg);
          }
        } else {
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login-contanier {
  .img-logo {
    margin-bottom: 20px;
    img {
      width: 300px;
    }
  }
  .captcha {
    height: 32px;
  }
  padding-top: 100px;
  width: 300px;
  margin: 0 auto;
}
.btn-wrap {
  text-align: center;
}
</style>