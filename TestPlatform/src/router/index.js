import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import home from '../views/home.vue';
import news from '../views/news.vue';

var allrouter = [{
    path:'/login',
    name:'login',
    component:()=>import('../views/login.vue')
},{
    path:'/home',
    name:'home',
    component:home
},{
    path:'/news',
    name:'news',
    component:news
}];
export default new VueRouter({
    routes:allrouter,
    mode:'hash',
    base:"/",
    fallback: true,
    linkActiveClass: "active-menu",
    linkExactActiveClass: "exact-active-menu",
})


