<template>
    <div>
        <h1>主页{{params.name}}</h1>
        <el-row>
            <el-button>默认按钮</el-button>
            <el-button type="primary">主要按钮</el-button>
            <el-button type="success">成功按钮</el-button>
            <el-button type="info">信息按钮</el-button>
            <el-button type="warning">警告按钮</el-button>
            <el-button type="danger">危险按钮</el-button>
        </el-row>
    </div>
</template>
<script>
//按需引入
// import Vue from 'vue';
// import { Button, Select ,Row} from 'element-ui';
// Vue.use(Button)
// Vue.use(Row)
    export default {
        data(){
            return {
                name:'FENGKANG',
                params:this.$route.query
            }
        },
        methods:{
            getInfo(){
                this.$axios.get('http://47.103.110.240:6214/api/SCSAttendanceManagement/StatisticsInClock').then((res)=>{
                    console.log(res);
                })
            }
        },
        mounted(){
            //this.getInfo();
        }
    }
</script>