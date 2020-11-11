<template>
    <div id="app">
        <div>
            <!-- <router-link to="/login" tag="li">登录</router-link>
            <router-link to="/home" tag="li">主页</router-link>
            <router-link to="/news" tag="li">新闻</router-link> -->
            <!-- <ul @click="gotoPage($event)">
                <li tag="home">主页</li>
                <li tag="news">新闻</li>
            </ul> -->
            <ul class="main-menu">           
                <router-link v-for="(item,index) in getMyRoutes" :key="index" :to="item.path" tag='li'>{{item.meta.title}}</router-link> 
                <button type="button" @click="logOut()">注销</button>              
            </ul>
        </div>
        <router-view></router-view>
    </div>
</template>

    <script>
        export default {
            name: 'app',
            data () {
                return {
                    msg: 'Welcome to ruanmou222',
                    getMyRoutes: []
                }
            },
            computed:{
                // getMyRoutes(){               
                //     var thisData = this.$router.options.routes;
                //     return thisData;
                // }
            },
            methods:{
                logOut(){
                    localStorage.clear();
                    this.$router.push({
                        path:'/login'
                    })
                    location.reload();
                },
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
            },
            mounted(){
                EventEmitter.$on('allOption',(res)=>{              
                    this.getMyRoutes = res;        
                })
            }
        }
    </script>

    <style scoped>
        .main-menu li {
            display: inline-block;
            margin-right: 30px;
            background: #000;
            color: #fff;
            padding: 5px 20px;
            cursor: pointer;
        }
        .main-menu li.active-menu{
            background: #ff6600;
            
        }
    </style>