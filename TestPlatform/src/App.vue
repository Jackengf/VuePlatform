<template>
    <div id="app">
        <h1>{{msg}}</h1>
        <div>
            <router-link to="/login" tag="li">登录</router-link>
            <router-link to="/home" tag="li">主页</router-link>
            <router-link to="/news" tag="li">新闻</router-link>
            <!-- <ul @click="gotoPage($event)">
                <li tag="home">主页</li>
                <li tag="news">新闻</li>
            </ul> -->
        </div>
        <router-view></router-view>
    </div>
</template>

    <script>
        export default {
            name: 'app',
            data () {
                return {
                msg: 'Welcome to ruanmou222'
                }
            },
            methods:{
                gotoPage(e){
                    var target = e.target;
                    var tag = target.getAttribute("tag");
                    switch(tag){
                        case 'home':
                            this.$router.push({
                                path:'/home',
                                query:{
                                    name:'FENGKANG123'
                                }
                            });
                        break;
                        case 'news':
                            this.$router.push({
                                path:'/news',
                                query:{
                                    name:'DYE123'
                                }
                            });
                        break;
                    }
                }
            }
        }
    </script>