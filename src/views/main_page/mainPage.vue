<template>
    <el-container>
        <el-main>
            Home
        </el-main>
    </el-container>
</template>

<script>
    import {getUserInfo} from '../../common-utils/service/system_service'
    export default {
        name: "main-page",
        data(){
            return {

            }
        },
        mounted() {
            this.main_flow();
        },
        methods:{
            main_flow:function () {
                getUserInfo({}).then((res)=>{
                    console.log("main_page :res =",res);
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .el-container{
        /*height: 100%;*/
        /*background-color: #42b983;*/
        .el-main{
            /*height: 100%;*/
        }
    }
</style>