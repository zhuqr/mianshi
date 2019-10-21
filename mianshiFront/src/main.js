import Vue from 'vue'
import "normalize.css/normalize.css"; // A modern alternative to CSS resets
import '@/styles/index.less'
import '@/utils/request'
import App from './App.vue'
import router from './router'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')