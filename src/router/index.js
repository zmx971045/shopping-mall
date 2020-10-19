import Vue from 'vue'
import VueRouter from 'vue-router'

// 进行懒加载
const Home = () => import('views/home/Home.vue')
const Cart = () => import('views/cart/Cart')
const Category = () => import('views/category/Category.vue')
const Profile = () => import('views/profile/Profile.vue')

// 1.安装所需插件
Vue.use(VueRouter)

// 2.创建router实例
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/profile',
    component: Profile
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})