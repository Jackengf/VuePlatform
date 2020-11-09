<template>
    <div class="home-page">
        我是新闻页面
    <!-- {{infoData}} -->
    <ul>
        <li v-for="(item,index) in infoData" :key="index"> {{item.name}}:{{item.content}}  </li>
    </ul>
    </div>
</template>
<script>
export default {
    data(){
        return {
            infoData:{}
        }
    },
    methods:{
        getInfoList2(){
            var res = this.$axios.post(this.$api.basic.info,{
                kind:'school',
                form:true
            }).then((res)=>{  
                console.log(res);
            });
        },
        
        getInfoList(){
            this.$axios.post(this.$api.basic.info,{
                kind:'school',
                form:true
            }).then((res)=>{
                this.infoData = res.result;
                console.log('res.tag',res.tag)
                
                    if(res.tag==1){
                        return  this.$axios.post(this.$api.basic.msg,{
                            tag:res.tag,
                            form:false
                        })
                    }
            }).then((res)=>{
                console.log(res)
            })
  
        }
    },
    mounted(){
        // this.getInfoList2();
        this.getInfoList();
        
    }
}
</script>