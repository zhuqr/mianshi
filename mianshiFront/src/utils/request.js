import Vue from "vue";
import {
  Message,
  Modal
} from 'view-design'
import axios from "axios";
const service = axios.create({
  // baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 13000 // 请求超时时间
});
Vue.prototype.$http = axios;
service.interceptors.request.use(
  function (config) {
    config.headers.token = localStorage.getItem('token');
    return config;
  },
  function (error) {
    //请求错误时做些事
    return Promise.reject(error);
  }
);
//添加响应拦截器
service.interceptors.response.use(
  function (response) {
    const {
      code,
      msg,
      data
    } = response.data
    if (code == 500) {
      Message.error(msg)
      return
    } else if (code == 403) {
      //  Message.error(msg)
      Modal.error({
        title: '温馨提示',
        content: '<p>' + msg + '</p>',
        onOk: function () {
          window.location.href = "/login"
        }
      })

      return
    }
    if (response.headers.token) {
      localStorage.setItem('token', response.headers.token)
    }
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default service