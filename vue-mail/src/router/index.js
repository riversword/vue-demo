import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import GoodsList from './../views/GoodsList.vue'
import Cart from './../views/Cart.vue'
import Address from './../views/Address.vue'
import OrderConfirm from './../views/OrderConfirm.vue'
import OrderSuccess from './../views/OrderSuccess.vue'

Vue.use(Router)

export default new Router({
  mode: 'history', //指定路由模式为history
  //mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList //注意此处的component单复数区别
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart //注意此处的component单复数区别
    },
    {
      path: '/address',
      name: 'Address',
      component: Address //注意此处的component单复数区别
    },
    {
      path: '/OrderConfirm',
      name: 'OrderConfirm',
      component: OrderConfirm 
    },
    {
      path: '/OrderSuccess',
      name: 'OrderSuccess',
      component: OrderSuccess 
    }
  ]
})
