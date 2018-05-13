// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import {currency} from './util/currency.js'
//import {sum, minus} from './es6ExportAndImport.js' //导出若给了变量名，那么引入时需要加{}来接收
//import * as jisuan from './es6ExportAndImport.js'

import Vuex from 'vuex'

// console.log("sum", sum(1,3));
// console.log("minus", minus(1,3));
//console.log("sum", jisuan.sum(1,3));
//console.log("minus", jisuan.minus(1,3));

import "./assets/css/base.css"
import "./assets/css/product.css"

Vue.config.productionTip = false;

Vue.use(VueLazyLoad, {
    loading: "./static/loading-svg/loading-bars.svg"
});

Vue.use(infiniteScroll);

Vue.use(Vuex);

Vue.filter("currency", currency); //导入全局过滤器

const store = new Vuex.Store({
    state: {
        nickName: '',
        cartCount: 0
    },
    mutations: {
        updateUserInfo(state, nickName) {
            state.nickName = nickName;
        },
        updateCartCount(state, cartCount) {
            state.cartCount += cartCount;
        },
        initCartCount(state, cartCount) {
            state.cartCount = cartCount;
        }
    }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
