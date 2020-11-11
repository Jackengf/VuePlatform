import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import home from '../views/home.vue';
import news from '../views/news.vue';

// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push (location) {
//     return originalPush.call(this, location).catch(err => err)
// }

var allrouter = [{
    path:'/login',
    name:'login',
    meta:{
        title:'登陆'
    },
    component:()=>import('../views/login.vue')
},{
    path:'/home',
    name:'home',
    meta:{
        title:'首页'
    },
    component:home
},{
    path:'/news',
    name:'news',
    meta:{
        title:'新闻'
    },
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


