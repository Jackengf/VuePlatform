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