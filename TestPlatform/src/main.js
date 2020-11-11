import Vue from 'vue'
import App from './App.vue'
import VueRouter from './router/index.js' //路由管理
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from './providers/axios.js'; //axios封装
import api from './providers/api.js'; //api封装
Vue.prototype.$axios = axios;
Vue.prototype.$api = api;
Vue.use(ElementUI);
window.EventEmitter = new Vue();
import asyncRouetes from './router/dynamic.js';
var initRoutes = VueRouter.options.routes;

var allPaths = [];
asyncRouetes.forEach((option)=>{
    allPaths.push(option.path);
})

VueRouter.beforeEach((to, from, next) => {
    var userRole = localStorage.getItem('userRole');
    var token = localStorage.getItem('token');

    //需要判断下是否已经添加过动态路由，不要重复添加
    // 方式： 判断默认和路由和 读取的路由是否一致
    var isHAS =  VueRouter.options.routes.some((option)=>{
            return allPaths.includes(option.path)
        }); 
    if(isHAS){
        next();
        return;
    }

//判断是否存在token
    if(token && userRole){
        var asyncRouete =  asyncRouetes.filter((option,index)=>{
            return option.meta.roles.includes(userRole);
        });
        //将新路由添加到路由中, 如果不加组件component不能正确渲染
        VueRouter.addRoutes(asyncRouete);
         //为了正确渲染导航,将对应的新的路由添加到VueRouter中	
        VueRouter.options.routes = [...initRoutes,...asyncRouete];
        EventEmitter.$emit('allOption',VueRouter.options.routes);
        next();
    } else {
    // 跳转到登陆页面
        if(to.path=='/login') {         
            next();
        } else {
            next('/login');
        }
    }
})

new Vue({
    el:'#app',
    data:{
        hello:'hello',
        msg: 'Welcome to ruanmou1111'
    },
    router:VueRouter,
    //创建虚拟Dom,不用组件 render 第一个参数（必要参数）类型可以是字符串、对象或函数,第二个参数（类型是对象，可选）,第三个参数（类型是数组，数组元素类型是VNode，可选）
    // render(createElement){
    //     return createElement('div',{
    //         id: "app1",
    //         style:{
                
    //         }
    //         },[
    //             createElement('h1',{
    //                 style:{
    //                     color:'red'
    //                 },
    //                 domProps:{
    //                     innerText:'FENGKANG'
    //                 },
    //                 on:{
    //                     click:function(){                          
    //                         alert("dye")
    //                     }
    //                 }
    //             }),
    //             createElement('span','world')
    //         ])
    // }
    //使用组件， 利用render函数渲染
    render:function(h){
            return h(App);
     },
    // //  render:h => h(App)
    // mounted(){
    //     console.log(this);
    // }
});