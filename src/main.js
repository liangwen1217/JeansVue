// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import router from './router';
import axios from 'axios' //主要AJAX套件
import VueAxios from 'vue-axios' //將它轉為Vue的套件
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
} from 'vee-validate';
// // 將驗證條件引入
import * as rules from 'vee-validate/dist/rules';
import tw from 'vee-validate/dist/locale/zh_TW.json';
import 'bootstrap';
import './bus';
import currencyFilter from './filters/currencyFilter';
// import VeeValidate from 'vee-validate';
// import zhTW from 'vee-validate/dist/locale/zh_TW';
// import VueI18n from 'vue-i18n';
import store from './store';
import dateFilter from './filters/date';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
// Vue.use(VueI18n);
Vue.use(Vuex);

// const i18n = new VueI18n({
//   locale: 'zhTW'
// })
// Vue.use(VeeValidate, {
//   events: 'input|blur', //這是為了讓使用者離開該欄位時觸發驗證
//   i18n,
//   dictionary: {
//     zhTW
//   }
// })

axios.defaults.withCredentials = true;

Vue.component('Loading', Loading);
// 註冊 vee-validate 全域元件
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
localize('zh_TW', tw);

Vue.filter('currency', currencyFilter); // 全域啟用 Filter
Vue.filter('date', dateFilter);

Object.keys(rules).forEach((rule) => {
  extend(rule, {
    ...rules[rule], // copies rule configuration
    message: tw[rule], // assign message
  });
});

axios.defaults.withCredentials = true;


/* eslint-disable no-new */
new Vue({
  // i18n,
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store,
});
router.beforeEach((to, from, next) => {
  // ...
  console.log('to', to, 'from', from, 'next', next);
  if(to.meta.requiresAuth){
    // console.log('這裡需要驗證');
    const api =`${process.env.APIPATH}/api/user/check`;
    axios.post(api).then((response) =>{
        console.log(response.data);
        if(response.data.success) {
          // vm.$router.push('/'); 
          next();  // 登入成功：前往指定路徑
        } else{
          next({
            path: '/signin', // 登入失敗：導向登入頁
          });
        }
    });
  }else{
    next();
  }
  
})