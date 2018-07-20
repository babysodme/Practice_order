import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'

Vue.use(VueRouter);

import Start from './components/Start'
import Home from './components/Home'
import Hot from './components/Hot'
import Order from './components/Order'
import Pcontent from './components/Pcontent'
import Search from './components/Search'
import Cart from './components/Cart'
import EditpeopleInfo from './components/EditpeopleInfo'


const routes = [
  { path: '/start', component: Start },
  { path: '/editpeopleinfo', component: EditpeopleInfo },
  { path: '/home', component: Home },
  { path: '/hot', component: Hot },
  { path: '/order', component: Order },
  { path: '/pcontent', component: Pcontent },
  { path: '/search', component: Search },
  { path: '/cart', component: Cart },

  { path: '*', redirect: '/start' }
]
//实例化vuerouter
const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
